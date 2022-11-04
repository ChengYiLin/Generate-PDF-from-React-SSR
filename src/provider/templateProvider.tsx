import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Example, { IExampleProps } from '../template/Example';

/**
 * Get the Component Html String
 * @returns html string for the Page
 */
function getTemplateHtmlString(component: JSX.Element): string {
    const sheet = new ServerStyleSheet();

    const componentHtmlString = renderToString(sheet.collectStyles(component));
    const styleString = sheet.getStyleTags();

    sheet.seal();

    const htmlString = `
        <html>
            <head>
                ${styleString}
            </head>
            <body>
                ${componentHtmlString}
            </body>
        </html>
    `;

    return htmlString;
}

function getRenderedTemplate(requestedPage: string, requestData: any): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            switch (requestedPage) {
                case 'example':
                    resolve(getTemplateHtmlString(<Example {...(requestData as IExampleProps)} />));

                default:
                    throw new Error('There is no matched template. Please check your request Path');
            }
        } catch (error) {
            error instanceof Error
                ? reject(error)
                : reject(new Error(`Unexpected error happened in getRenderedTemplate function : ${error}`));
        }
    });
}

export default getRenderedTemplate;
