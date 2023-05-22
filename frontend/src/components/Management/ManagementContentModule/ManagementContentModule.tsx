import { Tabs, TabsProps } from "antd";
import { ManagementTable } from "@/components/Management";
import { ManagementMap } from "@/components/Management/ManagementMap/ManagementMap";
import { Module } from "@/components/ui";

const items: TabsProps["items"] = [
    {
        key: "1",
        label: "Списком",
        children: <ManagementTable />,
    },
    {
        key: "2",
        label: "На карте",
        children: <ManagementMap />
    },
];

export const ManagementContentModule = () => {

    return (
        <Module>
            <Tabs defaultActiveKey={"1"} items={items} />
        </Module>
    );
};