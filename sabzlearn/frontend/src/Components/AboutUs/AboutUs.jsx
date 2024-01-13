import React from 'react'

import './AboutUs.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import AboutUsBox from '../AboutUsBox/AboutUsBox'

export default function AboutUs() {
    return (
        <>
            <div className="about-us">
                <div className="container">
                    <SectionHeader
                        title={"ما چه کمکی بهتون میکنیم؟"}
                        descrip={'از اونجایی که آکادمی آموزشی سبزلرن یک آکادمی خصوصی هست'}
                    />
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <AboutUsBox
                        title={"دوره های اختصاصی"}
                        descrip={'با پشتیبانی و کیفیت بالا ارائه میده !'} />
                    <AboutUsBox
                        title={'اجازه تدریس'}
                        descrip={'به هر مدرسی رو نمیده . چون کیفیت براش مهمه !'} />
                    <AboutUsBox
                        title={'دوره پولی و رایگان'}
                        descrip={'براش مهم نیست. به مدرسینش حقوق میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره ارائه بده'} />
                    <AboutUsBox
                        title={'اهمیت به کاربر'}
                        descrip={'اولویت اول و آخر آکادمی آموزش برنامه نویسی سبزلرن اهمیت به کاربرها رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست'} />
                </div>
            </div>
        </>
    )
}
