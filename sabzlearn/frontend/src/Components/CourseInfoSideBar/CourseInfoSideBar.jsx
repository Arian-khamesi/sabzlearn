import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';


import './CourseInfoSideBar.css'
import { Link, useParams } from 'react-router-dom';

export default function CourseInfoSideBar(props) {

    const localstorageData = JSON.parse(localStorage.getItem("user"))
    const [relatedCourse,setRelatedCourse]=useState([])
    
    const registerInCourse = (course) => {
        // console.log(course.price);
        if (course.price === 0) {
            swal({
                title: `از ثبت نام در دوره ${course.name} اطمینان دارید ؟`,
                icon: "warning",
                buttons: ["انصراف", "ثبت نام"]
            })
                .then(result => {
                    result && register(course._id, course.price)
                })
        }
        else {
            swal({
                title: `از ثبت نام در دوره ${course.name} اطمینان دارید ؟`,
                icon: "warning",
                buttons: ["انصراف", "ثبت نام"]
            })
                .then(result => {
                    result && swal({
                        title: `در صورت داشتن کد تخفیف برای دوره ${course.name} آن را وارد کنید`,
                        content: "input",
                        buttons: ["ثبت نام بدون کد تخفیف", "اعمال کد تخفیف"]
                    }).then(result => {
                        if (result === null) {
                            register(course._id, course.price)
                        }
                        else {
                            fetch(`http://localhost:5000/v1/offs/${result}`, {
                                method: "POST",
                                headers: {
                                    "Authorization": `Bearer ${localstorageData.token}`,
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    course: course._id
                                })
                            })
                                .then(res => {
                                    if (res.status === 404) {
                                        swal({
                                            title: "کد وارد شده نامعتبر میباشد",
                                            icon: "error",
                                            buttons: "بازگشت"
                                        })
                                    }
                                    else if (res.status === 409) {
                                        swal({
                                            title: "کد وارد شده قبلا استفاده شده است",
                                            icon: "error",
                                            buttons: "بازگشت"
                                        })
                                    }
                                    else {
                                        return res.json()
                                    }
                                })
                                .then(offCode => {
                                    fetch(`http://localhost:5000/v1/courses/${course._id}/register`, {
                                        method: "POST",
                                        headers: {
                                            "Authorization": `Bearer ${localstorageData.token}`,
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            price: Number(course.price - (course.price * Number(offCode.percent) / 100))
                                        })
                                    })
                                        .then((res) => {
                                            res.json()
                                            res.ok && swal({ title: "با موفقیت در دوره ثبت نام شدید", icon: "success", buttons: "بازگشت" })
                                        })
                                        .then(result => props.getCourseDetails())
                                })

                        }
                    })
                })
        }

        const register = (courseId, coursePrice) => {
            fetch(`http://localhost:5000/v1/courses/${courseId}/register`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localstorageData.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    price: coursePrice
                })
            })
                .then((res) => {
                    res.json()
                    res.ok && swal({ title: "با موفقیت در دوره ثبت نام شدید", icon: "success", buttons: "بازگشت" })
                })
                .then(result => props.getCourseDetails())
        }

    }


    ////////////////////get related course//////////////////
const {courseName}=useParams()

    useEffect(()=>{
        fetch(`http://localhost:5000/v1/courses/related/${courseName}`)
        .then(res=>res.json())
        .then(result=>setRelatedCourse(result))
    },[])

    return (
        <div className="col-4">
            <div className="courses-info">
                <div className="course-info">
                    <div className="course-info__register">

                        {props.details.isUserRegisteredToThisCourse ? (<span className="course-info__register-title">
                            <i className="fas fa-graduation-cap course-info__register-icon"></i>
                            دانشجوی دوره هستید
                        </span>) : (
                            <span className="course-info__register-title">
                                <a href='#' className='register-cors' onClick={() => registerInCourse(props.details)}>ثبت نام در دوره</a>

                            </span>
                        )}


                    </div>
                </div>
                <div className="course-info">
                    <div className="course-info__total">
                        <div className="course-info__top">
                            <div className="course-info__total-sale">
                                <i className="fas fa-user-graduate course-info__total-sale-icon"></i>
                                <span className="course-info__total-sale-text">
                                    تعداد دانشجو :
                                </span>
                                <span className="course-info__total-sale-number">
                                    {props.details.courseStudentsCount}
                                </span>
                            </div>
                        </div>
                        <div className="course-info__bottom">
                            <div className="course-info__total-comment">
                                <i className="far fa-comments course-info__total-comment-icon"></i>
                                <span className="course-info__total-comment-text">
                                    {`${props.comments.length} دیدگاه`}
                                </span>
                            </div>
                            <div className="course-info__total-view">
                                <i className="far fa-eye course-info__total-view-icon"></i>
                                <span className="course-info__total-view-text">
                                    14,234 بازدید
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="course-info">
                    <div className="course-info__header-short-url">
                        <i className="fas fa-link course-info__short-url-icon"></i>
                        <span className="course-info__short-url-text">
                            لینک کوتاه
                        </span>
                    </div>
                    <span className="course-info__short-url">
                        https://sabzlearn.ir/?p=117472
                    </span>
                </div>
                <div className="course-info">
                    <span className="course-info__topic-title">
                        سرفصل های دوره
                    </span>
                    <span className="course-info__topic-text">
                        برای مشاهده و یا دانلود دوره روی کلمه&nbsp;
                        <a href="#" style={{ color: '#1e83f0', fontWeight: 'bold' }}>
                            لینک&nbsp;
                        </a>
                        کلیک کنید
                    </span>
                </div>
                <div className="course-info">
                    <span className="course-info__courses-title">دوره های مرتبط</span>
                    <ul className="course-info__courses-list">
                        {relatedCourse.length?(
                            relatedCourse.map(item=>(
                                <li className="course-info__courses-list-item">
                                <Link to={`/course-info/${item.shortName}`} className="course-info__courses-link">
                                    <img src={`/images/courses/${item.cover}`} alt="Course Cover" className="course-info__courses-img" />
                                    <span className="course-info__courses-text">
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                            ))
                        ):(<span className="course-info__courses-text">فعلا دوره مرتبطی وجود ندارد</span>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}
