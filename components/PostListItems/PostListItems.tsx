import React, { useState } from "react";
import { PostItem } from "../PostItem"
import { PostType } from "@/pages";
import postService from "../../services/postService";
import { Button } from "../Button";

type PropsType = {
    listPosts: PostType[]
}

const PostListItems:React.FC<PropsType> = ( props ) => {

    const [isLoading, setIsLoading] = useState(false);
    const [listPosts, setListPosts] = useState(props.listPosts);
    const [currPage, setCurrPage] = useState(1);
    const pagesize = 3;

    const handleLoadMore = () => {
        if (isLoading) return;
        
        setIsLoading(true);
        postService.getPostPaging({ pagesize, currPage: currPage + 1 })
            .then(res => {
                if (res.status === 200) {
                    const newPosts = res.posts || [];
                    setListPosts([
                        ...listPosts,
                        ...newPosts
                    ])
                    setCurrPage((prev) => prev + 1)
                }
            })
            .finally(() => setIsLoading(false))
    }

    return(
        <>
            <div className="ass1-section__list">
                {
                    listPosts.map(post => <PostItem key={post.PID} post={post} />)
                }

                <Button
                    type="button"
                    onClick={ handleLoadMore } 
                    className="load-more ass1-btn"
                    isLoading={ isLoading }
                >
                        <span>Xem thêm</span>
                </Button>
            </div>
        </>
    )
}

export default PostListItems;