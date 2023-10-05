import { useState } from "react";
import { PostDetailForm } from "../../../components/PostDetailForm";
import { PostDetailSideBar } from "../../../components/PostDetailSideBar";
import { useAuthen } from "../../../helpers/useAuthen";
import { useGlobalState } from "../../../state";
import postService from "../../../services/postService";
import { Store } from "react-notifications-component";
import { NotificationType } from "../../../constants/typeGlobal";

type postData = {
    url_image: string,
    post_content: string,
    category: string[],
    obj_image: {
        file: File | null,
        base64: string
    }
}

const initState:postData = {
    url_image: '',
    post_content: '',
    category: [],
    obj_image: {
        file: null,
        base64: ''
    }
}

export default function PostCreate(){
    useAuthen();

    const [postData, setPostData] = useState(initState);
    const [token, ] = useGlobalState('token');
    const [loading, setLoading] = useState(false);
    
    const onChangeDetailForm = (key: string, value: string | any) => {
        setPostData({ 
            ...postData, 
            [key]: value
        })
    }

    const handleSubmitPost = () => {
        setLoading(true);
        postService.createNewPost(postData, String(token))
        .then((res) => {
            if (res.status === 200) {
                Store.addNotification({
                    ...NotificationType,
                    type: "success",
                    title: "Success",
                    message: "Create new post successfully.",
                });
            }else{
                Store.addNotification({
                    ...NotificationType,
                    type: "danger",
                    title: "Error",
                    message: "Create new post failed.",
                });
            }
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <PostDetailForm 
                            url_image={postData.url_image}
                            post_content={postData.post_content}
                            obj_image={postData.obj_image}
                            onChangeDetailForm={onChangeDetailForm}
                        ></PostDetailForm>
                    </div>
                    <div className="col-lg-4">
                        <PostDetailSideBar 
                            loading={ loading }
                            handleSubmitPost= { handleSubmitPost }
                            category={ postData.category }
                            onChangeDetailForm={ onChangeDetailForm }
                        ></PostDetailSideBar>
                    </div>
                </div>
            </div>
        </>
    )
}   