import React from 'react'
import { useState } from 'react'

import './CourseBox.css'
import CircleSpinner from '../CircleSpinner/CircleSpinner'
import { Link } from 'react-router-dom'

export default function CourseBox({ cover, name, creator, participants, price, shortName, isSlider }) {

  const [isImgLoad, setIsImgLoad] = useState(false)
  // const [hrefimg, sethrefimg] = useState(null)

  const loaderImg = () => {

    setIsImgLoad(true)

  }

  // setTimeout(()=>{
  //   sethrefimg(img)
  // },2000)

  return (
    <div className={isSlider ? "col-12" : "col-12 col-sm-4"}>
      <div className="course-box">
        <Link to={`/course-info/${shortName}`}>
          <img src={`/images/courses/${cover}`}
            alt="Course img" className="course-box__img" onLoad={loaderImg} />
          {!isImgLoad && <CircleSpinner />}
        </Link>
        <div className="course-box__main">
          <Link to={`/course-info/${shortName}`} className="course-box__title">{name}</Link>

          <div className="course-box__rating-teacher">
            <div className="course-box__teacher">
              <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <Link to={`/course-info/${shortName}`} className="course-box__teacher-link">{creator}</Link>
            </div>
            <div className="course-box__rating">
              <img src="/images/svgs/star.svg" alt="rating" className="course-box__star" />
              <img src="/images/svgs/star_fill.svg" alt="rating" className="course-box__star" />
              <img src="/images/svgs/star_fill.svg" alt="rating" className="course-box__star" />
              <img src="/images/svgs/star_fill.svg" alt="rating" className="course-box__star" />
              <img src="/images/svgs/star_fill.svg" alt="rating" className="course-box__star" />
            </div>
          </div>

          <div className="course-box__status">
            <div className="course-box__users">
              <i className="fas fa-users course-box__users-icon"></i>
              <span className="course-box__users-text">{participants}</span>
            </div>
            <span className="course-box__price">{price ? price.toLocaleString() : "رایگان"}</span>
          </div>
        </div>

        <div className="course-box__footer">
          <Link to={`/course-info/${shortName}`} className="course-box__footer-link">
            مشاهده اطلاعات
            <i className="fas fa-arrow-left course-box__footer-icon"></i>
          </Link>
        </div>

      </div>
    </div>
  )
}
