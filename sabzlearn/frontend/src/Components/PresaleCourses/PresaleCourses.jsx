import React, { useEffect, useState } from 'react'

import './PresaleCourses.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import CourseBox from '../CourseBox/CourseBox'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';


export default function PresellCourses() {

    const [preCourses, setPreCourses] = useState([])

    useEffect(() => {

        fetch("http://localhost:5000/v1/courses/presell")
            .then(res => res.json())
            .then(result => setPreCourses(result))

    }, [])

    console.log(preCourses);

    return (
        <div className="presell">
            <div className="container">
                <SectionHeader
                    title={'دوره های در حال پیش فروش'}
                    descrip={'با پیش خرید این دوره ها جز اولین ها باشید و هزینه کمتری بپردازید'}
                />
                <div className="courses-content">
                    <div className="container">
                        <div className="row">
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={3}
                                pagination={{ clickable: true }}
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                            >

                                {preCourses.map(preCours => (
                                    <SwiperSlide>
                                        <CourseBox
                                            {...preCours}
                                            isSlider={true}
                                            key={preCours.id}
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
