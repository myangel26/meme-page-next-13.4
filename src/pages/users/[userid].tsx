import { NextPage, NextPageContext } from "next";
import { UserDetailInfo } from "../../../components/UserDetailInfo";
import { UserDetailPosts } from "../../../components/UserDetailPosts";
import { TypeUser } from "../../../state";
import { PostType } from "..";
import { getTokenCSRAndSSR } from "../../../helpers";
import postService from "../../../services/postService";
import userService from "../../../services/userService";
import { useAuthen } from "../../../helpers/useAuthen";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Store } from "react-notifications-component";
import { NotificationType } from "../../../constants/typeGlobal";

type Propstype = {
    userDetailInfo: TypeUser,
    userDetailPosts: PostType[]
}

const UserDetail: NextPage<Propstype> = ({
    userDetailInfo,
    userDetailPosts
}) => {

    useAuthen();

    const router = useRouter();
    useEffect(() => {
        if (!userDetailInfo) {
            Store.addNotification({
                ...NotificationType,
                type: "danger",
                title: "Error",
                message: "User Does Not Exist",
            });
            router.push('/');
        }
    }, [userDetailInfo]);

    useMemo(() => {
        console.log('useMemo');
        //chạy 1 lần duy nhất trước khi render trang
    }, [])

    useEffect(() => {
        //koo có ai đẻ track nên chạy mỗi khi render
        console.log('a');
    })

    useEffect(() => {
        //ko có ai đẻ track nên chạy 1 lần mỗi khi render trang, sau đó client side redirect ko chạy
        console.log('b');
    }, [])

    return(
        <>
            {console.log('return')}
            
            <div className="container">
                <UserDetailInfo 
                    postCount = { userDetailPosts.length }
                    userDetailInfo={ userDetailInfo } 
                />
                
                <UserDetailPosts userDeatailPosts={ userDetailPosts } />
            </div>
        </>
    )
}

UserDetail.getInitialProps = async (ctx: NextPageContext) => {
    const userid = ctx.query.userid as string;
    const [token, userToken] = getTokenCSRAndSSR(ctx);

    const postPromise = postService.getPostByUserID({ userid, token });
    const userPromise = userService.getUserByID(userid);

    const [postRes, userRes] = await Promise.all([postPromise, userPromise]);

    const props = {
        userDetailInfo: userRes?.user || null,
        userDetailPosts: postRes.posts || []
    }

    return props;
};

export default UserDetail;