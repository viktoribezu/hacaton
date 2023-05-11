import { classNames } from "@/utils/lib";
import { Button, Form, Input, Typography } from "antd";
import cls from "./LoginPage.module.scss";
import { useCallback } from "react";

const { Title } = Typography;

export const LoginPage = () => {

    const onFinishHandler = useCallback((values: any) => {
        console.log("success", values);
    }, []);

    const onFinishFailedHandler = useCallback((errorInfo: any) => {
        console.log(errorInfo);
    }, []);

    return (
        <div className={classNames(cls.loginPage, {}, [])}>
            <Title level={2}>Авторизация пользователя</Title>
            <Form
                name="login"
                autoComplete="off"
                layout="vertical"
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
                    name="password"
                    rules={[{ required: true, message: "Введите Ваш пароль!" }]}
                >
                    <Input.Password placeholder={"Введите пароль"} />
                </Form.Item>
                <Form.Item noStyle>
                    <Button className={cls.testUiButtonResetPassowrd} type={"link"} size={"small"}>
                        Восстановить пароль
                    </Button>
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


