Write-Host "🚀 Starting frontend dev server (Windows)"

# Check if npm is installed
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Host "❌ Error: npm is not installed. Please install Node.js and npm first."
  exit 1
}

npm run dev