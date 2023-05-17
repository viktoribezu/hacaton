export enum AppRoutes {
    MANAGEMENT = "management",
    PLANNING = "planning",
    // RESET_PASSWORD = "reset_password",
    // last
    NOT_FOUND = "not_found"
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.PLANNING]: "/planning",
    [AppRoutes.MANAGEMENT]: "/management",
    // [AppRoutes.RESET_PASSWORD]: "/reset_password",
    // last
    [AppRoutes.NOT_FOUND]: "*"
};