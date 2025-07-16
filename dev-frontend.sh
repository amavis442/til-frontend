#!/bin/bash
set -e
echo "🚀 Starting frontend dev server (Linux/macOS)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
  echo "❌ Error: npm is not installed. Please install Node.js and npm first."
  exit 1
fi

npm run dev