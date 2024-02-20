import React, { useState, useEffect } from 'react'

import "./Category.css"

import TopBar from '../../Components/TopBar/TopBar'
import NavBar from '../../Components/NavBar/NavBar'
import CourseBox from '../../Components/CourseBox/CourseBox'
import Footer from '../../Components/Footer/Footer'

import Pagination from '../../Components/Pagination/Pagination'
import { useParams } from 'react-router-dom'

export default function Category() {

  const [courses, setCourses] = useState([])
  const [orderedCourses, setOrderedCourses] = useState([])
  const { categoryName } = useParams()
  const [shownCourses, setShownCourses] = useState([])
  const [status, setStatus] = useState("default")
  const [statusTitle, setStatusTitle] = useState("مرتب سازی پیش فرض")
  const [searchValue, setSearchValue] = useState("")
  const [courseDisplayType, setCourseDisplayType] = useState("box")

  console.log(categoryName);


  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    fetch(`http://localhost:5000/v1/courses/category/${categoryName}/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorageData.token}`
      },
    })
      .then(res => res.json())
      .then(result => {
        setCourses(result)
        setOrderedCourses(result)
      })
  }, [categoryName])

  // console.log(courses);

  useEffect(() => {

    switch (status) {
      case "free": {
        const freeCourses = courses.filter(item => item.price === 0)
        setOrderedCourses(freeCourses)
        break
      }

      case "money": {
        const moneyCourses = courses.filter(item => item.price > 0)
        setOrderedCourses(moneyCourses)
        break
      }

      case "free": {
        const freeCourses = courses.filter(item => item.price === 0)
        setOrderedCourses(freeCourses)
        break
      }

      case "last": {
        setOrderedCourses(courses)
        break
      }

      case "first": {
        const revCourses = courses.slice().reverse()
        setOrderedCourses(revCourses)
        break
      }

      case "cheap": {
        const cheapCourses = courses.filter(item => item.price === 0)
        setOrderedCourses(cheapCourses)
        break
      }


      default: {
        setOrderedCourses(courses)
      }
        break;
    }

  }, [status])

  const changeStatusTitle = (event) => {
    setStatusTitle(event.target.textContent)
  }

  ///////////////search/////////////////////

  const searchInCourseHandler = (event) => {
    setSearchValue(event.target.value)
    const filteredCourse = courses.filter(course => course.name.includes(event.target.value))
    setOrderedCourses(filteredCourse)
  }
  return (
    <>
      <TopBar />

      <NavBar />

      <section className="courses">
        <div className="container">


          <div className="courses-content">
            <div className="container">
              <div className="row">
                <div className="courses-top-bar">

                  <div className="courses-top-bar__right">
                    <div className={courseDisplayType === "box" ? "courses-top-bar__row-btn courses-top-bar__icon--active" : "courses-top-bar__row-btn courses-top-bar__icon"} onClick={() => setCourseDisplayType("box")}>
                      <i className="fas fa-border-all courses-top-bar__icon"></i>
                    </div>
                    <div className={courseDisplayType === "row" ? "courses-top-bar__row-btn courses-top-bar__icon--active" : "courses-top-bar__row-btn courses-top-bar__icon"} onClick={() => setCourseDisplayType("row")}>
                      <i className="fas fa-align-left courses-top-bar__icon"></i>
                    </div>

                    <div className="courses-top-bar__selection">
                      <span className="courses-top-bar__selection-title">
                        {statusTitle}
                        <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                      </span>
                      <ul className="courses-top-bar__selection-list">
                        <li className="courses-top-bar__selection-item courses-top-bar__selection-item--active" value={"default"} onClick={(event) => {
                          setStatus("default")
                          changeStatusTitle(event)
                        }}>مرتب سازی پیش فرض</li>
                        <li className="courses-top-bar__selection-item" value={status} onClick={(event) => {
                          setStatus("free")
                          changeStatusTitle(event)
                        }}>مرتب سازی دوره های رایگان</li>
                        <li className="courses-top-bar__selection-item" value={status} onClick={(event) => {
                          setStatus("money")
                          changeStatusTitle(event)
                        }}>مرتب سازی دوره های پولی</li>
                        <li className="courses-top-bar__selection-item" value={status} onClick={(event) => {
                          setStatus("last")
                          changeStatusTitle(event)
                        }}>مرتب سازی بر اساس آخرین</li>
                        <li className="courses-top-bar__selection-item" value={status} onClick={(event) => {
                          setStatus("first")
                          changeStatusTitle(event)
                        }}>مرتب سازی بر اساس اولین</li>
                        <li className="courses-top-bar__selection-item" value={status} onClick={(event) => {
                          setStatus("cheap")
                          changeStatusTitle(event)
                        }}>مرتب سازی بر اساس ارزان ترین</li>
                        <li className="courses-top-bar__selection-item" value={status} onClick={(event) => {
                          setStatus("expensive")
                          changeStatusTitle(event)
                        }}>مرتب سازی بر اساس گران ترین</li>
                      </ul>
                    </div>
                  </div>

                  <div className="courses-top-bar__left">
                    <form action="#" className="courses-top-bar__form">
                      <input type="text" className="courses-top-bar__input" placeholder="جستجوی دوره ..." value={searchValue} onChange={searchInCourseHandler} />
                      <i className="fas fa-search courses-top-bar__search-icon"></i>
                    </form>
                  </div>

                </div>
                {
                  shownCourses.length ? (
                    <>
                      {
                        courseDisplayType === "box" ?
                          (
                            <>
                              {shownCourses.map((data) => (

                                <CourseBox
                                  {...data}
                                />
                              ))}
                            </>
                          ) : (
                            <>
                              {shownCourses.map((course) => (
                                <div class="col-12">
                                  <div class="course2-box">
                                    <div class="course2__box-header">
                                      <div class="course2__box-right">
                                        <a
                                          class="course2__box-right-link"
                                          href="#"
                                        >
                                          <img
                                            src="/images/courses/fareelancer.png"
                                            class="course2__box-right-img"
                                          />
                                        </a>
                                      </div>
                                      <div class="course2__box-left">
                                        <div class="course2__box-left-top">
                                          <a
                                            href="#"
                                            class="course2__box-left-link"
                                          >
                                            {course.name}
                                          </a>
                                        </div>
                                        <div class="course2__box-left-center">
                                          <div class="course2__box-left-teacher">
                                            <i class="course2__box-left-icon fa fa-chalkboard-teacher"></i>
                                            <span class="course2__box-left-name">
                                              محمد امین سعیدی راد
                                            </span>
                                          </div>
                                          <div class="course2__box-left-stars">
                                            <span class="course2__box-left-star">
                                              <img src="/images/svgs/star_fill.svg" />
                                            </span>
                                            <span class="course2__box-left-star">
                                              <img src="/images/svgs/star_fill.svg" />
                                            </span>
                                            <span class="course2__box-left-star">
                                              <img src="/images/svgs/star_fill.svg" />
                                            </span>
                                            <span class="course2__box-left-star">
                                              <img src="/images/svgs/star_fill.svg" />
                                            </span>
                                            <span class="course2__box-left-star">
                                              <img src="/images/svgs/star_fill.svg" />
                                            </span>
                                          </div>
                                        </div>
                                        <div class="course2__box-left-bottom">
                                          <div class="course2__box-left-des">
                                            <p>{course.description}</p>
                                          </div>
                                        </div>
                                        <div class="course2__box-footer">
                                          <div class="course2__box-footer-right">
                                            <i class="course2__box-footer-icon fa fa-users"></i>
                                            <span class="course2__box-footer-count">
                                              202
                                            </span>
                                          </div>
                                          <span class="course2__box-footer-left">
                                            {course.price === 0
                                              ? "رایگان"
                                              : course.price.toLocaleString()}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </>
                          )
                      }
                    </>

                  ) : (<div className='alert alert-warning'>دوره ای برای این دسته بندی یافت نشد</div>)
                }
                <Pagination
                  item={orderedCourses}
                  itemCount={3}
                  pathName={`/category-info/${categoryName}`}
                  setShownCourses={setShownCourses}
                />
              </div>
            </div>
          </div>



        </div>
      </section>

      <Footer />

    </>
  )
}
