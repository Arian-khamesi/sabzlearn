import React, { useEffect, useState } from 'react'

import "./Articles.css"
import TopBar from '../../Components/TopBar/TopBar'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import Pagination from '../../Components/Pagination/Pagination'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import ArticleBox from '../../Components/ArticleBox/ArticleBox'

export default function Articles() {

    const [allArticles, setAllArticles] = useState([])
    const [shownArticles, setShownArticles] = useState([])

    useEffect(() => {

        fetch("http://localhost:5000/v1/articles")
            .then(res => res.json())
            .then(result => setAllArticles(result))

    }, [])


    return (
        <>
            <TopBar />

            <NavBar />
            <BreadCrumb
                links={
                    [
                        { id: 1, title: 'خانه', to: '/' },
                        { id: 2, title: 'تمامی مقاله ها', to: '/articles' },
                    ]}
            />
            <section className="courses">
                <div className="container">
                    <div className="courses-content">
                        <div className="container">
                            <div className="row">
                                {shownArticles.filter(article=>article.publish===1).map((data) => {
                                    return (
                                       <ArticleBox
                                       {...data}
                                       />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Pagination
                item={allArticles.filter(article=>article.publish===1)}
                itemCount={2}
                pathName={'/articles'}
                setShownCourses={setShownArticles}
            />
            <Footer />

        </>
    )
}
