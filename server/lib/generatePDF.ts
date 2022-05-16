import puppeteer from "puppeteer";

export const generatePDF = async (htmlString: string = "") => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setContent(htmlString);
    const pdfBuffer = await page.pdf();

    await page.close();
    await browser.close();

    return pdfBuffer;
};
