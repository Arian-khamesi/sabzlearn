import React, { useEffect, useState } from 'react'
import "./AdminCategory.css"
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

import Input from '../../../Components/Form/Input'
import { minValidator, maxValidator } from '../../../validators/rules'
import { useForm } from '../../../hooks/useForm'
import swal from 'sweetalert'

export default function AdminCategory() {

  const [allCategory, setAllCategory] = useState([])

  useEffect(() => {
    getAllCategories()
  }, [])


  const getAllCategories = () => {
    fetch("http://localhost:5000/v1/category")
      .then(res => res.json())
      .then(result => setAllCategory(result))
  }

  /////////////////////creat category/////////////////////////

  const createNewCategory = (event) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    const newCategoryInfo = {
      title: formState.inputs.title.value,
      name: formState.inputs.shortname.value,
    };

    fetch("http://localhost:5000/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify(newCategoryInfo)
    })
      .then(res => res.json())
      .then(result => swal({
        title: "دسته بندی مورد نظر با موفقیت اضافه شد",
        icon: "success",
        buttons: "بازگشت",
      })).then(() => {
        getAllCategories()
      })
  }


  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortname: {
        value: "",
        isValid: false,
      },
    },
    false)

  //////////////////////remove category/////////////////////

  const categoryRemover = (categoryId) => {

    swal({
      title: "آیا از حذف این دسته بندی از دوره ها اطمینان دارید؟",
      icon: "warning",
      buttons: ["انصراف", "حذف"]
    }).then(result => {
      result && remover(categoryId)
    })

  }

  const remover = (categoryId) => {

    const localStorageData = JSON.parse(localStorage.getItem("user"))

    fetch(`http://localhost:5000/v1/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => {
        res.json()
        res.ok && swal({ title: "دسته بندی مدنظر با موفقیت حذف شد", icon: "success", buttons: "بازگشت" })
      })
      .then(result => getAllCategories())
  }


  /////////////////////////update category//////////////////////

  const categoryUpdater = (categoryId,categoryName) => {
    swal({
      title: "عنوان دسته بندی مدنظر را وارد کنید",
      content: "input",
      buttons:  ["انصراف", "ویرایش"]
    })
      .then(result => {
        updater(categoryId,categoryName, result)
      })

  }

  const updater = (id,categoryName, categoryTitle) => {

    const localStorageData = JSON.parse(localStorage.getItem("user"))

    fetch(`http://localhost:5000/v1/category/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorageData.token}`,
      },
      body:JSON.stringify({
        title:categoryTitle,
        name:categoryName
      })
    })
      .then(res => {
        res.json()
        res.ok && swal({ title: "دسته بندی مدنظر با موفقیت ویرایش شد", icon: "success", buttons: "بازگشت" })
      })
      .then(result => getAllCategories())
  }

  return (
    <>

      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن دسته‌بندی جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  placeholder="لطفا عنوان را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title">اسم کوتاه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="shortname"
                  placeholder="لطفا اسم کوتاه را وارد کنید..."
                  validations={[minValidator(3), maxValidator(20)]}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    className={`login-form__btn login-panel__btn ${formState.isInputValid ? "success-sub" : "error-sub"}`} disabled={!formState.isInputValid}
                    type="submit"
                    value="افزودن"
                    onClick={createNewCategory}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title={"دسته بندی ها"}>

        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان دوره</th>
              <th>اسم کوتاه</th>
              <th>آخرین به روز رسانی</th>

            </tr>
          </thead>
          <tbody>
            {allCategory.map(category => (
              <tr>
                <td>{category._id}</td>
                <td>{category.title}</td>
                <td>{category.name}</td>
                <td>{category.updatedAt.slice(0, 10)}</td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn" onClick={() => categoryUpdater(category._id,category.name)}>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger delete-btn" onClick={() => categoryRemover(category._id)}>
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
