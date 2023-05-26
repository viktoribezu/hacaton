import {Button, Form, Input, Typography} from "antd";
import {VStack} from "@/components/ui";
import {Link} from "react-router-dom";
import './ResetPasswordForm.scss'
import {useCallback, useMemo} from "react";
import {useAppDispatch} from "@/utils/hooks";
import {resetPassword} from "@/services/api/User/resetPassword";
import {useSelector} from "react-redux";
import {getUserResetPasswordStatus} from "@/store/user/userSelectors";

interface ResetPasswordFormProps {
    classNames?: string;
}

interface formValuesProps {
    email: string;
}

export const ResetPasswordForm = (props: ResetPasswordFormProps) => {
    const { classNames } = props;
    const dispatch = useAppDispatch();
    const resetPasswordStatus = useSelector(getUserResetPasswordStatus);

    const passwordResponse = useMemo(() => {
        switch (resetPasswordStatus) {
            case 'success':
                return 'Письмо для восстановления пароля было отправлено вам на почту'
            case 'error':
                return 'Произошла ошибка, проверьте введенные данные'
        }
    }, [resetPasswordStatus])

    const onFinishHandler = useCallback((formValues: formValuesProps) => {
        const email = formValues.email
        dispatch(resetPassword({email}))
    }, [dispatch])

    if (resetPasswordStatus === 'success') {
        return (
            <VStack className={classNames} align={'center'}>
                <Typography.Title style={{textAlign: 'center'}}>{passwordResponse}</Typography.Title>
            </VStack>
        )
    }

    return (
        <VStack className={classNames} align={"center"}>
            <Typography.Title>Восстановление пароля</Typography.Title>
            {passwordResponse && <Typography.Text type={"danger"}>{passwordResponse}</Typography.Text>}
            <Form
                className={'reset__password-form'}
                layout="vertical"
                labelCol={{ span: 24 }}
                onFinish={onFinishHandler}
            >
                <Form.Item
                    label={'Почта'}
                    name="email"
                    rules={[{ required: true, message: "Введите Вашу почту!" }]}
                >
                    <Input type={'email'} placeholder={"Введите почту"} />
                </Form.Item>
                <Form.Item>
                    <VStack gap={8}>
                        <Button block type="primary" htmlType="submit">
                            Отправить
                        </Button>
                        <Link to={"/login"} style={{ width: "100%" }}>
                            <Button block>Вернуться на страницу авторизации</Button>
                        </Link>
                    </VStack>
                </Form.Item>
            </Form>

        </VStack>
    );
};