import React, { useState, useEffect } from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'

import './PopularCourses.css'

import CourseBox from '../CourseBox/CourseBox'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

export default function PopularCourses() {

    const [popCourses, setPopCourses] = useState([])

    useEffect(() => {

        fetch("http://localhost:5000/v1/courses/popular")
            .then(res => res.json())
            .then(result => setPopCourses(result))

    }, [])


    return (

        <div className="popular">
            <div className="container">

                <SectionHeader
                    title={'محبوب ترین دوره ها'}
                    descrip={'دوره های محبوب بر اساس امتیاز دانشجویان'}
                />
                <div className="courses-content">
                    <div className="container">
                        <div className="row">
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={3}
                                pagination={{ clickable: true }}
                            >

                                {popCourses.map(popCours => (
                                    <SwiperSlide>
                                        <CourseBox
                                            {...popCours}
                                            isSlider={true}
                                            key={popCours.id}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
