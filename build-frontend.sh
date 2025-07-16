#!/bin/bash

# Exit on error
set -e

echo "🔧 Building frontend with npm (Linux/macOS)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
  echo "❌ Error: npm is not installed. Please install Node.js and npm first."
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

npm run build