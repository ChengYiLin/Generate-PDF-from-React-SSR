const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = {
    name: "client",
    mode: "production",
    target: "web",
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    entry: {
        client: path.resolve(__dirname, "../client/index.tsx"),
    },
    output: {
        path: path.resolve(__dirname, "../dist/static"),
        filename: "[name].[contenthash].js",
        publicPath: "",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    configFile: "../tsconfig/tsconfig.client.json",
                },
            },
        ],
    },
    plugins: [new CleanWebpackPlugin(), new WebpackManifestPlugin()],
};
