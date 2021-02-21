'use strict';

const path = require('path');


module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './client.js'),
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname),
        filename: './public/client.js'
    },
    module: {
        rules: [{
            test: /\.jsx$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react', '@babel/preset-env']
            }
        }]
    }
};
