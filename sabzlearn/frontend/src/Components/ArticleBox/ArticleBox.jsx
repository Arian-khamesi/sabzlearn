import React from 'react'

import './ArticleBox.css'
import { useState } from 'react'

export default function ArticleBox({ title, descrip, cover }) {

  const [isCoverLoad, setIsCoverLoad] = useState(false)
  const coverLoader = () => {
    setIsCoverLoad(true)
  }

  return (
    <div className="col-4">
      <div className="article-card">
        <div className="article-card__header">
          <a href="#" className="article-card__link-img">
            <img src={isCoverLoad ? cover : "/images/shimmer.gif"} className={isCoverLoad ? "article-card__img" : ""} alt="Article Cover" onLoad={coverLoader} />
          </a>
        </div>
        <div className="article-card__content">
          <a href="#" className="article-card__link">
            {title}
          </a>
          <p className="article-card__text">
            {descrip}
          </p>
          <a href="#" className="article-card__btn">بیشتر بخوانید</a>
        </div>
      </div>
    </div>
  )
}
