import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserInited } from "@/store/user/userSelectors";

export const RequireAuth = ({ children }: {children: JSX.Element}) => {
    const isAuth = useSelector(getUserInited);

    if (!isAuth) {
        return <Navigate to={"/login"} replace />;
    }

    return children;
};