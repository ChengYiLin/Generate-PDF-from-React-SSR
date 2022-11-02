const path = require('path');

module.exports = {
    mode: 'development',
    target: 'node',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};
