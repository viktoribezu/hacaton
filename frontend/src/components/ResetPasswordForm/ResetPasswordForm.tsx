import { Button, Input, Typography } from "antd";
import { VStack } from "@/components/ui";
import { Link } from "react-router-dom";

interface ResetPasswordFormProps {
    classNames?: string;
}

export const ResetPasswordForm = (props: ResetPasswordFormProps) => {
    const { classNames } = props;

    return (
        <VStack className={classNames} align={"center"}>
            <Typography.Title>Восстановление пароля</Typography.Title>
            <Input size={"large"} type={"email"} placeholder={"Введите почту"} />
            <Button block type={"primary"}>Отправить</Button>
            <Link to={"/login"} style={{ width: "100%" }}>
                <Button block>Вернуться на страницу авторизации</Button>
            </Link>
        </VStack>
    );
};