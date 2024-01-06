import React from 'react'

import "./CourseInfo.css"
import TopBar from '../../Components/TopBar/TopBar'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import CourseMainInfo from '../../Components/CourseMainInfo/CourseMainInfo'
import CourseDetailsBox from '../../Components/CourseDetailsBox/CourseDetailsBox'

export default function CourseInfo() {
  return (
    <>
      <TopBar />
      <NavBar />
      <BreadCrumb
        links={
          [
            { id: 1, title: 'خانه', to: '/' },
            { id: 2, title: 'آموزش برنامه نویسی فرانت اند', to: '/category-info/frontend' },
            { id: 3, title: 'دوره متخصص جاوااسکریپت', to: '/course-info/js-expert' },
          ]
        } />

      <CourseMainInfo />

      <main class="main">
        <div class="container">
          <div class="row">
            <div class="col-8">
              <div class="course">
                <div class="course-boxes">
                  <div class="row">

                    <CourseDetailsBox
                    title={'وضعیت دوره'}
                    text={'به اتمام رسیده'}
                    icon={'-graduation-cap'} />
                    <CourseDetailsBox
                    title={'مدت زمان دوره'}
                    text={'19 ساعت'}
                    icon={'-clock'} />
                    <CourseDetailsBox
                    title={'آخرین بروزرسانی:'}
                    text={'1401/03/02'}
                    icon={'-calendar-alt'} />
                    <CourseDetailsBox
                    title={'روش پشتیبانی'}
                    text={'آنلاین'}
                    icon={'-user-alt'} />
                    <CourseDetailsBox
                    title={'پیش نیاز :'}
                    text={'HTML / CSS'}
                    icon={'-info-circle'} />
                    <CourseDetailsBox
                    title={':نوع مشاهده'}
                    text={'ضبط شده / آنلاین'}
                    icon={'-play'} />
                   

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
