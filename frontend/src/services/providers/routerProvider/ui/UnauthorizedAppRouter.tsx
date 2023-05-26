import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@/pages";
import { ResetPassword } from "@/pages/ResetPassword/ResetPassword";
import {ChangePasswordPage} from "@/pages/ChangePasswordPage/ChangePasswordPage";

export const UnauthorizedAppRouter = () => {

    return (
        <Routes>
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/reset-password"} element={<ResetPassword />} />
            <Route path={'/change-password/'} element={<ChangePasswordPage />} />
            <Route path={"*"} element={<Navigate to={"/login"} />} />
        </Routes>
    );
};