import React, { useContext,useState,useEffect } from 'react'
import IndexBox from '../../../Components/UserPanel/IndexBox/IndexBox'
// import AuthContext from '../../../context/authContext'

export default function UserPanelMain() {

    // const authContext = useContext(AuthContext)
    // console.log(authContext);
    const [userInfos, setUserInfos] = useState({})

    useEffect(() => {

        const localStorageData = JSON.parse(localStorage.getItem("user"))
    
        if (localStorageData) {
          fetch("http://localhost:5000/v1/auth/me", {
            headers: {
              "Authorization": `Bearer ${localStorageData.token}`
            }
          }).then(res => res.json())
            .then(userData => {
              setUserInfos(userData)
              
            })
        }
        console.log(userInfos);
        //  else {
        //   setIsLoggedIn(false)
        // }
    
      }, [])

    return (
        <div class="col-9">
            <div class="main">
                <div class="main__title">
                    <span class="main__title-text">
                        سلام{" "}
                        <span class="main__title-name">{userInfos.name}</span>،
                        به پنل کاربری خوش اومدی
                    </span>
                </div>
                <p class="main__desc">
                    از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
                    مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
                    کاربری و کلمه عبور خود را ویرایش کنید.
                </p>
                <div class="main__links">
                    <div class="row">
                        <IndexBox title="سفارش ها" href="orders" />
                        <IndexBox title="دوره های خریداری شده" href="buyed" />
                        <IndexBox title="کیف پول من" href="money" />
                        <IndexBox title="جزئیات حساب کاربری" href="edit-account" />
                        <IndexBox title="تیکت های پشتیبانی" href="tickets" />
                    </div>
                </div>
            </div>
        </div>
    )
}
