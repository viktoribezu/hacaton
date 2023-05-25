import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserToken } from "@/store/token/tokenSelectors";

export const RequireAuth = ({ children }: {children: JSX.Element}) => {
    const isAuth = useSelector(getUserToken);

    if (!isAuth) {
        return <Navigate to={"/login"} replace />;
    }

    return children;
};