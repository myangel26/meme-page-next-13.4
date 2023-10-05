import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { HomeSideBar } from "../../../components/HomeSideBar";
import { PostDetailContent } from "../../../components/PostDetailContent";
import { getTokenCSRAndSSR } from "../../../helpers";
import postService from "../../../services/postService";
import { PostType } from "..";
import userService from "../../../services/userService";

export type CategoryType = {
    TAG_ID: string,
    PID: string,
    tag_index: string,
    tag_value: string
}

export type CommentType = {
    CID: string,
    PID: string,
    USERID: string,
    fullname: string,
    profilepicture: string,
    comment: string,
    time_added: string
}

type PostDetailDataProps = {
    postDetailData: PostType,
    postCategories: CategoryType[],
    userPosts: PostType[],
    comments: CommentType[]
}

type PostDetailProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const PostDetail:PostDetailProps = ({
    userPosts,
    postDetailData,
    postCategories,
    comments
}) => {
    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <PostDetailContent 
                            postDetailData={postDetailData}
                            postCategories={postCategories}
                            listComments={comments}
                        />
                    </div>
                    <div className="col-lg-4">
                        <HomeSideBar userPosts={userPosts}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<PostDetailDataProps> = async (context) => {
	const [token, userToken] = getTokenCSRAndSSR(context);
	const userid = userToken?.id;
    const postid = context.query.postid as string;

	// let start = performance.now();
	const postDetailPromise = postService.getPostsByPostId({ postid, token });
	const userPostPromise = postService.getPostByUserID({ userid, token });
    const commentPostPromise = postService.getCommentByPostId(postid);
	const [postDetail, userPostRes, commentPostRes] = await Promise.all([postDetailPromise, userPostPromise, commentPostPromise]);
	// console.log(performance.now() - start);

    const postUserId = postDetail?.data?.post?.USERID || '';
    const userInfoData = await userService.getUserByID(postUserId);

    let postDetailData = null;
    if (postDetail?.data?.post) {
        postDetailData = {
            ...postDetail?.data?.post,
            fullname: userInfoData?.user?.fullname || '',
            profilepicture: userInfoData?.user?.profilepicture || '',
        }
    }

	const props = {
        postDetailData,
        postCategories: postDetail?.data?.categories || [],
		userPosts: userPostRes?.posts || [],
        comments: commentPostRes?.comments || []
	}

	return {
		props
	};

}

export default PostDetail;