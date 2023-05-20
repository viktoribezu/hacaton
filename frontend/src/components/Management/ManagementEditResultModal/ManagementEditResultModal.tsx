import { ManagementObject } from "@/store/management";
import { DatePicker, Table } from "antd";
import dayjs from "dayjs";
import { DateFormat } from "@/utils/consts/Dates";

interface ManagementEditResultModalProps {
    selectedObject?: ManagementObject;
}

const columns = [
    {
        title: "Причина ремонат",
        dataIndex: "problemType",
        key: "problemType",
    },
    {
        title: "Предполагаемая дата отказа",
        dataIndex: "breaking_date",
        key: "breaking_date",
        render: (value: string) => <DatePicker defaultValue={dayjs(value, DateFormat)}/>
    },
    {
        title: "Дата начала ремонта",
        dataIndex: "start_fix_date",
        key: "start_fix_date",
        render: (value: string) => <DatePicker defaultValue={dayjs(value, DateFormat)}/>
    },
    {
        title: "Дата окончания ремонта",
        dataIndex: "update_datefix_at",
        key: "update_datefix_at",
        render: (value: string) => <DatePicker defaultValue={dayjs(value, DateFormat)}/>
    },
    {
        title: "СТАТУС",
        dataIndex: "status_of_work",
        key: "status_of_work",
    },
    {
        title: "ИСПОЛНИТЕЛЬ",
        dataIndex: "executor",
        key: "executor",
    }
];

const selectedObjectMock = [
    {
        key: 1,
        problemType: "Mike",
        breaking_date: "2001.01.01",
        start_fix_date: "2001.01.01",
        update_datefix_at: "2001.01.01",
        status_of_work: "Жилой дом",
        executor: "2023",
    },
    {
        key: 2,
        problemType: "Mike",
        breaking_date: "2001.01.01",
        start_fix_date: "2001.01.01",
        update_datefix_at: "2001.01.01",
        status_of_work: "Жилой дом",
        executor: "2023",
    },
    {
        key: 3,
        problemType: "Mike",
        breaking_date: "2001.01.01",
        start_fix_date: "2001.01.01",
        update_datefix_at: "2001.01.01",
        status_of_work: "Жилой дом",
        executor: "2023",
    },
    {
        key: 4,
        problemType: "Mike",
        breaking_date: "2001.01.01",
        start_fix_date: "2001.01.01",
        update_datefix_at: "2001.01.01",
        status_of_work: "Жилой дом",
        executor: "2023",
    },
    {
        key: 5,
        problemType: "Mike",
        breaking_date: "2001.01.01",
        start_fix_date: "2001.01.01",
        update_datefix_at: "2001.01.01",
        status_of_work: "Жилой дом",
        executor: "2023",
    },
];

export const ManagementEditResultModal = (props: ManagementEditResultModalProps) => {
    const { selectedObject } = props;

    return (
        <>
            <Table
                dataSource={selectedObjectMock}
                columns={columns}
            />
        </>
    );
};