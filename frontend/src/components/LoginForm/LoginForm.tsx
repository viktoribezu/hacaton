import cls from "./LoginForm.module.scss";
import { useCallback } from "react";
import { Button, Form, Input, Typography } from "antd";
import { HStack } from "@/components/ui/Stack/HStack/HStack";
import { useAppDispatch } from "@/utils/hooks";
import { userActions } from "@/store/user/userSlice";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onFinishHandler = useCallback(({ username, password }: {username: string, password: string}) => {
        // dispatch(loginByUsername({ username, password }));
        dispatch(userActions.initAuthData());
        navigate("/management");
    }, [dispatch, navigate]);

    const onFinishFailedHandler = useCallback((errorInfo: any) => {
        console.log(errorInfo);
    }, []);

    const goToResetPassword = () => {
        navigate("/reset-password");
    };

    return (
        <div>
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
                            <Button onClick={goToResetPassword} type={"link"} size={"small"}>
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


