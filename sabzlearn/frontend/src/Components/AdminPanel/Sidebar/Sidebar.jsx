import React, { useContext } from "react";
import './Sidebar.css'
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../../../context/authContext';
import swal from "sweetalert";

export default function Sidebar() {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const logOutHandler = () => {
    swal({
      title: "با موفقیت از حساب خود خارج شدید",
      icon: "success",
      buttons: "صفحه اصلی"
    }).then(() => {
      authContext.logout()
      navigate("/")
    })
  }


  return (
    <div id="sidebar" className="col-2">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Link to={`/panel-admin/`}>
            <img src="/images/logo/Logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="sidebar-menu-btn">
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li className="active-menu">
            <Link to={`/panel-admin/`}>
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link to={`courses`}>
              <span>دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to={`sessions`}>
              <span>جلسات</span>
            </Link>
          </li>
          <li>
            <Link to={`menus`}>
              <span>منو ها</span>
            </Link>
          </li>
          <li>
            <Link to={`articles`}>
              <span>مقاله ها</span>
            </Link>
          </li>
          <li>
            <Link to={`users`}>
              <span>کاربران</span>
            </Link>
          </li>
          <li>
            <Link to={`comments`}>
              <span>نظرات دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to={`tickets`}>
              <span>تیکت ها</span>
            </Link>
          </li>
          <li>
            <Link to={`offs`}>
              <span>کدهای تخفیف</span>
            </Link>
          </li>
          <li>
            <Link to={`offs-festival`}>
              <span>جشنواره تخفیف</span>
            </Link>
          </li>
          <li>
            <Link to={`category`}>
              <span>دسته‌بندی‌ها</span>
            </Link>
          </li>
          <li>
            <Link to={`contact`}>
              <span>نظرات سایت</span>
            </Link>
          </li>
          <li>
            <Link to={`/panel-admin/`} onClick={logOutHandler}>
              <span>خروج از حساب کاربری</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
