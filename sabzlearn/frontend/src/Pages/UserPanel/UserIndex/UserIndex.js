import React from 'react'
import "./UserIndex.css"
import TopBar from '../../../Components/TopBar/TopBar'
import NavBar from '../../../Components/NavBar/NavBar'
import Footer from '../../../Components/Footer/Footer'
import Sidebar from '../../../Components/UserPanel/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Index() {
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
                    <Sidebar />

                    <Outlet />

                </div>
            </div>
        </div>
    </section>

   <Footer/>
   </>
  )
}
