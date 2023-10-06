import { useEffect, useMemo, useRef, useState } from "react";
import { useGlobalState } from "../../../state";
import { TypeUser } from "../../../state";
import { Store } from "react-notifications-component";
import { NotificationType } from "../../../constants/typeGlobal";
import userService from "../../../services/userService";
import Image from "next/image";

//Do Input File nhận vào là 1 object File
//=> Không thễ gửi API dạng Json
//=> Gừi theo kiểu form-data


const UserProfile = () =>  {
    const [token, ] = useGlobalState('token');
    const inputFileEle = useRef<HTMLInputElement>(null);
    const [currentUser, setCurrentUser] = useGlobalState('currentUser');
    const [user, setUser] = useState(currentUser);
    const [objFile, setObjFile] = useState({ file: {}, base64File: '' });

    const handleOnChange = (key: string) => (_evt: 
        React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement> | 
        React.ChangeEvent<HTMLSelectElement> 
        ) => {
        const value = _evt.target.value;
        
        setUser({
            ...user,
            [key]: value
        })
    }

    const handleSelectFile = (_evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (inputFileEle && inputFileEle.current) {
            inputFileEle.current.click();
        }
    }

    const handleOnChangeFile = (_evt: React.ChangeEvent<HTMLInputElement>) => {
        if (!_evt.target.files) return;

        const listFiles = _evt.target.files;

        if (listFiles.length === 0) return;

        const file = listFiles[0] as File;
        //  /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/
        if (/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(file.type)) {
            const reader = new FileReader();

            reader.addEventListener('load', function() {
                setObjFile({
                    file,
                    base64File: reader.result as string
                })
            }, false);

            reader.readAsDataURL(file);
        } else {
            Store.addNotification({
                ...NotificationType,
                type: "danger",
                title: "Error",
                message: "File is not valid",
            });
        }
    }

    const avatarURL = objFile.base64File || user?.profilepicture || "/images/avatar-02.png";

    const handleSubmit = (_evt: React.FormEvent<EventTarget>) => {
        _evt.preventDefault();
        const data = {
            fullname: user?.fullname as string,
            gender: user?.gender as string,
            description: user?.description as string,
            avatar: objFile.file
        }

        userService.updateProfile(data, String(token))
            .then(res => {
                if(res.status === 200){
                    setCurrentUser(res.user);
                    Store.addNotification({
                        ...NotificationType,
                        type: "success",
                        title: "Success",
                        message: "Change Infomation Successfully!!!",
                    });
                }
                
            })
    }
    
    return (
        <>
            <div className="ass1-login">
                <div className="ass1-login__content">
                    <p>Profile</p>
                    <div className="ass1-login__form">
                        <div className="avatar" onClick={ handleSelectFile } style={{ cursor: 'pointer' }}>
                            <Image
                                src={ avatarURL }
                                alt={ user?.fullname || '' }
                            />
                        </div>
                        <form action="#" onSubmit={ handleSubmit }>
                            <input
                                onChange={ handleOnChange('fullname') }
                                value={ user?.fullname }
                                type="text"
                                className="form-control"
                                placeholder="Tên ..."
                                required
                            />
                            <select 
                                onChange={ handleOnChange('gender') }
                                value={ user?.gender }
                                className="form-control"
                            >
                                <option value="">Giới tính</option>
                                <option value="nam">Nam</option>
                                <option value="nu">Nữ</option>
                            </select>
                            <input
                                ref={ inputFileEle }
                                onChange={ handleOnChangeFile }
                                style={{ display: 'none' }}
                                type="file"
                                name="avatar"
                                placeholder="Ảnh đại diện"
                                className="form-control"
                            />
                            <textarea
                                onChange={ handleOnChange('description') }
                                value={ !user?.description ? "" : user?.description }
                                className="form-control"
                                cols={30}
                                rows={5}
                                placeholder="Mô tả ngắn ..."
                            />
                            <div className="ass1-login__send justify-content-center">
                                <button type="submit" className="ass1-btn">
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserProfile;