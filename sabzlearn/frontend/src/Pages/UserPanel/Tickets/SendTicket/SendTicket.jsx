import React, { useEffect, useState } from "react";

import "./SendTicket.css";

export default function SendTicket() {
    const [departments, setDepartments] = useState([]);
    const [departmentsSubs, setDepartmentsSubs] = useState([]);
    const [courses, setCourses] = useState([]);
    const [sessionCourse, setSessionCourse] = useState('-1');
    const [showSelectCourse, setShowSelectCourse] = useState(false);

    useEffect(() => {
        getAllCourse()
        fetch(`http://localhost:5000/v1/tickets/departments`)
            .then((res) => res.json())
            .then((data) => setDepartments(data));
    }, []);

    const getDepartmentsSub = (departmentID) => {
        fetch(`http://localhost:5000/v1/tickets/departments-subs/${departmentID}`)
            .then((res) => res.json())
            .then((subs) => setDepartmentsSubs(subs));
    };


    /////////////////get course/////////////////
    const getAllCourse = () => {
        fetch("http://localhost:5000/v1/courses")
            .then((res) => res.json())
            .then((allCourses) => {
                console.log(allCourses);
                setCourses(allCourses);
            });
    }

    const showCoursesTicket = (subName) => {
        console.log(subName);
        if (subName === "پشتیبانی دوره‌ها") {
            setShowSelectCourse(true)
        }
        console.log(showSelectCourse);
    };

    return (
        <div class="col-9">
            <div class="ticket">
                <div class="ticket-header">
                    <span class="ticket-header__title">ارسال تیکت جدید</span>
                    <a class="ticket-header__link" href="#">
                        همه تیکت ها
                    </a>
                </div>
                <form class="ticket-form" action="#">
                    <div class="row">
                        <div class="col-6">
                            <label class="ticket-form__label">دپارتمان را انتخاب کنید:</label>
                            <select
                                class="ticket-form__select"
                                onChange={(event) => getDepartmentsSub(event.target.value)}
                            >
                                <option class="ticket-form__option">
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                {departments.map((department) => (
                                    <option value={department._id}>{department.title}</option>
                                ))}
                            </select>
                        </div>
                        <div class="col-6">
                            <label class="ticket-form__label">نوع تیکت را انتخاب کنید:</label>
                            <select class="ticket-form__select">
                                <option class="ticket-form__option">
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                {departmentsSubs.map((sub) => (
                                    <option value={sub._id} onClick={() => showCoursesTicket(sub.title)}>{sub.title}</option>
                                ))}
                            </select>
                        </div>
                        <div class="col-6">
                            <label class="ticket-form__label">عنوان تیکت را وارد کنید:</label>
                            <input class="ticket-form__input" type="text" />
                        </div>
                        <div class="col-6">
                            <label class="ticket-form__label">دپارتمان را انتخاب کنید:</label>
                            <select class="ticket-form__select">
                                <option class="ticket-form__option">
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                <option class="ticket-form__option">پشتیبانی</option>
                                <option class="ticket-form__option">مشاوره</option>
                                <option class="ticket-form__option">مالی</option>
                                <option class="ticket-form__option">ارتباط با مدیریت</option>
                            </select>
                        </div>
                        {showSelectCourse && (
                            <div class="col-6 mt-5">
                                <div class="price input">
                                    <label class="ticket-form__label" style={{ display: "block" }}>
                                        دوره
                                    </label>
                                    <select class="select" onChange={event => setSessionCourse(event.target.value)}>
                                        <option value="-1">دوره مدنظر را انتخاب کنید</option>
                                        {courses.map((course) => (
                                            <option value={course._id} key={course._id}>{course.name}</option>
                                        ))}
                                    </select>
                                    <span class="error-message text-danger"></span>
                                </div>
                            </div>
                        )}
                        <div class="col-12 mt-5">
                            <label class="ticket-form__label">
                                محتوای تیکت را وارد نمایید:
                            </label>
                            <textarea class="ticket-form__textarea"></textarea>
                        </div>
                        <div class="col-12">
                            <div class="ticket-form__file">
                                <span class="ticket-form__file-max">
                                    حداکثر اندازه: 6 مگابایت
                                </span>
                                <span class="ticket-form__file-format">
                                    فرمت‌های مجاز: jpg, png.jpeg, rar, zip
                                </span>
                                <input class="ticket-form__file-input" type="file" />
                            </div>
                        </div>
                        <div class="col-12">
                            <button class="ticket-form__btn">
                                <i class="ticket-form__btn-icon fa fa-paper-plane"></i>
                                ارسال تیکت
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
