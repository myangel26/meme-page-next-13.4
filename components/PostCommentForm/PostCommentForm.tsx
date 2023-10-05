import React, { HTMLAttributes, useRef, useState } from "react";
import { Button } from "../Button";

type PropsType = {
    handleSubmitForm: (value: string, callback: (e?:Error) => void) => void,
}

const PostCommentForm: React.FC<PropsType> = ({
    handleSubmitForm
}) => {
    const [isDisable, setIsDisable] = useState(false);
    // const InputComment = useRef<HTMLInputElement>(null);
    const [commentValue, setcommentValue] = useState('');

    const handleChangeComment = (_evt:React.ChangeEvent<HTMLInputElement>) => {
        _evt.preventDefault();
        if(_evt.target.value.length <= 180) {
            setcommentValue(_evt.target.value);
        }
    }

    const handleSubmit = (_evt: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement>) => {
        _evt.preventDefault();
        if(commentValue.trim().length !== 0) {
            // InputComment.current?.setAttribute("disabled", 'true');
            setIsDisable(true);
            handleSubmitForm(commentValue, (error) => {
                setIsDisable(false);
            });
        } else {

        }
    }

    return (
        <>
            <div className="ass1-add-comment">
                <form action="#" onSubmit={handleSubmit}>
                    <input
                        // ref={InputComment}
                        disabled={isDisable}
                        value={commentValue}
                        onChange={handleChangeComment}
                        maxLength={180}
                        type="text"
                        className="form-control ttg-border-none"
                        placeholder="Thêm một bình luận"
                    />
                </form>
                <div className="ass1-add-comment__content">
                    {
                        isDisable && 
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="1.3em"
                            height="1.3em"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid"
                            style={{ marginLeft: "auto" }}
                        >
                            <circle
                                cx={50}
                                cy={50}
                                fill="none"
                                stroke='#95d5ee'
                                strokeWidth={10}
                                r={35}
                                strokeDasharray="164.93361431346415 56.97787143782138"
                            >
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    repeatCount="indefinite"
                                    dur="1s"
                                    values="0 50 50;360 50 50"
                                    keyTimes="0;1"
                                />
                            </circle>
                        </svg>
                    }
                    {
                        !isDisable &&
                        <div 
                            onClick={handleSubmit}
                            className="ass1-add-comment__btn-save ass1-btn-icon">
                                <span>{180 - commentValue.length}</span>
                                <i  className="icon-Submit_Tick" />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default PostCommentForm;