import { AppRoutes, RoutePath } from "@/utils/consts/router";
import { AppRoutesProps } from "@/types/router";
import { ManagementPage, NotFoundPage } from "@/pages";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MANAGEMENT]: {
        path: RoutePath.management,
        element: <ManagementPage />,
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