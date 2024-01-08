import React from 'react'

import './ArticleBox.css'
import { useState } from 'react'

export default function ArticleBox({ title, descrip, cover }) {

  const [isCoverLoad, setIsCoverLoad] = useState(false)
  const coverLoader = () => {
    setIsCoverLoad(true)
  }

  return (
    <div class="col-4">
      <div class="article-card">
        <div class="article-card__header">
          <a href="#" class="article-card__link-img">
            <img src={isCoverLoad ? cover : "/images/shimmer.gif"} class={isCoverLoad ? "article-card__img" : ""} alt="Article Cover" onLoad={coverLoader} />
          </a>
        </div>
        <div class="article-card__content">
          <a href="#" class="article-card__link">
            {title}
          </a>
          <p class="article-card__text">
            {descrip}
          </p>
          <a href="#" class="article-card__btn">بیشتر بخوانید</a>
        </div>
      </div>
    </div>
  )
}
