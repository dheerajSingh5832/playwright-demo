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
- ✅ **Google Sheets Export** - Auto-export results to spreadsheet
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
├── pages/                    # Page Object Model classes
│   ├── base.page.ts         # Base page with common methods
│   ├── login.page.ts        # Login page object
│   ├── home.page.ts         # Home page object
│   ├── cart.page.ts         # Cart page object
│   └── product.page.ts      # Product page object
├── tests/                   # Test specifications
│   ├── auth/               # Authentication tests
│   │   └── login.spec.ts   # Login test scenarios
│   ├── e2e/                # End-to-end tests
│   │   └── sauce-demo.spec.ts
│   └── api/                # API tests
│       └── sample-api.spec.ts
├── fixtures/               # Custom fixtures & test data
│   ├── custom-fixtures.ts  # Reusable test fixtures
│   └── test-data.ts        # Test data management
├── utils/                  # Utility functions
│   └── helpers.ts          # Helper methods
├── test-data/             # JSON test data files
│   ├── users.json
│   └── products.json
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Node.js dependencies
```

## 🧪 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test file
```bash
npx playwright test tests/auth/login.spec.ts
```

### Run with specific browser
```bash
npx playwright test --project=chromium  # or firefox, webkit
```

### Run in headed mode
```bash
npx playwright test --headed
```

### Run in debug mode
```bash
npx playwright test --debug
```

### Run tests in parallel
```bash
npx playwright test --workers=5
```

## 📊 Reports

### View HTML Report
```bash
npx playwright show-report
```

### Generate report after test run
```bash
npx playwright test --reporter=html
```

Reports will be generated in `playwright-report/`

### Google Sheets Export 📊

Test results are **automatically exported with beautiful formatting** to Google Sheets!

**Setup (one-time, 5 minutes):**
```bash
npm run sheets:check    # Run setup helper
```

1. Create Google Cloud service account at https://console.cloud.google.com
2. Enable Google Sheets API
3. Download JSON key as `google-credentials.json`
4. Share your spreadsheet with the service account email (Editor access)

**Your Spreadsheet:** https://docs.google.com/spreadsheets/d/1ybzVjsmrH7HFVgebsRocZbr2lnacmW6TWdc-8hWIKBs

**Features:**
- 🎨 Auto-creates formatted table with color-coded rows (🟢🟡🟠🔴 by pass rate)
- 📊 Tracks: Timestamp, Pass/Fail counts, Duration, Browser, Environment
- ✨ Highlights failed tests in bold red

## 🎯 Writing Tests

### Example Test

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Tests', () => {
  test('should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Test steps
    await loginPage.goto();
    await loginPage.login('user@example.com', 'password');
    
    // Assertions
    await expect(page).toHaveURL(/dashboard/);
  });
});
```

### Example Page Object

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class MyPage extends BasePage {
  readonly element: Locator;
  
  constructor(page: Page) {
    super(page);
    this.element = page.locator('#element-id');
  }
  
  async performAction(): Promise<void> {
    await this.element.click();
  }
}
```

## ⚙️ Configuration

Configuration is managed in `playwright.config.ts` and `.env` files:

- `playwright.config.ts` - Test runner configuration
- `.env` - Environment variables (BASE_URL, API keys, etc.)

The framework supports multiple environments through environment variables.

## 🔧 Supported Browsers

- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)

## 📝 Test Data

Test data is stored in JSON format under `src/test/resources/testdata/`

Access test data using:
```java
TestDataManager.getTestDataValue("users.jstest-data/`

Access test data using:
```typescript
import { testData } from '../fixtures/test-data';

const user = testData.users.validUser;
await loginPage.login(user.username, user.password
### View traces
Traces are saved in `target/traces/` after test execution.
```bash
npx playwright show-trace test-results/trace.zip
```

### Run with UI Mode
```bash
npx playwright test --ui
```

### Screenshots
Screenshots are automatically captured on test failure in `test-results/`

### Videos
Test execution videos are saved in `test-results/` when configured
## 🔄 CI/CD

The framework includes a GitHub Actions workflow (`.github/workflows/tests.yml`) for automatic test execution on:
- Push to main/develop branches
- Pull requests
- Scheduled runs

## 📚 Best Practices

1. **Use TypeScript types** - Leverage type safety for better reliability
3. **Use Playwright assertions** - Built-in expect() with auto-waiting
4. **Handle waits properly** - Use built-in Playwright waiting mechanisms
5. **Keep tests independent** - Each test should run standalone
6. **Use meaningful names** - Test and method names should be descriptive
7. **Use fixtures** - For reusable test setup and teardown be descriptive
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
npx playwright install
```

### Clear test cache
```bash
rm -rf test-results/ playwright-report/
```

### Update dependencies
```bash
npm update
mvn clean install -DskipTests
```

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Happy Testing! 🚀**
