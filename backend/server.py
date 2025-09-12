from fastapi import FastAPI, APIRouter, HTTPException, Depends, File, UploadFile, Form, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Union
import uuid
from datetime import datetime, timezone
from PIL import Image
import io
import shutil
from passlib.context import CryptContext
from jose import JWTError, jwt
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create uploads directory
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

# Security
SECRET_KEY = os.environ.get('SECRET_KEY', 'ridauto-motor-secret-key-2025')
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Create the main app
app = FastAPI(title="Ridauto Motor API", description="Professional Automotive Dealership API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

# Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    email: str
    is_admin: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class VehicleImage(BaseModel):
    id: str
    filename: str
    url: str
    is_primary: bool = False

class Vehicle(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    brand: str
    model: str
    year: int
    price: float
    kilometers: int
    fuel_type: str
    transmission: str
    color: str
    power_hp: int
    doors: int
    seats: int
    trunk_volume: Optional[int] = None
    warranty_months: int = 12
    vehicle_type: str  # "nuevo", "ocasion"
    status: str = "available"  # "available", "sold", "hidden"
    description: str
    features: List[str] = []
    images: List[VehicleImage] = []
    slug: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class VehicleCreate(BaseModel):
    brand: str
    model: str
    year: int
    price: float
    kilometers: int
    fuel_type: str
    transmission: str
    color: str
    power_hp: int
    doors: int
    seats: int
    trunk_volume: Optional[int] = None
    warranty_months: int = 12
    vehicle_type: str
    status: str = "available"
    description: str
    features: List[str] = []

class VehicleFilter(BaseModel):
    brand: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    min_year: Optional[int] = None
    max_year: Optional[int] = None
    fuel_type: Optional[str] = None
    transmission: Optional[str] = None
    vehicle_type: Optional[str] = None
    status: Optional[str] = None

class NewsArticle(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    excerpt: str
    image_url: Optional[str] = None
    published: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class NewsCreate(BaseModel):
    title: str
    content: str
    excerpt: str
    image_url: Optional[str] = None
    published: bool = True

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    content: str
    rating: int = 5
    published: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TestimonialCreate(BaseModel):
    name: str
    content: str
    rating: int = 5
    published: bool = True

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    vehicle_id: Optional[str] = None
    message_type: str = "contact"  # "contact", "financing", "valuation"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    vehicle_id: Optional[str] = None
    message_type: str = "contact"

# Utility functions
def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_slug(brand: str, model: str, year: int) -> str:
    slug_base = f"{year}-{brand}-{model}".lower().replace(" ", "-")
    return slug_base

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = await db.users.find_one({"username": username})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        
        return User(**user)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_admin_user(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

def process_image(file_content: bytes, filename: str) -> tuple:
    """Process uploaded image and create thumbnail"""
    try:
        # Open the image
        image = Image.open(io.BytesIO(file_content))
        
        # Convert to RGB if necessary
        if image.mode in ('RGBA', 'P'):
            image = image.convert('RGB')
        
        # Resize for main image (max 1200px width)
        if image.width > 1200:
            ratio = 1200 / image.width
            new_height = int(image.height * ratio)
            image = image.resize((1200, new_height), Image.Resampling.LANCZOS)
        
        # Save main image
        main_buffer = io.BytesIO()
        image.save(main_buffer, format='JPEG', quality=85)
        main_content = main_buffer.getvalue()
        
        # Create thumbnail (300x200)
        thumb_image = image.copy()
        thumb_image.thumbnail((300, 200), Image.Resampling.LANCZOS)
        thumb_buffer = io.BytesIO()
        thumb_image.save(thumb_buffer, format='JPEG', quality=80)
        thumb_content = thumb_buffer.getvalue()
        
        return main_content, thumb_content
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing image: {str(e)}")

# Authentication routes
@api_router.post("/auth/register", response_model=User)
async def register(user_data: UserCreate):
    # Check if user exists
    existing_user = await db.users.find_one({
        "$or": [{"username": user_data.username}, {"email": user_data.email}]
    })
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Hash password
    hashed_password = get_password_hash(user_data.password)
    
    # Create user
    user_dict = user_data.dict()
    user_dict['password'] = hashed_password
    user_obj = User(**{k: v for k, v in user_dict.items() if k != 'password'})
    
    # Insert to database
    await db.users.insert_one({**user_obj.dict(), 'password': hashed_password})
    return user_obj

@api_router.post("/auth/login", response_model=Token)
async def login(user_data: UserLogin):
    # Find user
    user = await db.users.find_one({"username": user_data.username})
    if not user or not verify_password(user_data.password, user['password']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create token
    access_token = create_access_token(data={"sub": user['username']})
    return {"access_token": access_token, "token_type": "bearer"}

@api_router.get("/auth/me", response_model=User)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user

# Vehicle routes
@api_router.get("/vehicles", response_model=List[Vehicle])
async def get_vehicles(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    brand: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    min_year: Optional[int] = None,
    max_year: Optional[int] = None,
    fuel_type: Optional[str] = None,
    transmission: Optional[str] = None,
    vehicle_type: Optional[str] = None,
    status: Optional[str] = None,
    sort_by: str = Query("created_at", regex="^(price|year|kilometers|created_at)$"),
    sort_order: str = Query("desc", regex="^(asc|desc)$")
):
    # Build filter query
    filter_query = {}
    
    if brand:
        filter_query["brand"] = {"$regex": brand, "$options": "i"}
    if min_price is not None:
        filter_query.setdefault("price", {})["$gte"] = min_price
    if max_price is not None:
        filter_query.setdefault("price", {})["$lte"] = max_price
    if min_year is not None:
        filter_query.setdefault("year", {})["$gte"] = min_year
    if max_year is not None:
        filter_query.setdefault("year", {})["$lte"] = max_year
    if fuel_type:
        filter_query["fuel_type"] = fuel_type
    if transmission:
        filter_query["transmission"] = transmission
    if vehicle_type:
        filter_query["vehicle_type"] = vehicle_type
    if status:
        filter_query["status"] = status
    else:
        # By default, only show available vehicles for public
        filter_query["status"] = {"$ne": "hidden"}
    
    # Build sort query
    sort_direction = 1 if sort_order == "asc" else -1
    sort_query = [(sort_by, sort_direction)]
    
    vehicles = await db.vehicles.find(filter_query).sort(sort_query).skip(skip).limit(limit).to_list(length=None)
    return [Vehicle(**vehicle) for vehicle in vehicles]

@api_router.get("/vehicles/{vehicle_id}", response_model=Vehicle)
async def get_vehicle(vehicle_id: str):
    vehicle = await db.vehicles.find_one({"$or": [{"id": vehicle_id}, {"slug": vehicle_id}]})
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return Vehicle(**vehicle)

@api_router.post("/vehicles", response_model=Vehicle)
async def create_vehicle(vehicle_data: VehicleCreate, current_user: User = Depends(get_admin_user)):
    vehicle_dict = vehicle_data.dict()
    vehicle_dict['slug'] = create_slug(vehicle_data.brand, vehicle_data.model, vehicle_data.year)
    vehicle_obj = Vehicle(**vehicle_dict)
    
    await db.vehicles.insert_one(vehicle_obj.dict())
    return vehicle_obj

@api_router.put("/vehicles/{vehicle_id}", response_model=Vehicle)
async def update_vehicle(vehicle_id: str, vehicle_data: VehicleCreate, current_user: User = Depends(get_admin_user)):
    vehicle = await db.vehicles.find_one({"id": vehicle_id})
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    vehicle_dict = vehicle_data.dict()
    vehicle_dict['slug'] = create_slug(vehicle_data.brand, vehicle_data.model, vehicle_data.year)
    vehicle_dict['updated_at'] = datetime.now(timezone.utc)
    
    await db.vehicles.update_one({"id": vehicle_id}, {"$set": vehicle_dict})
    
    updated_vehicle = await db.vehicles.find_one({"id": vehicle_id})
    return Vehicle(**updated_vehicle)

@api_router.delete("/vehicles/{vehicle_id}")
async def delete_vehicle(vehicle_id: str, current_user: User = Depends(get_admin_user)):
    result = await db.vehicles.delete_one({"id": vehicle_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return {"message": "Vehicle deleted"}

# Image upload routes
@api_router.post("/vehicles/{vehicle_id}/images")
async def upload_vehicle_images(
    vehicle_id: str,
    files: List[UploadFile] = File(...),
    current_user: User = Depends(get_admin_user)
):
    vehicle = await db.vehicles.find_one({"id": vehicle_id})
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    uploaded_images = []
    
    for file in files:
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read file content
        content = await file.read()
        
        # Process image
        main_content, thumb_content = process_image(content, file.filename)
        
        # Generate unique filename
        file_id = str(uuid.uuid4())
        main_filename = f"{file_id}_main.jpg"
        thumb_filename = f"{file_id}_thumb.jpg"
        
        # Save files
        main_path = UPLOAD_DIR / main_filename
        thumb_path = UPLOAD_DIR / thumb_filename
        
        with open(main_path, 'wb') as f:
            f.write(main_content)
        with open(thumb_path, 'wb') as f:
            f.write(thumb_content)
        
        # Create image object
        image_obj = VehicleImage(
            id=file_id,
            filename=main_filename,
            url=f"/uploads/{main_filename}",
            is_primary=len(vehicle.get('images', [])) == 0  # First image is primary
        )
        
        uploaded_images.append(image_obj)
    
    # Update vehicle with new images
    current_images = vehicle.get('images', [])
    current_images.extend([img.dict() for img in uploaded_images])
    
    await db.vehicles.update_one(
        {"id": vehicle_id},
        {"$set": {"images": current_images, "updated_at": datetime.now(timezone.utc)}}
    )
    
    return {"message": f"Uploaded {len(uploaded_images)} images", "images": uploaded_images}

@api_router.delete("/vehicles/{vehicle_id}/images/{image_id}")
async def delete_vehicle_image(
    vehicle_id: str,
    image_id: str,
    current_user: User = Depends(get_admin_user)
):
    vehicle = await db.vehicles.find_one({"id": vehicle_id})
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    images = vehicle.get('images', [])
    image_to_delete = next((img for img in images if img['id'] == image_id), None)
    
    if not image_to_delete:
        raise HTTPException(status_code=404, detail="Image not found")
    
    # Remove from filesystem
    try:
        os.remove(UPLOAD_DIR / image_to_delete['filename'])
        thumb_filename = image_to_delete['filename'].replace('_main.jpg', '_thumb.jpg')
        if os.path.exists(UPLOAD_DIR / thumb_filename):
            os.remove(UPLOAD_DIR / thumb_filename)
    except OSError:
        pass  # File might not exist
    
    # Remove from database
    updated_images = [img for img in images if img['id'] != image_id]
    await db.vehicles.update_one(
        {"id": vehicle_id},
        {"$set": {"images": updated_images, "updated_at": datetime.now(timezone.utc)}}
    )
    
    return {"message": "Image deleted"}

# News routes
@api_router.get("/news", response_model=List[NewsArticle])
async def get_news(skip: int = 0, limit: int = 10):
    news = await db.news.find({"published": True}).sort([("created_at", -1)]).skip(skip).limit(limit).to_list(length=None)
    return [NewsArticle(**article) for article in news]

@api_router.get("/news/{article_id}", response_model=NewsArticle)
async def get_news_article(article_id: str):
    article = await db.news.find_one({"id": article_id, "published": True})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return NewsArticle(**article)

@api_router.post("/news", response_model=NewsArticle)
async def create_news(article_data: NewsCreate, current_user: User = Depends(get_admin_user)):
    article_obj = NewsArticle(**article_data.dict())
    await db.news.insert_one(article_obj.dict())
    return article_obj

# Testimonials routes
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find({"published": True}).sort([("created_at", -1)]).to_list(length=None)
    return [Testimonial(**testimonial) for testimonial in testimonials]

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial_data: TestimonialCreate, current_user: User = Depends(get_admin_user)):
    testimonial_obj = Testimonial(**testimonial_data.dict())
    await db.testimonials.insert_one(testimonial_obj.dict())
    return testimonial_obj

# Contact routes
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(contact_data: ContactCreate):
    contact_obj = ContactMessage(**contact_data.dict())
    await db.contact_messages.insert_one(contact_obj.dict())
    return contact_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages(current_user: User = Depends(get_admin_user), skip: int = 0, limit: int = 50):
    messages = await db.contact_messages.find().sort([("created_at", -1)]).skip(skip).limit(limit).to_list(length=None)
    return [ContactMessage(**message) for message in messages]

# Stats and dashboard routes
@api_router.get("/stats")
async def get_stats(current_user: User = Depends(get_admin_user)):
    total_vehicles = await db.vehicles.count_documents({})
    available_vehicles = await db.vehicles.count_documents({"status": "available"})
    sold_vehicles = await db.vehicles.count_documents({"status": "sold"})
    total_messages = await db.contact_messages.count_documents({})
    
    return {
        "total_vehicles": total_vehicles,
        "available_vehicles": available_vehicles,
        "sold_vehicles": sold_vehicles,
        "total_messages": total_messages
    }

# Initialize admin user
@api_router.post("/init-admin")
async def init_admin():
    existing_admin = await db.users.find_one({"username": "admin"})
    if existing_admin:
        return {"message": "Admin already exists"}
    
    admin_user = User(
        username="admin",
        email="admin@ridautomotor.com",
        is_admin=True
    )
    
    hashed_password = get_password_hash("admin123")
    await db.users.insert_one({**admin_user.dict(), 'password': hashed_password})
    
    return {"message": "Admin user created", "username": "admin", "password": "admin123"}

# Root route
@api_router.get("/")
async def root():
    return {"message": "Ridauto Motor API", "version": "1.0", "status": "running"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)