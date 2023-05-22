import { ReactNode } from "react";
import { ConfigProvider } from "antd";

interface AntdProviderProps {
    children: ReactNode;
}

export const AntdProvider = ({ children }: AntdProviderProps) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#2CA983",
                },
                components: {
                    Button: {
                        colorLink: "#2CA983",
                        colorLinkHover: "#2CA983"

                    }
                }
            }}
        >
            {children}
        </ConfigProvider>
    );
};