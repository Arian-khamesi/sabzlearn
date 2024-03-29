import React, { useEffect, useState } from 'react'

import './LastArticles.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import ArticleBox from '../ArticleBox/ArticleBox'

export default function LastArticles() {

    const [articles, setArticles] = useState([])

    useEffect(() => {

        fetch("http://localhost:5000/v1/articles")
            .then(res => res.json())
            .then(result => setArticles(result))

    }, [])


    return (
        <section className="articles">
            <div className="container">
                <SectionHeader
                    title={'جدیدترین مقاله ها'}
                    descrip={'پیش به سوی ارتقای دانش'}
                    btnTitle={'تمامی مقاله ها'}
                    btnHref={"/articles"}
                />

                <div className="articles__content">
                    <div className="row">

                        {
                            articles.filter(article => article.publish === 1).slice(0, 3).map(article => (
                                <ArticleBox
                                    {...article}
                                />
                            ))
                        }

                    </div>
                </div>


            </div>
        </section>
    )
}
