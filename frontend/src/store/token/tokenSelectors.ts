import { StateSchema } from "@/store/StateSchema";

export const getUserToken = (state: StateSchema) => state.token.token ?? undefined;