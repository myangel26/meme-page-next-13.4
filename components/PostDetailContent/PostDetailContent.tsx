import styles from '@/styles/postDetailContent.module.scss'; 

import React, { useState } from "react";
import { PostCommentForm } from "../PostCommentForm";
import { PostCommentList } from "../PostCommentList";
import { PostItem } from "../PostItem";
import { PostType } from "@/pages";
import { CategoryType, CommentType } from "@/pages/posts/[postid]";
import Link from "next/link";
import postService from '../../services/postService';
import { useRouter } from 'next/router';
import { useGlobalState } from '../../state';

type PropsType = {
    postDetailData: PostType
    postCategories: CategoryType[],
    listComments: CommentType[]
}

const PostDetailContent: React.FC<PropsType> = ({
    postDetailData,
    postCategories,
    listComments: initListComments
}) => {

    const [listComments, setListComments] = useState(initListComments);
    const route = useRouter();
    const postid = route.query.postid as string;
    const[token, ] = useGlobalState('token');

    const handleSubmitForm = async (commentValue: string, callback: (e?: any) => void) => {
        try {
            const postCommentRes = await postService.postComment({ postid, commentValue }, String(token));
            if (postCommentRes.status !== 200) throw new Error("Post Comment is error");

            const listCommentsRes = await postService.getCommentByPostId(postid);
            if(listCommentsRes.status === 200) {
                setListComments(listCommentsRes.comments);
                callback();
            }
        } catch (error) {
            console.log(error);
            callback(error);
        }
    }

    return (
        <>
            <div className="ass1-section__list">

                <PostItem post={postDetailData}/>

                <div className={styles.list_categories}>
                    <h5><strong>Danh mục: </strong></h5>
                    <ul>
                        {
                            postCategories.map((item, index) => {
                                return (
                                    <li key={item.TAG_ID}>
                                        <Link href={ '/categories/[cateid]' } as={ `/categories/${ item.tag_index }` }>{item.tag_value}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                
                <PostCommentForm handleSubmitForm={handleSubmitForm}/>

                <PostCommentList listComments={listComments}/>
            </div>
        </>
    )
}

export default PostDetailContent;