import React, { useState, useEffect } from 'react'
import { useForm } from '../../../hooks/useForm'
import Input from '../../../Components/Form/Input'
import { minValidator, phoneValidator } from '../../../validators/rules'
import swal from 'sweetalert'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'

export default function Session() {

    const [courses, setCourses] = useState([]);
    const [sessionCourse, setSessionCourse] = useState('-1');
    const [sessionVideo, setSessionVideo] = useState({})
    const [sessionStatus, setSessionStatus] = useState(0)

    const [formState, onInputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            time: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        getAllSessions()

        fetch("http://localhost:5000/v1/courses")
            .then((res) => res.json())
            .then((allCourses) => {
                console.log(allCourses);
                setCourses(allCourses);
            });
    }, []);

    ///////////////////////add session////////////////////////

    const addNewSession = (event) => {
        event.preventDefault()
        const localStorageData = JSON.parse(localStorage.getItem("user"))

        let formData = new FormData()
        formData.append('title', formState.inputs.title.value)
        formData.append('time', Number(formState.inputs.time.value))
        formData.append('video', sessionVideo)
        formData.append('free', sessionStatus)

        fetch(`http://localhost:5000/v1/courses/${sessionCourse}/sessions`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            },
            body: formData
        }).then(res => {
            if (res.ok) {
                swal({
                    title: "جلسه مورد نظر با موفقیت اضافه شد",
                    icon: 'success',
                    buttons: 'اوکی'
                }).then(() => {
                    getAllSessions();
                })
            }
        })
    }
    //////////////////////get sessions///////////////////////

    const [allSessions, setAllSessions] = useState([])

    const getAllSessions = () => {
        fetch("http://localhost:5000/v1/courses/sessions")
            .then(res => res.json())
            .then(result => setAllSessions(result))
    }


    console.log(allSessions);
    //////////////////delete session//////////////////////
    const sessionRemover=(id,name)=>{
        swal({
            title: `آیا از حذف  ${name} اطمینان دارید؟`,
            icon: "warning",
            buttons: ["انصراف", "حذف"]
          }).then(result => {
            result && remover(id)
          })
    }

    const remover = (userId) => {
        const localstorageData = JSON.parse(localStorage.getItem("user"))
        fetch(`http://localhost:5000/v1/courses/sessions/${userId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localstorageData.token}`
          }
        })
          .then((res) => {
            res.json()
            res.ok && swal({ title: "جلسه مدنظر با موفقیت حذف شد", icon: "success", buttons: "بازگشت" })
          })
          .then(result => getAllSessions())
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
                                <label class="input-title">عنوان جلسه</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="title"
                                    validations={[minValidator(5)]}
                                    placeholder="لطفا نام جلسه را وارد کنید..."
                                />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price input">
                                <label class="input-title">مدت زمان جلسه</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="time"
                                    validations={[minValidator(5)]}
                                    placeholder="لطفا مدت زمان جلسه را وارد کنید..."
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
                            <div class="name input">
                                <label class="input-title">فایل ویدیو جلسه</label>
                                <input type="file" onChange={event => setSessionVideo(event.target.files[0])} />
                                <span class="error-message text-danger"></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="condition">
                                    <label class="input-title">وضعیت دوره</label>
                                    <div class="radios">
                                        <div class="available">
                                            <label>
                                                <span>غیر رایگان</span>
                                                <input
                                                    type="radio"
                                                    value={0}
                                                    name="condition"
                                                    checked
                                                    onInput={event => setSessionStatus(event.target.value)}
                                                />
                                            </label>
                                        </div>
                                        <div class="unavailable">
                                            <label>
                                                <span>رایگان</span>
                                                <input
                                                    type="radio"
                                                    value={1}
                                                    name="condition"
                                                    onInput={event => setSessionStatus(event.target.value)}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="bottom-form">
                                <div class="submit-btn">
                                    <input type="submit" value="افزودن" onClick={addNewSession} className={`login-form__btn login-panel__btn ${formState.isInputValid ? "success-sub" : "error-sub"}`} disabled={!formState.isInputValid} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <DataTable title="جلسات">
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>عنوان</th>
                            <th>مدت زمان</th>
                            <th>دوره</th>
                            <th>تاریخ ثبت</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allSessions.map((session, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{session.title}</td>
                                <td>{session.time}</td>
                                <td>{session.course?session.course.name:"-"}</td>
                                <td>{session.createdAt.slice(0,10)}</td>
                                
                                {/* <td><Link to={`/course-info/${course.shortName}`}>{course.shortName}</Link></td> */}
                                <td>
                                    <button type="button" class="btn btn-primary edit-btn">
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger delete-btn" onClick={() => sessionRemover(session._id, session.title)}>
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DataTable>
        </>
    )
}
