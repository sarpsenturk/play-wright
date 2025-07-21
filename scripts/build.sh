#!/bin/bash

# Install dependencies
pnpm install

# Generate Prisma client
pnpm exec prisma generate

# Build the project
pnpm build