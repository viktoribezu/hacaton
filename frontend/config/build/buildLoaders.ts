import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import {buildBabelLoader} from "./loaders/buildBabelLoader";

export function buildLoaders(options: BuildOptions) {

    const fileLoader = {
        test: /(webp|jpe?g|gif)$/i,
        use: [
            'file-loader',
            'webp-loader'
        ]
    };

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const styleLoader = buildCssLoader(options.isDev);

    const codeBabelLoader = buildBabelLoader({ ...options, isTSX: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTSX: true });

    return [
        fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        styleLoader
    ];
}