import React from 'react'

import './AboutUs.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import AboutUsBox from '../AboutUsBox/AboutUsBox'

export default function AboutUs() {
    return (
        <>
            <div class="about-us">
                <div class="container">
                    <SectionHeader
                        title={"ما چه کمکی بهتون میکنیم؟"}
                        descrip={'از اونجایی که آکادمی آموزشی سبزلرن یک آکادمی خصوصی هست'}
                    />
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <AboutUsBox/>
                    <AboutUsBox/>
                    <AboutUsBox/>
                    <AboutUsBox/>
                </div>
            </div>
        </>
    )
}
