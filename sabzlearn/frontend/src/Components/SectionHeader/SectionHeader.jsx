import React from 'react'

import './SectionHeader.css'
import { Link } from 'react-router-dom'

export default function SectionHeader({ title, descrip, btnTitle, btnHref }) {
    return (
        <div className="courses-header">
            <div className="courses-header__right">
                <span className="courses-header__title title">{title}</span>
                <span className="courses-header__text">{descrip}</span>
            </div>
            {btnTitle ? (<div className="courses-header__left">
                <Link to={btnHref} className="courses-header__link">
                    <span>{btnTitle}</span>
                    <i className="fas fa-arrow-left courses-header__icon"></i>
                </Link>
            </div>) : null}
        </div>
    )
}
