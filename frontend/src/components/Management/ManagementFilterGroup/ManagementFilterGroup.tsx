import { Module } from "@/components/ui";
import { Button, Checkbox, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getSelectedRowsKeys } from "@/store/management/managementSelectors";

export const ManagementFilterGroup = () => {

    const selectedRowsKeys = useSelector(getSelectedRowsKeys);

    return (
        <>
            <Module>
                <Space size={"middle"} direction={"vertical"}>
                    <Space size={"large"}>
                        <Input placeholder="Тип строения" suffix={<SearchOutlined />} />
                        <Input placeholder="Адрес" suffix={<SearchOutlined />} />
                        <Input placeholder="Состояние" suffix={<SearchOutlined />} />
                        <Button type={"primary"}>
                            <span>Найти</span>
                        </Button>
                    </Space>
                    <Space size={"large"}>
                        <Input placeholder="Важность проблемы" suffix={<SearchOutlined />} />
                        <Input placeholder="Поиск" suffix={<SearchOutlined />} />
                        <Input placeholder="Поиск" suffix={<SearchOutlined />} />
                        <Button disabled={!selectedRowsKeys.length}>Удалить</Button>
                    </Space>
                    <Space size={"large"}>
                        <Checkbox>Все</Checkbox>
                        <Checkbox>В статусе ожидания</Checkbox>
                        <Checkbox>Запланированные</Checkbox>
                        <Checkbox>Сделанные</Checkbox>
                    </Space>
                </Space>
            </Module>
        </>
    );
};