const BASE_URL = 'http://apiluc.zendvn.com/api';

const URL_LOGIN = '/member/login.php';
const URL_REGISTER = '/member/register.php';
const URL_GET_USER_BY_ID = '/member/member.php?userid=';
const URL_POST_CHANGE_PASSWORD = '/member/password.php';
const URL_POST_UPDATE_USER = '/member/update.php';

const URL_GET_POST_PAGING = '/post/getListPagination.php?';
const URL_GET_POST_USERID = '/post/getListPostUserID.php?userid=';
const URL_GET_POST_BY_POSTID = '/post/post.php?postid=';
const URL_GET_POST_SEARCH = '/post/search.php?query=';
const URL_GET_CATEGORIES = '/categories/index.php';
const URL_GET_POST_BY_CATEGORY_ID = '/post/getListByCategory.php?';
const URL_GET_LIST_COMMENT_BY_POST_ID = '/comment/comments.php?postid=';
const URL_CREAT_POST = '/post/addNew.php';
const URL_POST_COMMENT = '/comment/add_new.php';

const MES_SUCCESS = 'Success!!!';
const MES_SERVER_ERROR = 'Internal Server Error!!!';
const MES_WRONG_METHOD = 'The method is not allowed!!!';
const MES_USER_OR_PASSWORD_INVALID = 'The method is not allowed!!!';

const INTERNAL_URL_LOGIN = '/api/login';

export { 
    BASE_URL,
    URL_LOGIN,
    URL_REGISTER,
    URL_GET_USER_BY_ID,
    MES_SERVER_ERROR,
    MES_WRONG_METHOD,
    MES_SUCCESS,
    MES_USER_OR_PASSWORD_INVALID,
    INTERNAL_URL_LOGIN,
    URL_GET_POST_PAGING,
    URL_GET_POST_USERID,
    URL_GET_POST_SEARCH,
    URL_GET_CATEGORIES,
    URL_GET_POST_BY_CATEGORY_ID,
    URL_POST_CHANGE_PASSWORD,
    URL_POST_UPDATE_USER,
    URL_CREAT_POST,
    URL_GET_POST_BY_POSTID,
    URL_GET_LIST_COMMENT_BY_POST_ID,
    URL_POST_COMMENT
};