import React, { useEffect, useState } from 'react'
import "./AdminArticles.css"
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

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

  console.log(allArticles);

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
            {allArticles.map((article,index )=> (
              <tr>
                <td>{index+1}</td>
                <td>{article.title}</td>
                <td>{article.shortName}</td>
                <td>{article.creator.name}</td>
                <td>{article.createdAt.slice(0,10)}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn" >
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
