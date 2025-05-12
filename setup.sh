#!/bin/bash
set -e

# Check if running as root
if [ "$(id -u)" -ne 0 ]; then
    echo "Error: This script must be run as root"
    exit 1
fi

# Install required dependencies
echo "Installing required dependencies..."
apt-get update
apt-get install -y docker.io docker-compose git curl

# Enable and start Docker
systemctl enable docker
systemctl start docker

# Clone the repository if it doesn't exist
if [ ! -d "slipvault" ]; then
    echo "Cloning repository..."
    git clone https://github.com/BenSyne/slipvault.git
    cd slipvault
else
    echo "Repository already exists. Pulling latest changes..."
    cd slipvault
    git pull
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "Please edit the .env file with your configuration."
    echo "You'll need to set your API keys and blockchain configuration."
fi

# Create nginx directories
mkdir -p nginx/conf nginx/certbot/conf nginx/certbot/www

# Check if nginx configuration exists
if [ ! -f "nginx/conf/slipvault.conf" ]; then
    echo "Creating nginx configuration..."
    cp nginx/conf/slipvault.conf.example nginx/conf/slipvault.conf
    echo "Please edit nginx/conf/slipvault.conf with your domain name."
fi

# Build and start containers
echo "Building and starting containers..."
docker-compose up -d

echo "======================================"
echo "Setup completed!"
echo "To initialize SSL certificates, run:"
echo "bash init-letsencrypt.sh yourdomain.com"
echo "======================================" 