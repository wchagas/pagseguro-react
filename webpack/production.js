const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin")
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../lib'),
        filename: 'index.js',
		libraryTarget: 'umd'
    },

	mode: 'production',

	resolve: {
        extensions: ['.js', '.jsx'],
    },

	optimization: {
        minimizer: [new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            extractComments: true,
            terserOptions: {
                module: true,
                keep_classnames: false,
                keep_fnames: false
            }
        })]
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: [/fonts/],
                use: {
                    loader: 'url-loader',
                    options: {
                        name: "img/[name].[hash:5].[ext]",
                    },
                },
            },
        ]
    },
    plugins: [

		//new BundleAnalyzerPlugin(),

	    new webpack.optimize.AggressiveMergingPlugin(),

		new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),

		new CompressionPlugin({
            test: /\.js$/,
        }),

        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(false),
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
        }),

    ],

	externals: {
		"styled-components": {
            commonjs: 'styled-components',
            commonjs2: 'styled-components',
            amd: 'styled-components'
        },
        "react": {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react'
        },
        "react-dom": {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom'
        }
    },

}
