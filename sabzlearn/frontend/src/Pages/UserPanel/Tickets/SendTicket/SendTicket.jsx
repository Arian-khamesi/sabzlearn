import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";


import "./SendTicket.css";

export default function SendTicket() {
    const [departments, setDepartments] = useState([]);
    const [departmentsSubs, setDepartmentsSubs] = useState([]);
    const [courses, setCourses] = useState([]);
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    ////////////////////////////////////////////////////////////////////
    const [departmentID, setDepartmentID] = useState("");
    const [ticketSubId, setTicketSubId] = useState("");
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("");
    const [body, setBody] = useState("");
    const [courseID, setCourseID] = useState("");
    const navigate=useNavigate()
    ///////////////////////get menu and sub menu tickets//////////////////////

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
        fetch(`http://localhost:5000/v1/users/courses/`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCourses(data);
            });
    }
    // console.log(courses);
    const showCoursesTicket = (subId) => {
        console.log(subId);
        setTicketSubId(subId)
    };
    ///////////////////////////send ticket//////////////////////////////////

    const sendTicket = (event) => {
        
        event.preventDefault()
        const newTicketInfos = {
            departmentID,
            departmentSubID: ticketSubId,
            title,
            priority,
            body,
            course: courseID.length ? courseID : undefined
        }
        // console.log(newTicketInfos);
        fetch(`http://localhost:5000/v1/tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorageData.token}`,
            },
            body: JSON.stringify(newTicketInfos)
        })
            .then((res) => {
                res.json()
                res.ok && swal({ title: "تیکت شما با موفقیت ارسال شد", icon: "success", buttons: "بازگشت" }).then(result=>navigate("/my-account/tickets"))
            })
    }

    return (
        <div className="col-9">
            <div className="ticket">
                <div className="ticket-header">
                    <span className="ticket-header__title">ارسال تیکت جدید</span>
                    <Link className="ticket-header__link" to="/my-account/tickets">
                        همه تیکت ها
                    </Link>
                </div>
                <form className="ticket-form" action="#">
                    <div className="row">
                        <div className="col-6">
                            <label className="ticket-form__label">دپارتمان را انتخاب کنید:</label>
                            <select
                                className="ticket-form__select"
                                onChange={(event) => {
                                    setDepartmentID(event.target.value)
                                    getDepartmentsSub(event.target.value)
                                }}
                            >
                                <option className="ticket-form__option">
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                {departments.map((department) => (
                                    <option value={department._id}>{department.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6">
                            <label className="ticket-form__label">نوع تیکت را انتخاب کنید:</label>
                            <select className="ticket-form__select">
                                <option className="ticket-form__option">
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                {departmentsSubs.map((sub) => (
                                    <option value={sub._id} onClick={() => showCoursesTicket(sub._id)}>{sub.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6">
                            <label className="ticket-form__label">عنوان تیکت را وارد کنید:</label>
                            <input className="ticket-form__input" type="text" onChange={(event) => setTitle(event.target.value)} />
                        </div>
                        <div className="col-6">
                            <label className="ticket-form__label">سطح اولویت تیکت را تعیین کنید:</label>
                            <select className="ticket-form__select" onChange={(event) => setPriority(event.target.value)}>
                                <option className="ticket-form__option">
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                <option className="ticket-form__option" value={1}>بالا</option>
                                <option className="ticket-form__option" value={2}>متوسط</option>
                                <option className="ticket-form__option" value={3}>کم</option>
                            </select>
                        </div>
                        {ticketSubId === "63b688c5516a30a651e98156" && (
                            <div className="col-6 mt-5">
                                <div className="price input">
                                    <label className="ticket-form__label" style={{ display: "block" }}>
                                        دوره
                                    </label>
                                    <select className="select" onChange={event => setCourseID(event.target.value)}>
                                        <option value="-1">دوره مدنظر را انتخاب کنید</option>
                                        {courses.map((course) => (
                                            <option value={course._id} key={course._id}>{course.course.name}</option>
                                        ))}
                                    </select>
                                    <span className="error-message text-danger"></span>
                                </div>
                            </div>
                        )}
                        <div className="col-12 mt-5">
                            <label className="ticket-form__label">
                                محتوای تیکت را وارد نمایید:
                            </label>
                            <textarea className="ticket-form__textarea" onChange={(event) => setBody(event.target.value)}></textarea>
                        </div>
                        <div className="col-12">
                            <div className="ticket-form__file">
                                <span className="ticket-form__file-max">
                                    حداکثر اندازه: 6 مگابایت
                                </span>
                                <span className="ticket-form__file-format">
                                    فرمت‌های مجاز: jpg, png.jpeg, rar, zip
                                </span>
                                <input className="ticket-form__file-input" type="file" />
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="ticket-form__btn" onClick={sendTicket}>
                                <i className="ticket-form__btn-icon fa fa-paper-plane ms-3"></i>
                                ارسال تیکت
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
