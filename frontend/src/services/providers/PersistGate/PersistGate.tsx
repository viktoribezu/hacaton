import { ReactNode } from "react";
import { persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

interface StoreProviderProps {
    children: ReactNode
}

export const PersistGateProvider = ({ children }: StoreProviderProps) => {
    return (
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    );
};