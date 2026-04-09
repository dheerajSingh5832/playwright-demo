#!/bin/bash

echo "========================================="
echo "Playwright TypeScript Framework Setup"
echo "========================================="

# Check Node.js
echo "Checking Node.js version..."
node --version
if [ $? -ne 0 ]; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check npm
echo "Checking npm..."
npm --version
if [ $? -ne 0 ]; then
    echo "❌ npm is not installed."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies."
    exit 1
fi

# Install Playwright browsers
echo "Installing Playwright browsers..."
npx playwright install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install Playwright browsers."
    exit 1
fi

# Initialize Playwright agents
echo "Initializing Playwright AI agents..."
npm run init-agents
if [ $? -ne 0 ]; then
    echo "⚠️  Warning: Failed to initialize agents (requires VS Code 1.105+)"
fi

# Create .env from example
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo "========================================="
echo "✅ Setup completed successfully!"
echo "========================================="
echo ""
echo "You can now run tests using:"
echo "  npm test"
echo ""
echo "For AI-powered test generation:"
echo "  npm run init-agents  (if not done)"
echo "  Use @planner, @generator, @healer in VS Code"
echo ""
echo "View reports:"
echo "  npm run report"
echo ""
