import api from './api';

import { 
    URL_GET_CATEGORIES, 
    URL_GET_POST_BY_CATEGORY_ID, 
    URL_GET_POST_PAGING, 
    URL_GET_POST_SEARCH, 
    URL_GET_POST_USERID,
    URL_CREAT_POST,
    URL_GET_POST_BY_POSTID,
    URL_GET_LIST_COMMENT_BY_POST_ID,
    URL_POST_COMMENT
} from '../constants';

type ObjImage = {
    file: File | null,
    base64: string
}

type TypePostCreate = {
    post_content: string, 
    url_image: string, 
    category: string[], 
    obj_image: ObjImage
}

const postService = {
    createNewPost: async ({ post_content, url_image, category, obj_image }: TypePostCreate, token: string) => {
        const data = new FormData();
        data.append('post_content', post_content);
        data.append('url_image', url_image);
        data.append('category', category.toString());
        if (obj_image.file) {
            data.append('obj_image', obj_image.file);
        }

        return api.callFormData(URL_CREAT_POST, {data, token});
    },
    getPostPaging: async ({ pagesize = 3, currPage = 1 } = {}) => {
        const url = `${URL_GET_POST_PAGING}pagesize=${pagesize}&currPage=${currPage}`;
        return await api.callJson(url);
    },
    getPostByUserID: async({ userid = '', token = ''} = {}) => {
        if (!userid || !token) {
            return {
                status: 200,
                posts : []
            }
        }
        const url = `${URL_GET_POST_USERID}${userid}`;
        return await api.callJson(url, { token });
    },
    getPostsByPostId: async({ postid = '', token = '' }) => {
        if (!postid || !token) {
            return {
                status: 500,
                error: 'postid or token is required'
            }
        }
        return api.callJson(`${URL_GET_POST_BY_POSTID}${postid}`);
    },
    getPostSearch: async({ query = '' }) => {
        return api.callJson(`${URL_GET_POST_SEARCH}${encodeURI(query)}`)
    },
    getPostCategories: async () => {
        return api.callJson(URL_GET_CATEGORIES);
    },
    getPostCategoriesByID: async ({ pagesize = 10, currPage = 1, tagIndex = '' } = {}) => {
        if (!tagIndex) return null;

        const params = `pagesize=${pagesize}&currPage=${currPage}&tagIndex=${tagIndex}`;
        return api.callJson(`${URL_GET_POST_BY_CATEGORY_ID}${params}` );
    },
    getCommentByPostId: async (postid: string) => {
        if (!postid) return null;
        return api.callJson(`${URL_GET_LIST_COMMENT_BY_POST_ID}${postid}`);
    },
    postComment: async ({ postid = '', commentValue = ''}, token: string) => {
        const data = {
            postid,
            comment: commentValue
        }
        const method = 'POST';
        return api.callJson(URL_POST_COMMENT, { data, method, token });
    }
}

export default postService;