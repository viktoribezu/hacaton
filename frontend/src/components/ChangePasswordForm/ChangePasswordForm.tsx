import {VStack} from "@/components/ui";
import {Button, Form, Input, message, Typography} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {$api} from "@/services/api/config";

interface ChangePasswordFormProps {
    classNames: string;
}

interface formValuesProps {
    password: string;
}

export const ChangePasswordForm = (props: ChangePasswordFormProps) => {
    const {classNames} = props
    const [searchParams] = useSearchParams();
    const [successVerify, setSuccessVerify] = useState(false)
    const codeValue = searchParams.get('code')
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()

    const error = (errorText: string) => {
        messageApi.open({
            type: 'error',
            content: errorText,
        });
    };

    useEffect(() => {
        if (codeValue) {
            $api.get(`/accounts/password/reset/verify/?code=${codeValue}`)
                .then(() => {
                    setSuccessVerify(true)
                })
                .catch(() => {
                    // error('Произошла ошибка, попробуйте перезагрузить страницу')
                    setSuccessVerify(true)
                })
        }
    }, [codeValue]);

    const onFinishHandler = (formValues: formValuesProps) => {
        $api.post(`/accounts/password/reset/verified/`, {
            code: codeValue,
            password: formValues.password
        })
            .then(() => {
                navigate('/login')
            })
            .catch((err) => {
                error('При смене пароля произошла ошибка')
            })
    }

    return (
        <VStack className={classNames}>
            {contextHolder}
            <Typography.Title>Смена пароля</Typography.Title>
            <Form
                className={'reset__password-form'}
                layout="vertical"
                labelCol={{ span: 24 }}
                onFinish={onFinishHandler}
            >
                <Form.Item
                    label={'Пароль'}
                    name="password"
                    rules={[
                        { required: true, message: "Введите Ваш пароль!" },
                        {min: 6, message: 'Минимальная длина пароль 6 символов'}
                    ]}
                >
                    <Input type={'password'} placeholder={"Введите пароль"} />
                </Form.Item>
                <Form.Item>
                    <VStack gap={8}>
                        <Button disabled={!successVerify} block type="primary" htmlType="submit">
                            Сменить пароль
                        </Button>
                    </VStack>
                </Form.Item>
            </Form>
        </VStack>
    )
};
