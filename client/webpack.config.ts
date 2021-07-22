import * as path from "path";
import * as webpack from "webpack";
import HtmlWebPackPlugin from "html-webpack-plugin";

const config: webpack.Configuration =  {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist/client"),
        filename: "client.bundle.js",
    },
    resolve: {
        modules: ["node_modules"],
        alias: {
            react: path.join(__dirname, "node_modules", "react"),
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                }
            },
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/i,
                // order matters here
                use: [
                    "style-loader", "css-loader"
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
        }),
    ],
};

export default config;