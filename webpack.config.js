var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
    entry: './source/scripts/main.js',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'scripts/app.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/, 
                use: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader','sass-loader'],
                    publicPath: '/build/styles'
                })
            },
            {
                test: [/\.js$/, /\.es6$/, /\.json$/],
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/, 
                loader: "json"
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Demo',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            template: './source/index.html', // Load a custom template (ejs by default see the FAQ for details)
        }),
        new ExtractTextPlugin({
            filename: 'styles/style.css',
            disable: false,
            allChunks: true
        })
    ],
    watch: true
}