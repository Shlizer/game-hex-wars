module.exports = [
    {
        mode: 'development',
        entry: './srv/index.js',
        target: 'electron-main',
        watch: true,
        devtool: "eval-source-map",
        // module: {
        //     rules: [{
        //         test: /\.(js|jsx)$/,
        //         include: [/src/, /srv/],
        //         loader: 'babel-loader'
        //     }]
        // },
        output: {
            path: __dirname + '/build',
            filename: 'bundle.js'
        },
        optimization: {
            nodeEnv: 'electron'
        },
        stats: {
            colors: false,
            chunks: false,
            children: false,
            modules: false
        }
    }
];