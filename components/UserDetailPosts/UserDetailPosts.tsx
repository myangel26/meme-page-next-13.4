import { PostType } from "@/pages";
import React from "react";
import Masonry from "react-masonry-css";
import { breakpointColumnsObj } from "../../constants/variableGlobal";
import { PostItem } from "../PostItem";

type PropsType = {
    userDeatailPosts: PostType[]
}

const UserDetailPosts: React.FC<PropsType> = ({
    userDeatailPosts
}) => {
    return (
        <>

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="ass1-section__wrap row ass1-section__isotope-init user-detail-posts-wrapper"
                // columnClassName="my-masonry-grid_column"
            >
                {
                    userDeatailPosts.map(post => (
                        <PostItem
                            key={post.PID}
                            post={post}
                            customClass='col-lg-12'
                        />
                    ))
                }
            </Masonry>

        </>
    )
}

export default UserDetailPosts;