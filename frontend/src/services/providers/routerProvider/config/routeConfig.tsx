import { AppRoutes, RoutePath } from "@/utils/consts/router";
import { AppRoutesProps } from "@/types/router";
import { LoginPage, NotFoundPage } from "@/pages";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
    },
    [AppRoutes.MANAGEMENT]: {
        path: RoutePath.management,
        element: <div>Management page</div>,
        authOnly: true,
    },
    [AppRoutes.PLANNING]: {
        path: RoutePath.planning,
        element: <div>Planing page</div>,
        authOnly: true,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
        authOnly: true
    }
};

export const getAuthOnlyRoutes = (authOnly: boolean) => {
    return Object.values(routeConfig).filter((route: AppRoutesProps) => Boolean(route.authOnly) === authOnly);
};