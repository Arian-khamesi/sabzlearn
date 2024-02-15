import React, { useState, useEffect } from 'react'
import TopBar from '../../Components/TopBar/TopBar'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import { Link, useParams } from 'react-router-dom'

import "./SessionInfo.css"


export default function SessionInfo() {

    const { courseName, sessionID } = useParams();
    const [session, setSession] = useState({})
    const [sessions, setSessions] = useState([])
    const [courseCategory, setCourseCategory] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/v1/courses/${courseName}/${sessionID}`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then(res => res.json())
          .then(data => {
            console.log(data)
            setSession(data.session)
            setSessions(data.sessions)
          })
      }, []);

    //   useEffect(() => {
    //     fetch(`http://localhost:5000/v1/courses/category/:${courseName}`)
    //       .then(res => res.json())
    //       .then(result => {
    //         setCourseCategory(result)
    //       })
    //   }, [])

    //   console.log(courseCategory);

    return (
        <>
            <TopBar />
            <NavBar />
            <section class="content">
                <div class="col-4">
                    <div class="sidebar">
                        <div class="sidebar__header">
                            <a class="sidebar__header-link" href="#">
                                <i class="sidebar__haeder-icon fa fa-book-open" style={{marginLeft:"7px"}}></i>
                                لیست جلسات
                            </a>
                        </div>
                        <div class="sidebar-topics">
                            <div class="sidebar-topics__item">
                                <ul class="sidebar-topics__list">
                                    {
                                        sessions.map(session => (
                                            <Link to={`/${courseName}/${session._id}`}>
                                                <li class="sidebar-topics__list-item">
                                                    <div class="sidebar-topics__list-right">
                                                        <i class="sidebar-topics__list-item-icon fa fa-play-circle"></i>
                                                        <a class="sidebar-topics__list-item-link" href="#">
                                                            {
                                                                session.title
                                                            }
                                                        </a>
                                                    </div>
                                                    <div class="sidebar-topics__list-left">
                                                        <span class="sidebar-topics__list-item-time">
                                                            {session.time}
                                                        </span>
                                                    </div>
                                                </li>
                                            </Link>
                                        ))
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="episode">
                        <div class="episode-haeder">
                            <div class="episode-header__right">
                                <a class="episode-header__right-back-link" href="#">
                                    <i class="episode-header__right-back-icon fa fa-angle-right"></i>
                                    <div class="episode-header__right-home">
                                        <Link class="episode-header__right-home-link" to={`/course-info/${courseName}`}>
                                            به صفحه اصلی دوره بروید
                                        </Link>
                                        <i class="episode-header__right-home-icon fa fa-home"></i>
                                    </div>
                                </a>
                            </div>
                            <div class="episode-header__left">
                                <i class="episode-header__left-icon fa fa-play-circle"></i>
                                <span class="episode-header__left-text">
                                    {" "}
                                    سوالات متداول در مورد جاوااسکریپت و دوره
                                </span>
                            </div>
                        </div>
                        <div class="episode-content">
                            <video
                                class="episode-content__video"
                                controls
                                src={`http://localhost:5000/courses/covers/${session.video}`}
                            ></video>
                            <a class="episode-content__video-link" href="#">
                                دانلود ویدئو
                            </a>
                            <div class="episode-content__bottom">
                                <a class="episode-content__backward" href="#">
                                    <i class="episode-content__backward-icon fa fa-arrow-right"></i>
                                    قبلی
                                </a>
                                <a class="episode-content__forward" href="#">
                                    بعدی
                                    <i class="episode-content__backward-icon fa fa-arrow-left"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
