import React, { useState } from 'react'

import './LastCourses.css';
import SectionHeader from '../SectionHeader/SectionHeader';
import CourseBox from '../CourseBox/CourseBox';

import prototypeData from '../../prototypeData/prototypeData';


export default function LastCourses() {

    return (
        <div class="courses">
            <div class="container">
                <SectionHeader
                    title='جدیدترین دوره ها'
                    descrip='سکوی پرتاب شما به سمت موفقیت'
                    btnTitle='تمامی دوره ها'
                />
                <div class="courses-content">
                    <div class="container">
                        <div class="row">
                            {prototypeData.map((data) => 
                                <CourseBox
                                    img={data.img}
                                    title={data.title}
                                    instructor={data.instructor}
                                    participants={data.participants}
                                    price={data.price}
                                    key={data.id}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
