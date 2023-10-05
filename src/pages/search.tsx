import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PostType } from ".";
import postService from "../../services/postService";
import { PostItem } from "../../components/PostItem";
import Masonry from 'react-masonry-css';
import { breakpointColumnsObj } from "../../constants/variableGlobal";

type Propstype = {
    listPosts: PostType[]
}

const Search: NextPage<Propstype> = ({
    listPosts
}) => {
    const router = useRouter();
    const searchStr = (router.query.q || '') as string;

    useEffect(() => {
        if (!searchStr) {
            router.push('/');
        }
    }, [searchStr]);

    return (
        <>
            <div className="container">
                <div className="header-search" style={{ padding: '3% 0' }}>
                    <h3>Key Search: <strong>{ searchStr }</strong></h3>
                    <p>Result Search: <strong>{ listPosts.length }</strong></p>
                </div>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="ass1-section__wrap row ass1-section__isotope-init"
                    // columnClassName="my-masonry-grid_column"
                    >
                    {
                        listPosts.map(post => (
                            <PostItem 
                                key={post.PID} 
                                post={post} 
                                customClass='col-lg-12'
                                isHightlight={true}
                                query={ searchStr }
                            />
                        ))
                    }
                </Masonry>
                

            </div>
        </>
    )
}

Search.getInitialProps = async (ctx: NextPageContext) => {
    const query = (ctx.query.q || '') as string;
    const listPostsRes = await postService.getPostSearch({ query });

    const props = {
        listPosts: listPostsRes.posts || []
    }

    return props;
};

export default Search;