export interface CascaderOption {
    value: string;
    label: string;
    children?: CascaderOption[];
    disabled?: boolean;
}