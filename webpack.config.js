const path = require('path');
const { HotModuleReplacementPlugin, IgnorePlugin, DefinePlugin } = require('webpack');
const { VuetifyLoaderPlugin } = require('vuetify-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const fs = require('fs')
const chalk = require('chalk')
const mri = require('mri')

const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

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

const config = {
    mode: env,
    entry: path.join(__dirname, `src`, `main.js`),
    output: {
        filename: '[name].[fullhash].js',
        publicPath: baseHref,
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        port: 8080,
        open: true,
        // hotOnly: true,
        compress: true,
        historyApiFallback: true
    },
    watchOptions: {
        ignored: /node_modules/
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist/**/*")],
        }),
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
            template: './public/index.html'
        }),
        new IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
        new HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
        new VuetifyLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: __dirname + '/assets',
                    to: __dirname + '/dist/assets',
                    noErrorOnMissing: true
                }
            ]
        }),
        new ESLintPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                use: 'eslint-loader',
                enforce: 'pre'
            },
            //Babel uses runtime to avoid injecting unnecessary code
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        // cacheDirectory: true,
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            ['import', {
                                "libraryName": "antd",
                                "style": true,   // or 'css'
                            }, 'antd']
                        ]
                    }
                }],
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            //Specify the specific TS compilation configuration to distinguish the TS configuration of the script
                            configFile: path.resolve(__dirname, './tsconfig.json'),
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    'primary-color': '#4608e2',
                                    'link-color': '#4608e2',
                                    'border-radius-base': '20px',
                                },
                                javascriptEnabled: true,
                            }
                        }
                    }],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: 'file-loader?name=[name].[ext]',
            },
            // this will apply to both plain `.scss` files
            // AND `<style lang="scss">` blocks in `.vue` files
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
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
    devtool: isDev ? 'inline-source-map': false,
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            config$: configPath,
            logger$: path.resolve(__dirname, 'src/interfaces/consoleLogger.js'),
        }
    },
};


module.exports = () => {
    console.log (`Loading`);
    return config;
}
