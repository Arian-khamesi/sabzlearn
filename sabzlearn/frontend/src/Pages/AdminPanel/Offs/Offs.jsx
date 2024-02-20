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
    const [allOffs, setAllOffs] = useState([])
    const localStorageData = JSON.parse(localStorage.getItem("user"))


    useEffect(() => {
        getAllOffsCode()
        fetch("http://localhost:5000/v1/courses")
            .then((res) => res.json())
            .then((allCourses) => {
                setCourses(allCourses);
            });
    }, []);

    const getAllOffsCode = () => {
        fetch("http://localhost:5000/v1/offs",{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorageData.token}`,
            },
        })
            .then((res) => res.json())
            .then((allOffs) => {
                console.log(allOffs);
                setAllOffs(allOffs);
            });
    }

    ///////////////create off code///////////////////////

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

        const newOffInfos = {
            code: formState.inputs.code.value,
            percent: Number(formState.inputs.percent.value),
            course: sessionCourse,
            max: Number(newcountsOff)
        }
        console.log(newOffInfos);
        fetch("http://localhost:5000/v1/offs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorageData.token}`,
            },
            body: JSON.stringify(newOffInfos)
        })
            .then((res) => {
                res.json()
                res.ok && swal({ title: "کد تخفیف مدنظر با موفقیت ساخته شد", icon: "success", buttons: "بازگشت" })
            })
          .then(result => getAllOffsCode())
    }

    ///////////////////remove offs code///////////////////////
    const offersRemover=(id,name)=>{
        swal({
            title: `آیا از حذف کد تخفیف   ${name} اطمینان دارید؟`,
            icon: "warning",
            buttons: ["انصراف", "حذف"]
          }).then(result => {
            result && remover(id)
          })
    }

    const remover = (codeId) => {
        const localstorageData = JSON.parse(localStorage.getItem("user"))
        fetch(`http://localhost:5000/v1/offs/${codeId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localstorageData.token}`
          }
        })
          .then((res) => {
            res.json()
            res.ok && swal({ title: "کد تخفیف مدنظر با موفقیت حذف شد", icon: "success", buttons: "بازگشت" })
          })
          .then(result => getAllOffsCode())
      }

// console.log(allOffs);
    return (
        <>
            <div className="container-fluid" id="home-content">
                <div className="container">
                    <div className="home-title">
                        <span>افزودن جلسه جدید</span>
                    </div>
                    <form className="form">
                        <div className="col-6">
                            <div className="name input">
                                <label className="input-title">کد تخفیف</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="code"
                                    validations={[minValidator(5)]}
                                    placeholder="لطفا کد تخفیف را وارد کنید..."
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="price input">
                                <label className="input-title">درصد تخفیف</label>
                                <Input
                                    element="input"
                                    onInputHandler={onInputHandler}
                                    type="text"
                                    id="percent"
                                    validations={[minValidator(1)]}
                                    placeholder="لطفا درصد تخفیف را وارد کنید..."
                                />
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="price input">
                                <label className="input-title" style={{ display: "block" }}>
                                    دوره
                                </label>
                                <select className="select" onChange={event => setSessionCourse(event.target.value)}>
                                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                                    {courses.map((course) => (
                                        <option value={course._id} key={course._id}>{course.name}</option>
                                    ))}
                                </select>
                                <span className="error-message text-danger"></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="price input">
                                <label className="input-title" style={{ display: "block" }}>
                                    حداکثر مصرف
                                </label>
                                <input className="comments__score-input-text inputScore" type='range' min={1} max={100} placeholder='امتیاز خود را انتخاب کنید' value={newcountsOff} onChange={onchangeCountsOffHandler}>
                                </input>
                                <span>{newcountsOff}</span>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="bottom-form">
                                <div className="submit-btn">
                                    <input type="submit" value="افزودن" onClick={addNewOffs} className={`login-form__btn login-panel__btn ${formState.isInputValid ? "success-sub" : "error-sub"}`} disabled={!formState.isInputValid} />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <DataTable title="جلسات">
                <table className="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>کد</th>
                            <th>درصد</th>
                            <th>حداکثر استفاده</th>
                            <th>دفعات استفاده شده</th>
                            <th>سازنده</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOffs.map((off, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{off.code}</td>
                                <td>{off.percent}</td>
                                <td>{off.max}</td>
                                <td>{off.uses}</td>
                                <td>{off.creator}</td>



                                <td>
                                    <button type="button" className="btn btn-danger delete-btn" onClick={() => offersRemover(off._id, off.code)}>
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
