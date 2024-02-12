import React, { useEffect, useState } from 'react'
import "./Users.css"
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'

export default function Users() {

  const [allUser, setAllUsers] = useState([])
  const localstorageData = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    getUsers()
  }, [])
  console.log(allUser)

  function getUsers() {
    fetch('http://localhost:5000/v1/users', {
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    })
      .then(res => res.json())
      .then(result => setAllUsers(result))
  }

  const userRemove = (id) => {
    console.log(id);
    swal({
      title: "آیا از حذف کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["انصراف", "حذف"]
    }).then(result => {
      result && remover(id)
    })
  }


  const remover = (userId) => {
    fetch(`http://localhost:5000/v1/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    })
      .then((res) => {
        res.json()
        res.ok && swal({ title: "کاربر مدنظر با موفقیت حذف شد", icon: "success", buttons: "بازگشت" })
      })
      .then(result => getUsers())
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
      remover(userId)
      getUsers()
    })
  }

  const userBlock = (id) => {
    console.log(id);
    swal({
      title: "آیا از مسدود کردن کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["انصراف", "مسدود"]
    }).then(result => {
      result && blocker(id)
  
    })
  }

  return (
    <>
      <DataTable title="کاربران">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>شماره</th>
              <th>ایمیل</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>مسدود کردن</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map(user => (
              <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn" onClick={() => userRemove(user._id)}>
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-secondary delete-btn" onClick={() => userBlock(user._id)}>
                    مسدود
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
