import React, { useEffect, useState } from 'react'
import "./AdminArticles.css"
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from "sweetalert"
import { useForm } from '../../../hooks/useForm'
import Input from '../../../Components/Form/Input'
import { minValidator } from '../../../validators/rules'

export default function AdminArticles() {

  const [allArticles, setAllArticles] = useState([])

  useEffect(() => {
    getAllArticles()
  }, [])

  const getAllArticles = () => {
    fetch("http://localhost:5000/v1/articles")
      .then(res => res.json())
      .then(result => setAllArticles(result))
  }

  //////////////////////delete article//////////////////////

  const articleRemover = (id) => {
    swal({
      title: "از حذف این مقاله اطمینان دارید ؟",
      icon: "warning",
      buttons: ["انصراف", "حذف"]
    })
      .then(result => {
        result && remover(id)
      })
  }

  const remover = (articleId) => {
    const localstorageData = JSON.parse(localStorage.getItem("user"))
    fetch(`http://localhost:5000/v1/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    })
      .then((res) => {
        res.json()
        res.ok && swal({ title: "مقاله مدنظر با موفقیت حذف شد", icon: "success", buttons: "بازگشت" })
      })
      .then(result => getAllArticles())
  }
  ////////////////////////add article//////////////////////////////

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

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن مقاله جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  عنوان
                </label>
                <Input
                  element="input"
                  type="text"
                  id="title"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(8)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <Input
                  element="input"
                  type="text"
                  id="shortName"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
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
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input
                  type="file"
                  onChange={(event) => {
                    setArticleCover(event.target.files[0]);
                  }}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
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
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input type="submit" value="افزودن" className={`login-form__btn login-panel__btn ${formState.isInputValid ? "success-sub" : "error-sub"}`} disabled={!formState.isInputValid}/>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title={"مقاله ها"}>
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان مقاله</th>
              <th>لینک</th>
              <th>نویسنده</th>
              <th>تاریخ ثبت</th>
              <th>ویرایش</th>
              <th>حذف</th>

            </tr>
          </thead>
          <tbody>
            {allArticles.map((article, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.shortName}</td>
                <td>{article.creator.name}</td>
                <td>{article.createdAt.slice(0, 10)}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn" onClick={() => articleRemover(article._id)}>
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  )
}
