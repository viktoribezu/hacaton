import { Module } from "@/components/ui";
import { Table } from "antd";
import { managementAction } from "@/store/management";
import { useAppDispatch } from "@/utils/hooks";
import { ManagementObject } from "@/store/management";

const dataSource: ManagementObject[] = [
    {
        key: "1",
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
        cadastralNumber: "2",
        objectType: "Жилой дом",
        exploitationYear: "2023",
        condition: "Хорошее",
    },
    {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
        cadastralNumber: "2",
        objectType: "Жилой дом",
        exploitationYear: "2023",
        condition: "Хорошее",
    },
    {
        key: "3",
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
        cadastralNumber: "2",
        objectType: "Жилой дом",
        exploitationYear: "2023",
        condition: "Хорошее",
    },
    {
        key: "4",
        name: "John",
        age: 42,
        address: "10 Downing Street",
        cadastralNumber: "2",
        objectType: "Жилой дом",
        exploitationYear: "2023",
        condition: "Хорошее",
    },
    {
        key: "5",
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
        cadastralNumber: "2",
        objectType: "Жилой дом",
        exploitationYear: "2023",
        condition: "Хорошее",
    },
];

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