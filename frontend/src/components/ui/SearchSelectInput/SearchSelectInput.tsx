import React, { useState } from "react";
import type { SelectProps } from "antd";
import { Select } from "antd";

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const fetch = (value: string, callback: any) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    if (value) {
        // timeout = setTimeout(fake, 300);
    } else {
        callback([]);
    }
};

export const SearchSelectInput: React.FC<{ placeholder: string; style?: React.CSSProperties }> = (props) => {
    const [data, setData] = useState<SelectProps["options"]>([
        { value: "Kolomyaka", label: "Kolomyaka" },
        { value: "Nikita", label: "Nikita" },
    ]);
    const [value, setValue] = useState<string>();

    const handleSearch = (newValue: string) => {
        fetch(newValue, setData);
    };

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <Select
            mode={"multiple"}
            showSearch
            value={value}
            placeholder={props.placeholder}
            style={props.style}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            options={(data || []).map((d) => ({
                value: d.value,
                label: d.text,
            }))}
        />
    );
};