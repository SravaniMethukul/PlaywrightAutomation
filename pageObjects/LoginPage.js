class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(userName, password) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInButton.click();
        this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage }