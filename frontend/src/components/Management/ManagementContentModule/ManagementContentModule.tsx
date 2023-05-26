import {Tabs, TabsProps, Typography} from "antd";
import { ManagementTable } from "@/components/Management";
import { ManagementMap } from "@/components/Management/ManagementMap/ManagementMap";
import { Module } from "@/components/ui";
import {useSelector} from "react-redux";
import {getObjectInited} from "@/store/management/managementSelectors";
import cls from './ManagementContentModule.module.scss'
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
    const objectsInited = useSelector(getObjectInited);

    if (!objectsInited) {
        return (
            <Module className={cls.emptyContent}>
                <Typography.Title level={3}>Чтобы приступить к работе, запустите алгоритм</Typography.Title>
            </Module>
        )
    }

    return (
        <Module>
            <Tabs defaultActiveKey={"1"} items={items} />
        </Module>
    );
};