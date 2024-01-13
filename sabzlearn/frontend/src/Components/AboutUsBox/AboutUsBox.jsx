import React from 'react'

import './AboutUsBox.css'

export default function AboutUsBox({title,descrip}) {
  return (
    <div className="col-12 col-sm-6">
            <div className="about-us__box">
              <div className="about-us__box-right">
                <i className="far fa-copyright about-us__icon"></i>
              </div>
              <div className="about-us__box-left">
                <span className="about-us__box-title">{title}</span>
                <span className="about-us__box-text">{descrip}</span>
              </div>
            </div>
          </div>
  )
}
