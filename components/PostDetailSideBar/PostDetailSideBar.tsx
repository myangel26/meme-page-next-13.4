import React from "react";
import { useGlobalState } from "../../state";
import { Button } from "../Button";

type PropsType = {
    category: string[],
    onChangeDetailForm: (key: string, value: string[]) => void,
    handleSubmitPost: () => void,
    loading: boolean
}

const PostDetailSideBar:React.FC<PropsType> = ({
    category,
    onChangeDetailForm,
    handleSubmitPost,
    loading
}) => {

    const [listCategories] = useGlobalState('categories');

    const handleOnChange = (_evt: React.ChangeEvent<HTMLInputElement>) => {
        const isCheck = _evt.target.checked;
        const value = _evt.target.value;
        const findIdx = category.findIndex(cateId => cateId === value);
        const isExisting = findIdx !== -1;
        if (isCheck && !isExisting) {
            onChangeDetailForm('category', [ ...category, value])
        } else if (!isCheck) {
            onChangeDetailForm('category', category.filter(id => id !== value) )
        }
    };

    return (
        <>
            <aside className="ass1-aside ass1-aside__edit-post">
                <div>
                    <Button
                        isLoading={loading}
                        onClick={ handleSubmitPost }
                        className="ass1-btn">
                        Đăng bài
                    </Button>
                </div>
                <div className="ass1-aside__edit-post-head">
                    <span style={{ display: "block", width: "100%", marginBottom: 10 }}>
                        Chọn danh mục
                    </span>
                    {
                        listCategories && listCategories.map(cate => {
                            return (
                                <label className="ass1-checkbox" key={ cate.id }>
                                    <input 
                                        type="checkbox"
                                        name="category" 
                                        value={ cate.id }
                                        onChange={ handleOnChange }
                                    />
                                    <span />
                                    <p>{ cate.text }</p>
                                </label>
                            )
                        })
                    }
                    
                </div>
                <div className="ass1-aside__get-code">
                    <p>Share Link</p>
                </div>
                <div className="ass1-aside__social">
                    <a href="" className="ass1-btn-social__facebook ass1-btn-social">
                        <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                    <a href="" className="ass1-btn-social__twitter ass1-btn-social">
                        <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                    <a href="" className="ass1-btn-social__google ass1-btn-social">
                        <i className="fa fa-google-plus" aria-hidden="true" />
                    </a>
                </div>
            </aside>

        </>
    )
}

export default PostDetailSideBar;