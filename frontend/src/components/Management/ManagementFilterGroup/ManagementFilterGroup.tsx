import { HStack, Module } from "@/components/ui";
import { Button, Checkbox, DatePicker, Input, Modal, Space } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { useAppDispatch } from "@/utils/hooks";
import { getSelectedRowsKeys, managementAction, ManagementObject } from "@/store/management";
import { exportData } from "@/utils/lib";
import { fetchManagementObjects } from "@/services/api/Management/FetchManagementObjects";
import {
    getManagementFilterGroupDistrict,
    getManagementFilterGroupFinishFixDate,
    getManagementFilterGroupObjectArea,
    getManagementFilterGroupSourceData,
    getManagementFilterGroupStartFixDate,
    getManagementFilterObjectCategory,
    getObjectIsLoading
} from "@/store/management";
import { Dayjs } from "dayjs";

export const ManagementFilterGroup = () => {
    const dispatch = useAppDispatch();
    
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const selectedRowsKeys = useSelector(getSelectedRowsKeys);
    const managementObjectsIsLoading = useSelector(getObjectIsLoading);
    const district = useSelector(getManagementFilterGroupDistrict);
    const objectArea = useSelector(getManagementFilterGroupObjectArea);
    const startFixDate = useSelector(getManagementFilterGroupStartFixDate);
    const finishFixDate = useSelector(getManagementFilterGroupFinishFixDate);
    const objectCategory = useSelector(getManagementFilterObjectCategory);
    const sourceData = useSelector(getManagementFilterGroupSourceData);

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

    const fetchManagementObjectsHandler = useCallback(() => {
        dispatch(fetchManagementObjects({
            objectCategory,
            district,
            objectArea,
            startFixDate,
            finishFixDate,
            sourceData
        }));
    }, [dispatch, district, finishFixDate, objectArea, objectCategory, sourceData, startFixDate]);

    const onChangeFilterHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(managementAction.updateFilterGroupField({ [name]: value }));
    }, [dispatch]);

    const onChangeDateFieldHandler = useCallback((fieldName: string) => (date: Dayjs | null, dateString: string) => {
        dispatch(managementAction.updateFilterGroupField({ [fieldName]: dateString }));
    }, [dispatch]);

    return (
        <>
            <Module>
                <Space size={"middle"} style={{ width: "100%" }} direction={"vertical"}>
                    <Space size={"large"}>
                        <Input
                            value={objectCategory}
                            name={"objectCategory"}
                            onChange={onChangeFilterHandler}
                            placeholder="Категория объекта" suffix={<SearchOutlined />}
                        />
                        <Input
                            value={sourceData}
                            name={"sourceData"}
                            onChange={onChangeFilterHandler}
                            placeholder="Источник данных" suffix={<SearchOutlined />} />
                        <Input
                            value={objectArea}
                            name={"objectArea"}
                            onChange={onChangeFilterHandler}
                            placeholder="Округ" suffix={<SearchOutlined />} />
                        <Button
                            loading={managementObjectsIsLoading}
                            type={"primary"}
                            onClick={fetchManagementObjectsHandler}
                        >
                            <span>Запустить</span>
                        </Button>
                    </Space>
                    <Space size={"large"}>
                        <DatePicker
                            name={"startFixDate"}
                            onChange={onChangeDateFieldHandler("startFixDate")}
                            placeholder={"Дата с"} />
                        <DatePicker
                            onChange={onChangeDateFieldHandler("finishFixDate")}
                            placeholder={"Дата по"} />
                        <Input
                            name={"district"}
                            value={district}
                            onChange={onChangeFilterHandler}
                            placeholder="Район" suffix={<SearchOutlined />} />
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