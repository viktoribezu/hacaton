import { StateSchema } from "@/store/StateSchema";

export const getUserInited = (state: StateSchema) => state.user._inited;
export const getUserIsLoading = (state: StateSchema) => state.user.isLoading;
export const getUserError = (state: StateSchema) => state.user.error;