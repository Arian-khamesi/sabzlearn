import React, { useEffect, useState } from 'react'
import "./Menus.css"
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import { Link } from "react-router-dom"
import swal from 'sweetalert'
import Input from "../../../Components/Form/Input"
import { useForm } from "../../../hooks/useForm";
import { minValidator } from "../../../validators/rules";

export default function Menus() {

  const [allMenus, setAllMenus] = useState([])

  useEffect(() => {
    getAllMenus()
  }, [])

  const getAllMenus = () => {
    fetch("http://localhost:5000/v1/menus/all")
      .then(res => res.json())
      .then(result => setAllMenus(result))
  }


  // console.log(allMenus);

  //////////////////delete menu////////////////////////

  const deleteMenu = (id) => {
    swal({
      title: "از حذف این منو مطمئن هستید ؟",
      icon: "warning",
      buttons: ["انصراف", "حذف"]
    }).then(result => {
      result && remover(id)
    })
  }

  const remover = (userId) => {
    const localstorageData = JSON.parse(localStorage.getItem("user"))
    fetch(`http://localhost:5000/v1/menus/${userId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    })
      .then((res) => {
        res.json()
        res.ok && swal({ title: "منو مدنظر با موفقیت حذف شد", icon: "success", buttons: "بازگشت" })
      })
      .then(result => getAllMenus())
  }
  ////////////////////////add new menu//////////////////////////////
  const [menuParent, setMenuParent] = useState("-1");
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      href: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const createMenu = (event) => {
    event.preventDefault();
    const localStorageDate = JSON.parse(localStorage.getItem('user'))
    const newMenuInfo = {
      title: formState.inputs.title.value,
      href: formState.inputs.href.value,
      parent: (menuParent === "main") ? undefined : menuParent
    }

    fetch("http://localhost:5000/v1/menus", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageDate.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMenuInfo)
    })
      .then(res => {
        if (res.ok) {
          swal({
            title: 'منو جدید با موفقیت ایجاد شد',
            icon: 'success',
            buttons: 'اوکی'
          }).then(() => {
            getAllMenus()
          })
        }
      })
  };

  return (
    <>
      <div className="container">
        <div className="home-title">
          <span>افزودن کاربر جدید</span>
        </div>
        <form className="form">
          <div className="col-6">
            <div className="name input">
              <label className="input-title">عنوان</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                id="title"
                type="text"
                isValid="false"
                placeholder="لطفا عنوان را وارد کنید..."
                validations={[minValidator(5)]}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="name input">
              <label className="input-title">عنوان</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                id="href"
                type="text"
                isValid="false"
                validations={[minValidator(5)]}
                placeholder="لطفا عنوان را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="name input">
              <label className="input-title">عنوان</label>
              <select
                className="select"
                onChange={(event) => setMenuParent(event.target.value)}
              >
                <option value="-1">منوی اصلی را انتخاب کنید</option>
                <option value="main"><span>منوی اصلی</span></option>
                {allMenus.map((menu) => (
                  <>
                    {!Boolean(menu.parent) && (
                      <option value={menu._id}>زیرمنوی {menu.title}</option>
                    )}
                  </>
                ))}
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input type="submit" value="افزودن" onClick={createMenu} className={`login-form__btn login-panel__btn ${formState.isInputValid ? "success-sub" : "error-sub"}`} disabled={!formState.isInputValid} />
              </div>
            </div>
          </div>
        </form>
      </div>

      <DataTable title={"منو ها"}>
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>اصلی یا ساب منو</th>
              <th>عنوان</th>
              <th>لینک</th>
              <th>فرزند</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {allMenus.map((menu, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{menu.parent ? "زیر منو" : "منو اصلی"}</td>
                <td>{menu.title}</td>
                <td><Link to={menu.href}>{menu.href}</Link></td>
                <td>{menu.parent ? menu.parent.title : <i className="fa fa-times-circle" aria-hidden="true" style={{ color: "#dc3545" }}></i>
                }</td>
                <td>
                  <button type="button" className="btn btn-danger delete-btn" onClick={() => deleteMenu(menu._id)}>
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    پاسخ
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
