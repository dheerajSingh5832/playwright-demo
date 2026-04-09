# Quick Start Guide - Playwright Agents

## 🎭 Using Playwright Test Agents in VS Code

Your framework is now configured with three AI agents for test automation:

### Agent Definitions Created

✅ **Planner** (`.github/agents/playwright-test-planner.agent.md`)
- Explores your application
- Creates structured test plans in markdown
- Saves to `specs/` directory

✅ **Generator** (`.github/agents/playwright-test-generator.agent.md`)
- Reads test plans from `specs/`
- Generates executable Playwright tests
- Verifies selectors and assertions live

✅ **Healer** (`.github/agents/playwright-test-healer.agent.md`)
- Automatically fixes failing tests
- Inspects UI to find equivalent elements
- Re-runs tests until passing

### MCP Configuration

The agents use the Model Context Protocol (MCP) server configuration created in `.vscode/mcp.json`.

### Setup GitHub Copilot (Optional)

For GitHub Copilot integration, add this to your settings:

**GitHub > Settings > Copilot > Coding agent > MCP configuration:**

```json
{
  "mcpServers": {
    "playwright-test": {
      "type": "stdio",
      "command": "npx",
      "args": ["playwright", "run-test-mcp-server"],
      "tools": ["*"]
    }
  }
}
```

## 🚀 How to Use the Agents

### 1. Create a Test Plan with Planner

**In VS Code Chat or Command Palette:**

```
@planner Create a plan for testing user login with valid and invalid credentials
```

**What happens:**
- Runs `tests/seed.spec.ts` for context
- Explores your application
- Creates `specs/login-scenarios.md` with detailed steps

### 2. Generate Tests with Generator

```
@generator Generate tests from specs/login-scenarios.md
```

**What happens:**
- Reads the markdown plan
- Verifies each selector exists
- Creates `tests/auth/login-scenarios.spec.ts`
- Adds proper assertions

### 3. Heal Failing Tests

```
@healer Fix the failing test: login with valid credentials
```

**What happens:**
- Replays the failing test
- Inspects current UI state
- Updates selectors or wait conditions
- Re-runs until passing or marks as skipped

## 📝 Example Workflow

### Step 1: Start with a seed test
The seed test (`tests/seed.spec.ts`) provides initial context for the agents.

### Step 2: Ask planner to create a plan
```
@planner Using the seed test, create a plan for:
1. User registration
2. Email verification
3. Profile completion
```

### Step 3: Review the generated plan
Check `specs/` directory for the markdown plan. Edit if needed.

### Step 4: Generate tests
```
@generator Implement all tests from specs/user-onboarding.md
```

### Step 5: Run and heal
```bash
npm test
```

If tests fail:
```
@healer Fix all failing tests in tests/auth/
```

## 💡 Tips for Best Results

1. **Be Specific**: "Create a plan for guest checkout with 3 items" works better than "test checkout"

2. **Provide Context**: Reference the seed test or existing pages
   ```
   @planner Using tests/seed.spec.ts and pages/login.page.ts, 
   create a plan for password reset flow
   ```

3. **Iterative Approach**: Start simple, then expand
   - First: Basic login
   - Then: Add 2FA, remember me, etc.

4. **Review Generated Code**: Agents are powerful but review their output

5. **Update Seed Test**: Keep `tests/seed.spec.ts` updated with latest fixtures and setup

## 🎯 Common Commands

```bash
# Run all tests
npm test

# Run in UI mode (recommended)
npm run test:ui

# Run specific test file
npx playwright test tests/auth/login.spec.ts

# Debug mode
npm run test:debug

# View test report
npm run report

# View trace
npx playwright show-trace test-results/traces/trace.zip
```

## 📚 Agent Prompts Examples

### Planner Prompts
```
@planner Explore the shopping cart and create a plan for:
- Adding items
- Updating quantities
- Applying discount codes
- Checkout process

@planner Create an API test plan for user CRUD operations

@planner Plan tests for responsive design on mobile viewports
```

### Generator Prompts
```
@generator Convert specs/shopping-cart.md to tests

@generator Generate API tests from specs/user-api-plan.md

@generator Create visual regression tests from specs/responsive-design.md
```

### Healer Prompts
```
@healer Fix the failing 'add to cart' test

@healer Repair all broken tests in tests/checkout/

@healer The login test fails with timeout - fix it
```

## 🔧 Customization

### Extend Page Objects
Add new pages in `pages/` directory:

```typescript
import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  // Your implementation
}
```

### Add Fixtures
Create custom fixtures in `fixtures/`:

```typescript
import { test as base } from '@playwright/test';

export const test = base.extend({
  myFixture: async ({ page }, use) => {
    // Setup
    await use(someValue);
    // Teardown
  },
});
```

### Configure Test Data
Update JSON files in `test-data/`:
- `users.json` - User credentials
- `products.json` - Product information

## 🐛 Troubleshooting

### Agents not responding
- Ensure VS Code is v1.105+
- Check `.vscode/mcp.json` exists
- Restart VS Code

### Tests failing
1. Run in headed mode: `npm run test:headed`
2. Use UI mode: `npm run test:ui`
3. Check trace: `npm run trace`
4. Ask healer: `@healer Fix failing tests`

### Selectors not working
- Use Playwright Inspector: `npx playwright codegen`
- Update page objects
- Let healer fix: `@healer Update selectors for X test`

## 📖 Next Steps

1. **Customize seed test** - Update `tests/seed.spec.ts` with your app setup
2. **Create base plans** - Use planner to create initial test coverage
3. **Generate tests** - Let generator create the test code
4. **Iterate and heal** - Run tests, fix issues, expand coverage
5. **Add CI/CD** - Tests run automatically on GitHub Actions

---

**Happy Testing with AI! 🎭🤖**
