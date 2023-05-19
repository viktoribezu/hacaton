import { Module } from "@/components/ui";
import { Table } from "antd";
import { useAppDispatch } from "@/utils/hooks";
import { ManagementObject, getObjectSourceData, managementAction } from "@/store/management";
import { useSelector } from "react-redux";

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

    const rowSelection = {
        onChange: (selectedRowsKeys: React.Key[], selectedRows: ManagementObject[]) => {
            dispatch(managementAction.setSelectedObject({ selectedRowsKeys, selectedRows }));
        }
    };


    return (
        <Module>
            <Table
                rowSelection={{ ...rowSelection }}
                columns={columns}
                dataSource={dataSource}
            />
        </Module>
    );
};