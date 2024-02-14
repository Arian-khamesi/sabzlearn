import React, { useEffect, useState } from 'react'
import "./AdminArticles.css"
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from "sweetalert"

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

  return (
    <>
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
