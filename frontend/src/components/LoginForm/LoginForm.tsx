import { classNames } from "@/utils/lib";
import cls from "./LoginForm.module.scss";
import { useCallback } from "react";
import { Button, Form, Input, Typography } from "antd";
import { HStack } from "@/components/ui/Stack/HStack/HStack";

const { Text } = Typography;

interface LoginFormProps {
    className?: string
}

export const LoginForm = ({ className }: LoginFormProps) => {

    const onFinishHandler = useCallback((values: any) => {
        console.log("success", values);
    }, []);

    const onFinishFailedHandler = useCallback((errorInfo: any) => {
        console.log(errorInfo);
    }, []);

    return (
        <div className={classNames("loginForm", {}, [className])}>
            <Form
                name="login"
                autoComplete="off"
                layout="vertical"
                labelCol={{ span: 24 }}
                onFinish={onFinishHandler}
                onFinishFailed={onFinishFailedHandler}
            >
                <Form.Item
                    label={"Логин"}
                    name="username"
                    rules={[{ required: true, message: "Введите Ваш логин!" }]}
                >
                    <Input placeholder={"Введите логин"} />
                </Form.Item>
                <Form.Item
                    label={
                        <HStack justify={"between"} max>
                            <Text>Пароль</Text>
                            <Button type={"link"} size={"small"}>
                                Восстановить пароль
                            </Button>
                        </HStack>
                    }
                    name="password"
                    rules={[{ required: true, message: "Введите Ваш пароль!" }]}
                >
                    <Input.Password placeholder={"Введите пароль"} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className={cls.loginFormButton}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};


