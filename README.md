# 🎭 Playwright Automation Framework

This project is a robust Playwright-based automation framework for end-to-end (E2E) testing of web and API layers. It follows modern best practices such as the Page Object Model, externalized test data, parallel execution, CI/CD integration, and advanced reporting.

---

## 📂 Project Structure

PlaywrightAutomation/
├── .github/                        # GitHub-specific workflows and configurations
│
├── allure-report/                 # Generated Allure reports (after test execution)
├── allure-results/                # Raw results for Allure reporting
│
├── pageObjects/                   # Page Object Models (POM) for web elements
│   ├── CartPage.js
│   ├── CheckOutDetailsPage.js
│   ├── DashboardPage.js
│   ├── LoginPage.js
│   ├── MyOrdersPage.js
│   ├── OrderDetailsPage.js
│   └── POManager.js
│
├── tests-examples/                # Experimental or reference test cases
│
├── tests/                         # Main test scripts
│   ├── Calendar.spec.js
│   ├── ClientApp.spec.js
│   ├── ClientAppOther.spec.js
│   ├── ClientAppPageObjectImplementation.spec.js
│   ├── MoreValidations.spec.js
│   ├── MoreValidations.spec.js-snapshots/   # Snapshot testing artifacts
│   ├── NetworkTest.spec.js
│   ├── NetworkTest2.spec.js
│   ├── UIBasicstest.spec.js
│   ├── WebApiPart1.spec.js
│   ├── WebApiPart2.spec.js
│   ├── excelDemo.spec.js
│   └── specialLocators.spec.js
│
├── utils/                         # Utility functions and test data
│   ├── APIUtils.js                # API helper class for test data setup/cleanup
│   ├── placeOrderTestData.json    # Test data file
│   └── test-base.js               # Base setup or custom fixtures
│
├── .gitignore                     # Specifies files to ignore in Git
├── package-lock.json              # Auto-generated dependency lock file
├── package.json                   # NPM config and test scripts
├── playwright.config.js           # Primary Playwright configuration
├── playwright.config1.js          # Alternate/experimental Playwright config
├── screenshot.png                 # Full-page screenshot (test artifact)
├── screenshotelement.png          # Element-level screenshot
└── state.json                     # Auth/session state storage



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
