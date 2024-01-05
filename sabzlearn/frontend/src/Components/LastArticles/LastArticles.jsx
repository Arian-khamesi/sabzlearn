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
                        <ArticleBox
                            title={'نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون'}
                            descrip={'زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع...'}
                            cover={'images/blog/3.jpg'}
                        />
                        <ArticleBox
                            title={'نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون'}
                            descrip={'زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع...'}
                            cover={'images/blog/3.jpg'}
                        />
                        <ArticleBox
                            title={'نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون'}
                            descrip={'زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع...'}
                            cover={'images/blog/3.jpg'}
                        />

                    </div>
                </div>


            </div>
        </section>
    )
}
