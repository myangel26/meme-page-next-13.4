import React from "react";
import { TypeUser, useGlobalState } from "../../state";
import Link from "next/link";

type PropsType = {
    userDetailInfo: TypeUser,
    postCount: number
}

const UserDetailInfo: React.FC<PropsType> = ({
    userDetailInfo,
    postCount
}) => {
    const [currentUser] = useGlobalState('currentUser');

    if (!currentUser || !userDetailInfo) return null;

    const check = userDetailInfo.USERID === currentUser.USERID;

    return (
        <>
            <div className="ass1-head-user">
                <div className="ass1-head-user__content">
                    <div className="ass1-head-user__image">
                        <Link href={'/users/profile'}>
                            <img src={ userDetailInfo.profilepicture || "/images/avatar-02.png" } alt={ userDetailInfo.fullname } />
                        </Link>
                    </div>
                    <div className="ass1-head-user__info">
                        <div className="ass1-head-user__info-head">
                            <div className="ass1-head-user__name">
                                <span>{ userDetailInfo.fullname }</span>
                                <i>
                                    <img src="/fonts/emotion/svg/Verified.svg" alt="" />
                                </i>
                            </div>
                            <div className="w-100" />
                            {
                                check &&
                                check ?
                                <>
                                    <Link href={'/users/password'} className="ass1-head-user__btn-follow ass1-btn">
                                        Đổi mật khẩu
                                    </Link>
                                    <Link href={'/users/profile'} className="ass1-head-user__btn-follow ass1-btn">
                                        Profile
                                    </Link>
                                </>
                                :
                                <>
                                    <a href="#" className="ass1-head-user__btn-follow ass1-btn">
                                        Theo dõi
                                    </a>
                                </>
                            }
                        </div>
                        <div className="ass1-head-user__info-statistic">
                            <div className="ass1-btn-icon">
                                <i className="icon-Post" />
                                <span>Bài viết: { postCount }</span>
                            </div>
                            <div className="ass1-btn-icon">
                                <i className="icon-Followers" />
                                <span>Theo dõi: 0</span>
                            </div>
                            <div className="ass1-btn-icon">
                                <i className="icon-Following" />
                                <span>Đang theo dõi: 0</span>
                            </div>
                        </div>
                        <p>{ userDetailInfo.description }</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserDetailInfo;