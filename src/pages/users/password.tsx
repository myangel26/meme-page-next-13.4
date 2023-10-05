import { useState } from "react"
import userService from "../../../services/userService"
import { useGlobalState } from "../../../state"
import { useAuthen } from "../../../helpers/useAuthen"
import { Store } from "react-notifications-component"
import { NotificationType } from "../../../constants/typeGlobal"

type TypeDataChangePassword = {
    oldPassword: string,
	newPassword: string,
	reNewPassword: string
}

const initState: TypeDataChangePassword = {
    oldPassword: '',
	newPassword: '',
	reNewPassword: ''
}

const UserChangePassword = () => {
    useAuthen();

    const [formData, setFormData] = useState(initState);
    const [token, ] = useGlobalState('token');

    const handleOnchange = (key: string) => (_evt: any) => {
        const value = _evt.target.value;
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const handleSubmit = (_evt: any) => {
        _evt.preventDefault();
        userService
            .changePassword(formData, String(token))
            .then((res) => {
                if (res.status === 200) {
                    Store.addNotification({
                        ...NotificationType,
                        type: "success",
                        title: "Success",
                        message: "Change Password Successfully",
                    });
                    setFormData(initState);
                }else {
                    Store.addNotification({
                        ...NotificationType,
                        type: "danger",
                        title: "Error",
                        message: "An error has occurred",
                    });
                }
            })
    }

    return (
        <>
            <div className="ass1-login">
                <div className="ass1-login__content">
                    <p>Đổi mật khẩu</p>
                    <div className="ass1-login__form">
                        <form action="#" onSubmit={ handleSubmit }>
                            <input
                                onChange = { handleOnchange('oldPassword') }
                                value={ formData.oldPassword }
                                type="password"
                                className="form-control"
                                placeholder="Mật khẩu cũ"
                                required
                            />
                            <input
                                onChange = { handleOnchange('newPassword') }
                                value={ formData.newPassword }
                                type="password"
                                className="form-control"
                                placeholder="Mật khẩu mới"
                                required
                            />
                            <input
                                onChange = { handleOnchange('reNewPassword') }
                                value={ formData.reNewPassword }
                                type="password"
                                className="form-control"
                                placeholder="Xác nhận mật khẩu mới"
                                required
                            />
                            <div className="ass1-login__send justify-content-center">
                                <button type="submit" className="ass1-btn">
                                    Gửi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserChangePassword;