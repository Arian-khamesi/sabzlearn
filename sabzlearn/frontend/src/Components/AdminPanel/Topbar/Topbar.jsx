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
          // console.log(result);
          setAdminInfo(result)
          setAdminNotifs(result.notifications)
          // console.log(adminInfo)
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
    <div className="container-fluid">
      <div className="container">
        <div className={showNotifsModal ? "home-header active-modal-notfication" : "home-header"}>
          <div className="home-right ">
            <div className="home-searchbar">
              <input type="text" className="search-bar" placeholder="جستجو..." />
            </div>
            <div className="home-notification">
              <button type="button" onMouseEnter={() => setShowNotifsModal(true)}>
                <i className="far fa-bell"></i>
              </button>
            </div>
            <div className="home-notification-modal" onMouseEnter={() => setShowNotifsModal(true)} onMouseLeave={() => setShowNotifsModal(false)}>
              <ul className="home-notification-modal-list">
                {adminNotifs.length ? (
                  adminNotifs.map(notif => (
                    <li className="home-notification-modal-item" key={notif.id}>
                      <span className="home-notification-modal-text">پیغام ها</span>
                      <label className="switch">
                        <a href="jvascript:void(0)" onClick={() => tickedNotif(notif._id)}>
                          متوجه شدم
                        </a>
                      </label>
                    </li>
                  ))
                ) : (
                  <li className="home-notification-modal-item">
                    <span className="home-notification-modal-text">اعلانی برای شما وجود ندارد!</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="home-left">
            <div className="home-profile">
              <div className="home-profile-image">
                <a href="#" >
                  <img src={adminInfo.profile} alt="profile" />
                </a>
              </div>
              <div className="home-profile-name">
                <a href="#">{adminInfo.name}</a>
              </div>
              <div className="home-profile-icon">
                <i className="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
