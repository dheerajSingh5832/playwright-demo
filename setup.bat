@echo off
REM Playwright Test Framework Setup Script for Windows

echo =========================================
echo Playwright Framework Setup
echo =========================================

REM Check Java version
echo Checking Java version...
java -version
if %errorlevel% neq 0 (
    echo Java is not installed. Please install Java 17 or higher.
    exit /b 1
)

REM Check Maven
echo Checking Maven...
mvn -version
if %errorlevel% neq 0 (
    echo Maven is not installed. Please install Maven 3.6 or higher.
    exit /b 1
)

REM Clean and install dependencies
echo Installing dependencies...
call mvn clean install -DskipTests
if %errorlevel% neq 0 (
    echo Failed to install dependencies.
    exit /b 1
)

REM Install Playwright browsers
echo Installing Playwright browsers...
call mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
if %errorlevel% neq 0 (
    echo Failed to install Playwright browsers.
    exit /b 1
)

echo =========================================
echo Setup completed successfully!
echo =========================================
echo.
echo You can now run tests using:
echo   mvn clean test
echo.
echo To generate Allure report:
echo   mvn allure:serve
echo.

pause
