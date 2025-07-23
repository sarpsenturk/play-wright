#!/bin/bash
cd "$(dirname "$0")"

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Build the project
npm run build
