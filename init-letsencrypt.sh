#!/bin/bash
set -e

# Check domain argument
if [ $# -lt 1 ]; then
    echo "Usage: $0 yourdomain.com [your-email@example.com]"
    exit 1
fi

domain=$1
email=${2:-"admin@$domain"}
staging=${3:-0} # Set to 1 for testing certificates

echo "Initializing Let's Encrypt for domain: $domain"
echo "Email: $email"
echo "Staging: $staging (0 for production, 1 for testing)"

# Create required directories
mkdir -p nginx/certbot/conf/live/$domain
mkdir -p nginx/certbot/www

# Update Nginx configuration with the domain
sed -i "s/example.com/$domain/g" nginx/conf/slipvault.conf
cp nginx/conf/slipvault.conf nginx/conf/slipvault.conf.example

# Create dummy certificates
echo "Creating dummy certificates..."
openssl req -x509 -nodes -newkey rsa:4096 -days 1 \
  -keyout nginx/certbot/conf/live/$domain/privkey.pem \
  -out nginx/certbot/conf/live/$domain/fullchain.pem \
  -subj "/CN=$domain" || {
  echo "Error: Failed to create dummy certificates"
  exit 1
}

echo "Reloading nginx configuration..."
docker-compose restart nginx

# Request real certificates
echo "Requesting real certificates from Let's Encrypt..."
if [ "$staging" = "1" ]; then
  staging_arg="--staging"
else
  staging_arg=""
fi

docker-compose run --rm certbot certonly \
  --webroot -w /var/www/certbot \
  --email $email \
  -d $domain \
  --rsa-key-size 4096 \
  --agree-tos \
  --force-renewal \
  --no-eff-email \
  $staging_arg || {
  echo "Error: Failed to request certificates"
  exit 1
}

echo "Reloading nginx configuration..."
docker-compose restart nginx

echo "======================================"
echo "SSL certificate setup completed for $domain!"
echo "You should now be able to access your site securely at https://$domain"
echo "======================================" 