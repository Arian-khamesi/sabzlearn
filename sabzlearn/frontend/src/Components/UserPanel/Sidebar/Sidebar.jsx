import React,{useContext,useState,useEffect} from "react";
import AuthContext from "../../../context/authContext";
export default function Sidebar({name}) {


    // const authContext = useContext(AuthContext)
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
                        <a class="sidebar__link" href="#">
                            خروج از سیستم
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
