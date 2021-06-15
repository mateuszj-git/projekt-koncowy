var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        // path: __dirname + '/dist',
        // publicPath: '/',
    },
    mode: 'development', // none, development, production
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: './game.html', //relative to root of the application
            template: './src/index.html',
            title: "game"
        }),

    ],
    module: {
        rules: [
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            },
            // {
            //     test: /\.jsx?$/,
            //     loader: 'babel-loader',

            //     exclude: /node_modules/,
            //     query: {
            //         cacheDirectory: true,
            //     }
            // },
            {
                test: /.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(md2)$/i,
                type: 'asset/resource',
            },

        ]
    },

    devServer: {
        port: 8080
    },
};