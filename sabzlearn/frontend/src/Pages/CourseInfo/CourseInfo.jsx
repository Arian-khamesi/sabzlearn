import React from 'react'

import "./CourseInfo.css"
import TopBar from '../../Components/TopBar/TopBar'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'

export default function CourseInfo() {
  return (
    <>
    <TopBar/>
    <NavBar/>
    <BreadCrumb
    links={
      [
        {id:1,title:'خانه',to:'/'},
        {id:2,title:'آموزش برنامه نویسی فرانت اند',to:'/category-info/frontend'},
        {id:3,title:'دوره متخصص جاوااسکریپت',to:'/course-info/js-expert'},
      ]
    }/>
    
    <Footer/>
    </>
  )
}
