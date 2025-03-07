#!/bin/bash

# Check if we're in a virtual environment already
if [[ "$VIRTUAL_ENV" == "" ]]; then
    # Not in a virtual environment, activate it
    echo "Activating virtual environment..."
    if [ -d "venv" ]; then
        source venv/bin/activate
    else
        echo "Error: Virtual environment not found."
        echo "Please run setup_env.sh first to set up the environment."
        exit 1
    fi
fi

# Create assets directory if it doesn't exist
if [ ! -d "assets" ]; then
    mkdir -p assets
    echo "Created assets directory"
fi

# Run the application
echo "Starting SWSIE Partner Directory..."
python main.py
