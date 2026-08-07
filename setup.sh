#!/bin/bash

echo "Setting up BlogPlatform..."

# Start MongoDB only if no cloud URI is configured
echo "Checking MongoDB status..."
if [ -f backend/.env ]; then
  set -a
  source backend/.env
  set +a
fi

if [ -n "$MONGODB_URI" ]; then
  echo "MONGODB_URI is configured; skipping local mongod startup."
else
  if pgrep mongod > /dev/null; then
    echo "MongoDB is already running"
  else
    echo "Starting MongoDB..."
    mongod --config /etc/mongod.conf --fork > /dev/null
    if [ $? -eq 0 ]; then
      echo "MongoDB started successfully"
    else
      echo "Warning: Could not start MongoDB. Please ensure MongoDB is installed and configured."
    fi
  fi
fi

# Install dependencies
echo "Installing dependencies..."
npm install

cd backend
npm install

cd ../frontend
npm install

cd ..

# Seed the database
echo "Seeding database..."
cd backend
node utils/seed.js

echo "Setup complete!"
echo ""
echo "To start the application, run:"
echo "  npm start"
echo ""