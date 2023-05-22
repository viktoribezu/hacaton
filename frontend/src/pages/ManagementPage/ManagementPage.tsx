import { Space, Typography } from "antd";
import { ManagementFilterGroup, ManagementContentModule } from "@/components/Management";

const { Title } = Typography;

export const ManagementPage = () => {

    return (
        <>
            <Title level={2}>Управление</Title>
            <Space size={"middle"} direction={"vertical"} style={{ display: "flex" }}>
                <ManagementFilterGroup />
                <ManagementContentModule />
            </Space>
        </>
    );
};