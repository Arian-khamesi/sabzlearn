import React, { useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert';

export default function AdminContact() {

    const [allComments, setAllComments] = useState([])

    fetch("http://localhost:5000/v1/contact")
        .then(res => res.json())
        .then(result => setAllComments(result))

    console.log(allComments);

const showMsg=(msg)=>{
swal({
    title:msg,
    buttons:"بازگشت"
})
}

    return (
        <>
            <DataTable title={"نظرات کاربران"}>
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>نام و نام خانوادگی</th>
                            <th>شماره</th>
                            <th>ایمیل</th>
                            <th>مشاهده</th>
                            <th>تاریخ ثبت</th>
                            <th>حذف</th>
                            <th>پاسخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allComments.map((user, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button type="button" class="btn btn-success delete-btn" onClick={()=>showMsg(user.body)}>
                                    مشاهده متن پیام
                                    </button>
                                </td>
                                <td>{user.createdAt.slice(0, 10)}</td>
                                <td>
                                    <button type="button" class="btn btn-danger delete-btn">
                                        حذف
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-primary edit-btn" >
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
