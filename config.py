"""
Configuration management for the SWSIE Dashboard application.
Loads environment variables from .env file using python-dotenv
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    # Core settings
    DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'
    PORT = int(os.getenv('PORT', 8050))
    HOST = os.getenv('HOST', '0.0.0.0')
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    DATABASE_PATH = os.getenv('DATABASE_PATH', 'engine_partners.db')
    
    # SWSIE colors
    SWSIE_COLORS = {
        'primary': '#1E8449',   # Forest green - main brand color
        'secondary': '#2471A3',  # Steel blue - secondary brand color
        'accent': '#F39C12',     # Desert gold - accent color
        'background': '#F5F9F8', # Light mint - background color
        'text': '#2C3E50',       # Dark slate - text color
        'light': '#ECF0F1',      # Soft gray - light elements
        'highlight': '#E74C3C',  # Terracotta - highlights/alerts
        'chart1': '#117A65',     # Deep teal
        'chart2': '#2980B9',     # Ocean blue
        'chart3': '#F1C40F',     # Sun yellow
        'chart4': '#D35400',     # Desert orange
        'chart5': '#8E44AD',     # Purple sage
    }
    
    # Add other settings as needed
    # These are inferred from main.py
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    LOG_FILE = os.getenv('LOG_FILE', 'app.log')
    RATE_LIMIT_DAY = int(os.getenv('RATE_LIMIT_DAY', 200))
    RATE_LIMIT_HOUR = int(os.getenv('RATE_LIMIT_HOUR', 50))
    SESSION_COOKIE_SECURE = os.getenv('SESSION_COOKIE_SECURE', 'True').lower() == 'true'
    SESSION_COOKIE_HTTPONLY = os.getenv('SESSION_COOKIE_HTTPONLY', 'True').lower() == 'true'
    SESSION_COOKIE_SAMESITE = 'Lax'
    CACHE_TTL = int(os.getenv('CACHE_TTL', 300))

# Create an instance of the Config class named active_config
active_config = Config()

# Also maintain 'config' for backward compatibility if needed
config = active_config
