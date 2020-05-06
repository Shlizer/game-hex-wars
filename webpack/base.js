const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
// import { dependencies as externals } from '../app/package.json'

module.exports = {
    // externals: [...Object.keys(externals || {})],

    resolve: {
        alias: {
            assets: path.resolve(__dirname, '../assets/')
        },
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        modules: [path.join(__dirname, '..', 'app'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        //     plugins: [
                        //         ['@babel/plugin-proposal-class-properties', { loose: true }],
                        //         ['@babel/plugin-transform-runtime', { regenerator: true }]
                        //     ]
                    }
                }],
            },
            {
                test: /\.s?css$/,
                exclude: [/node_modules/, /\.module\.scss$/],
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ]
            },
            {
                test: /\.scss$/,
                include: /\.module\.scss$/,
                exclude: [/node_modules/, /assets/],
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]-[hash:8]'
                            },
                            sourceMap: true
                        }
                    },
                    { loader: 'sass-loader' },
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin()
    ]
}

