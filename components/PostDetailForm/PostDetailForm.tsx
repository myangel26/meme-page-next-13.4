import React, { useRef } from "react";
import { Store } from "react-notifications-component";
import { NotificationType } from "../../constants/typeGlobal";
import Image from "next/image";

type PropsType ={
    url_image: string,
    post_content: string,
    obj_image: {
        base64: string,
        file: File | null
    },
    onChangeDetailForm: (key: string, value: any) => void
}

const PostDetailForm:React.FC<PropsType> = ({
    url_image,
    post_content,
    obj_image,
    onChangeDetailForm
}) => {
    const inputFileEle = useRef<HTMLInputElement>(null);

    const handleOnChange = (key: string) => (_evt: 
        React.ChangeEvent<HTMLInputElement> |
        React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const value = _evt.target.value;
        onChangeDetailForm(key, value);
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
                onChangeDetailForm('obj_image', {
                    file,
                    base64: reader.result as string
                });
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

    const handleSelectFile = (_evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (inputFileEle && inputFileEle.current) {
            inputFileEle.current.click();
        }
    }

    const imgURL = url_image || obj_image.base64 || `/images/no_image_available.jpg`;

    return (
        <>
            <div className="ass1-section ass1-section__edit-post">
                <div className="ass1-section__content">
                    <form action="#">
                        <div className="form-group">
                            <input
                                value={ url_image }
                                onChange={ handleOnChange('url_image') }
                                type="text"
                                className="form-control ttg-border-none"
                                placeholder="https://"
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                value={ post_content }
                                onChange={ handleOnChange('post_content') }
                                className="form-control ttg-border-none"
                                placeholder="Mô tả ..."
                            />
                        </div>
                    </form>
                    <input
                        ref={ inputFileEle }
                        onChange={ handleOnChangeFile }
                        style={{ display: 'none' }}
                        type="file"
                    />
                    <div className="ass1-section__image">
                        <a href="#">
                            <Image src={ imgURL } alt="default" />
                        </a>
                    </div>
                    <a
                        href="https://memeful.com/"
                        target="_blank"
                        className="ass1-btn ass1-btn-meme"
                    >
                        Chế ảnh từ meme
                    </a>
                    <button 
                        onClick={ handleSelectFile }
                        className="ass1-btn ass1-btn-meme">
                        Đăng ảnh từ máy tính
                    </button>
                </div>
            </div>

        </>
    )
}

export default PostDetailForm;