import { useEffect, useState } from "react"
import { URL_LOGIN, INTERNAL_URL_LOGIN } from '../../constants'
import api from '../../services/api'
import fetch from 'isomorphic-fetch'
import { useRouter } from "next/router"
// import Cookies from 'js-cookie'
import { Store } from 'react-notifications-component';
import { useGlobalState } from "../../state"
import { useNotAuthen } from "../../helpers/useAuthen"
import Link from "next/link"
import { NotificationType } from "../../constants/typeGlobal"
import { Button } from "../../components/Button"

type FormLogin = {
    email: string,
    password: string
}

const initFormLogin: FormLogin = {
    email: '',
    password: ''
}

export default function Login() {
    useNotAuthen();
    const router = useRouter();
    const errorString = router.query.error;
    const [userInfo] = useGlobalState('currentUser');
    
    // useEffect( () => {
    //     console.log(userInfo);
    // }, [userInfo])

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (errorString) {
            // alert('Dang nhap that bai') // su dung thu vien ho tro notification (npm notification react)
            Store.addNotification({
                ...NotificationType,
                type: "danger",
                title: "login Failed",
                message: "User Name Or Password Invalid!",
            });
            window.history.pushState({}, document.title, '/login');
        }
    }, [errorString])


    const [formData, setFormData] = useState(initFormLogin);

    // function onChangeEmail(_evt: any) {
    //     console.log(_evt.target.value)
    //     //...formData => copy lai toàn bộ dữ liệu cũ để ko bị mất dữ liệu khi dùng useState
    //     setFormData({
    //         ...formData,
    //         email: _evt.target.value
    //     })
    // }
    // function onChangePassword(_evt: any) {
    //     setFormData({
    //         ...formData,
    //         password: _evt.target.value
    //     })
    // }
    function handelOnChange(_key: string) {
        //ky thuat dung closure
        return (_evt: any) => {
            const value = _evt.target.value
            setFormData({
                ...formData,
                [_key]: value
            })
        }
    }
    //co the viet nhu sau
    // const handelOnChange = (_key: string) => (_evt: any) => {
    //     const value = _evt.target.value
    //     setFormData({
    //         ...formData,
    //         [_key]: value
    //     })
    // }

    function handelOnChange2(evt: any, key: string) {
        console.log(key);
    }

    const handeSubmitForm = (_evt: any) => {
        _evt.preventDefault();
        // api.callJson(URL_LOGIN, { data: formData, method: 'POST' })
        //     .then(data => {
        //         console.log(data);
        //         //loading
        //         //token => JS luu vao cookie
        //         //dang nhap thanh cong => router.push('/')
        //     })

        const body = JSON.stringify(formData);
        const method = 'POST';
        const headers = {
            'Content-Type': 'application/json'
        };
        fetch(INTERNAL_URL_LOGIN, {
            method,
            headers,
            body
        })
            .then(res => res.json())
            .then(data => {
                // Cookies.set('token', data.result.token, { expires: 1/48 })
                router.push('/');
            })
    }

    function handeSubmitCheck(_evt: any) {
        _evt.preventDefault();
        //B1: Validation Form
        
        if (isLoading) return;
        setIsLoading(true);

        _evt.target.submit();
            
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
                    <p>Đăng nhập</p>
                    <div className="ass1-login__form">
                        {/*
                            Cách 1: Redirect ở phía Client 
                            <form action="#" onSubmit={handeSubmitForm}> 
                        */}
                        {/* 
                            Cách 2: Redirect phía Server
                            <form action="/api/login" method='POST'>
                        */}
                        <form action={INTERNAL_URL_LOGIN} method="POST" onSubmit={handeSubmitCheck}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                required
                                // value={formData.email}
                                // onChange={handelOnChange('email')}
                                // onChange={(e) => handelOnChange2(e, 'email')}
                                name="email"
                            />
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Mật khẩu"
                                required
                                // value={formData.password}
                                // onChange={handelOnChange('password')}
                                name="password"
                            />
                            <div className="ass1-login__send">
                                <Link href="/register">
                                    Đăng ký một tài khoản
                                </Link>
                                <Button 
                                    type="submit" 
                                    className="ass1-btn" 
                                    isLoading={isLoading} 
                                    colorStroke="#fff" 
                                    colorStrokeHover="#0ac4fe">Login</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}