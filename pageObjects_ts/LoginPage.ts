import { expect } from '@playwright/test';
import type { Locator, Page } from "@playwright/test";


export class LoginPage {
    page:Page;
    signInButton: Locator;
    userName: Locator;
    password: Locator;

    constructor(page :Page) {
        this.page = page;
        this.signInButton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(userName :string, password :string) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInButton.click();
        this.page.waitForLoadState('networkidle');
    }
}