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

## Skills Stack

| Package      | Description                                                      |
| ------------ | ---------------------------------------------------------------- |
| React        | Frontend framework, Build the Html5 template                     |
| Tailwind CSS | CSS framework, Styling the React Component                       |
| Express      | Server Side Render Server, Do the React SSR                      |
| ejs          | Server Side Engine Template, Help to generate Html template      |
| puppeteer    | Headless Chrome Node.js API, Help to generate PDF file from Html |

## Implementation Detail

### Step1. Build the Fullstack Template : React + Express

這一整個產生 PDF 的服務是運作在 Node.js 之上的，<br>
這邊選用 Express 來進行實作，並且使用 [ejs](https://ejs.co/) 作為 Template Engine，<br>
在前端的部分則是使用 React，並搭配 react-dom 這個 package 來完成 SSR，<br>
分別在 Server Side 使用 `renderToString` 及 Client Side 使用 `hydrateRoot`，<br>
相關的實作細節在 Reference 中的 [這篇文章](https://nils-mehlhorn.de/posts/typescript-nodejs-react-ssr) 都寫得很詳盡 ，就不多著墨了<br>

### Step2. Styling the React Component

經由上方的實作，應該可以完成很基本的 React SSR 流程，<br>
接下來就是要為 React 建立樣式了，這邊選用 [Tailwind CSS](https://tailwindcss.com/) 來開發，<br>
實作上用最簡單的方式，因為我們使用 ejs 作為 Server Template Engine，<br>
因此直接在 Layout 的 template 引用 Tailwind CDN 快速導入，在官方文件也有相關敘述 ([Link](https://tailwindcss.com/docs/installation/play-cdn))

![](https://i.imgur.com/9d0hnva.png)

### Step3. Generate PDF file from React

這邊使用 [puppeteer](https://github.com/puppeteer/puppeteer) 這個 Node.js 的爬蟲工具來產生 PDF，<br>
在它的 example 中就有提到它能產生 PDF 及 Screenshot，<br>
實作方式也相當簡單，我這邊有包成一個 Function 來處理產 PDF 這個流程，<br>

![](https://i.imgur.com/aSltAmF.png)

原先是 Server 透過 `ReactDOMServer.renderToString` 來產生 Html5 String，<br>
並把它放到 ejs Template 中渲染，直接 Response 一個 Html 回給瀏覽器，<br>
而產生 PDF 這件事就是在 Response 之前運行上面產 PDF 的 function，<br>
再將 PDF 的結果 Response 給 需求端

![](https://i.imgur.com/z8QP2Hg.png)

### Step4. React Get the Server Side Request Data

因為整體服務的資料來源是放在另一個 API Server，<br>
會經由 API 的方式，透過 Request 送到 SSR Server 中，<br>
因此我們的 React Component 要能夠接收到來自 Server Side 的資料，<br>
這邊就透過 Server Side 的 `React.createElement` 第二個參數，<br>
經由 Props 傳入 Component 中進行畫面渲染<br>

![](https://i.imgur.com/EosSJc8.png)

## Reference

**React SSR**

-   [Server Side Rendering with React and Redux](https://www.udemy.com/course/server-side-rendering-with-react-and-redux/)
-   [Fullstack TypeScript: Node.js + React SSR](https://nils-mehlhorn.de/posts/typescript-nodejs-react-ssr)

**Html To PDF**

-   [How to Generate a PDF in Node.js with Puppeteer and JavaScript](https://cheatcode.co/tutorials/how-to-generate-a-pdf-in-node-js-with-puppeteer-and-javascript#creating-a-pdf-generator-function)
-   [Puppeteer HTML to PDF Generation with Node.js](https://blog.risingstack.com/pdf-from-html-node-js-puppeteer/)

**Styling**

-   [Style Component - Server Side Rendering](https://styled-components.com/docs/advanced#server-side-rendering)
