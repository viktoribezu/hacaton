import React, { CSSProperties, useState } from "react";
import type { SelectProps } from "antd";
import { Select } from "antd";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { getUserToken } from "@/store/token/tokenSelectors";

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const fetch = (value: string, callback: any, field: string, token: string | undefined) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    const request = () => {
        axios.get(`/object/?${field}__icontains=${value}`, {
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
    onChangeField: (values: string, field: string) => void
}

export const SearchSelectInput = (props: SearchSelectInputProps) => {
    const token = useSelector(getUserToken);
    const [data, setData] = useState<SelectProps["options"]>();
    const [value, setValue] = useState<string>();

    const handleSearch = (newValue: string) => {
        fetch(newValue, setData, props.field, token);
    };

    const handleChange = (newValue: string) => {
        setValue(newValue);
        props.onChangeField(newValue, props.field);
    };

    return (
        <Select
            mode={"multiple"}
            showSearch
            value={value}
            placeholder={props.placeholder}
            style={{ width: 200 }}
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