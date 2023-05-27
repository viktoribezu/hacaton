import { Modal, Table } from "antd";
import { useAppDispatch } from "@/utils/hooks";
import { getObjectSourceData, managementAction, ManagementObject } from "@/store/management";
import { useSelector } from "react-redux";
import { ManagementEditResultModal } from "@/components/Management/ManagementEditResultModal/ManagementEditResultModal";
import { useState } from "react";

const columns = [
    {
        title: "кадастровый номер",
        dataIndex: "cadastralNumber",
        key: "cadastralNumber",
    },
    {
        title: "Категория объекта",
        dataIndex: "col_103506",
        key: "col_103506",
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
        title: "Улица",
        dataIndex: "street",
        key: "street",
    },
    {
        title: "Дом",
        dataIndex: "house",
        key: "house"
    }
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
            >
                <ManagementEditResultModal
                    selectedObject={selectedEditableObject}
                />
            </Modal>
        </>
    );
};