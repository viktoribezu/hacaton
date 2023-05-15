import { ReactElement, useState } from "react";
import { Layout } from "antd";
import { Sidebar } from "@/components/Sidebar/Sidebar";

const { Content } = Layout;

interface MainLayoutProps {
    content: ReactElement;
}

export const MainLayout = (props: MainLayoutProps) => {
    const { content } = props;
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className={"main__layout"} style={{ minHeight: "100vh" }}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200 }}>
                <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                    {content}
                </Content>
            </Layout>
        </Layout>
    );
};