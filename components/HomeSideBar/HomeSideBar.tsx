import React from "react";
import { PostType } from "@/pages";
import { useGlobalState } from "../../state";
import { PostItem } from "../PostItem";
import Link from "next/link";

type PropsType = {
    userPosts: PostType[]
}

const HomeSideBar:React.FC<PropsType> = ({
    userPosts
}) => {
    
    const [userInfo, ] = useGlobalState('currentUser');

    const renderUserPosts = () => {
        if(userPosts.length === 0) {
            return (
                <>
                    <p>You don&apos;t have any posts</p>
                    <p>Please click <Link href={'/posts/create'}>here</Link> to post</p>
                </>
            )
        }
        return userPosts.map(post => <PostItem key={post.PID} post={post} />)
    }

    return (
        <>
            <aside className="ass1-aside">
                <div className="ass1-content-head__t">
                    <div>Bài viết gần đây của bạn.</div>
                </div>

                {
                    userInfo ?
                        renderUserPosts()
                    :
                    <div>Vui lòng đăng nhập để xem nội dung này 
                        <Link href={'/login'}>
                            <span> Đăng nhập</span>
                        </Link>
                    </div>
                }
            </aside>
        </>
    )
}

export default HomeSideBar;