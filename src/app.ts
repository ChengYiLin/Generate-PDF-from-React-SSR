import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import getRenderedTemplate from './provider/templateProvider';
import generatePDF from './provider/pdfProvider';

const app: Express = express();

/**
 * App Configuration
 */
app.use(bodyParser.json());
app.use(express.static('public'));

/**
 * App Route Setting
 */

// For Web (Develop in Local)
app.get('/page/:pdfTemplate', async (req: Request, res: Response) => {
    const requestTemplate = req.params.pdfTemplate;
    const requestBody = req.body;

    const htmlString = await getRenderedTemplate(requestTemplate, requestBody);

    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(htmlString);
});

// For API
app.post('/api/pdf/:pdfTemplate', async (req: Request, res: Response) => {
    const requestTemplate = req.params.pdfTemplate;
    const requestBody = req.body;

    const htmlString = await getRenderedTemplate(requestTemplate, requestBody);
    const pdf = await generatePDF(htmlString);

    res.set('Content-Type', 'application/pdf');
    res.send(pdf);
});

/**
 * Server activation
 */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.info(`[server]: Server is running at http://localhost:${PORT}`);
});
