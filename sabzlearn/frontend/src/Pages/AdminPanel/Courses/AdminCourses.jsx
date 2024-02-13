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

  return (
    <>
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
