import React from "react"
import dayjs from 'dayjs'
import { PostType } from "@/pages"
import Link from "next/link"
import relativeTime from 'dayjs/plugin/relativeTime';
import langVI from 'dayjs/locale/vi';
import { hightlightText } from "../../helpers";
import Image from "next/image";

dayjs.extend(relativeTime);

type PropsType = {
    post: PostType,
    customClass?: string,
    isHightlight?: boolean,
    query?: string
}

const PostItem: React.FC<PropsType> = ({
    post,
    customClass,
    isHightlight,
    query
}) => {
    
    const timeFormat = dayjs(post?.time_added).locale(langVI).fromNow();
    let className = "ass1-section__item";

    if (customClass) {
        className = className + " " + customClass;
    }

    const renderFullname = () => {
        if (isHightlight && query) {
            return hightlightText(post.fullname, query);
        }

        return post.fullname
    }

    const renderPostContent = () => {
        if (isHightlight && query) {
            return hightlightText(post.post_content, query);
        }

        return post.post_content
    }

    if (!post) return null;

    return (
        <>
            <div className={ className }>
                <div className="ass1-section">
                    <div className="ass1-section__head">
                        <Link href="/users/[userid]" as={`/users/${ post.USERID }`} className="ass1-section__avatar ass1-avatar">
                            <Image src={ post.profilepicture || "/images/avatar-02.png" } alt={ post.fullname } />
                        </Link>
                        <div>
                            <Link 
                                href="/users/[userid]" 
                                as={`/users/${ post.USERID }`} 
                                className="ass1-section__name"
                                dangerouslySetInnerHTML={{ __html: renderFullname() }}
                            />
                            <span className="ass1-section__passed">{ timeFormat }</span>
                        </div>
                    </div>
                    <div className="ass1-section__content">
                        <p 
                            dangerouslySetInnerHTML={{ __html: renderPostContent() }}
                        />
                        <div className="ass1-section__image">
                            <Link href="/posts/[postid]" as={`/posts/${ post.PID }`}>
                                <Image src={ post.url_image } alt={ post.url_image } />
                            </Link>
                        </div>
                    </div>
                    <div className="ass1-section__footer">
                        <Link href="/posts/[postid]"  as={`/posts/${ post.PID }`} className="ass1-section__btn-comment ass1-btn-icon">
                            <i className="icon-Comment_Full" />
                            <span>{ post.count || 0 }</span>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostItem