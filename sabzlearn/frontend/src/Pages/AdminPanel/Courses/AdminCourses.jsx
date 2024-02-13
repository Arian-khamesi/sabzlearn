import React, { useEffect, useState } from 'react'
import "./AdminCourses.css"
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

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
  const [courseCategory, setCourseCategory] = useState("");

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

  return (
    <>

      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن محصول جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا نام محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">تعداد محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا تعداد محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label className="input-title">دسته‌بندی دوره</label>
                <select onChange={selectCategory}>
                  {allCategory.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس محصول</label>
                <input type="file" id="file" />
              </div>
            </div>
            <div class="col-6 midlle">
              <div class="presell">
                <label class="input-title">وضعیت دوره</label>
                <div class="radios">
                  <div class="presell-true">
                    <label>
                      <span>پیش فروش</span>
                      <input
                        type="radio"
                        value="presell"
                        name="presell"
                        checked
                      />
                    </label>
                  </div>
                  <div class="presell-false">
                    <label>
                      <span>در حال برگزاری</span>
                      <input type="radio" value="onperforming" name="presell" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 midlle">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title">موجودی</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>موجود</span>
                        <input
                          type="radio"
                          value="avalibe"
                          name="condition"
                          checked
                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>ناموجود</span>
                        <input
                          type="radio"
                          value="unavailable"
                          name="condition"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="submit-btn">
                  <input type="submit" value="افزودن" />
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
