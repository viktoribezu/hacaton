import { classNames } from "@/utils/lib";
import { AppRouter } from "@/services/providers";
import { MainLayout } from "@/components/Layout/MainLayout";
import { useSelector } from "react-redux";
import { UnauthorizedAppRouter } from "@/services/providers/routerProvider/ui/UnauthorizedAppRouter";
import "@/assets/styles/global.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import { getUserToken } from "@/store/token/tokenSelectors";

export const App = () => {
    
    const isAuth = useSelector(getUserToken);

    if (isAuth) {
        return (
            <MainLayout content={<AppRouter />} />
        );
    }

    return (
        <div className={classNames("app")}>
            <UnauthorizedAppRouter />
        </div>
    );
};