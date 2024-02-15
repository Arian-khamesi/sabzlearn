import React, { useEffect, useState } from 'react'
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable"
import swal from 'sweetalert'

export default function Comments() {

  const [comments, setComments] = useState([])

  useEffect(() => {
    getAllComments()
  }, [])

  const getAllComments = () => {
    fetch('http://localhost:5000/v1/comments')
      .then(res => res.json())
      .then(allComments => setComments(allComments))
  }

  console.log(comments);
  /////////////////////delete comments/////////////////////
  const deleteComment = (id) => {
    swal({
      title: "از حذف این نظر مطمئن هستید ؟",
      icon: "warning",
      buttons: ["انصراف", "حذف"]
    }).then(result => {
      result && remover(id)
    })
  }

  const remover = (userId) => {
    const localstorageData = JSON.parse(localStorage.getItem("user"))
    fetch(`http://localhost:5000/v1/comments/${userId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    })
      .then((res) => {
        res.json()
        res.ok && swal({ title: "پیام مدنظر با موفقیت حذف شد", icon: "success", buttons: "بازگشت" })
      })
      .then(result => getAllComments())
  }
  return (
    <>
      <DataTable title="کامنت‌ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>دوره</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{comment.creator.name}</td>
                <td>{comment.course}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success edit-btn"
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning edit-btn"
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => deleteComment(comment._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-secondary delete-btn"
                  >
                    بن
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
