import React, { memo, Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import { AppRoutesProps } from "@/types/router";
import { getAuthOnlyRoutes } from "@/services/providers/routerProvider/config/routeConfig";

const AppRouter = ({ authOnly }: {authOnly: boolean}) => {

    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        // Элемент оборачиваем в suspense
        const element = (
            <Suspense fallback={<div>Идет загрузка</div>}>
                {route.element}
            </Suspense>
        );

        return (
            <Route
                index={route.indexRoute}
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth isAuth={authOnly}>{element}</RequireAuth> : element}
            />
        );
    }, [authOnly]);

    return (
        <Routes>
            {getAuthOnlyRoutes(authOnly).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);
