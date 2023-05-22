import { HStack, Module } from "@/components/ui";
import { Button, Checkbox, Input, Modal, Space } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { useAppDispatch } from "@/utils/hooks";
import { getSelectedRowsKeys, managementAction, ManagementObject } from "@/store/management";
import { exportData } from "@/utils/lib/exportData/exportData";

export const ManagementFilterGroup = () => {
    const dispatch = useAppDispatch();
    
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const selectedRowsKeys = useSelector(getSelectedRowsKeys);

    const deleteClickHandler = useCallback(() => {
        setIsOpenDeleteModal(true);
    }, []);

    const onConfirmHandler = useCallback(() => {
        // TODO: Запрос на удаление объекта
        setConfirmLoading(true);
        setTimeout(() => {
            dispatch(managementAction.deleteObjects());
            setIsOpenDeleteModal(false);
            setConfirmLoading(false);
        }, 2000);
    }, [dispatch]);

    return (
        <>
            <Module>
                <Space size={"middle"} style={{ width: "100%" }} direction={"vertical"}>
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
                        <Button onClick={deleteClickHandler} disabled={!selectedRowsKeys.length}>Удалить</Button>
                    </Space>
                    <HStack max justify={"between"}>
                        <Space size={"large"}>
                            <Checkbox>Все</Checkbox>
                            <Checkbox>В статусе ожидания</Checkbox>
                            <Checkbox>Запланированные</Checkbox>
                            <Checkbox>Сделанные</Checkbox>
                        </Space>
                        <Button
                            icon={<DownloadOutlined />}
                            onClick={() => exportData<ManagementObject>("/objects")}
                        >
                            Скачать все
                        </Button>
                    </HStack>
                </Space>
            </Module>
            <Modal
                title={"Подтверждение удаления"}
                open={isOpenDeleteModal}
                confirmLoading={confirmLoading}
                onCancel={() => setIsOpenDeleteModal(false)}
                onOk={onConfirmHandler}
            >
                <p>Вы действительно хотите удалить объект?</p>
            </Modal>
        </>
    );
};