import React, { useEffect, useState } from 'react'

import './Pagination.css'
import { Link, useParams } from 'react-router-dom'

export default function Pagination({ item, itemCount, pathName, setShownCourses }) {

  const { page } = useParams()

  const [pageCount, setPageCount] = useState(null)

  useEffect(() => {
    let lastIndex = itemCount * page
    let startIndex = lastIndex - itemCount
    let paginatedItems = item.slice(startIndex, lastIndex)
    setShownCourses(paginatedItems)
    let pageNumber = Math.ceil(item.length / itemCount)
    setPageCount(pageNumber)

  }, [page, item])

  const [startIndex, setStartIndex] = useState()

  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">
        <li className="courses__pagination-item">
          <a href="#" className="courses__pagination-link">
            <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
          </a>
        </li>
        {
          Array(pageCount).fill("paginate").map((pageNum, index) => (
            <li className="courses__pagination-item">
              <Link to={`${pathName}/${index+1}`} className={(Number(page)===index+1)?"courses__pagination-link courses__pagination-link--active":"courses__pagination-link "}>
                {index + 1}
              </Link>
            </li>
          ))
        }

        <li className="courses__pagination-item">
          <a href="#" className="courses__pagination-link">
            <i className="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
          </a>
        </li>
      </ul>
    </div>
  )
}
