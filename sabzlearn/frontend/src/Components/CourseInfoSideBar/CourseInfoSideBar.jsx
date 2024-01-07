import React from 'react'

import './CourseInfoSideBar.css'

export default function CourseInfoSideBar() {
    return (
        <div class="col-4">
            <div class="courses-info">
                <div class="course-info">
                    <div class="course-info__register">
                        <span class="course-info__register-title">
                            <i class="fas fa-graduation-cap course-info__register-icon"></i>
                            دانشجوی دوره هستید
                        </span>
                    </div>
                </div>
                <div class="course-info">
                    <div class="course-info__total">
                        <div class="course-info__top">
                            <div class="course-info__total-sale">
                                <i class="fas fa-user-graduate course-info__total-sale-icon"></i>
                                <span class="course-info__total-sale-text">
                                    تعداد دانشجو :
                                </span>
                                <span class="course-info__total-sale-number">
                                    178
                                </span>
                            </div>
                        </div>
                        <div class="course-info__bottom">
                            <div class="course-info__total-comment">
                                <i class="far fa-comments course-info__total-comment-icon"></i>
                                <span class="course-info__total-comment-text">
                                    67 دیدگاه
                                </span>
                            </div>
                            <div class="course-info__total-view">
                                <i class="far fa-eye course-info__total-view-icon"></i>
                                <span class="course-info__total-view-text">
                                    14,234 بازدید
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="course-info">
                    <div class="course-info__header-short-url">
                        <i class="fas fa-link course-info__short-url-icon"></i>
                        <span class="course-info__short-url-text">
                            لینک کوتاه
                        </span>
                    </div>
                    <span class="course-info__short-url">
                        https://sabzlearn.ir/?p=117472
                    </span>
                </div>
                <div class="course-info">
                    <span class="course-info__topic-title">
                        سرفصل های دوره
                    </span>
                    <span class="course-info__topic-text">
                        برای مشاهده و یا دانلود دوره روی کلمه&nbsp;
                        <a href="#" style={{color: '#1e83f0', fontWeight: 'bold'}}>
                            لینک&nbsp;
                        </a>
                        کلیک کنید
                    </span>
                </div>
                <div class="course-info">
                    <span class="course-info__courses-title">دوره های مرتبط</span>
                    <ul class="course-info__courses-list">
                        <li class="course-info__courses-list-item">
                            <a href="#" class="course-info__courses-link">
                                <img src="/images/courses/js_project.png" alt="Course Cover" class="course-info__courses-img" />
                                <span class="course-info__courses-text">
                                    پروژه های تخصصی با جاوا اسکریپت
                                </span>
                            </a>
                        </li>
                        <li class="course-info__courses-list-item">
                            <a href="#" class="course-info__courses-link">
                                <img src="/images/courses/fareelancer.png" alt="Course Cover" class="course-info__courses-img" />
                                <span class="course-info__courses-text">
                                    تعیین قیمت پروژه های فریلنسری
                                </span>
                            </a>
                        </li>
                        <li class="course-info__courses-list-item">
                            <a href="#" class="course-info__courses-link">
                                <img src="/images/courses/nodejs.png" alt="Course Cover" class="course-info__courses-img" />
                                <span class="course-info__courses-text">
                                    دوره Api نویسی
                                </span>
                            </a>
                        </li>
                        <li class="course-info__courses-list-item">
                            <a href="#" class="course-info__courses-link">
                                <img src="/images/courses/jango.png" alt="Course Cover" class="course-info__courses-img" />
                                <span class="course-info__courses-text">
                                    متخصص جنگو
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
