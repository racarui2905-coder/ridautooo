#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Ridauto Motor
Tests all backend functionality including authentication, vehicle management, image upload, etc.
"""

import requests
import json
import os
import time
from typing import Dict, Any, Optional
from pathlib import Path

# Configuration
BASE_URL = "https://luxury-wheels-9.preview.emergentagent.com/api"
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"

class RidautoAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.session = requests.Session()
        self.admin_token = None
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, message: str, details: Any = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "details": details
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/")
            if response.status_code == 200:
                data = response.json()
                self.log_test("API Root", True, f"API is running - {data.get('message', 'Unknown')}")
                return True
            else:
                self.log_test("API Root", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("API Root", False, f"Connection error: {str(e)}")
            return False
    
    def test_init_admin(self):
        """Test admin initialization"""
        try:
            response = self.session.post(f"{self.base_url}/init-admin")
            if response.status_code == 200:
                data = response.json()
                self.log_test("Admin Init", True, data.get('message', 'Admin initialized'))
                return True
            else:
                self.log_test("Admin Init", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Admin Init", False, f"Error: {str(e)}")
            return False
    
    def test_admin_login(self):
        """Test admin login and get JWT token"""
        try:
            login_data = {
                "username": ADMIN_USERNAME,
                "password": ADMIN_PASSWORD
            }
            response = self.session.post(f"{self.base_url}/auth/login", json=login_data)
            
            if response.status_code == 200:
                data = response.json()
                self.admin_token = data.get('access_token')
                if self.admin_token:
                    # Set authorization header for future requests
                    self.session.headers.update({
                        'Authorization': f'Bearer {self.admin_token}'
                    })
                    self.log_test("Admin Login", True, "Successfully logged in and got JWT token")
                    return True
                else:
                    self.log_test("Admin Login", False, "No access token in response", data)
                    return False
            else:
                self.log_test("Admin Login", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Admin Login", False, f"Error: {str(e)}")
            return False
    
    def test_get_current_user(self):
        """Test getting current user info"""
        try:
            response = self.session.get(f"{self.base_url}/auth/me")
            if response.status_code == 200:
                data = response.json()
                if data.get('username') == ADMIN_USERNAME and data.get('is_admin'):
                    self.log_test("Get Current User", True, f"Retrieved admin user: {data.get('username')}")
                    return True
                else:
                    self.log_test("Get Current User", False, "User data incorrect", data)
                    return False
            else:
                self.log_test("Get Current User", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Get Current User", False, f"Error: {str(e)}")
            return False
    
    def test_get_vehicles(self):
        """Test getting vehicles list"""
        try:
            response = self.session.get(f"{self.base_url}/vehicles")
            if response.status_code == 200:
                data = response.json()
                self.log_test("Get Vehicles", True, f"Retrieved {len(data)} vehicles")
                return True
            else:
                self.log_test("Get Vehicles", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Get Vehicles", False, f"Error: {str(e)}")
            return False
    
    def test_create_vehicle(self):
        """Test creating a new vehicle"""
        try:
            vehicle_data = {
                "brand": "BMW",
                "model": "X5",
                "year": 2023,
                "price": 75000.0,
                "kilometers": 15000,
                "fuel_type": "Gasolina",
                "transmission": "Automático",
                "color": "Negro",
                "power_hp": 340,
                "doors": 5,
                "seats": 7,
                "trunk_volume": 650,
                "warranty_months": 24,
                "vehicle_type": "ocasion",
                "status": "available",
                "description": "BMW X5 en excelente estado, con todas las opciones de lujo.",
                "features": ["GPS", "Cuero", "Techo Solar", "Cámara Trasera"]
            }
            
            response = self.session.post(f"{self.base_url}/vehicles", json=vehicle_data)
            if response.status_code == 200:
                data = response.json()
                vehicle_id = data.get('id')
                if vehicle_id:
                    self.test_vehicle_id = vehicle_id  # Store for later tests
                    self.log_test("Create Vehicle", True, f"Created vehicle with ID: {vehicle_id}")
                    return True
                else:
                    self.log_test("Create Vehicle", False, "No vehicle ID in response", data)
                    return False
            else:
                self.log_test("Create Vehicle", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Create Vehicle", False, f"Error: {str(e)}")
            return False
    
    def test_get_specific_vehicle(self):
        """Test getting a specific vehicle by ID"""
        if not hasattr(self, 'test_vehicle_id'):
            self.log_test("Get Specific Vehicle", False, "No test vehicle ID available")
            return False
        
        try:
            response = self.session.get(f"{self.base_url}/vehicles/{self.test_vehicle_id}")
            if response.status_code == 200:
                data = response.json()
                if data.get('id') == self.test_vehicle_id:
                    self.log_test("Get Specific Vehicle", True, f"Retrieved vehicle: {data.get('brand')} {data.get('model')}")
                    return True
                else:
                    self.log_test("Get Specific Vehicle", False, "Vehicle ID mismatch", data)
                    return False
            else:
                self.log_test("Get Specific Vehicle", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Get Specific Vehicle", False, f"Error: {str(e)}")
            return False
    
    def test_update_vehicle(self):
        """Test updating a vehicle"""
        if not hasattr(self, 'test_vehicle_id'):
            self.log_test("Update Vehicle", False, "No test vehicle ID available")
            return False
        
        try:
            update_data = {
                "brand": "BMW",
                "model": "X5",
                "year": 2023,
                "price": 72000.0,  # Updated price
                "kilometers": 15000,
                "fuel_type": "Gasolina",
                "transmission": "Automático",
                "color": "Negro",
                "power_hp": 340,
                "doors": 5,
                "seats": 7,
                "trunk_volume": 650,
                "warranty_months": 24,
                "vehicle_type": "ocasion",
                "status": "available",
                "description": "BMW X5 en excelente estado - PRECIO ACTUALIZADO",
                "features": ["GPS", "Cuero", "Techo Solar", "Cámara Trasera", "Sistema de Sonido Premium"]
            }
            
            response = self.session.put(f"{self.base_url}/vehicles/{self.test_vehicle_id}", json=update_data)
            if response.status_code == 200:
                data = response.json()
                if data.get('price') == 72000.0:
                    self.log_test("Update Vehicle", True, f"Updated vehicle price to {data.get('price')}")
                    return True
                else:
                    self.log_test("Update Vehicle", False, "Price not updated correctly", data)
                    return False
            else:
                self.log_test("Update Vehicle", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Update Vehicle", False, f"Error: {str(e)}")
            return False
    
    def test_vehicle_filtering(self):
        """Test vehicle filtering and sorting"""
        try:
            # Test filtering by brand
            response = self.session.get(f"{self.base_url}/vehicles?brand=BMW&sort_by=price&sort_order=desc")
            if response.status_code == 200:
                data = response.json()
                self.log_test("Vehicle Filtering", True, f"Filtered vehicles: {len(data)} BMW vehicles found")
                return True
            else:
                self.log_test("Vehicle Filtering", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Vehicle Filtering", False, f"Error: {str(e)}")
            return False
    
    def test_create_news_article(self):
        """Test creating a news article"""
        try:
            news_data = {
                "title": "Nuevos Modelos BMW 2024",
                "content": "BMW presenta su nueva línea de vehículos para 2024 con tecnología avanzada y diseño renovado.",
                "excerpt": "Descubre los nuevos modelos BMW 2024",
                "published": True
            }
            
            response = self.session.post(f"{self.base_url}/news", json=news_data)
            if response.status_code == 200:
                data = response.json()
                self.test_news_id = data.get('id')
                self.log_test("Create News", True, f"Created news article: {data.get('title')}")
                return True
            else:
                self.log_test("Create News", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Create News", False, f"Error: {str(e)}")
            return False
    
    def test_get_news(self):
        """Test getting news articles"""
        try:
            response = self.session.get(f"{self.base_url}/news")
            if response.status_code == 200:
                data = response.json()
                self.log_test("Get News", True, f"Retrieved {len(data)} news articles")
                return True
            else:
                self.log_test("Get News", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Get News", False, f"Error: {str(e)}")
            return False
    
    def test_create_testimonial(self):
        """Test creating a testimonial"""
        try:
            testimonial_data = {
                "name": "Carlos Rodriguez",
                "content": "Excelente servicio y atención. Compré mi BMW X5 aquí y estoy muy satisfecho con la experiencia.",
                "rating": 5,
                "published": True
            }
            
            response = self.session.post(f"{self.base_url}/testimonials", json=testimonial_data)
            if response.status_code == 200:
                data = response.json()
                self.log_test("Create Testimonial", True, f"Created testimonial from: {data.get('name')}")
                return True
            else:
                self.log_test("Create Testimonial", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Create Testimonial", False, f"Error: {str(e)}")
            return False
    
    def test_get_testimonials(self):
        """Test getting testimonials"""
        try:
            response = self.session.get(f"{self.base_url}/testimonials")
            if response.status_code == 200:
                data = response.json()
                self.log_test("Get Testimonials", True, f"Retrieved {len(data)} testimonials")
                return True
            else:
                self.log_test("Get Testimonials", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Get Testimonials", False, f"Error: {str(e)}")
            return False
    
    def test_create_contact_message(self):
        """Test creating a contact message (public endpoint)"""
        try:
            # Remove auth header for public endpoint
            headers = self.session.headers.copy()
            if 'Authorization' in self.session.headers:
                del self.session.headers['Authorization']
            
            contact_data = {
                "name": "Maria Garcia",
                "email": "maria.garcia@email.com",
                "phone": "+34 666 777 888",
                "message": "Estoy interesada en el BMW X5. ¿Podrían contactarme para más información?",
                "message_type": "contact"
            }
            
            response = self.session.post(f"{self.base_url}/contact", json=contact_data)
            
            # Restore auth header
            self.session.headers.update(headers)
            
            if response.status_code == 200:
                data = response.json()
                self.log_test("Create Contact Message", True, f"Created contact message from: {data.get('name')}")
                return True
            else:
                self.log_test("Create Contact Message", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Create Contact Message", False, f"Error: {str(e)}")
            return False
    
    def test_get_contact_messages(self):
        """Test getting contact messages (admin only)"""
        try:
            response = self.session.get(f"{self.base_url}/contact")
            if response.status_code == 200:
                data = response.json()
                self.log_test("Get Contact Messages", True, f"Retrieved {len(data)} contact messages")
                return True
            else:
                self.log_test("Get Contact Messages", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Get Contact Messages", False, f"Error: {str(e)}")
            return False
    
    def test_get_stats(self):
        """Test getting dashboard stats"""
        try:
            response = self.session.get(f"{self.base_url}/stats")
            if response.status_code == 200:
                data = response.json()
                stats = {
                    'total_vehicles': data.get('total_vehicles', 0),
                    'available_vehicles': data.get('available_vehicles', 0),
                    'sold_vehicles': data.get('sold_vehicles', 0),
                    'total_messages': data.get('total_messages', 0)
                }
                self.log_test("Get Stats", True, f"Retrieved stats: {stats}")
                return True
            else:
                self.log_test("Get Stats", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Get Stats", False, f"Error: {str(e)}")
            return False
    
    def test_image_upload_simulation(self):
        """Test image upload endpoint (simulated - no actual file)"""
        if not hasattr(self, 'test_vehicle_id'):
            self.log_test("Image Upload", False, "No test vehicle ID available")
            return False
        
        try:
            # Test the endpoint structure (will fail without actual file, but we can check the error)
            response = self.session.post(f"{self.base_url}/vehicles/{self.test_vehicle_id}/images")
            
            # We expect this to fail with 422 (validation error) since we're not sending files
            if response.status_code == 422:
                self.log_test("Image Upload Endpoint", True, "Image upload endpoint is accessible (validation error expected without files)")
                return True
            else:
                self.log_test("Image Upload Endpoint", False, f"Unexpected response: HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Image Upload Endpoint", False, f"Error: {str(e)}")
            return False
    
    def test_unauthorized_access(self):
        """Test that protected endpoints require authentication"""
        try:
            # Remove auth header
            headers = self.session.headers.copy()
            if 'Authorization' in self.session.headers:
                del self.session.headers['Authorization']
            
            # Try to create a vehicle without auth
            vehicle_data = {"brand": "Test", "model": "Test", "year": 2023, "price": 1000}
            response = self.session.post(f"{self.base_url}/vehicles", json=vehicle_data)
            
            # Restore auth header
            self.session.headers.update(headers)
            
            if response.status_code == 401 or response.status_code == 403:
                self.log_test("Unauthorized Access Protection", True, "Protected endpoints properly require authentication")
                return True
            else:
                self.log_test("Unauthorized Access Protection", False, f"Expected 401/403, got {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Unauthorized Access Protection", False, f"Error: {str(e)}")
            return False
    
    def test_delete_vehicle(self):
        """Test deleting a vehicle (cleanup)"""
        if not hasattr(self, 'test_vehicle_id'):
            self.log_test("Delete Vehicle", False, "No test vehicle ID available")
            return False
        
        try:
            response = self.session.delete(f"{self.base_url}/vehicles/{self.test_vehicle_id}")
            if response.status_code == 200:
                data = response.json()
                self.log_test("Delete Vehicle", True, f"Deleted test vehicle: {data.get('message')}")
                return True
            else:
                self.log_test("Delete Vehicle", False, f"HTTP {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Delete Vehicle", False, f"Error: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting Ridauto Motor Backend API Tests")
        print(f"🔗 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Basic connectivity
        if not self.test_api_root():
            print("❌ API is not accessible. Stopping tests.")
            return False
        
        # Authentication flow
        self.test_init_admin()
        if not self.test_admin_login():
            print("❌ Authentication failed. Stopping tests.")
            return False
        
        self.test_get_current_user()
        
        # Vehicle management
        self.test_get_vehicles()
        self.test_create_vehicle()
        self.test_get_specific_vehicle()
        self.test_update_vehicle()
        self.test_vehicle_filtering()
        
        # Other endpoints
        self.test_create_news_article()
        self.test_get_news()
        self.test_create_testimonial()
        self.test_get_testimonials()
        self.test_create_contact_message()
        self.test_get_contact_messages()
        self.test_get_stats()
        
        # Image upload and security
        self.test_image_upload_simulation()
        self.test_unauthorized_access()
        
        # Cleanup
        self.test_delete_vehicle()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"✅ Passed: {passed}/{total}")
        print(f"❌ Failed: {total - passed}/{total}")
        
        if total - passed > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"   • {result['test']}: {result['message']}")
        
        return passed == total

if __name__ == "__main__":
    tester = RidautoAPITester()
    success = tester.run_all_tests()
    exit(0 if success else 1)