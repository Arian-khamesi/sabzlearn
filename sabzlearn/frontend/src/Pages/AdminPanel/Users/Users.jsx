import React, { useEffect, useState } from 'react'
import "./Users.css"
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'

import Input from '../../../Components/Form/Input'
import { requiredValidator, minValidator, maxValidator, emailValidator, phoneValidator } from '../../../validators/rules'
import { useForm } from '../../../hooks/useForm'
import Button from '../../../Components/Form/Button'

export default function Users() {

  const [allUser, setAllUsers] = useState([])
  const localstorageData = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    getUsers()
  }, [])
  console.log(allUser)

  function getUsers() {
    fetch('http://localhost:5000/v1/users', {
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    })
      .then(res => res.json())
      .then(result => setAllUsers(result))
  }

  const userRemove = (id) => {
    console.log(id);
    swal({
      title: "آیا از حذف کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["انصراف", "حذف"]
    }).then(result => {
      result && remover(id)
    })
  }


  const remover = (userId) => {
    fetch(`http://localhost:5000/v1/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    })
      .then((res) => {
        res.json()
        res.ok && swal({ title: "کاربر مدنظر با موفقیت حذف شد", icon: "success", buttons: "بازگشت" })
      })
      .then(result => getUsers())
  }
  ////////////////////////block user//////////////////////

  const blocker = (userId) => {
    console.log(localstorageData)
    fetch(`http://localhost:5000/v1/users/ban/${userId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    })
      .then((res) => {
        res.json()
        res.ok && swal({ title: "کاربر مدنظر با موفقیت مسدود شد", icon: "success", buttons: "بازگشت" })
      })
      .then(result => {
        // remover(userId)
        getUsers()
      })
  }

  const userBlock = (id) => {
    console.log(id);
    swal({
      title: "آیا از مسدود کردن کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["انصراف", "مسدود"]
    }).then(result => {
      result && blocker(id)

    })
  }
  //////////////////////////////////////////////////////////

  const registerUserHandler = (event) => {
    event.preventDefault()
    console.log('user register');

    const newUserInfo = {
      name: formState.inputs.fullname.value,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      phone: Number(formState.inputs.phone.value),
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.confirmPassword.value,
    };

    console.log(newUserInfo);
    if (newUserInfo.password.value === newUserInfo.confirmPassword.value) {
      fetch("http://localhost:5000/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfo),
      }).then((res) => {
        res.json()
        if (res.ok) {
          swal({
            title: `${formState.inputs.username.value}  با موفقیت در سایت ثبت نام شد`,
            icon: "success",
            buttons: 'بازگشت',
          })
        }
      })
        .then((result) => {
          // authContext.login(result.accessToken, result.user)
          getUsers()
        })
    }
    else {
      alert("رمز عبور با تکرار آن یکسان نیست")
    }

  }


  const [formState, onInputHandler] = useForm({
    fullname: {
      value: "",
      isValid: false
    },
    username: {
      value: "",
      isValid: false
    },
    email: {
      value: "",
      isValid: false
    },
    phone: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false
    },
    confirmPassword: {
      value: "",
      isValid: false
    },
  }, false)


  ////////////////////change users role //////////////////////
  const changeRole = (userID) => {

    swal({
      title: "لطفا نقش جدید را وارد نمایید:",
      content: 'input'
    }).then(value => {
      if(value.length) {
        const reqBodyInfos = {
          role: value,
          id: userID
        }

        fetch(`http://localhost:5000/v1/users/role`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reqBodyInfos)
        }).then(res => {
          if(res.ok) {
            swal({
              title: "نقش کاربر مورد نظر با موفقیت تغییر یافت",
              icon: "success",
              buttons: "خیلی هم عالی"
            })
          }
        })
      }
    })

  }

  return (
    <>
      <div className="home-content-edit">
        <div className="back-btn">
          <i className="fas fa-arrow-right"></i>
        </div>
        <form className="form">
          <div className="col-6">
            <div className="name input">
              <label className="input-title">نام و نام خانوادگی</label>
              <Input
                className="login-form__username-input"
                type="text"
                id="fullname"
                element='input'
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  // emailValidator()
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="family input">
              <label className="input-title">نام کاربری</label>
              <Input
                className="login-form__username-input"
                type="text"
                id="username"
                element='input'
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  // emailValidator()
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام کاربری را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="email input">
              <label className="input-title">ایمیل</label>
              <Input
                className="login-form__username-input"
                type="text"
                id="email"
                element='input'
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(40),
                  emailValidator()
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>

          <div className="col-6">
            <div className="phone input">
              <label className="input-title">شماره تلفن</label>
              <Input
                className="login-form__username-input"
                onInputHandler={onInputHandler}
                element="input"
                id="phone"
                type="text"
                validations={[requiredValidator(), minValidator(10), maxValidator(11), phoneValidator()]}
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>

          <div className="col-6">
            <div className="password input">
              <label className="input-title">رمز عبور</label>
              <Input
                className="login-form__username-input"
                type="password"
                id="password"
                element='input'
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  // emailValidator()
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="password input">
              <label className="input-title">تکرار رمز عبور</label>
              <Input
                className="login-form__password-input"
                type="password"
                id="confirmPassword"
                element='input'
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  // emailValidator()
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا رمز عبور کاربر را تکرار کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>

          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <Button className={`login-form__btn login-panel__btn ${formState.isInputValid ? "success-sub" : "error-sub"}`} type="submit" onClick={registerUserHandler} disabled={!formState.isInputValid}>
                  {/* <i className="login-form__btn-icon fa fa-user-plus"></i> */}
                  <span className="login-form__btn-text">افزودن</span>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title="کاربران">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>شماره</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>سطح دسترسی</th>
              <th>حذف</th>
              <th>مسدود کردن</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map(user => (
              <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn" onClick={() => changeRole(user._id)}>
                    تغییر سطح
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger delete-btn" onClick={() => userRemove(user._id)}>
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-secondary delete-btn" onClick={() => userBlock(user._id)}>
                    مسدود
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
