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
        title: "тип объекта",
        dataIndex: "objectType",
        key: "objectType",
    },
    {
        title: "год ввода в эксплуатацию",
        dataIndex: "exploitationYear",
        key: "exploitationYear",
    },
    {
        title: "состояние",
        dataIndex: "condition",
        key: "condition",
    },
    {
        title: "адрес",
        dataIndex: "address",
        key: "address",
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
                width={"auto"}
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