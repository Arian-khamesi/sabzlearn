import React from 'react'

import './ArticleBox.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ArticleBox({ title, description, cover, shortName }) {

  const [isCoverLoad, setIsCoverLoad] = useState(false)
  const coverLoader = () => {
    setIsCoverLoad(true)
  }

  return (
    <div className="col-4">
      <div className="article-card">
        <div className="article-card__header">
          <Link to={`/article-info/${shortName}`} className="article-card__link-img">
            <img src={isCoverLoad ? `http://localhost:5000/courses/covers/${cover}` : "/images/shimmer.gif"}
              className={isCoverLoad ? "article-card__img" : ""} alt="Article Cover"
              onLoad={coverLoader}
              style={{ width: "400px",height:"400px" }} />
          </Link>
        </div>
        <div className="article-card__content">
          <Link to={`/article-info/${shortName}`} className="article-card__link">
            {title}
          </Link>
          <p className="article-card__text">
            {description}
          </p>
          <Link to={`/article-info/${shortName}`} className="article-card__btn">بیشتر بخوانید</Link>
        </div>
      </div>
    </div>
  )
}
