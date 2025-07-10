const { test, expect } = require('@playwright/test');

test("@web Calendar Handling", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const month = "6";
    const date = "26";
    const year = "2027";

    console.log("data to be selected: ${month}/${date}/${year}");

    const selectCalender = page.locator(".react-date-picker__inputGroup");
    const selectYear = page.locator(".react-calendar__navigation__label");
    const selectReqYear = page.locator("//button[contains(text(),'2021 – 2030')]");
    const selectMonth = page.locator(".react-calendar__year-view__months__month");
    //const selectDate = page.locator(`//abbr[text()='${date}']`);
    const selectDate = page.locator("//abbr[text()='" + date + "']");
    console.log(`//abbr[text()='${date}']`);


    const expectedList = [year, month, date];
    const formattedDate = `${expectedList[0]}-${expectedList[1].padStart(2, '0')}-${expectedList[2].padStart(2, '0')}`
    const actualDateSelected = page.locator(".react-date-picker__inputGroup input");

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await selectCalender.click();

    await selectYear.click();
    await selectYear.click();
    await selectYear.click();

    await selectReqYear.click();

    await page.getByText(year).click();

    await selectMonth.nth(Number(month) - 1).click();

    await selectDate.waitFor();
    await selectDate.nth(0).click();

    const inputs = await actualDateSelected.all()
    const value = await inputs[0].getAttribute("value");
    console.log(`value is : ${value}`);
    console.log(`formatted date is : ${formattedDate}`);
    expect(value).toEqual(formattedDate);
    console.log("Completed the test");
})