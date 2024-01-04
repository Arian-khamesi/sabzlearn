import React from 'react'

import './AboutUsBox.css'

export default function AboutUsBox({title,descrip}) {
  return (
    <div class="col-6">
            <div class="about-us__box">
              <div class="about-us__box-right">
                <i class="far fa-copyright about-us__icon"></i>
              </div>
              <div class="about-us__box-left">
                <span class="about-us__box-title">{title}</span>
                <span class="about-us__box-text">{descrip}</span>
              </div>
            </div>
          </div>
  )
}