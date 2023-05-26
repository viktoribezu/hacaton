export interface User {
    email: string;
}

export interface UserSchema {
    isLoading: boolean;
    error?: string;
    resetPasswordStatus?: string;
    authData?: User;
    // Флаг, который будет зависеть от инициализации данных пользователя
    _inited: boolean;
}