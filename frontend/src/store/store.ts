import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { userReducer } from "./user/userSlice";
import { managementReducer } from "./management/managementSlice";
import { rtkApi, $api } from "@/services/api/config";

const rootReducer = combineReducers<StateSchema>({
    user: userReducer,
    management: managementReducer,
    [rtkApi.reducerPath]: rtkApi.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        // Настраиваем middleware для санки
        thunk: {
            // Настраиваем extra-аргументы санки
            extraArgument: {
                // Делаем поле api и передаем как раз наш конфиг axios
                api: $api
            }
        }
    }).concat(rtkApi.middleware)
});


export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];

