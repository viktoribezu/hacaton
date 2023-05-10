import { BuildOptions } from "./types/config";

export function buildResolvers(options: BuildOptions) {

    return {
        extensions: [".tsx", ".ts", ".js"],
        preferAbsolute: true,
        modules: [options.paths.src, "node_modules"],
        mainFiles: ["index"],
        alias: {
            "@": options.paths.src,
        }
    };
}