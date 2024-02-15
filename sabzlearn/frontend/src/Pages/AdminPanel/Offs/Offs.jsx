import React, { useState, useEffect } from 'react'
import { useForm } from '../../../hooks/useForm'
import Input from '../../../Components/Form/Input'
import { minValidator, phoneValidator } from '../../../validators/rules'
import swal from 'sweetalert'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

export default function Offs() {

    const [courses, setCourses] = useState([]);
    const [sessionCourse, setSessionCourse] = useState('-1');
    const [newcountsOff, setNewCountsOff] = useState(10)
    const localStorageData = JSON.parse(localStorage.getItem("user"))


   useEffect(() => {

        fetch("http://localhost:5000/v1/courses")
            .then((res) => res.json())
            .then((allCourses) => {
                console.log(allCourses);
                setCourses(allCourses);
            });
    }, []);

    const [formState, onInputHandler] = useForm(
        {
            code: {
                value: "",
                isValid: false,
            },
            percent: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const onchangeCountsOffHandler = (event) => {
        setNewCountsOff(event.target.value)
    }

    const addNewOffs = (event) => {
        event.preventDefault()

        const newOffInfos ={
            code:formState.inputs.code.value,
            percent:Number(formState.inputs.percent.value),
            course:sessionCourse,
            max:Number(newcountsOff)
        }
        console.log(newOffInfos);
        fetch("http://localhost:5000/v1/offs",{
            method:"POST",
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${localStorageData.token}`,
            },
            body:JSON.stringify(newOffInfos)
        })
        .then((res) => {
            res.json()
            res.ok && swal({ title: "کد تخفیف مدنظر با موفقیت ساخته شد", icon: "success", buttons: "بازگشت" })
          })
        //   .then(result => getAllSessions())
    }


    return (
        <>
            <div class="container-fluid" id="home-content">
                <div class="container">
                    <div class="home-title">
                        <span>افزودن جلسه جدید</span>
                    </div>
                    <form class="form">
                        <div class="col-6">
                            <div class="name input">
                                <label class="input-title">کد تخفیف</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="code"
                                    validations={[minValidator(5)]}
                                    placeholder="لطفا کد تخفیف را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">درصد تخفیف</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="percent"
                                    validations={[minValidator(1)]}
                                    placeholder="لطفا درصد تخفیف را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title" style={{ display: "block" }}>
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
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title" style={{ display: "block" }}>
                                    حداکثر مصرف
                                </label>
                                <input className="comments__score-input-text inputScore" type='range' min={1} max={100} placeholder='امتیاز خود را انتخاب کنید' value={newcountsOff} onChange={onchangeCountsOffHandler}>
                                </input>
                                <span>{newcountsOff}</span>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="submit-btn">
                                    <input type="submit" value="افزودن" onClick={addNewOffs} className={`login-form__btn login-panel__btn ${formState.isInputValid ? "success-sub" : "error-sub"}`} disabled={!formState.isInputValid} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
