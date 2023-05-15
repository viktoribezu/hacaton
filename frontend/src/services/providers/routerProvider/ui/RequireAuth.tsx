import { Navigate } from "react-router-dom";
import { RoutePath } from "@/utils/consts/router";

export const RequireAuth = ({ children }: {children: JSX.Element}) => {
    const isAuth = false; // TODO: Селектор получения данных пользователя

    if (!isAuth) {
        return <Navigate to={RoutePath.login} replace />;
    }

    return children;
};