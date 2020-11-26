const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
          chunks: 'all',
        },
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }

    return config;
}

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true,
            },
        },
        'css-loader',
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders;
}

module.exports = {
    // context: path.resolve(__dirname, 'English-for-kids'),
    mode: 'development',
    entry: {
        main: './js/index.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'English-for-kids')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 3000,
        open: true,
        hot: isDev
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    devtool: 'eval-source-map',
    module: {
        rules: [
            //Loading CSS
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            //Loading SCSS
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader'),
            },
            // Loading Image
            {
                test: /\.jpe?g$|\.gif$|\.png|\.ico|\.svg$/,
                use: ['file-loader']
            },
            //Loading font
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/,
                use: ['file-loader']
            },
            // Loader babel
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env']
                    },
                }
            }
        ],
    }
}