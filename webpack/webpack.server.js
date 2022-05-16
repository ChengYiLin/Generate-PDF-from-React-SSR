const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    name: "server",
    mode: "production",
    target: "node",
    resolve: {
        extensions: [".tsx", ".ts"],
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
                loader: "ts-loader",
                options: {
                    configFile: "../tsconfig/tsconfig.server.json",
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
    ],
};
