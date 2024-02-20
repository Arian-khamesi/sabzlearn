import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert";

import './EditAccount.css'
import { useNavigate } from "react-router-dom";

export default function EditAccount() {

    const [userInfos, setUserInfos] = useState({})
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = () => {
        const localStorageData = JSON.parse(localStorage.getItem("user"))

        if (localStorageData) {
            fetch("http://localhost:5000/v1/auth/me", {
                headers: {
                    "Authorization": `Bearer ${localStorageData.token}`
                }
            }).then(res => res.json())
                .then(userData => {
                    setUserInfos(userData)
                    setName(userData.name)
                    setPhone(userData.phone)
                    setUsername(userData.username)
                    setEmail(userData.email)

                })
        }
        console.log(userInfos);
    }

    //////////////////////set edits/////////////////////////////////

    const editAccountsInfo = (event) => {
        event.preventDefault()
        const editsInfo = {
            name,
            username,
            email,
            password,
            phone,
        }
        console.log(editsInfo);
        if (password === confirmPassword) {
            fetch("http://localhost:5000/v1/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorageData.token}`,
                },
                body: JSON.stringify(editsInfo)
            })
                .then((res) => {
                    res.json()
                    res.ok && swal({ title: "تغییرات حساب کاربریتان با موفقیت اعمال شد", icon: "success", buttons: "بازگشت" })
                })
                .then(result => navigate("/my-account"))
        }
        else {
            swal({
                title: "رمز عبور با تکرار آن یکسان نیست",
                icon: "error",
                buttons: "بازگشت"
            })
        }
    }

    return (
        <div className="col-9">
            <div className="edit">
                <form className="edit__form" action="#">
                    <div className="edit__personal">
                        <div className="row">
                            <div className="col-12">
                                <label className="edit__label">شماره موبایل *</label>
                                <input
                                    className="edit__input"
                                    type="text"
                                    value={phone}
                                    onChange={event => setPhone(event.target.value)}
                                    placeholder="لطفا شماره موبایل خود را وارد کنید"
                                />
                            </div>

                            <div className="col-12">
                                <label className="edit__label">نام و نام خانوادگی *</label>
                                <input
                                    className="edit__input"
                                    type="text"
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                    placeholder="لطفا نام نمایشی خود را وارد کنید"
                                />
                            </div>
                            <div className="col-12">
                                <label className="edit__label">نام کاربری (نمایشی) *</label>
                                <input
                                    className="edit__input"
                                    type="text"
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                    placeholder="لطفا نام نمایشی خود را وارد کنید"
                                />
                                <span className="edit__help">
                                    اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
                                </span>
                            </div>
                            <div className="col-12">
                                <label className="edit__label">آدرس ایمیل *</label>
                                <input
                                    className="edit__input"
                                    type="text"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    placeholder="لطفا نام نمایشی خود را وارد کنید"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="edit__password">
                        <span className="edit__password-title">تغییر گذرواژه</span>
                        <div className="row">
                            <div className="col-12">
                                <label className="edit__label">
                                    گذرواژه جدید (در صورتی که قصد تغییر ندارید خالی بگذارید)
                                </label>
                                <input
                                    className="edit__input"
                                    type="text"
                                    placeholder="گذرواژه جدید"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="col-12">
                                <label className="edit__label">تکرار گذرواژه جدید</label>
                                <input
                                    className="edit__input"
                                    type="text"
                                    placeholder="تکرار گذرواژه جدید"
                                    value={confirmPassword}
                                    onChange={event => setConfirmPassword(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <button className="edit__btn" type="submit" onClick={editAccountsInfo}>
                        ذخیره تغییرات
                    </button>
                </form>
            </div>
        </div>
    );
}
