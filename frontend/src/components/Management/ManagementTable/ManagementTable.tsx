import { Button, Modal, Table } from "antd";
import { useAppDispatch } from "@/utils/hooks";
import { getObjectSourceData, managementAction, ManagementObject } from "@/store/management";
import { useSelector } from "react-redux";
import { ManagementEditResultModal } from "@/components/Management";
import { useCallback, useState } from "react";
import { exportData } from "@/utils/lib";

const columns = [
    {
        title: "UNOM",
        dataIndex: "UNOM",
        key: "UNOM",
    },
    {
        title: "Вид работ",
        dataIndex: "typeOfWork",
        key: "typeOfWork"
    },
    {
        title: "План. дата",
        dataIndex: "planDate",
        key: "planDate"
    },
    {
        title: "Округ",
        dataIndex: "adm_area",
        key: "adm_area",
    },
    {
        title: "Район",
        dataIndex: "district",
        key: "district",
    },
    {
        title: "Адрес",
        dataIndex: "address",
        key: "address",
    },
];

export const ManagementTable = () => {
    const dispatch = useAppDispatch();
    const dataSource = useSelector(getObjectSourceData);
    const [editResultModalVisible, setEditResultModalVisible] = useState<boolean>(false);
    const [selectedEditableObject, setSelectedEditableObject] = useState<ManagementObject | undefined>(undefined);

    const rowSelection = {
        onChange: (selectedRowsKeys: React.Key[], selectedRows: ManagementObject[]) => {
            dispatch(managementAction.setSelectedObject({ selectedRowsKeys, selectedRows }));
        }
    };

    const onRowClickHandler = (record: ManagementObject) => {
        setSelectedEditableObject(record);
        setEditResultModalVisible(true);
    };

    const downloadObjectCardHandler = useCallback(() => {
        fetch("/cardFile.xlsx").then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                const alink = document.createElement("a");
                alink.href = fileURL;
                alink.download = "Карточка объекта 8625";
                alink.click();
            });
        });


        // exportData<ManagementObject>("/objects", "Карточка для объекта 8625");
    }, []);

    return (
        <>
            <Table
                onRow={(record) => {
                    return {
                        onClick: () => onRowClickHandler(record)
                    };
                }}
                rowSelection={{ ...rowSelection }}
                columns={columns}
                dataSource={dataSource}
            />
            <Modal
                width={"fit-content"}
                onCancel={() => setEditResultModalVisible(false)}
                open={editResultModalVisible}
                footer={[
                    <Button onClick={downloadObjectCardHandler} key={"download"}>Скачать карточку</Button>,
                    <Button onClick={() => setEditResultModalVisible(false)} key={"exit"}>Закрыть</Button>,
                    <Button onClick={() => setEditResultModalVisible(false)} type={"primary"} key={"save"}>Сохранить</Button>
                ]}
            >
                <ManagementEditResultModal
                    selectedObject={selectedEditableObject}
                />
            </Modal>
        </>
    );
};