const merge = require('webpack-merge')
const baseConfig = require('./base')
const webpack = require('webpack')
const path = require('path')
const { spawn } = require('child_process')

const port = 1212
const hostname = require("os").hostname()
const publicPath = `http://localhost:${port}/dist`

module.exports = merge.smart(baseConfig, {
    devtool: 'inline-source-map',
    mode: 'development',
    target: 'electron-renderer',
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://${hostname}:${port}/`,
        'webpack/hot/only-dev-server',
        require.resolve('../src/index.jsx')
    ],

    output: {
        publicPath: `http://localhost:${port}/dist/`,
        filename: 'renderer.dev.js'
    },
    resolve: {
        alias: {
            "@": path.join(__dirname, "../src"),
            'react-dom': '@hot-loader/react-dom'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),
    ],
    node: {
        __dirname: false,
        __filename: false
    },
    devServer: {
        port,
        publicPath,
        compress: true,
        noInfo: true,
        stats: 'errors-only',
        inline: true,
        lazy: false,
        hot: true,
        host: 'localhost',
        headers: { 'Access-Control-Allow-Origin': '*' },
        contentBase: path.join(__dirname, 'dist'),
        watchOptions: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 100
        },
        historyApiFallback: {
            verbose: true,
            disableDotRule: false
        },
        before() {
            console.log('Starting Main Process...');
            spawn('npm', ['run', 'dev-main'], {
                shell: true,
                env: process.env,
                stdio: 'inherit'
            })
                .on('close', code => process.exit(code))
                .on('error', spawnError => console.error(spawnError));
        }
    }
})

// module.exports = (env, options) => {
//     const webpackConfig = baseConfig(env, options);

//     return merge.smart(webpackConfig, {
//         watch: true,
//         devtool: "eval-source-map",
//         output: {
//             path: __dirname + '/build/',
//             publicPath: './',
//             filename: '[name].js'
//         },
//         optimization: {
//             nodeEnv: 'electron'
//         },
//         target: 'electron-renderer',
//         stats: {
//             colors: false,
//             chunks: false,
//             children: false,
//             modules: false
//         }
//     });
// };

