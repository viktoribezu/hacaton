import { memo, ReactNode } from "react";

import cls from "./Flex.module.scss";
import { classNames, Mods } from "@/utils/lib";

type FlexAlign = "center" | "start" | "end" | "inherit";

type FlexJustify = "center" | "between" | "start" | "end"

type FlexGap = 4 | 8 | 12 | 16 | 20 | 24 | 32

type FlexDirection = "row" | "column"

export interface FlexProps {
    align?: FlexAlign;
    justify?: FlexJustify;
    gap?: FlexGap;
    direction?: FlexDirection;
    className?: string;
    children?: ReactNode;
    max?: boolean;
}

const justifyClasses: Record<FlexJustify, string> = {
    center: cls.justifyCenter,
    between: cls.justifyBetween,
    start: cls.justifyStart,
    end: cls.justifyEnd
};

const alignClasses: Record<FlexAlign, string> = {
    center: cls.alignCenter,
    start: cls.alignStart,
    end: cls.alignEnd,
    inherit: cls.alignInherit
};

const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn
};

const gapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    12: cls.gap12,
    16: cls.gap16,
    20: cls.gap20,
    24: cls.gap24,
    32: cls.gap32
};

export const Flex = memo((props: FlexProps) => {

    const {
        className,
        align = "inherit",
        gap = 8,
        justify = "start",
        direction = "row",
        max,
        children
    } = props;

    const mods: Mods = {
        [cls.max]: max
    };

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap]
    ];

    return (
        <div className={classNames(cls.flex, mods, classes)}>
            {children}
        </div>
    );
});


