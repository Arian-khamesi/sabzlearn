import React, { useEffect, useState } from 'react'
import "./AdminCourses.css"
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

import Input from "../../../Components/Form/Input"
import { requiredValidator, minValidator, maxValidator, phoneValidator } from '../../../validators/rules'
import { useForm } from '../../../hooks/useForm'


export default function Courses() {

  const localstorageData = JSON.parse(localStorage.getItem("user"))
  const [allCourses, setAllCourses] = useState([])


  useEffect(() => {
    getCourses()
  }, [])

  const getCourses = () => {
    fetch('http://localhost:5000/v1/courses', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    }).then(res => res.json())
      .then(result => {
        setAllCourses(result)
      })
  }

  console.log(allCourses);

  /////////////////////delete course////////////////////

  const courseRemover = (courseId, courseName) => {
    swal({
      title: `آیا از حذف  ${courseName} اطمینان دارید؟`,
      icon: "warning",
      buttons: ["انصراف", "حذف"]
    }).then(result => {
      result && remover(courseId)
    })
  }


  const remover = (userId) => {
    fetch(`http://localhost:5000/v1/courses/${userId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    })
      .then((res) => {
        res.json()
        res.ok && swal({ title: "دوره مدنظر با موفقیت حذف شد", icon: "success", buttons: "بازگشت" })
      })
      .then(result => getCourses())
  }


  /////////////////////////////get category id//////////////////

  const [allCategory, setAllCategory] = useState([])
  const [courseCategory, setCourseCategory] = useState(-1);

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
    setCourseCategory(event.target.value);
  }



  ///////////////////////inputs////////////////////////

  const [courseStatus, setCourseStatus] = useState('start')
  const [courseCover, setCourseCover] = useState({})

  const [formState, onInputHandler] = useForm({
    name: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
    shortName: {
      value: "",
      isValid: false,
    },
    price: {
      value: "",
      isValid: false,
    },
    support: {
      value: "",
      isValid: false,
    },
  }, false)

  const addNewCourse = (event) => {
    event.preventDefault()
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    let formData = new FormData()
    formData.append('name', formState.inputs.name.value)
    formData.append('description', formState.inputs.description.value)
    formData.append('shortName', formState.inputs.shortName.value)
    formData.append('categoryID', courseCategory)
    formData.append('price', formState.inputs.price.value)
    formData.append('support', formState.inputs.support.value)
    formData.append('status', courseStatus)
    formData.append('cover', courseCover)

    // console.log(formData);
    // console.log(Boolean(courseCover.name));
    // console.log(courseCategory);

    if (courseCategory === -1) {
      swal({
        title: "لطفا دسته بندی دوره جدید را انتخاب نمایید",
        icon: "error",
        buttons: "بازگشت"
      })
    }
    if(!courseCover.name) {
      swal({
        title: "لطفا عکس دوره جدید را انتخاب نمایید",
        icon: "error",
        buttons: "بازگشت"
      })
    }
    else {
      fetch(`http://localhost:5000/v1/courses`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorageData.token}`
        },
        body: formData
      }).then(res => {
        console.log(res);
        if (res.ok) {
          swal({
            title: 'دوره جدید با موفقیت اضافه شد',
            icon: 'success',
            buttons: 'بازگشت'
          }).then(() => {
            getCourses()
          })
        }
      })
    }

  }

  return (
    <>

      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام دوره</label>
                <Input
                  id="name"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا نام دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">توضیحات دوره</label>
                <Input
                  id="description"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا توضیحات دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">Url دوره</label>
                <Input
                  id="shortName"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا Url دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت دوره</label>
                <Input
                  id="price"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5), phoneValidator()]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">نحوه پشتیبانی دوره</label>
                <Input
                  id="support"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">دسته‌بندی دوره</label>
                <select onChange={selectCategory}>
                  <option value={-1}>لطفا دسته بندی موردنظر را انتخاب نمایید</option>
                  {allCategory.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس دوره</label>
                <input type="file" id="file" onChange={event => {
                  console.log(event.target.files[0]);
                  setCourseCover(event.target.files[0])
                }} />
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title">وضعیت دوره</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>در حال برگزاری</span>
                        <input
                          type="radio"
                          value="start"
                          name="condition"
                          checked
                          onInput={event => setCourseStatus(event.target.value)}
                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>پیش فروش</span>
                        <input
                          type="radio"
                          value="presell"
                          name="condition"
                          onInput={event => setCourseStatus(event.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="submit-btn">
                  <input type="submit" value="افزودن" onClick={addNewCourse} className={`login-form__btn login-panel__btn ${formState.isInputValid ? "success-sub" : "error-sub"}`} disabled={!formState.isInputValid} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title="کاربران">
        <table class="table">
          <thead>
            <tr>
              <th>عنوان دوره</th>
              <th>مبلغ دوره</th>
              <th>دسته بندی</th>
              <th>وضعیت</th>
              <th>مدرس</th>
              <th>لینک</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {allCourses.map(course => (
              <tr>
                <td>{course.name}</td>
                <td>{course.price ? course.price.toLocaleString() : "رایگان"}</td>
                <td>{[course.categoryID].title}</td>
                <td>{course.isComplete ? "به اتمام رسیده" : "درحال برگزاری"}</td>
                <td>{course.creator}</td>
                <td><Link to={`/course-info/${course.shortName}`}>{course.shortName}</Link></td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn" onClick={() => courseRemover(course._id, course.name)}>
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
