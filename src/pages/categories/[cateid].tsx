import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { PostType } from "..";
import { PostItem } from "../../../components/PostItem";
import Masonry from 'react-masonry-css';
import postService from "../../../services/postService";
import { useGlobalState } from "../../../state";
import { breakpointColumnsObj } from "../../../constants/variableGlobal";

type Propstype = {
    listPosts: PostType[]
}

const Search: NextPage<Propstype> = ({
    listPosts
}) => {
    const router = useRouter();
    const categoryId = router.query.cateid || null;
    const [categories] = useGlobalState('categories');

    useEffect(() => {
        if (!categoryId) {
            router.push('/');
        }
    }, [categoryId]);

    const findText = useMemo(()=>{
        const findObj = categories.find((obj) => {
            return obj.id === Number(categoryId);
        })
        return findObj?.text || [];
    }, [categories, categoryId]);

    return (
        <>
            <div className="container">
                <div className="header-search" style={{ padding: '3% 0' }}>
                    <h3>Category Search: <strong>{ findText }</strong></h3>
                    <p>Result Search: <strong>{ listPosts.length }</strong></p>
                </div>
                <Masonry
                    breakpointCols={ breakpointColumnsObj }
                    className="ass1-section__wrap row ass1-section__isotope-init"
                    // columnClassName="my-masonry-grid_column"
                    >
                    {
                        listPosts.map(post => (
                            <PostItem 
                                key={post.PID} 
                                post={post} 
                                customClass='col-lg-12'
                            />
                        ))
                    }
                </Masonry>
            </div>
        </>
    )
}

Search.getInitialProps = async (ctx: NextPageContext) => {
    const tagIndex = (ctx.query.cateid || '') as string;
    const listPostsRes = await postService.getPostCategoriesByID({ tagIndex });

    const props = {
        listPosts: listPostsRes?.posts || []
    }

    return props;
};

export default Search;