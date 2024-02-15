import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert';

export default function AdminContact() {

    const [allComments, setAllComments] = useState([])

    useEffect(() => {
        getAllComments()
    }, [])

    const getAllComments = () => {
        fetch("http://localhost:5000/v1/contact")
            .then(res => res.json())
            .then(result => setAllComments(result))
    }

    const showMsg = (msg) => {
        swal({
            title: msg,
            buttons: "بازگشت"
        })
    }

    /////////////answer msg//////////////////////////

    const answerMsg = (userEmail) => {

        swal({
            title: "پاسخ به این پیام :",
            content: "input",
            buttons: "ارسال"
        })
            .then(res => {
                const answerInfo = {
                    email: userEmail,
                    answer: res
                }
                res && sendAnswer(answerInfo)
            })

    }

    const sendAnswer = (answer) => {
        const localstorageData = JSON.parse(localStorage.getItem("user"))

        fetch("http://localhost:5000/v1/contact/answer", {
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
            .then(result=>getAllComments())
    }

    //////////////////////////delete msg/////////////////////

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
        fetch(`http://localhost:5000/v1/contact/${userId}`, {
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
                                    <button type="button" class="btn btn-success delete-btn" onClick={() => showMsg(user.body)}>
                                        مشاهده متن پیام
                                    </button>
                                </td>
                                <td>{user.createdAt.slice(0, 10)}</td>
                                <td>
                                    <button type="button" class="btn btn-danger delete-btn" onClick={() => deleteComment(user._id)}>
                                        حذف
                                    </button>
                                </td>
                                <td>
                                    {user.answer ?<i class="fa fa-check-square" aria-hidden="true" style={{color:"#54b464",fontSize:"22px"}}></i>:
                                        <button type="button" class="btn btn-primary edit-btn" onClick={() => answerMsg(user.email)}>
                                            پاسخ
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DataTable>
        </>
    )
}
