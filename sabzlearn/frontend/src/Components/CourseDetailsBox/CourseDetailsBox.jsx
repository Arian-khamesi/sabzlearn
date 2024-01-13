import React from 'react'

import './CourseDetailsBox.css'

export default function CourseDetailsBox({title,text,icon}) {
  return (
    <div className="col-12 col-sm-6 col-lg-4">
                    <div className="course-boxes__box">
                      <div className="course-boxes__box-right">
                        <i className={`course-boxes__box-right-icon fas fa${icon}`}></i>
                      </div>
                      <div className="course-boxes__box-left">
                        <span className="course-boxes__box-left-title">
                        {title}
                        </span>
                        <span className="course-boxes__box-left--subtitle">
                          {text}
                        </span>
                      </div>
                    </div>
                  </div>
  )
}
