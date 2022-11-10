import puppeteer from 'puppeteer';

const generatePDF = async (htmlString = '') => {
    let browser = null;

    try {
        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: {
                width: 1920,
                height: 1080,
            },
        });

        const page = await browser.newPage();
        await page.setContent(htmlString);

        const pdfString = await page.pdf();

        return pdfString;
    } catch (error) {
        console.log(error);
        throw error instanceof Error ? error.message : `Generate PDF Error`;
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
};

export default generatePDF;
