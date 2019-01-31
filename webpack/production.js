const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'index.js',
        //pathinfo: false,
        //library: 'pagseguro-react',
      	libraryTarget: 'commonjs',
        //umdNamedDefine: true
    },

	devtool: 'source-map',

	mode: 'production',

	resolve: {
        extensions: ['.js', '.jsx'],
    },

	optimization: {
       
	/*	
		splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                runtime: 'initial',
            }
        },
		
		splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial'
                }
            }
        },
		*/
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
        ]
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            useBuiltIns: 'usage',
                            modules: false,
                        }],
                        "react",
                    ],
                    plugins: [
						"babel-plugin-styled-components",
                        "transform-object-rest-spread",
                        "transform-class-properties",
                        ["transform-es2015-modules-commonjs", {
                            "allowTopLevelThis": true
                        }]                        
                    ]
                }
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

		new BundleAnalyzerPlugin(),

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

    externals: [nodeExternals()]
}
