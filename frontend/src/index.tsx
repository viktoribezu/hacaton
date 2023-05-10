import ReactDOM from "react-dom/client";
import { App } from "./App";
import { AntdProvider } from "@/services/providers";
import "antd/dist/reset.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <AntdProvider>
        <App />
    </AntdProvider>
);