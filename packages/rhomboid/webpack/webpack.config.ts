import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import { Configuration } from 'webpack';

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
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
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
