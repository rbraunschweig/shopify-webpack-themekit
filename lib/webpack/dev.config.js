const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('../paths').config;
const development = process.env.NODE_ENV !== 'production';
const HtmlWebpackIncludeLiquidStylesPlugin = require('../utilities/html-webpack-include-chunks');
// Parts
const core = require('./parts/core');
const css = require('./parts/css');
const scss = require('./parts/scss');

module.exports = merge([
    core,
    scss,
    css,
    {
        mode: 'development',
        devtool: '#eval-source-map',
        plugins: [

            new webpack.DefinePlugin({
                'process.env': {NODE_ENV: '"development"'},
            }),

            new webpack.HotModuleReplacementPlugin(),

            new HtmlWebpackPlugin({
                excludeChunks: ['static'],
                filename: paths.theme.dist.snippets + '/script-tags.liquid',
                template: './lib/script-tags.html',
                inject: false,
                minify: {
                    removeComments: true,
                    removeAttributeQuotes: false,
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                },
                isDevServer: development,
                liquidTemplates: paths.liquidTemplates,
                liquidLayouts: paths.liquidLayouts,
            }),

            new HtmlWebpackPlugin({
                excludeChunks: ['static'],
                filename: paths.theme.dist.snippets + '/style-tags.liquid',
                template: './lib/style-tags.html',
                inject: false,
                minify: {
                    removeComments: true,
                    removeAttributeQuotes: false,
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                },
                isDevServer: development,
                liquidTemplates: paths.liquidTemplates,
                liquidLayouts: paths.liquidLayouts,
            }),

            new HtmlWebpackIncludeLiquidStylesPlugin(),
        ],
    }
])