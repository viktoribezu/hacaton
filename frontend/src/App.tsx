import { classNames } from "@/utils/lib";
import { AppRouter } from "@/services/providers";
import { MainLayout } from "@/components/Layout/MainLayout";
import { useSelector } from "react-redux";
import { getUserInited } from "@/store/user/userSelectors";

export const App = () => {
    
    const isAuth = useSelector(getUserInited);

    // TODO: Исправить редирект (Можно открыть логин форму в контент части)
    if (isAuth) {
        return (
            <MainLayout content={<AppRouter />} />
        );
    }

    return (
        <div className={classNames("app")}>
            <AppRouter />
        </div>
    );
};