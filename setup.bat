@echo off
REM Playwright Test Framework Setup Script for Windows

echo =========================================
echo Playwright TypeScript Framework Setup
echo =========================================

REM Check Node.js version
echo Checking Node.js version...
node --version
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js 18 or higher.
    exit /b 1
)

REM Check npm
echo Checking npm...
npm --version
if %errorlevel% neq 0 (
    echo npm is not installed.
    exit /b 1
)

REM Install dependencies
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Failed to install dependencies.
    exit /b 1
)

REM Install Playwright browsers
echo Installing Playwright browsers...
call npx playwright install
if %errorlevel% neq 0 (
    echo Failed to install Playwright browsers.
    exit /b 1
)

REM Initialize Playwright agents
echo Initializing Playwright AI agents...
call npm run init-agents
if %errorlevel% neq 0 (
    echo Warning: Failed to initialize agents (requires VS Code 1.105+)
)

REM Create .env from example
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
)

echo =========================================
echo Setup completed successfully!
echo =========================================
echo.
echo You can now run tests using:
echo   npm test
echo.
echo For AI-powered test generation:
echo   Use @planner, @generator, @healer in VS Code
echo.
echo View reports:
echo   npm run report
echo.

pause
