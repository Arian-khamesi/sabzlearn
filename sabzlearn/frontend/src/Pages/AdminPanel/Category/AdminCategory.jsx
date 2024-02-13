import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

export default function AdminCategory() {

const [allCategory,setAllCategory]=useState([])

useEffect(()=>{
  fetch("http://localhost:5000/v1/category")
  .then(res=>res.json())
  .then(result=>setAllCategory(result))
},[])


  return (
    <>
    <DataTable title={"دسته بندی ها"}>

    <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان دوره</th>
              <th>آخرین به روز رسانی</th>
             
            </tr>
          </thead>
          <tbody>
            {allCategory.map(category => (
              <tr>
                <td>{category._id}</td>
                <td>{category.title}</td>
                <td>{category.updatedAt.slice(0,10)}</td>
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
