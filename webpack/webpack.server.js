const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    name: "server",
    mode: "production",
    target: "node",
    resolve: {
        extensions: [".tsx", ".ts"],
    },
    entry: {
        server: "./server/index.ts",
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "..", "dist"),
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
};
