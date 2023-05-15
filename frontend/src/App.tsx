import { classNames } from "@/utils/lib";
import { LoginPage } from "@/pages/LoginPage/LoginPage";

export const App = () => {

    return (
        <div className={classNames("app")}>
            <LoginPage />
        </div>
    );
};