import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";


export default function Sidebar({ name }) {


    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    // const [userInfos, setUserInfos] = useState({})

    // // console.log(authContext);
    // useEffect(() => {

    //     const localStorageData = JSON.parse(localStorage.getItem("user"))

    //     if (localStorageData) {
    //       fetch("http://localhost:5000/v1/auth/me", {
    //         headers: {
    //           "Authorization": `Bearer ${localStorageData.token}`
    //         }
    //       }).then(res => res.json())
    //         .then(userData => {
    //           setUserInfos(userData)

    //         })
    //     }
    //     console.log(userInfos);
    //     //  else {
    //     //   setIsLoggedIn(false)
    //     // }

    //   }, [])

    const logoutUser = (event) => {
        event.preventDefault()
        swal({
            title: "آیا می خواهید از حساب کاربری خود خارج شوید؟",
            icon: "warning",
            buttons: ["انصراف", "خروج"]
        })
            .then(res => {
                if (res) {
                    swal({ title: `${name} با موفقیت از حساب خود خارج شدید`, icon: "success", buttons: "صفحه اصلی" })
                        .then(result => {
                            authContext.logout()
                            navigate("/")
                        })
                }
            })

    }

    return (
        <div class="col-3">
            <div class="sidebar">
                <span class="sidebar__name">{name}</span>
                <ul class="sidebar__list">
                    <li class="sidebar__item">
                        <a class="sidebar__link" href="#">
                            پیشخوان
                        </a>
                    </li>
                    <li class="sidebar__item">
                        <a class="sidebar__link" href="#">
                            سفارش
                        </a>
                    </li>
                    <li class="sidebar__item">
                        <a class="sidebar__link" href="#">
                            کیف پول من
                        </a>
                    </li>
                    <li class="sidebar__item">
                        <a class="sidebar__link" href="#">
                            جزئیات حساب کاربری
                        </a>
                    </li>
                    <li class="sidebar__item">
                        <a class="sidebar__link" href="#">
                            دوره های خریداری شده
                        </a>
                    </li>
                    <li class="sidebar__item">
                        <a class="sidebar__link" href="#">
                            تیکت های پشتیبانی
                        </a>
                    </li>
                    <li class="sidebar__item">
                        <a class="sidebar__link" href="#" onClick={logoutUser}>
                            خروج از حساب
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
