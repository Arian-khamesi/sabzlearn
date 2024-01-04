import React from 'react'

import './LastCourses.css';
import SectionHeader from '../SectionHeader/SectionHeader';

export default function LastCourses() {
    return (
        <div class="courses">
            <div class="container">
                <SectionHeader
                    title='جدیدترین دوره ها'
                    descrip='سکوی پرتاب شما به سمت موفقیت'
                    btnTitle='تمامی دوره ها'
                />
            </div>
        </div>

    )
}
