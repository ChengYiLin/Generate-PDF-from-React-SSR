# Generate PDF from React SSR

## Introduction

當我們在電商購買商品，無論是哪一種物流配送方式，<br>
商家都需要填一張託運單黏貼在寄件物上，這樣在運送過程中才知道它要送去哪裡，<br>
通常在商家的後台都會有功能可以批次列印這些託運單 (如下方使用黑貓的示意圖)，<br>
上面會有固定的樣板，且在欄位上都會帶入對應的寄件人、寄件地址等相關資訊，<br>
那麼有沒有想過這是怎麼做到的呢？<br>

![託運單範例](https://i.imgur.com/Rov0aUh.png)

我們公司這邊過去是使用 RDLC 這套工具來產生這些託運單，<br>
但就我這邊接受到的其他工程師反饋，似乎在排版上會遇到一些困難，<br>
在開發及維護上都會是一個成本，因此決定要汰換這個做法。<br>
在 Server 端，有找到一個套件來產生 PDF ([ironpdf](https://ironpdf.com/))，<br>
但這需要 Frontend 來協助刻 Html 樣板，另外很重要的一點，這還需要錢買授權～<br>

剛好最近在研究 React Server Side Render，<br>
於是想說有沒有使用 React 來產生 PDF 的可能性呢？<br>
於是產生下圖這個初步的構想及流程 :<br>

1. User 在頁面按下按鈕發送 Request 到我們的 API Server
2. API Server 會撈取相關的寄件資訊，再透過 API 的方式送到 SSR Server
3. 將 Request 的寄件資料傳送到 React Component 中，並透過 SSR 方式產生對應的 Html 結構
4. 使用 NodeJS 的免費套件，將 html 轉換為 PDF
5. 直接將產生的 PDF 回傳給 API Server，再交給 API Server 傳遞給 User

![React SSR](https://i.imgur.com/ko2l6Zo.png)

## Reference

**React SSR**

-   [Server Side Rendering with React and Redux](https://www.udemy.com/course/server-side-rendering-with-react-and-redux/)
-   [Fullstack TypeScript: Node.js + React SSR](https://nils-mehlhorn.de/posts/typescript-nodejs-react-ssr)

**Html To PDF**

-   [How to Generate a PDF in Node.js with Puppeteer and JavaScript](https://cheatcode.co/tutorials/how-to-generate-a-pdf-in-node-js-with-puppeteer-and-javascript#creating-a-pdf-generator-function)
-   [Puppeteer HTML to PDF Generation with Node.js](https://blog.risingstack.com/pdf-from-html-node-js-puppeteer/)

**Styling**

-   [Style Component - Server Side Rendering](https://styled-components.com/docs/advanced#server-side-rendering)
