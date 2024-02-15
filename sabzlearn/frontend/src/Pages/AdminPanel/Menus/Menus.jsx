import React, { useEffect, useState } from 'react'
import "./Menus.css"
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import { Link } from "react-router-dom"
import swal from 'sweetalert'

export default function Menus() {

  const [allMenus, setAllMenus] = useState([])

  useEffect(() => {
    getAllMenus()
  }, [])

  const getAllMenus = () => {
    fetch("http://localhost:5000/v1/menus/all")
      .then(res => res.json())
      .then(result => setAllMenus(result))
  }


  // console.log(allMenus);

  //////////////////delete menu////////////////////////

  const deleteMenu = (id) => {
    swal({
      title: "از حذف این منو مطمئن هستید ؟",
      icon: "warning",
      buttons: ["انصراف", "حذف"]
    }).then(result => {
      result && remover(id)
    })
  }

  const remover = (userId) => {
    const localstorageData = JSON.parse(localStorage.getItem("user"))
    fetch(`http://localhost:5000/v1/menus/${userId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    })
      .then((res) => {
        res.json()
        res.ok && swal({ title: "منو مدنظر با موفقیت حذف شد", icon: "success", buttons: "بازگشت" })
      })
      .then(result => getAllMenus())
  }

  return (
    <>
      <DataTable title={"منو ها"}>
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>اصلی یا ساب منو</th>
              <th>عنوان</th>
              <th>لینک</th>
              <th>فرزند</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {allMenus.map((menu, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{menu.parent ? "زیر منو" : "منو اصلی"}</td>
                <td>{menu.title}</td>
                <td><Link to={menu.href}>{menu.href}</Link></td>
                <td>{menu.parent ? menu.parent.title : <i class="fa fa-times-circle" aria-hidden="true" style={{ color: "#dc3545" }}></i>
                }</td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn" onClick={() => deleteMenu(menu._id)}>
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    پاسخ
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
