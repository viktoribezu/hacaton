import { Space, Typography } from "antd";
import { PlanningFilterGroup } from "@/components/PlanningFilterGroup/PlanningFilterGroup";
import PlanningImage from "@/assets/images/image.png";
import { Module } from "@/components/ui";

const { Title } = Typography;

export const PlanningPage = () => {
    return (
        <>
            <Title level={2}>Планирование</Title>
            <Space size={"middle"} direction={"vertical"} style={{ display: "flex" }}>
                <PlanningFilterGroup />
                <Module>
                    <img src={PlanningImage} alt="planning" />
                </Module>
            </Space>
        </>
    );
};