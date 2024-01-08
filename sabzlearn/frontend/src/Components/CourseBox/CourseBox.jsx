import React from 'react'
import { useState } from 'react'

import './CourseBox.css'
import CircleSpinner from '../CircleSpinner/CircleSpinner'

export default function CourseBox({ img, title, instructor, participants, price }) {

  const [isImgLoad, setIsImgLoad] = useState(false)
  // const [hrefimg, sethrefimg] = useState(null)

  const loaderImg = () => {

    setIsImgLoad(true)

  }

  // setTimeout(()=>{
  //   sethrefimg(img)
  // },2000)

  return (
    <div class="col-12 col-sm-4">
      <div class="course-box">
        <a href="#">
          <img src={img}
            alt="Course img" class="course-box__img" onLoad={loaderImg} />
          {!isImgLoad && <CircleSpinner />}
        </a>
        <div class="course-box__main">
          <a href="#" class="course-box__title">{title}</a>

          <div class="course-box__rating-teacher">
            <div class="course-box__teacher">
              <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <a href="#" class="course-box__teacher-link">{instructor}</a>
            </div>
            <div class="course-box__rating">
              <img src="/images/svgs/star.svg" alt="rating" class="course-box__star" />
              <img src="/images/svgs/star_fill.svg" alt="rating" class="course-box__star" />
              <img src="/images/svgs/star_fill.svg" alt="rating" class="course-box__star" />
              <img src="/images/svgs/star_fill.svg" alt="rating" class="course-box__star" />
              <img src="/images/svgs/star_fill.svg" alt="rating" class="course-box__star" />
            </div>
          </div>

          <div class="course-box__status">
            <div class="course-box__users">
              <i class="fas fa-users course-box__users-icon"></i>
              <span class="course-box__users-text">{participants}</span>
            </div>
            <span class="course-box__price">{price}</span>
          </div>
        </div>

        <div class="course-box__footer">
          <a href="#" class="course-box__footer-link">
            مشاهده اطلاعات
            <i class="fas fa-arrow-left course-box__footer-icon"></i>
          </a>
        </div>

      </div>
    </div>
  )
}
