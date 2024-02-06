import React from 'react'

import './CourseMainInfo.css'

export default function CourseMainInfo(props) {

  console.log(props);

  return (
    <section className="course-info">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <a href="#" className="course-info__link">
              {props.id.title}
            </a>
            <h1 className="course-info__title">
              {props.details.name}
            </h1>
            <p className="course-info__text">
              {props.details.description}
            </p>
            <div className="course-info__social-media">
              <a href="#" className="course-info__social-media-item">
                <i className="fab fa-telegram-plane course-info__icon"></i>
              </a>
              <a href="#" className="course-info__social-media-item">
                <i className="fab fa-twitter course-info__icon"></i>
              </a>
              <a href="#" className="course-info__social-media-item">
                <i className="fab fa-facebook-f course-info__icon"></i>
              </a>
            </div>
          </div>

          <div className="col-12 col-md-6 ">
            <video src="" poster={props.details.cover} className="course-info__video" controls></video>
          </div>
        </div>
      </div>
    </section>
  )
}
