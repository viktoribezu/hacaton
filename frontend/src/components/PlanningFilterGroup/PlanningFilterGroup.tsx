import { HStack, Module, SearchSelectInput } from "@/components/ui";
import { Button, DatePicker, Space } from "antd";

export const PlanningFilterGroup = () => {

    const onChangeFieldHandler = () => {
        console.log("change field value");
    };

    return (
        <Module>
            <HStack align={"center"} justify={"between"}>
                <Space size={"middle"} style={{ width: "100%" }}>
                    <SearchSelectInput
                        placeholder={"Вид работ"}
                        field={""}
                        onChangeField={onChangeFieldHandler}
                    />
                    <SearchSelectInput
                        placeholder={"Исполнитель"}
                        field={""}
                        onChangeField={onChangeFieldHandler}
                    />
                    <SearchSelectInput
                        placeholder={"Вид объекта"}
                        field={""}
                        onChangeField={onChangeFieldHandler}
                    />
                    <DatePicker
                        name={"startFixDate"}
                        onChange={onChangeFieldHandler}
                        placeholder={"Дата с"} />
                    <DatePicker
                        name={"startFixDate"}
                        onChange={onChangeFieldHandler}
                        placeholder={"Дата по"} />
                </Space>
                <Button type={"primary"}>Найти</Button>
            </HStack>
        </Module>
    );
};