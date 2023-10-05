import { useEffect, useMemo, useState } from "react"
import { validateEmail } from "../../helpers";
import Link from "next/link";
import userService from "../../services/userService";
import { useGlobalState } from "../../state";
import Cookies from "js-cookie";
import { useNotAuthen } from "../../helpers/useAuthen";
import { NotificationType } from "../../constants/typeGlobal"
import { Store } from "react-notifications-component";
import { Button } from "../../components/Button";

type initRegisterType = {
    [key: string]: any
}

const initRegister: initRegisterType = {
    fullname: {
        value: '',
        error: ''
    },
    email: {
        value: '',
        error: ''
    },
    password: {
        value: '',
        error: ''
    },
    repassword: {
        value: '',
        error: ''
    }
}

export default function Register() {
    useNotAuthen();

    const [registerData, setRegisterData] = useState(initRegister);
    const [, setToken] = useGlobalState('token');
    const [, setCurrentUser] = useGlobalState('currentUser');
    const [isLoading, setIsLoading] = useState(false);

    const isValidate = useMemo((): boolean => {
        for (let key in registerData) {
            const error = registerData[key].error;
            if (error !== '') return false;
        }
        return true;
    }, [registerData])

    const handleOnChange = (key: string) => (_evt: any) => {
        const value = _evt.target.value;
        const error = handleError(key, value);

        setRegisterData({
            ...registerData,
            [key]: {
                value,
                error
            }
        })

    }

    function handleError(key: string, value: string): string {
        let error = '';

        if (value.trim().length === 0) {
            error = 'Trường này là bắt buộc';
        }

        switch (key) {
            case 'email':
                if (!validateEmail(value)) error = "Email không hợp lệ";
                else error = '';
                break;
            case 'password':
                if (value.length < 6) error = 'Mật khẩu quá ngắn';
                else error = '';
                break;
            case 'repassword':
                if (registerData.password.value !== value) error = 'Mật khẩu nhập lại không khớp'
                else error = '';
                break;
        }

        return error;
    }

    const handleRegister = (_evt: any) => {
        _evt.preventDefault();
        if (isLoading) return;
        if (!isValidate) {
            Store.addNotification({
                ...NotificationType,
                type: "danger",
                title: "Invalid data",
                message: "User Name Or Password Invalid!",
            });
            return;
        }

        const fullname = registerData.fullname.value;
        const email = registerData.email.value;
        const password = registerData.password.value;
        const repassword = registerData.repassword.value;
        //xem có cách nào khai bao type registerData mà dùng . nhắc lệnh
        const data = {
            fullname,
            email,
            password,
            repassword
        }

        setIsLoading(true);

        userService.register(data)
            .then(res => {
                if (res.status === 200) {
                    setToken(res.token);
                    setCurrentUser(res.user);
                    Cookies.set('token', res.token, { expires: 1 / 48 })
                } else {
                    Store.addNotification({
                        ...NotificationType,
                        type: "danger",
                        title: "Register Failed",
                        message: res.error,
                    });
                }
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <>
            <div className="ass1-login">
                <div className="ass1-login__logo">
                    <Link href={'/'} className="ass1-logo">
                        Senji Meme
                    </Link>
                </div>
                <div className="ass1-login__content">
                    <p>Đăng ký một tài khoản</p>
                    <div className="ass1-login__form">
                        <form action="#" onSubmit={handleRegister}>
                            <div className="form-group">
                                <input
                                    value={registerData.fullname.value}
                                    onChange={handleOnChange('fullname')}
                                    type="text"
                                    className="form-control"
                                    placeholder="Tên hiển thị"
                                    required
                                />
                                {
                                    registerData.fullname.error
                                    &&
                                    <small className="form-text text-danger">{registerData.fullname.error}</small>
                                }
                            </div>
                            <div className="form-group">
                                <input
                                    value={registerData.email.value}
                                    onChange={handleOnChange('email')}
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    required
                                />
                                {
                                    registerData.email.error
                                    &&
                                    <small className="form-text text-danger">{registerData.email.error}</small>
                                }
                            </div>
                            <div className="form-group">
                                <input
                                    value={registerData.password.value}
                                    onChange={handleOnChange('password')}
                                    type="password"
                                    className="form-control"
                                    placeholder="Mật khẩu"
                                    required
                                />
                                {
                                    registerData.password.error
                                    &&
                                    <small className="form-text text-danger">{registerData.password.error}</small>
                                }
                            </div>
                            <div className="form-group">
                                <input
                                    value={registerData.repassword.value}
                                    onChange={handleOnChange('repassword')}
                                    type="password"
                                    className="form-control"
                                    placeholder="Nhập lại mật khẩu"
                                    required
                                />
                                {
                                    registerData.repassword.error
                                    &&
                                    <small className="form-text text-danger">{registerData.repassword.error}</small>
                                }
                            </div>

                            <div className="ass1-login__send">
                                <Link href="/login">
                                    Đăng nhập
                                </Link>

                                <Button type="submit" className="ass1-btn" isLoading={isLoading} colorStroke="#fff">Register</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}