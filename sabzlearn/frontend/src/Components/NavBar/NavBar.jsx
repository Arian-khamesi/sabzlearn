import React, { useContext, useEffect, useState } from 'react'
import "./NavBar.css"
import { Link } from 'react-router-dom'

import AuthContext from '../../context/authContext'



export default function NavBar() {

  const authContext = useContext(AuthContext)
  const [allMenus, setAllMenus] = useState([])

  // console.log(authContext);
  
  useEffect(() => {
    fetch('http://localhost:5000/v1/menus')
      .then(res => res.json())
      .then(menus => {
        setAllMenus(menus)
      })
  }, [])
  
  // console.log(allMenus);

  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <img src="/images/logo/Logo.png" className="main-header__logo" alt="لوگوی سبزلرن" />

            <ul className="main-header__menu">
              <li className="main-header__item">
                <Link to="/" className="main-header__link"><span className='main-header__link-span'>صفحه اصلی</span></Link>
              </li>


              {
                allMenus.map(menu => (
                  <li className="main-header__item">
                    <Link to={`/category-info/${menu.href}/1`} className="main-header__link"><span className='main-header__link-span'>
                      {menu.title}
                      {menu.submenus.length !== 0 && (
                        <>
                          <i className="fas fa-angle-down main-header__link-icon"></i>
                          <ul className="main-header__dropdown">
                            {
                              menu.submenus.map(submenu => (
                                <li className="main-header__dropdown-item">
                                  <Link to={submenu.href} className="main-header__dropdown-link">{submenu.title}</Link>
                                </li>
                              ))
                            }
                          </ul>
                        </>
                      )}
                    </span></Link>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="main-header__left">
            <a href="#" className="main-header__search-btn">
              <i className="fas fa-search main-header__search-icon"></i>
            </a>
            <a href="#" className="main-header__cart-btn">
              <i className="fas fa-shopping-cart main-header__cart-icon"></i>
            </a>

            {
              authContext.isLoggedIn ? (<Link to="#" className="main-header__profile">
                <span className="main-header__profile-text">{authContext.userInfos.name}</span>
              </Link>) : (<Link to="http://localhost:3000/login" className="main-header__profile">
                <span className="main-header__profile-text">ورود / ثبت نام</span>
              </Link>)
            }

          </div>
        </div>
      </div>
    </div>
  )
}
