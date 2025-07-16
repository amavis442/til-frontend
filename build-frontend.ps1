Write-Host "🔧 Building frontend with npm (Windows)"

# Check if npm is installed
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Host "❌ Error: npm is not installed. Please install Node.js and npm first."
  exit 1
}

if (-Not (Test-Path "node_modules")) {
  npm install
}

npm run build