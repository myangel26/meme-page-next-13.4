import Link from "next/link";
import { useGlobalState } from "../../state";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import HeaderSearch from "./HeaderSearch";
import HeaderMenu from "./HeaderMenu";
import Image from 'next/image'

export default function Header() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useGlobalState('currentUser');
    const [, setToken] = useGlobalState('token');

    function handleLogout() {
        Cookies.remove('token');
        setToken('');
        setUserInfo(null);
        router.push('/login');
    }

    return (
        <header>
            <div className="ass1-header">
                <div className="container">
                    <Link href={'/'} className="ass1-logo">
                        Senji Meme
                    </Link>

                    <HeaderMenu />

                    <HeaderSearch />

                    <Link href="/posts/create" className="ass1-header__btn-upload ass1-btn">
                        <i className="icon-Upvote" /> Upload
                    </Link>

                    {
                        userInfo
                            ?
                            <div className="wrapper-user">
                                <Link href={ '/users/[userid]' } as={ `/users/${ userInfo.USERID }` } className="user-header">
                                    <span className="avatar">
                                        <Image 
                                            src={userInfo.profilepicture || '/images/avatar-02.png'} 
                                            alt="avata" 
                                        />
                                    </span>
                                    <span className="email">{userInfo.email}</span>
                                </Link>

                                <div onClick={ handleLogout } className="logout">Logout</div>
                            </div>
                            :
                            <Link href="/login" className="ass1-header__btn-upload ass1-btn">
                                Login
                            </Link>
                    }
                </div>
            </div>
        </header>
    )
}