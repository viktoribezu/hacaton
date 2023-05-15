import { classNames } from "@/utils/lib";
import { Button, Form, Input, Typography } from "antd";
import "./LoginPage.scss";
import { useCallback } from "react";
import { HStack } from "@/components/ui/Stack/HStack/HStack";

const { Title, Text } = Typography;

export const LoginPage = () => {

    const onFinishHandler = useCallback((values: any) => {
        console.log("success", values);
    }, []);

    const onFinishFailedHandler = useCallback((errorInfo: any) => {
        console.log(errorInfo);
    }, []);

    return (
        <div className={classNames("loginPage", {}, [])}>
            <Title level={2}>Авторизация пользователя</Title>
            <Form
                name="login"
                autoComplete="off"
                layout="vertical"
                labelCol={{ span: 24 }}
                onFinish={onFinishHandler}
                onFinishFailed={onFinishFailedHandler}
            >
                <Form.Item
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
                    <Button type="primary" htmlType="submit" className={"loginFormButton"}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};


