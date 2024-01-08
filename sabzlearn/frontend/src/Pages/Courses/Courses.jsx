import React from 'react'

import './Courses.css'
import TopBar from '../../Components/TopBar/TopBar'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import Pagination from '../../Components/Pagination/Pagination'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import prototypeData from '../../prototypeData/prototypeData'
import CourseBox from '../../Components/CourseBox/CourseBox'

export default function Courses() {
    return (
        <>
            <TopBar />

            <NavBar />
            <BreadCrumb
                links={
                    [
                        { id: 1, title: 'خانه', to: '/' },
                        { id: 2, title: 'تمامی دوره ها', to: '/courses' },
                    ]}
            />
            <section class="courses">
                <div class="container">
                    <div class="courses-content">
                        <div class="container">
                            <div class="row">
                                {prototypeData.map((data) => {
                                   return (
                                        <CourseBox
                                        img={data.img}
                                        title={data.title}
                                        instructor={data.instructor}
                                        participants={data.participants}
                                        price={data.price}
                                        key={data.id}
                                    />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Pagination />
            <Footer />

        </>
    )
}
