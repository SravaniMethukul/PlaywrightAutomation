# 🎭 Playwright Automation Framework

This project is a robust Playwright-based automation framework for end-to-end (E2E) testing of web and API layers. It follows modern best practices such as the Page Object Model, externalized test data, parallel execution, CI/CD integration, and advanced reporting.

---

## 📂 Project Structure

```
/PlaywrightAutomation
├── .github/                         # GitHub-specific workflows and configurations
├── allure-report/                  # Allure reports generated after test execution
├── allure-results/                 # Raw results for Allure reporting
│
├── pageObjects/                    # Page Object Model (POM) classes
│   ├── CartPage.js                 # Cart page interactions
│   ├── CheckOutDetailsPage.js     # Checkout details page
│   ├── DashboardPage.js           # Dashboard actions
│   ├── LoginPage.js               # Login flow page
│   ├── MyOrdersPage.js            # My orders view and validations
│   ├── OrderDetailsPage.js        # Order summary and status
│   └── POManager.js               # Page Object Manager to centralize POM handling
│
├── tests-examples/                 # Sample/reference test cases
│
├── tests/                          # Main Playwright test scripts
│   ├── Calendar.spec.js            # Calendar date picker validation
│   ├── ClientApp.spec.js           # Client-side UI flow
│   ├── ClientAppOther.spec.js      # Alternate UI test
│   ├── ClientAppPageObjectImplementation.spec.js  # POM-based test
│   ├── MoreValidations.spec.js     # Additional assertions
│   ├── MoreValidations.spec.js-snapshots/ # Snapshot artifacts
│   ├── NetworkTest.spec.js         # API request/response interception
│   ├── NetworkTest2.spec.js        # API mocking
│   ├── UIBasicstest.spec.js        # Basic UI elements test
│   ├── WebApiPart1.spec.js         # REST API test part 1
│   ├── WebApiPart2.spec.js         # REST API test part 2
│   ├── excelDemo.spec.js           # Data-driven tests using Excel
│   └── specialLocators.spec.js     # Testing advanced selectors
│
├── utils/                          # Utility functions and test data
│   ├── APIUtils.js                 # Helper for API calls (setup/teardown)
│   ├── placeOrderTestData.json     # Test data file (order details)
│   └── test-base.js                # Base setup and fixture logic
│
├── .gitignore                      # Files/folders to ignore in Git
├── package-lock.json               # Auto-generated dependency lock
├── package.json                    # NPM configuration & test scripts
├── playwright.config.js            # Main Playwright configuration
├── playwright.config1.js           # Alternate/experimental config
├── screenshot.png                  # Full-page screenshot (test artifact)
├── screenshotelement.png           # Specific element screenshot
└── state.json                      # Auth/session state for logged-in reuse
```

---

## ✅ Features

### 1. Page Object Model
Encapsulates page interactions for better test maintainability.  

### 2. API Utilities
Utility functions for test data setup and cleanup.

### 3. Drive Test Data from External Files
Supports `.json` formats for test data.  

### 4. Test Parameterization
Use Playwright's `test.describe()` and `test.each()` or custom fixtures to pass dynamic data.  

### 5. Cross-Browser Configuration
Defined in `playwright.config.js` for Chromium, Firefox, and WebKit.  

### 6. Test Retries
Built-in support for retrying failed tests.

### 7. Record Video of Test Execution
Enable `video: 'on'` or `retain-on-failure` in config to capture test videos.

### 8. Parallel Testing
Playwright runs tests in parallel using worker threads.  

### 9. Test Annotations
Use `test.skip()`, `test.only()`, `test.describe.serial()` for controlled test execution.

### 10. CLI Options
Run tests with filters, retries, tags, project-specific config:
```bash
npx playwright test --project=chromium --grep="@login"
```

### 11. In Jenkins to run the tests from script use
```
npm run regression
```
