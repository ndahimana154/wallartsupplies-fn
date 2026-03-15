#!/bin/bash

cd /var/www/hanjji.com

echo "Pulling latest code..."
git pull origin develop

echo "Installing dependencies..."
npm install --legacy-peer-deps

echo"Create swap (if not exists)"
sudo swapon --show || sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile

echo"Reduce swappiness"
echo "vm.swappiness=10" | sudo tee -a /etc/sysctl.conf

sudo sysctl -p


echo "Building project..."
NODE_OPTIONS="--max-old-space-size=768" npm run build

echo "Restarting nginx..."
systemctl reload nginx

echo "Deployment finished!"