const webpack = require('webpack')
const path = require(`path`)
const fs = require('fs')
const chalk = require('chalk')
const mri = require('mri')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');

const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'
const isProd = env === 'production'

const publishConfig = mri(process.argv.slice(2))['publish-config'] || true
const target = (publishConfig === true) ? env : publishConfig;

const configPath = path.resolve(__dirname, `config/${target}.js`)
if (fs.existsSync(configPath)) {
    console.log(chalk.black.bgBlue('INFO') + ' Using ' + chalk.magenta(target) + ' configuration.')
} else {
    console.log(chalk.black.bgYellow('WARN') + ' Config file not found for ' + chalk.magenta(target) + ', aborting.')
    process.exit()
}

const baseHref = require(configPath).baseHref || '/';
console.log(chalk.black.bgBlue('INFO') + ' baseHref:', baseHref)

const version = require(path.resolve(__dirname, 'package.json')).version
console.log(chalk.black.bgBlue('INFO') + ' version:', version)

module.exports = {
    mode: env,
    entry: path.join(__dirname, `src`, `main.js`),
    output: {
        publicPath: isDev ? `/` : baseHref,
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            // this will apply to both plain `.js` files
            // AND `<script>` blocks in `.vue` files
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            // this will apply to both plain `.css` files
            // AND `<style>` blocks in `.vue` files
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ],
            },
            // this will apply to both plain `.scss` files
            // AND `<style lang="scss">` blocks in `.vue` files
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // options: {
                        //     // you can also read from a file, e.g. `variables.scss`
                        //     data: `$color: red;`
                        // }
                    }
                ]
            },
        ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
            // filename: path.join(__dirname, `dist`, `index.html`),
            inject: true,
            // minify: minify ? {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeAttributeQuotes: true,
            //     // More options:
            //     // https://github.com/kangax/html-minifier#options-quick-reference
            // } : false,
        }),
        new BaseHrefWebpackPlugin({
            baseHref
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(version),
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        // prevents Content-Security-Policy header (that blocks links to subroutes)
        historyApiFallback: true,
    },
    resolve: {
        alias: {
            config$: configPath,
            logger$: path.resolve(__dirname, 'src/interfaces/consoleLogger.js'),
        }
    }
};

if (isProd) {
    module.exports.output.filename = '[name].[hash].js'
}
