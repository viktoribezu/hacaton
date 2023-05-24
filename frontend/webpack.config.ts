import path from "path";
import webpack from "webpack";
import { BuildEnv, BuildPath } from "./config/build/types/config";
import { BuildWebpackConfig } from "./config/build/buildWebpackConfig";

export default (env: BuildEnv) => {
    console.log(env, process.env);
    const paths: BuildPath = {
        entry: path.resolve(__dirname, "src", "index.tsx"),
        build: path.resolve(__dirname, "build"),
        html: path.resolve(__dirname, "public", "index.html"),
        src: path.resolve(__dirname, "src")
    };

    const mode = env.mode || "development";
    const isDev = mode === "development";
    const apiUrl = env.apiUrl || "http://127.0.0.1:8000/api/";

    const PORT = env.port || 3000;

    const config: webpack.Configuration = BuildWebpackConfig({
        mode,
        paths,
        isDev,
        apiUrl,
        PORT,
    });

    return config;
};