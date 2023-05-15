import { Navigate } from "react-router-dom";
import { RoutePath } from "@/utils/consts/router";

export const RequireAuth = ({ children, isAuth }: {children: JSX.Element, isAuth: boolean}) => {

    if (!isAuth) {
        return <Navigate to={RoutePath.login} replace />;
    }

    return children;
};