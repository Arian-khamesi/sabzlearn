import React,{useState,useEffect} from 'react'
import "./UserIndex.css"
import TopBar from '../../../Components/TopBar/TopBar'
import NavBar from '../../../Components/NavBar/NavBar'
import Footer from '../../../Components/Footer/Footer'
import Sidebar from '../../../Components/UserPanel/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Index() {

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
   <>
   <TopBar/>
   <NavBar/>
   
   <section class="content">
        <div class="content-header">
            <div class="container">
                <span class="content-header__title">حساب کاربری من</span>
                <span class="content-header__subtitle">پیشخوان</span>
            </div>
        </div>
        <div class="content-main">
            <div class="container">
                <div class="row">
                    <Sidebar {...userInfos}/>

                    <Outlet />

                </div>
            </div>
        </div>
    </section>

   <Footer/>
   </>
  )
}
