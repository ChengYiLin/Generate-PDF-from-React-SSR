const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const { ProvidePlugin } = require("webpack");

module.exports = {
    name: "server",
    mode: "development",
    target: "node",
    resolve: {
        extensions: [".tsx", ".ts"],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.resolve(
                    __dirname,
                    "../tsconfig/tsconfig.server.json"
                ),
            }),
        ],
    },
    entry: {
        server: path.resolve(__dirname, "../server/index.ts"),
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/typescript",
                            "@babel/preset-react",
                            "@babel/preset-env",
                        ],
                        plugins: [
                            "@babel/transform-runtime",
                            [
                                "babel-plugin-styled-components",
                                {
                                    ssr: false,
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
    node: {
        __dirname: false,
    },
    externalsPresets: { node: true },
    externals: [nodeExternals()],
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    context: "server",
                    from: "views",
                    to: "views",
                },
            ],
        }),
        new ProvidePlugin({
            React: "react",
        }),
    ],
};
