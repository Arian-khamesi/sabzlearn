import React, { useEffect, useState } from 'react'

import './LastCourses.css';
import SectionHeader from '../SectionHeader/SectionHeader';
import CourseBox from '../CourseBox/CourseBox';


export default function LastCourses() {

    const [lastCourses, setLastCourses] = useState([])


    useEffect(() => {

        fetch("http://localhost:5000/v1/courses", {
        }).then(res => res.json())
            .then(allCourse => setLastCourses(allCourse))

}, [])


return (
    <div className="courses">
        <div className="container">
            <SectionHeader
                title='جدیدترین دوره ها'
                descrip='سکوی پرتاب شما به سمت موفقیت'
                btnTitle='تمامی دوره ها'
                btnHref={'/courses'}
            />
            <div className="courses-content">
                <div className="container">
                    <div className="row">
                        {lastCourses.splice(0,3).map((data) => {
                            
                                return (
                                    <CourseBox
                                        img={data.cover}
                                        title={data.name}
                                        instructor={data.creator}
                                        participants={data.participants}
                                        price={data.price}
                                        key={data.id}
                                        href={data.shortName}
                                    />
                                )
                            
                        }
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>

)
}
