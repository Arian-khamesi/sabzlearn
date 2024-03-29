import React, { useState, useEffect, memo } from 'react'

import './Courses.css'
import TopBar from '../../Components/TopBar/TopBar'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import Pagination from '../../Components/Pagination/Pagination'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import CourseBox from '../../Components/CourseBox/CourseBox'

export default function Courses() {

const [allCourses,setAllCourses]=useState([])
const [shownCourses,setShownCourses]=useState([])

useEffect(()=>{

    fetch('http://localhost:5000/v1/courses')
    .then(res=>res.json())
    .then(result=>setAllCourses(result))

},[])



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
            <section className="courses">
                <div className="container">
                    <div className="courses-content">
                        <div className="container">
                            <div className="row">
                                {shownCourses.map((data) => {
                                    return (
                                        <CourseBox
                                            {...data}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Pagination 
            item={allCourses}
            itemCount={3}
            pathName={'/courses'}
            setShownCourses={setShownCourses}
            />
            <Footer />

        </>
    )
}
