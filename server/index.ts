import express, { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import React from "react";
import ReactDOMServer from "react-dom/server";
import HomePage from "../client/components/HomePage";
import { generatePDF } from "./lib/generatePDF";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", express.static(path.join(__dirname, "static")));

// Get client Site Bundle JS
const manifest = JSON.parse(
    fs.readFileSync(path.join(__dirname, "static/manifest.json"), "utf-8")
);
const clientBundleJS: string = manifest["client.js"];

app.get("/", async (req: Request, res: Response) => {
    const component = ReactDOMServer.renderToString(
        React.createElement(HomePage)
    );

    res.render("index", { component, clientBundleJS });
});

app.get("/pdf", async (req: Request, res: Response) => {
    const component = ReactDOMServer.renderToString(
        React.createElement(HomePage)
    );

    const pdf = await generatePDF(component);

    res.set("Content-Type", "application/pdf");
    res.send(pdf);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
