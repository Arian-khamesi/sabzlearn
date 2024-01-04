import React from 'react'

import './SectionHeader.css'

export default function SectionHeader({ title, descrip, btnTitle }) {
    return (
        <div class="courses-header">
            <div class="courses-header__right">
                <span class="courses-header__title title">{title}</span>
                <span class="courses-header__text">{descrip}</span>
            </div>
            {btnTitle ? (<div class="courses-header__left">
                <a href="#" class="courses-header__link">
                    <span>{btnTitle}</span>
                    <i class="fas fa-arrow-left courses-header__icon"></i>
                </a>
            </div>) : null}
        </div>
    )
}
