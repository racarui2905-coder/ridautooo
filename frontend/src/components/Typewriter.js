import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Typewriter = ({ 
  className = '',
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000
}) => {
  const { t } = useTranslation();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const words = t('hero.typewriter.words', { returnObjects: true });
  const prefix = t('hero.typewriter.prefix');

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => 
            prevIndex === words.length - 1 ? 0 : prevIndex + 1
          );
        }
      } else {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      }
    }, isPaused ? pauseTime : isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, currentWordIndex, isDeleting, isPaused, words, speed, deleteSpeed, pauseTime]);

  if (!words || words.length === 0) {
    return <span className={className}>familias</span>;
  }

  return (
    <span className={className}>
      {prefix} <span className="typewriter">{currentText}</span>
    </span>
  );
};

export default Typewriter;