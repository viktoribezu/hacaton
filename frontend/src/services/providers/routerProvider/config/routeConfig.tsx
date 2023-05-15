import { AppRoutes, RoutePath } from "@/utils/consts/router";
import { AppRoutesProps } from "@/types/router";
import { LoginPage, NotFoundPage } from "@/pages";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    }
};