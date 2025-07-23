#!/bin/bash
cd "$(dirname "$0")"

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Copy .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env from .env.example"
    echo "See .env for configuration options"
    cp .env.example .env
fi

# Build the project
npm run build
