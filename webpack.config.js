const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './test/run.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
     resolve: {
        extensions: ['.js'],
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: "/dist/",
        watchContentBase: true
    }
}