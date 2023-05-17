import { Navigate } from "react-router-dom";
import { RoutePath } from "@/utils/consts/router";
import { useSelector } from "react-redux";
import { getUserInited } from "@/store/user/userSelectors";

export const RequireAuth = ({ children }: {children: JSX.Element}) => {
    const isAuth = useSelector(getUserInited);

    if (!isAuth) {
        return <Navigate to={RoutePath.login} replace />;
    }

    return children;
};