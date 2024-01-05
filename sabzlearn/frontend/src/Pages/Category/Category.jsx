import React from 'react'

import "./Category.css"

import TopBar from '../../Components/TopBar/TopBar'
import NavBar from '../../Components/NavBar/NavBar'
import CourseBox from '../../Components/CourseBox/CourseBox'
import Footer from '../../Components/Footer/Footer'

import prototypeData from '../../prototypeData/prototypeData'

export default function Category() {
  return (
    <>
      <TopBar />

      <NavBar />

      <section class="courses">
        <div class="container">
          <div class="courses-top-bar">

            <div class="courses-top-bar__right">
              <div class="courses-top-bar__row-btn courses-top-bar__icon--active">
                <i class="fas fa-border-all courses-top-bar__icon"></i>
              </div>
              <div class="courses-top-bar__column-btn">
                <i class="fas fa-align-left courses-top-bar__icon"></i>
              </div>

              <div class="courses-top-bar__selection">
                <span class="courses-top-bar__selection-title">
                  مرتب سازی پیش فرض
                  <i class="fas fa-angle-down courses-top-bar__selection-icon"></i>
                </span>
                <ul class="courses-top-bar__selection-list">
                  <li class="courses-top-bar__selection-item courses-top-bar__selection-item--active">مرتب سازی پیش فرض</li>
                  <li class="courses-top-bar__selection-item">مربت سازی بر اساس محبوبیت</li>
                  <li class="courses-top-bar__selection-item">مربت سازی بر اساس امتیاز</li>
                  <li class="courses-top-bar__selection-item">مربت سازی بر اساس آخرین</li>
                  <li class="courses-top-bar__selection-item">مربت سازی بر اساس ارزان ترین</li>
                  <li class="courses-top-bar__selection-item">مربت سازی بر اساس گران ترین</li>
                </ul>
              </div>
            </div>

            <div class="courses-top-bar__left">
              <form action="#" class="courses-top-bar__form">
                <input type="text" class="courses-top-bar__input" placeholder="جستجوی دوره ..." />
                <i class="fas fa-search courses-top-bar__search-icon"></i>
              </form>
            </div>

          </div>

          <div class="courses-content">
            <div class="container">
              <div class="row">
                {prototypeData.map((data) => {
                  if (data.id < 4) {
                    return <CourseBox
                      img={data.img}
                      title={data.title}
                      instructor={data.instructor}
                      participants={data.participants}
                      price={data.price}
                      key={data.id}
                    />
                  }
                }
                )}
              </div>
            </div>
          </div>

          <div class="courses-pagination">
            <ul class="courses__pagination-list">
              <li class="courses__pagination-item">
                <a href="#" class="courses__pagination-link">
                  <i class="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
                </a>
              </li>
              <li class="courses__pagination-item">
                <a href="#" class="courses__pagination-link">
                  1
                </a>
              </li>
              <li class="courses__pagination-item">
                <a href="#" class="courses__pagination-link">
                  2
                </a>
              </li>
              <li class="courses__pagination-item">
                <a href="#" class="courses__pagination-link courses__pagination-link--active">
                  3
                </a>
              </li>
              <li class="courses__pagination-item">
                <a href="#" class="courses__pagination-link">
                  <i class="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />

    </>
  )
}
