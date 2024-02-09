import React, { useEffect, useState } from 'react'

import "./Search.css"
import TopBar from '../../Components/TopBar/TopBar'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import { useParams } from 'react-router-dom'
import ArticleBox from '../../Components/ArticleBox/ArticleBox'
import CourseBox from '../../Components/CourseBox/CourseBox'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'

export default function Search() {

    const [allResultArticles, setAllResultArticles] = useState([])
    const [allResultCourses, setAllResultCourses] = useState([])
    const { value } = useParams()

    useEffect(() => {
        fetch(`http://localhost:5000/v1/search/${value}`)
            .then(res => res.json())
            .then(result => {
                setAllResultArticles(result.allResultArticles)
                setAllResultCourses(result.allResultCourses)
            })
    }, [])


    return (
        <>
            <TopBar />
            <NavBar />

            <div className="courses">
                <div className="container">
                    <SectionHeader
                        title='نتایج برای جست و جوی شما'
                        descrip='مقالات'
                    />
                    <div className="search-container">
                        {
                            allResultArticles.length ?
                                allResultArticles.map(article => (
                                    <ArticleBox
                                        {...article}
                                        key={article.id}
                                    />)
                                )
                                : (
                                    <div className='alert alert-warning alert-with'>هیچ مقاله ای یافت نشد</div>
                                )
                        }
                    </div>
                </div>
            </div>
            <div className="courses">
                <div className="container">
                    <SectionHeader
                        title='نتایج برای جست و جوی شما'
                        descrip='دوره ها'
                    />
                    <div className="search-container">
                    {
                            allResultCourses.length ?
                                allResultCourses.map(course => (
                                    <CourseBox
                                        {...course}
                                        key={course.id}
                                    />)
                                )
                                : (
                                    <div className='alert alert-warning alert-with'>هیچ دوره ای یافت نشد</div>
                                )
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
