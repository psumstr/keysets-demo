const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
};

const commonConfig = {

    entry: {
        app: PATHS.app,
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React Template',
            template: './src/index.html',
            inject: true,
        }),
    ],
};

function productionConfig() {
    return commonConfig;
}

function developmentConfig() {
    const config = {
        devServer: {
            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,

            // Don't refresh if hot loading fails. If you want
            // refresh behavior, set hot: true instead.
            hotOnly: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env to allow customization.
            //
            // If you use Docker, Vagrant or Cloud9, set
            // host: options.host || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices
            // unlike default `localhost`.
            host: process.env.HOST, // Defaults to `localhost`
            port: process.env.PORT, // Defaults to 8080

            // Enable error/warning overlay
            overlay: {
                errors: true,
                warnings: true,
            },
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
        ],
    };

    return Object.assign(
        {},
        commonConfig,
        config,
        {
            plugins: commonConfig.plugins.concat(config.plugins),
        }
    );
}


module.exports = function(env) {
    if (env === 'production') {
        return productionConfig();
    }

    return developmentConfig();

};