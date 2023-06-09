import { HStack, Module, SearchSelectInput } from "@/components/ui";
import { Button, DatePicker, Modal, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { useAppDispatch } from "@/utils/hooks";
import {
    getManagementFilterGroupDistrict,
    getManagementFilterGroupFinishFixDate,
    getManagementFilterGroupObjectArea,
    getManagementFilterGroupSourceData,
    getManagementFilterGroupStartFixDate,
    getManagementFilterObjectCategory,
    getObjectIsLoading,
    getSelectedRowsKeys,
    managementAction,
    ManagementObject
} from "@/store/management";
import { exportData } from "@/utils/lib";
import { fetchManagementObjects } from "@/services/api/Management/FetchManagementObjects";
import { Dayjs } from "dayjs";
import {
    objectAreaMock,
    objectCategoryMock,
    objectRepairTypeMock,
    objectSourceData
} from "./mockData/objectCategoryMock";
import { getManagementSourceDataIsHas } from "@/store/management/managementSelectors";

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
    const isObjectSourceData = useSelector(getManagementSourceDataIsHas);

    const deleteClickHandler = useCallback(() => {
        setIsOpenDeleteModal(true);
    }, []);

    const onConfirmHandler = useCallback(() => {
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

    const onChangeFilterHandler = useCallback((value: string, field: string) => {

        dispatch(managementAction.updateFilterGroupField({ [field]: value }));
    }, [dispatch]);

    const onChangeDateFieldHandler = useCallback((fieldName: string) => (date: Dayjs | null, dateString: string) => {
        dispatch(managementAction.updateFilterGroupField({ [fieldName]: dateString }));
    }, [dispatch]);

    return (
        <>
            <Module>
                <Space size={"middle"} style={{ width: "100%" }} direction={"vertical"}>
                    <HStack gap={8}>
                        <SearchSelectInput
                            onChangeField={onChangeFilterHandler}
                            field={"col_103506"}
                            placeholder={"Категория объекта"}
                            options={objectCategoryMock}
                        />
                        <SearchSelectInput
                            onChangeField={onChangeFilterHandler}
                            field={"col_103506"}
                            placeholder={"Источник данных"}
                            options={objectSourceData}
                        />
                        <SearchSelectInput
                            onChangeField={onChangeFilterHandler}
                            field={"adm_area"}
                            placeholder={"Округ"}
                            options={objectAreaMock}
                        />
                        <SearchSelectInput
                            onChangeField={onChangeFilterHandler}
                            field={"district"}
                            placeholder={"Район"}
                        />
                        <SearchSelectInput
                            onChangeField={onChangeFilterHandler}
                            field={"street"}
                            placeholder={"Улица"}
                        />
                        <Button
                            loading={managementObjectsIsLoading}
                            type={"primary"}
                            onClick={fetchManagementObjectsHandler}
                        >
                            <span>Запустить</span>
                        </Button>
                    </HStack>
                    <HStack>
                        <SearchSelectInput
                            onChangeField={onChangeFilterHandler}
                            field={"col_782"}
                            placeholder={"Вид работ"}
                            options={objectRepairTypeMock}
                        />
                        <DatePicker
                            style={{ width: "100%", flex: "1 1 0" }}
                            name={"startFixDate"}
                            onChange={onChangeDateFieldHandler("startFixDate")}
                            placeholder={"Дата с"} />
                        <DatePicker
                            style={{ width: "100%", flex: "1 1 0" }}
                            onChange={onChangeDateFieldHandler("finishFixDate")}
                            placeholder={"Дата по"} />
                        <SearchSelectInput
                            onChangeField={onChangeFilterHandler}
                            field={"house"}
                            placeholder={"Адрес"}
                        />
                        <Button onClick={deleteClickHandler} disabled={!selectedRowsKeys.length}>Удалить</Button>
                    </HStack>
                    <HStack max justify={"between"}>
                        <Button
                            icon={<DownloadOutlined />}
                            disabled={!isObjectSourceData}
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