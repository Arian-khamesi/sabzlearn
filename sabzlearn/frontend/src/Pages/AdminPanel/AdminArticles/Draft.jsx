import React,{useState,useEffect} from 'react'
import swal from "sweetalert"
import { useForm } from '../../../hooks/useForm'
import Input from '../../../Components/Form/Input'
import { minValidator } from '../../../validators/rules'
import Editor from "../../../Components/Form/Editor"
import { Link, useParams } from 'react-router-dom'

export default function Draft() {

    const [mainArticles, setMainArticles] = useState({})
    const {shortName}=useParams()
    

    useEffect(() => {
        getmainArticles()
      }, [])
    
      const getmainArticles = () => {
        fetch(`http://localhost:5000/v1/articles/${shortName}`)
          .then(res => res.json())
          .then(result => setMainArticles(result))
      }
      

    ///////////////add article ////////////////////


    const [formState, onInputHandler] = useForm({
        title: {
            value: "",
            isValid: false,
        },
        shortName: {
            value: "",
            isValid: false,
        },
        description: {
            value: "",
            isValid: false,
        },
    }, false)

    const [allCategory, setAllCategory] = useState([])
    const [articleCategory, setArticleCategory] = useState(-1);
    const [articleCover, setArticleCover] = useState({});
    const [articleBody, setArticleBody] = useState("");

    useEffect(() => {
        getAllCategories()
    }, [])


    const getAllCategories = () => {
        fetch("http://localhost:5000/v1/category")
            .then(res => res.json())
            .then(result => setAllCategory(result))
    }

    const selectCategory = (event) => {
        console.log(event.target.value);
        setArticleCategory(event.target.value);
    }

    const addNewArticle = (event) => {
        event.preventDefault()
        const localStorageDate = JSON.parse(localStorage.getItem('user'))
        let formData = new FormData()
        formData.append('title', formState.inputs.title.value)
        formData.append('shortName', formState.inputs.shortName.value)
        formData.append('description', formState.inputs.description.value)
        formData.append('categoryID', articleCategory)
        formData.append('cover', articleCover)
        formData.append('body', articleBody)

        fetch(`http://localhost:5000/v1/articles`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorageDate.token}`
            },
            body: formData
        }).then(res => {
            if (res.ok) {
                swal({
                    title: 'مقاله جدید با موفقیت ایجاد شد',
                    icon: 'success',
                    buttons: 'اوکی'
                }).then(() => {
                    // getAllArticles()
                })
            }
        })
    }
    ////////////////////draft Article/////////////////////

    const addArticlesDraft = (event) => {
        event.preventDefault()
        const localStorageDate = JSON.parse(localStorage.getItem('user'))
        let formData = new FormData()
        formData.append('title', formState.inputs.title.value)
        formData.append('shortName', formState.inputs.shortName.value)
        formData.append('description', formState.inputs.description.value)
        formData.append('categoryID', articleCategory)
        formData.append('cover', articleCover)
        formData.append('body', articleBody)

        fetch(`http://localhost:5000/v1/articles/draft`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorageDate.token}`
            },
            body: formData
        }).then(res => {
            if (res.ok) {
                swal({
                    title: 'مقاله با موفقیت پیش نویس شد',
                    icon: 'success',
                    buttons: 'اوکی'
                }).then(() => {
                    // getAllArticles()
                })
            }
        })
    }


    return (
        <div className="container-fluid" id="home-content">
            <div className="container">
                <div className="home-title">
                    <span>افزودن مقاله جدید</span>
                </div>
                <form className="form">
                    <div className="col-6">
                        <div className="name input">
                            <label className="input-title" style={{ display: "block" }}>
                                عنوان
                            </label>
                            <Input
                                element="input"
                                type="text"
                                id="title"
                                onInputHandler={onInputHandler}
                                validations={[minValidator(8)]}
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="name input">
                            <label className="input-title" style={{ display: "block" }}>
                                لینک
                            </label>
                            <Input
                                element="input"
                                type="text"
                                id="shortName"
                                onInputHandler={onInputHandler}
                                validations={[minValidator(5)]}
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="name input">
                            <label className="input-title" style={{ display: "block" }}>
                                چکیده
                            </label>
                            {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}

                            <Input
                                element="textarea"
                                type="text"
                                id="description"
                                onInputHandler={onInputHandler}
                                validations={[minValidator(5)]}
                                className="article-textarea"
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="name input">
                            <label className="input-title" style={{ display: "block" }}>
                                محتوا
                            </label>
                            {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}

                            <Editor
                                value={articleBody}
                                setValue={setArticleBody}
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="name input">
                            <label className="input-title" style={{ display: "block" }}>
                                کاور
                            </label>
                            <input
                                type="file"
                                onChange={(event) => {
                                    setArticleCover(event.target.files[0]);
                                }}
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="name input">
                            <label className="input-title" style={{ display: "block" }}>
                                دسته بندی
                            </label>
                            <select
                                onChange={selectCategory}
                            >
                                <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                                {allCategory.map((category) => (
                                    <option value={category._id}>{category.title}</option>
                                ))}
                            </select>
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-2 set-child">
                        <div className="bottom-form">
                            <div className="submit-btn">
                                <input type="submit" value="انتشار" className={`login-form__btn login-panel__btn ${formState.isInputValid ? "success-sub" : "error-sub"}`} disabled={!formState.isInputValid} onClick={addNewArticle} />
                            </div>
                        </div>
                        <div className="bottom-form">
                            <div className="submit-btn">
                                <input type="submit" value="پیش نویس" className={`login-form__btn login-panel__btn ${formState.isInputValid ? "success-sub" : "error-sub"}`} disabled={!formState.isInputValid} onClick={addArticlesDraft} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
