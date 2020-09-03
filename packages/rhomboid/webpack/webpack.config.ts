import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import { Configuration, DefinePlugin } from 'webpack';

const packagePath = (relPath) => path.resolve(__dirname, '../', relPath);
const rootPath = (relPath) => path.resolve(__dirname, '../../..', relPath);

const webpackConfig: Configuration = {
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    entry: packagePath('src/app.tsx'),
    output: { path: packagePath('out/dist'), filename: 'bundle.js' },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Gainr',
            template: packagePath('src/app.html'),
        }),
        new DefinePlugin({
            API_BASE_URL: JSON.stringify('http://localhost:9002'),
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@pages': packagePath('src/view/pages'),
            '@components': packagePath('src/view/components'),
            '@utils': packagePath('src/utils'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [rootPath('node_modules'), packagePath('out')],
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },
                ],
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader', // compiles SASS to CSS
                        options: {
                            sassOptions: {
                                includePaths: [rootPath('node_modules')],
                            },
                        },
                    },
                ],
            },
        ],
    },
};

export default webpackConfig;
