import { AppRoutes, RoutePath } from "@/utils/consts/router";
import { AppRoutesProps } from "@/types/router";
import { ManagementPage } from "@/pages";
import { Navigate } from "react-router-dom";
import { PlanningPage } from "@/pages/PlanningPage/PlanningPage";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MANAGEMENT]: {
        path: RoutePath.management,
        element: <ManagementPage />,
        authOnly: true,
    },
    [AppRoutes.PLANNING]: {
        path: RoutePath.planning,
        element: <PlanningPage />,
        authOnly: true,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <Navigate to={RoutePath.management}/>,
        authOnly: true
    }
};