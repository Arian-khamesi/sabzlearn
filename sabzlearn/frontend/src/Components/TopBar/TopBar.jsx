import React, { useEffect, useState, memo } from 'react'
import './TopBar.css'
import { Link } from 'react-router-dom'

export default memo(function TopBar() {

    const [allTopLinks, setAllTopLinks] = useState([])

    useEffect(() => {

        fetch('http://localhost:5000/v1/menus/topbar')
            .then(res => res.json())
            .then(topLinks => setAllTopLinks([...topLinks]))

    }, [])


    const getRandomFromArray = (array, itemCount) => {

        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, itemCount);

    }

    console.log(allTopLinks);


    return (
        <div className="top-bar">
            <div className="container-fluid">
                <div className="top-bar__content">
                    <div className="top-bar__right">
                        <ul className="top-bar__menu">

                            {
                                getRandomFromArray(allTopLinks, 6).map(link => (
                                    <li className="top-bar__item">
                                        <Link to={`/course-info/${link.href}/1`} className="top-bar__link">{link.title}</Link>
                                    </li>
                                ))
                            }

                            <li className="top-bar__item">
                                <a href="#" className="top-bar__link">20,000 تومان</a>
                            </li>
                        </ul>
                    </div>
                    <div className="top-bar__left">
                        <div className="top-bar__email">
                            <a href="#" className="top-bar__email-text top-bar__link">
                                sabzlearn@gmail.com
                            </a>
                            <i className="fas fa-envelope top-bar__email-icon"></i>
                        </div>
                        <div className="top-bar__phone">
                            <a href="#" className="top-bar__phone-text top-bar__link">
                                09921558293
                            </a>
                            <i className="fas fa-phone top-bar__phone-icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
