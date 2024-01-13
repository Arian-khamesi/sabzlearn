import React from 'react'

import './PresaleCourses.css'
import SectionHeader from '../SectionHeader/SectionHeader'

export default function PresellCourses() {
    return (
        <div className="presell">
            <div className="container">
                <SectionHeader
                    title={'دوره های در حال پیش فروش'}
                    descrip={'با پیش خرید این دوره ها جز اولین ها باشید و هزینه کمتری بپردازید'}
                />
            </div>
        </div>
    )
}
