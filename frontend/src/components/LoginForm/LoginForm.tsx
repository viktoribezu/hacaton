import cls from "./LoginForm.module.scss";
import { useCallback } from "react";
import { Button, Form, Input, Typography } from "antd";
import { HStack } from "@/components/ui/Stack/HStack/HStack";
import { useAppDispatch } from "@/utils/hooks";
import { Link } from "react-router-dom";
import { loginByUsername } from "@/services/api/User/loginByUsername";
import { useSelector } from "react-redux";
import { getUserError, getUserIsLoading } from "@/store/user/userSelectors";

const { Text } = Typography;

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getUserIsLoading);
    const error = useSelector(getUserError);
    
    const onFinishHandler = useCallback(({ email, password }: {email: string, password: string}) => {
        dispatch(loginByUsername({ email, password }));
    }, [dispatch]);

    return (
        <div>
            <Form
                name="login"
                autoComplete="off"
                layout="vertical"
                labelCol={{ span: 24 }}
                onFinish={onFinishHandler}
            >
                {error && <Typography.Text type={"danger"} className={cls.errorText}>{error}</Typography.Text>}
                <Form.Item
                    label={"Почта"}
                    name="email"
                    rules={[{ required: true, message: "Введите Ваш логин!" }]}
                >
                    <Input type={"email"} placeholder={"Введите почту"} />
                </Form.Item>
                <Form.Item
                    label={
                        <HStack justify={"between"} max>
                            <Text>Пароль</Text>
                            <Link to={"/reset-password"}>
                                <Button type={"link"} size={"small"}>
                                    Восстановить пароль
                                </Button>
                            </Link>
                        </HStack>
                    }
                    name="password"
                    rules={[{ required: true, message: "Введите Ваш пароль!" }]}
                >
                    <Input.Password placeholder={"Введите пароль"} />
                </Form.Item>
                <Form.Item>
                    <Button loading={isLoading} type="primary" htmlType="submit" className={cls.loginFormButton}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};


