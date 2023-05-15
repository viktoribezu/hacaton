export enum AppRoutes {
    LOGIN = "login",
    // RESET_PASSWORD = "reset_password",
    // last
    NOT_FOUND = "not_found"
}

export const RoutePath: Record<AppRoutes, string> = {

    [AppRoutes.LOGIN]: "/login",
    // [AppRoutes.RESET_PASSWORD]: "/reset_password",
    // last
    [AppRoutes.NOT_FOUND]: "*"
};