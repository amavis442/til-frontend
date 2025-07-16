# Makefile
ifeq ($(OS),Windows_NT)
	BUILD_FRONTEND = powershell -ExecutionPolicy Bypass -File build-frontend.ps1
	DEV_FRONTEND = powershell -ExecutionPolicy Bypass -File dev-frontend.ps1
else
	BUILD_FRONTEND = ./build-frontend.sh
	DEV_FRONTEND = ./dev-frontend.sh
endif

build:
	$(BUILD_FRONTEND)

dev:
	$(DEV_FRONTEND)

all: build build-server run

build-server:
	go build -o ./cmd/serve-frontend ./cmd/serve-frontend/main.go

run:
	go run ./cmd/serve-frontend


check:
	@echo "🔍 Checking required tools..."
	@command -v go >/dev/null 2>&1 || { echo "❌ Go is not installed."; exit 1; }
	@command -v npm >/dev/null 2>&1 || { echo "❌ npm is not installed."; exit 1; }
	@command -v node >/dev/null 2>&1 || { echo "❌ Node.js is not installed."; exit 1; }
	@echo "✅ All required tools are installed."

.PHONY: all build build-server run check
