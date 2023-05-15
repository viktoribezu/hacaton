import React, { memo, Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import { AppRoutesProps } from "@/types/router";
import { routeConfig } from "@/services/providers";

const AppRouter = () => {

    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        // Элемент оборачиваем в suspense
        const element = (
            <Suspense fallback={<div>Идет загрузка</div>}>
                {route.element}
            </Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);
