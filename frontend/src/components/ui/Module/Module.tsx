import { ReactNode } from "react";
import cls from "./Module.module.scss";
import {classNames} from "@/utils/lib";

interface ModuleProps {
    children: ReactNode;
    className?: string;
}

export const Module = (props: ModuleProps) => {
    const { children, className } = props;

    return (
        <div className={classNames(cls.moduleWrapper, {}, [className])}>
            {children}
        </div>
    );
};