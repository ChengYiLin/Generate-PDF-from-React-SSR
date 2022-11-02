import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';

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
app.get('/page/:pdfTemplate', (req: Request, res: Response) => {
    res.send('The path parameter is : ' + req.params.pdfTemplate);
});

// For API
app.post('/api/pdf/:pdfTemplate', (req: Request, res: Response) => {
    res.send('The path parameter is : ' + req.params.pdfTemplate);
});

/**
 * Server activation
 */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.info(`[server]: Server is running at http://localhost:${PORT}`);
});
