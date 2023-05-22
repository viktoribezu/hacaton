import { ManagementObject } from "@/store/management";
import { Cascader, DatePicker, Table } from "antd";
import dayjs from "dayjs";
import { DateFormat } from "@/utils/consts/Dates";
import "./ManagementEditResultModal.scss";
import { DefaultOptionType } from "antd/es/cascader";
import { CascaderOption } from "@/types/AntdTypes";

interface ManagementEditResultModalProps {
    selectedObject?: ManagementObject;
}

const options: CascaderOption[] = [
    {
        value: "zhejiang",
        label: "Zhejiang",
    },
    {
        value: "jiangsu",
        label: "Jiangsu",
    },
];

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
        render: (value: string) => (
            <Cascader
                options={options}
                placeholder="Please select"
                showSearch={{ filter }}
                defaultValue={[value]}
            />
        )
    }
];

const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
        (option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );

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
        executor: "Zhejiang",
    },
];

export const ManagementEditResultModal = (props: ManagementEditResultModalProps) => {
    const { selectedObject } = props;

    return (
        <>
            <Table
                className={"management__result"}
                dataSource={selectedObjectMock}
                columns={columns}
            />
        </>
    );
};