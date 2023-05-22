import { ReactNode } from "react";
import cls from "./Module.module.scss";

interface ModuleProps {
    children: ReactNode
}

export const Module = (props: ModuleProps) => {
    const { children } = props;

    return (
        <div className={cls.moduleWrapper}>
            {children}
        </div>
    );
};