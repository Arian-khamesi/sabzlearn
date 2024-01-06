import React from 'react'

import './CourseDetailsBox.css'

export default function CourseDetailsBox() {
  return (
    <div class="col-4">
                    <div class="course-boxes__box">
                      <div class="course-boxes__box-right">
                        <i class="course-boxes__box-right-icon fas fa-graduation-cap"></i>
                      </div>
                      <div class="course-boxes__box-left">
                        <span class="course-boxes__box-left-title">
                          وضعیت دوره:
                        </span>
                        <span class="course-boxes__box-left--subtitle">
                          به اتمام رسیده
                        </span>
                      </div>
                    </div>
                  </div>
  )
}
