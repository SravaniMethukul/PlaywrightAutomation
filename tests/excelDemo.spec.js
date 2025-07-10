const { test, expect } = require('@playwright/test');
const Exceljs = require('exceljs');

//update banana price to 350
async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    });
    return output;
}

async function writeExcelTest(searchText, filePath, replaceText, change) {

    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Sheet1");
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}


//writeExcelTest("Mango", "C:/Users/methu/OneDrive/Testing_Files/downloadTest.xlsx", 300, { rowChange: 0, colChange: 2 });


test('Upload download excel validation', async ({ page }) => {

    const textSearch = "Mango";
    const updateValue = '350';

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    /*page.waitForEvent('download')	- Captures the file download event
     download.saveAs(path)	- Saves the file to a location where code can read/write
     ExcelJS or setInputFiles()	- Requires an actual file path — not a browser temp file*/

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator("#downloadButton").click(),
    ]);
    const downloadPath = 'C:/Users/methu/Downloads/download.xlsx';
    //Saves the file to a location where code can read/write
    await download.saveAs(downloadPath);

    await writeExcelTest("Mango", downloadPath, 350, { rowChange: 0, colChange: 2 });
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(downloadPath);

    const textLocator = page.getByText(textSearch);
    const desiredRow = page.getByRole("row").filter({ has: textLocator })
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

})




/*const workbook = new Exceljs.Workbook();
// to make the code work synchronous
workbook.xlsx.readFile("C:/Users/methu/Downloads/download.xlsx").then(function () {
    const worksheet = workbook.getWorksheet("Sheet1");
    worksheet.eachRow((row, rowNumber) => {
        console.log(`row Number: ${rowNumber}`);
        row.eachCell((cell, cellNumber) => {
            console.log(cell.value);
        })

    });
});*/



