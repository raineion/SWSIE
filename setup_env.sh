#!/bin/bash

# Create and activate a virtual environment
echo "Setting up virtual environment..."
python -m venv venv
source venv/bin/activate

# Install required packages
echo "Installing required packages..."
pip install pandas dash plotly flask-login flask-limiter flask-wtf werkzeug cachetools

# Create assets directory
echo "Creating assets directory..."
mkdir -p assets

# Make the start script executable
chmod +x start.sh

echo "Environment setup complete!"
echo "Run ./start.sh to start the application"
