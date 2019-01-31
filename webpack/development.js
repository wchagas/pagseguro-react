const path = require("path");
const webpack = require('webpack');

module.exports = {
    
	entry: [
        path.resolve(__dirname, '../example/index.js')
    ],

    devtool: 'inline-source-map',

    mode: 'development',
    
	resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'pagseguro-react': path.resolve(__dirname, '../src/')
        }
    },
	
	output: {
		filename: 'index.js',
		sourceMapFilename: '[file].map',
		publicPath: 'http://localhost:9090/assets'
	},

    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
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
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
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
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                exclude: [/img/],
                use: {
                    loader: 'url-loader',
                    options: {
                        name: "fonts/[name].[hash:5].[ext]",
                    },
                },
            },
            {
                test: /\.(pdf)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "/pdf/[name].[ext]",
                    },
                },
            },
            {
                test: /\.(ico)(\?.*)?$/,
                exclude: [/img/],
                use: {
                    loader: 'url-loader',
                    options: {
                        name: "[name].[ext]",
                    },
                },
            }
        ]
    },
   
	devServer: {
        inline: true,
		host: 'localhost',
		port: 9090,
		contentBase: path.join(__dirname, '../example'),
		historyApiFallback: {
			index: 'index.html'
		}
	},

    plugins: [
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(true),
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]

}
