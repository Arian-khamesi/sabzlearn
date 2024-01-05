import React from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'

import './PopularCourses.css'

export default function PopularCourses() {
    return (

        <div class="popular">
            <div class="container">
                
                <SectionHeader
                    title={'محبوب ترین دوره ها'}
                    descrip={'دوره های محبوب بر اساس امتیاز دانشجویان'}
                />

            </div>
        </div>
    )
}