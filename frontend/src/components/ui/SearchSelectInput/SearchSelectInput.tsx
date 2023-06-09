import React, { CSSProperties, useState } from "react";
import { Select } from "antd";
import axios, { AxiosResponse } from "axios";

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const fetch = (value: string, callback: any, field: string, token: string | undefined) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    const request = () => {
        axios.get(`/object/?object__${field}__icontains=${value}`, {
            baseURL: __API__,
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then((res: AxiosResponse) => {
                if (currentValue === value) {
                    const data = res.data.results.map((item: any) => ({
                        value: item[field][0],
                        text: item[field][0],
                    }));
                    callback([data]);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    if (value) {
        timeout = setTimeout(request, 300);
    } else {
        callback([]);
    }
};

interface SearchSelectInputProps {
    placeholder: string;
    style?: CSSProperties;
    field: string;
    onChangeField: (values: string, field: string) => void;
    options?: {value: string, label: string}[];
}


export const SearchSelectInput = (props: SearchSelectInputProps) => {
    const {
        options,
        style = { width: "100%", flex: "1 1 0" }
    } = props;

    const [value, setValue] = useState<string>();

    const handleChange = (newValue: string) => {
        setValue(newValue);
        props.onChangeField(newValue, props.field);
    };

    return (
        <Select
            mode={"multiple"}
            notFoundContent={null}
            showSearch
            value={value}
            placeholder={props.placeholder}
            style={style}
            defaultActiveFirstOption={false}
            showArrow={false}
            maxTagCount={"responsive"}
            onChange={handleChange}
            filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={options}
        />
    );
};