import React, { useEffect, useState } from 'react'
import "./Users.css"
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

export default function Users() {

  const [allUser, setAllUsers] = useState([])
  const localstorageData = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetch('http://localhost:5000/v1/users', {
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    })
      .then(res => res.json())
      .then(result => setAllUsers(result))
  }, [])
  console.log(allUser)
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
           {allUser.map(user=>(
             <tr>
             <td>{user._id}</td>
             <td>{user.name}</td>
             <td>09123443243</td>
             <td>{user.email}</td>
             <td>
               <button type="button" class="btn btn-primary edit-btn">
                 ویرایش
               </button>
             </td>
             <td>
               <button type="button" class="btn btn-danger delete-btn">
                 حذف
               </button>
             </td>
             <td>
               <button type="button" class="btn btn-secondary delete-btn">
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
