import { expect } from '@playwright/test';
import type { Locator, Page } from "@playwright/test";


export class CheckOutDetailsPage {
    page:Page;
    nameLocator: Locator;
    couponInput: Locator;
    submitButton: Locator;
    couponAppliedText: Locator;
    selectCountryDropdown: Locator;
    dropdownResults: Locator;
    userNameLabel: Locator;
    placeOrderButton: Locator;

    constructor(page :Page) {
        this.page = page;
        this.nameLocator = page.locator(".field", { hasText: 'Name on Card' });
        this.couponInput = page.locator("input[name='coupon']");
        this.submitButton = page.locator("button[type='submit']");
        this.couponAppliedText = page.locator("text= * Coupon Applied");
        this.selectCountryDropdown = page.locator("[placeholder*='Country']");
        this.dropdownResults = page.locator(".ta-results");
        this.userNameLabel = page.locator(".user__name label");
        this.placeOrderButton = page.locator(".actions a");
    }

    async paymentDetails(name : string, coupon: string) {
        await this.nameLocator.locator("input").fill(name);
        await this.couponInput.fill(coupon);
        await this.submitButton.click();
        await this.couponAppliedText.waitFor();
        const foundCouponApplied = this.couponAppliedText.isVisible();
        expect(foundCouponApplied).toBeTruthy();
    }

    async selectCountry(country :string, countryNameToSelect :string) {
        await this.selectCountryDropdown.pressSequentially(country);
        await this.dropdownResults.waitFor();

        const optionsCount = await this.dropdownResults.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            const countryName = await this.dropdownResults.locator("button").nth(i).textContent();
            if (countryName === countryNameToSelect) {
                await this.dropdownResults.locator("button").nth(i).click();
                break;
            }
        }
    }

    async userNameCheck(username :string) {
        await expect(this.userNameLabel).toHaveText(username)
    }

    async navigateToOrderDetailsPage() {
        await this.placeOrderButton.click();
    }
}