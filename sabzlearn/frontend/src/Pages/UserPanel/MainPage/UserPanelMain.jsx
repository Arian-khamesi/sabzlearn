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
        <div className="col-9">
            <div className="main">
                <div className="main__title">
                    <span className="main__title-text">
                        سلام{" "}
                        <span className="main__title-name">{userInfos.name}</span>،
                        به پنل کاربری خوش اومدی
                    </span>
                </div>
                <p className="main__desc">
                    از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
                    مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
                    کاربری و کلمه عبور خود را ویرایش کنید.
                </p>
                <div className="main__links">
                    <div className="row">
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
