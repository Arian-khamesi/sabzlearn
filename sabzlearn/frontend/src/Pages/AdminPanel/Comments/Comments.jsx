import React, { useEffect, useState } from 'react'
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable"
import swal from 'sweetalert'
import "./Comments.css"

export default function Comments() {

  const [comments, setComments] = useState([])
  const localstorageData = JSON.parse(localStorage.getItem("user"))

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

  /////////////////show body comment/////////////////////
  const showMsg = (msg) => {
    swal({
      title: msg,
      buttons: "بازگشت"
    })
  }
  /////////////////////////block user////////////////////

  const userBlock = (id) => {

    swal({
      title: "آیا از مسدود کردن کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["انصراف", "مسدود"]
    }).then(result => {
      result && blocker(id)

    })
  }

  const blocker = (userId) => {
    console.log(localstorageData)
    fetch(`http://localhost:5000/v1/users/ban/${userId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    })
      .then((res) => {
        res.json()
        res.ok && swal({ title: "کاربر مدنظر با موفقیت مسدود شد", icon: "success", buttons: "بازگشت" })
      })
      .then(result => {
        // remover(userId)
        getAllComments()
      })
  }
  ///////////////////answer comment//////////////////
  const answerMsg = (userID) => {

    swal({
      title: "پاسخ به این پیام :",
      content: "input",
      buttons: "ارسال"
    })
      .then(res => {
        if (res) {
          const answerInfo = {
            body: res
          }

          res && sendAnswer(answerInfo, userID)
        }
      })
  }



  const sendAnswer = (answer, id) => {

    fetch(`http://localhost:5000/v1/comments/answer/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localstorageData.token}`
      },
      body: JSON.stringify(answer)
    })
      .then((res) => {
        res.json()
        res.ok && swal({ title: "پاسخ مدنظر با موفقیت ارسال شد", icon: "success", buttons: "بازگشت" })
      })
      .then(result => getAllComments())
  }

  /////////////////////accept comment////////////////////////

  const acceptMsg = (id) => {
    swal({
      title: "آیا از تایید کردن این نظر اطمینان دارید؟",
      icon: "warning",
      buttons: ["انصراف", "تایید"]
    }).then(result => {
      result && accepter(id)

    })
  }

  const accepter = (userId) => {
    fetch(`http://localhost:5000/v1/comments/accept/${userId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    })
      .then((res) => {
        res.json()
        res.ok && swal({ title: "پیام مدنظر با موفقیت تایید شد", icon: "success", buttons: "بازگشت" })
      })
      .then(result => {
        // remover(userId)
        getAllComments()
      })
  }

  /////////////////////reject comment/////////////////////

  const rejectMsg = (id) => {
    swal({
      title: "آیا از رد کردن این نظر اطمینان دارید؟",
      icon: "warning",
      buttons: ["انصراف", "رد"]
    }).then(result => {
      result && rejecter(id)

    })
  }

  const rejecter = (userId) => {
    fetch(`http://localhost:5000/v1/comments/reject/${userId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    })
      .then((res) => {
        res.json()
        res.ok && swal({ title: "پیام مدنظر با موفقیت رد شد", icon: "success", buttons: "بازگشت" })
      })
      .then(result => {
        getAllComments()
      })
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
              <th>امتیاز</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>تایید نظر</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr>
                <td className={comment.answer ? "success-border" : "error-border"}>{index + 1}</td>
                <td>{comment.creator.name}</td>
                <td>{comment.course}</td>
                <td>
                  {Array(5 - comment.score).fill(0).map(item => (
                    <img src="/images/svgs/star.svg" alt="score" />
                  ))}
                  {Array(comment.score).fill(0).map(item => (
                    <img src="/images/svgs/star_fill.svg" alt="score" />
                  ))}
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success edit-btn"
                    onClick={() => showMsg(comment.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  {comment.answer ? <i class="fa fa-check-square" aria-hidden="true" style={{ color: "#54b464", fontSize: "22px" }}></i> :
                    <button type="button" class="btn btn-primary edit-btn" onClick={() => answerMsg(comment._id)}>
                      پاسخ
                    </button>
                  }
                </td>
                <td>
                  {comment.answer ? <button type="button" class="btn btn-danger edit-btn" onClick={() => rejectMsg(comment._id)}>
                    رد نظر
                  </button> :
                    <button type="button" class="btn btn-success edit-btn" onClick={() => acceptMsg(comment._id)}>
                      تایید
                    </button>
                  }
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
                    onClick={() => userBlock(comment.creator._id)}
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
