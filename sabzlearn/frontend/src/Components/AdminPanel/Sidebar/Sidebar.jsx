import React from "react";
import './Sidebar.css'
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div id="sidebar" class="col-2">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <Link to={`/panel-admin/`}>
            <img src="/images/logo/Logo.png" alt="Logo" />
          </Link>
        </div>

        <div class="sidebar-menu-btn">
          <i class="fas fa-bars"></i>
        </div>
      </div>
      <div class="sidebar-menu">
        <ul>
          <li class="active-menu">
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
            <Link to={`offs`}>
              <span>کدهای تخفیف</span>
            </Link>
          </li>
          <li>
            <Link to={`/panel-admin/`}>
              <span>دسته‌بندی‌ها</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
