import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { userReducer } from "./user/userSlice";
import { managementReducer } from "./management/managementSlice";
import { rtkApi, $api } from "@/services/api/config";
import { tokenReducer } from "@/store/token/tokenSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["token"]
};

const rootReducer = combineReducers<StateSchema>({
    user: userReducer,
    management: managementReducer,
    token: tokenReducer,
    [rtkApi.reducerPath]: rtkApi.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
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

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];

