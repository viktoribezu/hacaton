import { ManagementObject } from "@/store/management";
import { Card, Cascader, DatePicker, Descriptions, Space, Table, Typography } from "antd";
import dayjs from "dayjs";
import { DateFormat } from "@/utils/consts/Dates";
import "./ManagementEditResultModal.scss";
import { DefaultOptionType } from "antd/es/cascader";
import { CascaderOption } from "@/types/AntdTypes";
import { HStack, VStack } from "@/components/ui";

interface ManagementEditResultModalProps {
    selectedObject: ManagementObject | undefined;
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
            <HStack gap={16} className={"edit__result-modal"}>
                <Card size="small" title={selectedObject?.name}  style={{ width: 250 }}>
                    <Descriptions
                        column={1}
                    >
                        <Descriptions.Item label="Категория объекта">дом</Descriptions.Item>
                        <Descriptions.Item label="Округ">-</Descriptions.Item>
                        <Descriptions.Item label="Район">{selectedObject?.district}</Descriptions.Item>
                        <Descriptions.Item label="Улица">5</Descriptions.Item>
                        <Descriptions.Item label="Год постройки">2003</Descriptions.Item>
                        <Descriptions.Item label="UNOM">4359802</Descriptions.Item>
                    </Descriptions>
                </Card>
                <Table
                    bordered
                    className={"management__result"}
                    dataSource={selectedObjectMock}
                    columns={columns}
                />
            </HStack>
        </>
    );
};