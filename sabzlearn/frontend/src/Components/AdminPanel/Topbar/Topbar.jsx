import React, { useEffect, useState } from "react";

export default function Topbar() {

  const [adminInfo,setAdminInfo]=useState({})

useEffect(()=>{

  const localstorageData = JSON.parse(localStorage.getItem("user"))

fetch("http://localhost:5000/v1/auth/me",{
  headers:{
    "Authorization":`Bearer ${localstorageData.token}`
  }
})
.then(res=>res.json())
.then(result=>{
  console.log(result);
  setAdminInfo(result)
  console.log(adminInfo)
})

},[])

  return (
    <div class="container-fluid">
      <div class="container">
        <div class="home-header">
          <div class="home-right">
            <div class="home-searchbar">
              <input type="text" class="search-bar" placeholder="جستجو..." />
            </div>
            <div class="home-notification">
              <button type="button">
                <i class="far fa-bell"></i>
              </button>
            </div>
            <div class="home-notification-modal">
              <ul class="home-notification-modal-list">
                <li class="home-notification-modal-item">
                  <span class="home-notification-modal-text">پیغام ها</span>
                  <label class="switch">
                    <input type="checkbox" checked />
                    <span class="slider round"></span>
                  </label>
                </li>
                <li class="home-notification-modal-item">
                  <span class="home-notification-modal-text">پیغام ها</span>
                  <label class="switch">
                    <input type="checkbox" checked />
                    <span class="slider round"></span>
                  </label>
                </li>
                <li class="home-notification-modal-item">
                  <span class="home-notification-modal-text">پیغام ها</span>
                  <label class="switch">
                    <input type="checkbox" checked />
                    <span class="slider round"></span>
                  </label>
                </li>
                <li class="home-notification-modal-item">
                  <span class="home-notification-modal-text">پیغام ها</span>
                  <label class="switch">
                    <input type="checkbox" checked />
                    <span class="slider round"></span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div class="home-left">
            <div class="home-profile">
              <div class="home-profile-image">
                <a href="#" >
                <img src={adminInfo.profile} alt="profile"/>
                </a>
              </div>
              <div class="home-profile-name">
                <a href="#">{adminInfo.name}</a>
              </div>
              <div class="home-profile-icon">
                <i class="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
