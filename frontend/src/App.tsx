import { classNames } from "@/utils/lib";
import { AppRouter } from "@/services/providers";
import { MainLayout } from "@/components/Layout/MainLayout";

export const App = () => {
    
    const isAuth = true;

    if (isAuth) {
        return (
            <MainLayout content={<AppRouter authOnly />} />
        );
    }

    return (
        <div className={classNames("app")}>
            <AppRouter authOnly={false} />
        </div>
    );
};