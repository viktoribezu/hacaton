import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@/pages";
import { ResetPassword } from "@/pages/ResetPassword/ResetPassword";

export const UnauthorizedAppRouter = () => {

    return (
        <Routes>
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/reset-password"} element={<ResetPassword />} />
            <Route path={"*"} element={<Navigate to={"/login"} />} />
        </Routes>
    );
};