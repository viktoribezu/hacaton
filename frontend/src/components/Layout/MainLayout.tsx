import { ReactElement } from "react";
import { Layout } from "antd";
import { Sidebar } from "@/components/Sidebar/Sidebar";

const { Content } = Layout;

interface MainLayoutProps {
    content: ReactElement;
}

export const MainLayout = (props: MainLayoutProps) => {
    const { content } = props;

    return (
        <Layout className={"main__layout"} style={{ minHeight: "100vh" }}>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                    {content}
                </Content>
            </Layout>
        </Layout>
    );
};