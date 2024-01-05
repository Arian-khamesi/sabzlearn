import React from 'react'

import './LastArticles.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import ArticleBox from '../ArticleBox/ArticleBox'

export default function LastArticles() {
    return (
        <section class="articles">
            <div class="container">
                <SectionHeader
                    title={'جدیدترین مقاله ها'}
                    descrip={'پیش به سوی ارتقای دانش'}
                    btnTitle={'تمامی مقاله ها'}
                />

                <div class="articles__content">
                    <div class="row">
                        <ArticleBox />
                        <ArticleBox />
                        <ArticleBox />
                    </div>
                </div>


            </div>
        </section>
    )
}
