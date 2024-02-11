import React, { useEffect, useState } from "react";

export default function Topbar() {

  const [adminInfo, setAdminInfo] = useState({})
  const [adminNotifs, setAdminNotifs] = useState([])
  const [showNotifsModal, setShowNotifsModal] = useState(false)


  useEffect(() => {

    const localstorageData = JSON.parse(localStorage.getItem("user"))

    if (localstorageData) {
      fetch("http://localhost:5000/v1/auth/me", {
        headers: {
          "Authorization": `Bearer ${localstorageData.token}`
        }
      })
        .then(res => res.json())
        .then(result => {
          console.log(result);
          setAdminInfo(result)
          setAdminNotifs(result.notifications)
          console.log(adminInfo)
        })
    }

  }, [tickedNotif])

  function tickedNotif(notifID) {

    const localstorageData = JSON.parse(localStorage.getItem("user"))

    fetch(`http://localhost:5000/v1/notifications/see/${notifID}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${localstorageData.token}`
      }
    })
      .then(res => res.json())
      .then(result => console.log(result))
  }

  return (
    <div class="container-fluid">
      <div class="container">
        <div class={showNotifsModal ? "home-header active-modal-notfication" : "home-header"}>
          <div class="home-right ">
            <div class="home-searchbar">
              <input type="text" class="search-bar" placeholder="جستجو..." />
            </div>
            <div class="home-notification">
              <button type="button" onMouseEnter={() => setShowNotifsModal(true)}>
                <i class="far fa-bell"></i>
              </button>
            </div>
            <div class="home-notification-modal" onMouseEnter={() => setShowNotifsModal(true)} onMouseLeave={() => setShowNotifsModal(false)}>
              <ul class="home-notification-modal-list">
                {adminNotifs.length ? (
                  adminNotifs.map(notif => (
                    <li class="home-notification-modal-item" key={notif.id}>
                      <span class="home-notification-modal-text">پیغام ها</span>
                      <label class="switch">
                        <a href="jvascript:void(0)" onClick={() => tickedNotif(notif._id)}>
                          متوجه شدم
                        </a>
                      </label>
                    </li>
                  ))
                ) : (
                  <li class="home-notification-modal-item">
                    <span class="home-notification-modal-text">اعلانی برای شما وجود ندارد!</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div class="home-left">
            <div class="home-profile">
              <div class="home-profile-image">
                <a href="#" >
                  <img src={adminInfo.profile} alt="profile" />
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
