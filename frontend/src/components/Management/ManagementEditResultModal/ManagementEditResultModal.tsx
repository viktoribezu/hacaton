import { ManagementObject } from "@/store/management";
import { Card, Cascader, DatePicker, Descriptions, Table } from "antd";
import dayjs from "dayjs";
import { DateFormat } from "@/utils/consts/Dates";
import "./ManagementEditResultModal.scss";
import { DefaultOptionType } from "antd/es/cascader";
import { HStack, VStack } from "@/components/ui";
import { selectedObjectMock, workSourceMock } from "../ManagementFilterGroup/mockData/objectCategoryMock";
import { objectRequestMock } from "@/components/Management/ManagementEditResultModal/mockData/mockData";

interface ManagementEditResultModalProps {
    selectedObject: ManagementObject | undefined;
}

const columns = [
    {
        title: "Вид работ",
        dataIndex: "problemType",
        key: "problemType",
    },
    {
        title: "Предполагаемая дата ремонта",
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
                options={workSourceMock}
                placeholder="Please select"
                showSearch={{ filter }}
                defaultValue={[value]}
            />
        )
    }
];

const problemsColumns = [
    {
        title: "Дата когда обращение пришло",
        dataIndex: "requestDate",
        key: "requestDate"
    },
    {
        title: "От какого сервиса пришло",
        dataIndex: "requestSource",
        key: "requestSource",
    },
    {
        title: "Описание причины обращения",
        dataIndex: "requestDescription",
        key: "requestDescription"
    },
    {
        title: "Статус",
        dataIndex: "status",
        key: "status"
    }
];

const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
        (option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );

export const ManagementEditResultModal = (props: ManagementEditResultModalProps) => {
    const { selectedObject } = props;


    return (
        <>
            <VStack max className={"edit__result-modal"}>
                <HStack gap={16}>
                    <Card size="small" title={"Дом по адресу Измайловский бульвар 47"}  style={{ width: 250 }}>
                        <Descriptions
                            column={1}
                        >
                            <Descriptions.Item label="Категория объекта">МКД</Descriptions.Item>
                            <Descriptions.Item label="Округ">Восточный</Descriptions.Item>
                            <Descriptions.Item label="Район">Московский</Descriptions.Item>
                            <Descriptions.Item label="Улица">Измайловский бульвар</Descriptions.Item>
                            <Descriptions.Item label="Дом">47</Descriptions.Item>
                            <Descriptions.Item label="Год постройки">1952</Descriptions.Item>
                            <Descriptions.Item label="Год реконструкции">-</Descriptions.Item>
                            <Descriptions.Item label="Кол-во этажей">5</Descriptions.Item>
                            <Descriptions.Item label="Аварийность">-</Descriptions.Item>
                            <Descriptions.Item label="UNOM">8625</Descriptions.Item>
                        </Descriptions>
                    </Card>
                    <VStack>
                        <Table
                            bordered
                            className={"management__result"}
                            dataSource={selectedObjectMock}
                            columns={columns}
                        />
                    </VStack>
                </HStack>
                <Table
                    dataSource={objectRequestMock}
                    bordered
                    columns={problemsColumns}
                />
            </VStack>
        </>
    );
};