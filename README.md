# Playwright Test Automation Framework (TypeScript)

A comprehensive test automation framework using **Playwright with TypeScript**, featuring **AI-powered test agents** (🎭 planner, 🎭 generator, 🎭 healer) for intelligent test creation and maintenance.

## 🤖 Playwright Test Agents

This framework includes three AI agents:

- **🎭 Planner** - Explores your app and creates test plans
- **🎭 Generator** - Transforms plans into executable tests
- **🎭 Healer** - Auto-fixes failing tests

## 🚀 Features

- ✅ **Playwright** - Fast, reliable end-to-end testing
- ✅ **TypeScript** - Type-safe test automation
- ✅ **AI Test Agents** - Automated test planning, generation & healing
- ✅ **Page Object Model** - Maintainable test architecture
- ✅ **Custom Fixtures** - Reusable test components
- ✅ **API Testing** - Built-in REST API support
- ✅ **Multi-Browser** - Chromium, Firefox, WebKit
- ✅ **Allure Reports** - Beautiful test reporting
- ✅ **CI/CD Ready** - GitHub Actions included
- ✅ **Test Data Management** - JSON-based data handling

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- VS Code v1.105+ (for agent experience)

## 🛠️ Setup

### 1. Install Dependencies

```bash
cd ~/Desktop/playwright-framework
npm install
```

### 2. Install Playwright Browsers

```bash
npx playwright install
```

### 3. Initialize Playwright Agents

```bash
npm run init-agents
```

This generates agent definitions in `.github/` for use with AI assistants.

### 4. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

## 📁 Project Structure

```
playwright-framework/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/automation/
│   │           ├── core/              # Core framework components
│   │           │   ├── BrowserFactory.java
│   │           │   ├── BasePage.java
│   │           │   └── ConfigManager.java
│   │           └── utils/             # Utility classes
│   │               ├── TestDataManager.java
│   │               └── WaitHelper.java
│   └── test/
│       ├── java/
│       │   └── com/automation/
│       │       ├── base/              # Base test class
│       │       │   └── BaseTest.java
│       │       ├── pages/             # Page Object classes
│       │       │   ├── LoginPage.java
│       │       │   └── HomePage.java
│       │       └── tests/             # Test classes
│       │           ├── LoginTest.java
│       │           └── SampleApiTest.java
│       └── resources/
│           ├── config/                # Environment configurations
│           │   ├── application.properties
│           │   ├── qa.properties
│           │   └── staging.properties
│           ├── testdata/              # Test data files
│           │   ├── users.json
│           │   └── products.json
│           ├── testng.xml             # TestNG suite configuration
│           └── logback.xml            # Logging configuration
├── pom.xml                            # Maven dependencies
└── README.md
```

## 🧪 Running Tests

### Run all tests
```bash
mvn clean test
```

### Run specific test class
```bash
mvn clean test -Dtest=LoginTest
```

### Run with specific browser
```bash
mvn clean test -Dbrowser=chromium  # or firefox, webkit
```

### Run in headed mode
```bash
mvn clean test -Dheadless=false
```

### Run with specific environment
```bash
mvn clean test -Denv=qa  # or staging
```

### Run tests in parallel
```bash
mvn clean test -DthreadCount=5
```

## 📊 Reports

### Generate Allure Report
```bash
mvn allure:serve
```

### Generate Allure Report (without opening)
```bash
mvn allure:report
```

Reports will be generated in `target/allure-results/`

## 🎯 Writing Tests

### Example Test Class

```java
@Epic("Feature Name")
@Feature("Functionality")
public class MyTest extends BaseTest {
    
    @Test(description = "Test description")
    @Severity(SeverityLevel.CRITICAL)
    public void testSomething() {
        MyPage myPage = new MyPage(page);
        
        // Test steps
        myPage.navigateToPage("https://example.com");
        myPage.performAction();
        
        // Assertions
        assertThat(myPage.getResult()).isEqualTo("Expected");
    }
}
```

### Example Page Object

```java
public class MyPage extends BasePage {
    
    private static final String ELEMENT = "#element-id";
    
    public MyPage(Page page) {
        super(page);
    }
    
    @Step("Perform action")
    public void performAction() {
        click(ELEMENT);
    }
}
```

## ⚙️ Configuration

Configuration files are located in `src/test/resources/config/`:

- `application.properties` - Default configuration
- `qa.properties` - QA environment
- `staging.properties` - Staging environment

Switch environments using:
```bash
mvn clean test -Denv=qa
```

## 🔧 Supported Browsers

- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)

## 📝 Test Data

Test data is stored in JSON format under `src/test/resources/testdata/`

Access test data using:
```java
TestDataManager.getTestDataValue("users.json", "validUser.username");
```

## 🐛 Debugging

### View traces
Traces are saved in `target/traces/` after test execution.

To view:
```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="show-trace target/traces/trace.zip"
```

### Screenshots
Screenshots are automatically captured on test failure in `target/screenshots/`

### Videos
Test execution videos are saved in `target/videos/`

## 🔄 CI/CD

The framework includes a GitHub Actions workflow (`.github/workflows/tests.yml`) for automatic test execution on:
- Push to main/develop branches
- Pull requests
- Scheduled runs

## 📚 Best Practices

1. **Use Page Object Model** - Keep page locators and actions in page classes
2. **Add @Step annotations** - For better Allure reporting
3. **Use AssertJ** - For fluent and readable assertions
4. **Handle waits properly** - Use built-in Playwright waiting mechanisms
5. **Keep tests independent** - Each test should run standalone
6. **Use meaningful names** - Test and method names should be descriptive
7. **Add proper logging** - Use SLF4J logger for debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Browsers not installed
```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

### Clean build
```bash
mvn clean install -U
```

### Skip tests during build
```bash
mvn clean install -DskipTests
```

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Happy Testing! 🚀**
