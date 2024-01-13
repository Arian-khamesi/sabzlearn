import React, { useState } from 'react'

import './LastCourses.css';
import SectionHeader from '../SectionHeader/SectionHeader';
import CourseBox from '../CourseBox/CourseBox';

import prototypeData from '../../prototypeData/prototypeData';


export default function LastCourses() {

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
                            {prototypeData.map((data) => {
                                if (data.id < 7) {
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
                                }
                            }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
