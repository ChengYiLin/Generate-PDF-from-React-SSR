const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

module.exports = {
    name: "client",
    mode: "production",
    target: "web",
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.resolve(
                    __dirname,
                    "../tsconfig/tsconfig.client.json"
                ),
            }),
        ],
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
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/typescript",
                            "@babel/preset-react",
                            "@babel/preset-env",
                        ],
                    },
                },
            },
        ],
    },
    plugins: [new CleanWebpackPlugin(), new WebpackManifestPlugin()],
};
