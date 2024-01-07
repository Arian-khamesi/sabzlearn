import React from 'react'

import './CourseDetailsBox.css'

export default function CourseDetailsBox({title,text,icon}) {
  return (
    <div class="col-12 col-sm-6 col-lg-4">
                    <div class="course-boxes__box">
                      <div class="course-boxes__box-right">
                        <i class={`course-boxes__box-right-icon fas fa${icon}`}></i>
                      </div>
                      <div class="course-boxes__box-left">
                        <span class="course-boxes__box-left-title">
                        {title}
                        </span>
                        <span class="course-boxes__box-left--subtitle">
                          {text}
                        </span>
                      </div>
                    </div>
                  </div>
  )
}
