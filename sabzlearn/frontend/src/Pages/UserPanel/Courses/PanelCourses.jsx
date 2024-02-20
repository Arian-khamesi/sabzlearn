import React, { useState, useEffect } from 'react'
import "./PanelCourses.css"

export default function PanelCourses() {

  const [courses, setCourses] = useState([]);
  const [showCourseState, setShowCourseState] = useState("all");
  const [shownCourses, setShownCourses] = useState([]);
  // const [courseInfo, setCourseInfo] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/v1/users/courses/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setShownCourses(data)
        // setCourseInfo(data.course);
      });
  }, []);
  //  console.log(courses);

  const filterCourses = (state) => {
    switch (state) {
      case "all": {
        setShownCourses(courses)
        break
      }

      case "free": {
        const filterdCourse = courses.filter(item => item.course.price === 0)
        setShownCourses(filterdCourse)
        break
      }

      case "money": {
        const filterdCourse = courses.filter(item => item.course.price > 0)
        setShownCourses(filterdCourse)
        break
      }

      case "complete": {
        const filterdCourse = courses.filter(item => item.course.isComplete === true)
        setShownCourses(filterdCourse)
        break
      }


      default: {
        setShownCourses(courses)
        break
      }
    }
  }

  return (
    <div className="col-9">
      <div className="courses">
        <div className="courses-header">
          <span className="courses-header__title">دوره های ثبت نام شده</span>
          <ul className="courses-header__list">
            <li className="courses-header__item">
              <a
                className={showCourseState === "all" ? "courses-header__link courses-header__link-active" : "courses-header__link"}
                href="#"
                onClick={(event) => {
                  event.preventDefault()
                  setShowCourseState("all")
                  filterCourses("all")
                }}
              >
                همه دوره ها
              </a>
            </li>
            <li className="courses-header__item">
              <a className={showCourseState === "free" ? "courses-header__link courses-header__link-active" : "courses-header__link"} href="#" onClick={(event) => {
                event.preventDefault()
                setShowCourseState("free")
                filterCourses("free")
              }}>
                دوره های رایگان
              </a>
            </li>
            <li className="courses-header__item">
              <a className={showCourseState === "money" ? "courses-header__link courses-header__link-active" : "courses-header__link"} href="#" onClick={(event) => {
                event.preventDefault()
                setShowCourseState("money")
                filterCourses("money")
              }}>
                دوره های پولی
              </a>
            </li>
            <li className="courses-header__item">
              <a className={showCourseState === "complete" ? "courses-header__link courses-header__link-active" : "courses-header__link"} href="#" onClick={(event) => {
                event.preventDefault()
                setShowCourseState("complete")
                filterCourses("complete")
              }}>
                دوره های تکمیل شده
              </a>
            </li>
          </ul>
        </div>
        <div className="main">
          <div className="row">
            <div className="col-12">
              {shownCourses.length ? shownCourses.map((item) => (
                <div className="main__box">
                  <div className="main__box-right">
                    <a className="main__box-img-link" href="#">
                      <img
                        className="main__box-img img-fluid"
                        src={`http://localhost:5000/courses/covers/${item.course.cover}`}
                      />
                    </a>
                  </div>
                  <div className="main__box-left">
                    <a href="#" className="main__box-title">
                      {item.course.name}
                    </a>
                    <div className="main__box-bottom">
                      <div className="main__box-all">
                        <span className="main__box-all-text">وضعیت :</span>
                        <span className="main__box-all-value">{item.course.isComplete ? "تکمیل شده" : "در حال برگزاری"}</span>
                      </div>
                      <div className="main__box-completed">
                        <span className="main__box-completed-text">
                          قیمت دوره :
                        </span>
                        <span className="main__box-completed-value">{item.course.price ? item.course.price : "رایگان"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )) : <div className="alert alert-warning">
                دوره ای در این دسته بندی یافت نشد
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
