import { PostListItems } from "../../components/PostListItems"
import { HomeSideBar } from "../../components/HomeSideBar";
import { GetServerSideProps, InferGetServerSidePropsType, NextPageContext } from "next";
import React, { useEffect } from "react";
import { useGlobalState } from "../../state";
import postService from "../../services/postService";
import { getTokenCSRAndSSR } from "../../helpers";

export type PostType = {
	PID: string,
	USERID: string,
	fullname: string,
	profilepicture: string,
	url_image: string,
	post_content: string,
	time_added: string,
	status: string,
	count: string | null,
}

type HomeDateProps = {
	listPosts: PostType[],
	userPosts: PostType[]
}

type HomeProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const Home: HomeProps = ({
	listPosts,
	userPosts
}) => {

	return (
		<>
			<div className="container">
				<div className='row'>
					<div className='col-lg-8'>
						<PostListItems listPosts={ listPosts } />
					</div>
					<div className='col-lg-4'>
						<HomeSideBar userPosts={ userPosts }/>
					</div>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps<HomeDateProps> = async (context) => {
	const [token, userToken] = getTokenCSRAndSSR(context);
	const userid = userToken?.id;

	// let start = performance.now();
	const listPostPromise = postService.getPostPaging();
	const userPostPromise = postService.getPostByUserID({ userid, token });
	const [listPostRes, userPostRes] = await Promise.all([listPostPromise, userPostPromise]);
	// console.log(performance.now() - start);

	const props = {
		listPosts: listPostRes?.posts || [],
		userPosts: userPostRes?.posts || []
	}

	return {
		props
	};

}

export default Home;