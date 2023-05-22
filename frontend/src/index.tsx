import ReactDOM from "react-dom/client";
import { App } from "./App";
import { AntdProvider, StoreProvider } from "@/services/providers";
import "antd/dist/reset.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <StoreProvider>
        <BrowserRouter>
            <AntdProvider>
                <App />
            </AntdProvider>
        </BrowserRouter>
    </StoreProvider>
);