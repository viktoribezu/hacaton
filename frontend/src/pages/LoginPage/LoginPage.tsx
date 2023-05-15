import { classNames } from "@/utils/lib";
import { Typography } from "antd";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import "./LoginPage.scss";

const { Title } = Typography;

export const LoginPage = () => {

    return (
        <div className={classNames("loginPage", {}, [])}>
            <Title level={2}>Авторизация пользователя</Title>
            <LoginForm />
        </div>
    );
};


