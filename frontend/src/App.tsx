import { classNames } from "@/utils/lib";
import { AppRouter } from "@/services/providers";

export const App = () => {

    return (
        <div className={classNames("app")}>
            <AppRouter />
        </div>
    );
};