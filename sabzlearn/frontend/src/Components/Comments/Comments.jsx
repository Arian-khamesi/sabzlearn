import { React, useContext, useState } from 'react'

import './Comments.css'

import AuthContext from '../../context/authContext'
import { Link, useParams } from 'react-router-dom'
import Pagination from '../Pagination/Pagination'

export default function Comments(props) {
const params=useParams()
console.log(params);
    const comments = props.comment
    const authContext = useContext(AuthContext)
    const [shownComments, setShownComments] = useState([])
    const [newCommentBody, setNewCommentBody] = useState()
    const [newCommentScore, setNewCommentScore] = useState(5)

    const onchangeCommentHandler = (event) => {
        setNewCommentBody(event.target.value)
    }
    const onchangeCommentScoreHandler = (event) => {
        setNewCommentScore(event.target.value)
    }

    return (

        <div className="comments">
            <div className="comments__header">
                <div className="comments__header-icon-content">
                    <i className="comments__header-icon far fa-comment"></i>
                </div>
                <span className="comments__header-title">نظرات</span>
            </div>

            {
                authContext.isLoggedIn ? (
                    <>
                        <div className="comments__content">
                            {comments.length === 0 ? (
                                <div className="alert alert-warning">
                                    هنوز کامنتی برای این دوره ثبت نشده
                                </div>
                            ) : (
                                <>
                                    {shownComments.map((comment) => (
                                        <>
                                            <div className="comments__item" key={comment._id}>
                                                <div className="comments__question">
                                                    <div className="comments__question-header">
                                                        <div className="comments__question-header-right">
                                                            <span className="comments__question-name comment-name">
                                                                {comment.creator.name}
                                                            </span>
                                                            <span className="comments__question-status comment-status">
                                                                {comment.creator.role === "ADMIN" ? "مدیر" : "کاربر"}
                                                            </span>
                                                            <span className="comments__question-date comment-date">
                                                                {comment.createdAt.slice(0, 10)}
                                                            </span>
                                                        </div>
                                                        <div className="comments__question-header-left">
                                                            <a
                                                                className="comments__question-header-link comment-link"
                                                                href="#"
                                                            >
                                                                پاسخ
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="comments__question-text">
                                                        <p className="comments__question-paragraph comment-paragraph">
                                                            {comment.body}
                                                        </p>
                                                    </div>
                                                    {comment.answerContent && <div className="comments__item" style={{ marginTop: "15px" }}>
                                                        <div className="comments__question">
                                                            <div className="comments__question-header">
                                                                <div className="comments__question-header-right">
                                                                    <span className="comments__question-name comment-name">
                                                                        {comment.answerContent.creator.name}
                                                                    </span>
                                                                    <span className="comments__question-status comment-status">
                                                                        {comment.answerContent.creator.role === "ADMIN" && "ادمین"}
                                                                    </span>
                                                                    <span className="comments__question-date comment-date">
                                                                        {comment.answerContent.createdAt.slice(0, 10)}
                                                                    </span>
                                                                </div>
                                                                <div className="comments__question-header-left">
                                                                    <a
                                                                        className="comments__question-header-link comment-link"
                                                                        href="#"
                                                                    >
                                                                        پاسخ
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="comments__question-text">
                                                                <p className="comments__question-paragraph comment-paragraph">
                                                                    {comment.answerContent.body}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>}
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                    {/* <div className="comments__pagantion">
                                        <ul className="comments__pagantion-list">
                                            <li className="comments__pagantion-item">
                                                <a href="#" className="comments__pagantion-link">
                                                    <i className="fas fa-long-arrow-alt-right comments__pagantion-icon"></i>
                                                </a>
                                            </li>
                                            <li className="comments__pagantion-item">
                                                <a href="#" className="comments__pagantion-link">
                                                    1
                                                </a>
                                            </li>
                                            <li className="comments__pagantion-item">
                                                <a href="#" className="comments__pagantion-link">
                                                    2
                                                </a>
                                            </li>
                                            <li className="comments__pagantion-item">
                                                <a
                                                    href="#"
                                                    className="comments__pagantion-link comments__pagantion-link--active"
                                                >
                                                    3
                                                </a>
                                            </li>
                                        </ul>
                                    </div> */}
                                    <Pagination
                                        item={comments}
                                        itemCount={1}
                                        pathName={`/course-info/${params.courseName}`}
                                        setShownCourses={setShownComments}
                                    />
                                </>
                            )}
                        </div>

                        <div className="comments__rules">
                            <span className="comments__rules-title">قوانین ثبت دیدگاه</span>
                            <span className="comments__rules-item">
                                <i className="fas fa-check comments__rules-icon"></i>
                                اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش انلاین
                                استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهند شد
                            </span>
                            <span className="comments__rules-item">
                                <i className="fas fa-check comments__rules-icon"></i>
                                دیدگاه های نامرتبط به دوره تایید نخواهد شد.
                            </span>
                            <span className="comments__rules-item">
                                <i className="fas fa-check comments__rules-icon"></i>
                                سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
                            </span>
                            <span className="comments__rules-item">
                                <i className="fas fa-check comments__rules-icon"></i>
                                از درج دیدگاه های تکراری پرهیز نمایید.
                            </span>
                        </div>
                        <div className="comments__respond">
                            <div className="comments__score">
                                <span className="comments__score-title">امتیاز شما</span>
                                <div className="comments__score-input">
                                    <input className="comments__score-input-text inputScore" type='range' min={1} max={5} placeholder='امتیاز خود را انتخاب کنید' value={newCommentScore} onChange={onchangeCommentScoreHandler}>
                                    </input>
                                    <span>{newCommentScore}</span>

                                </div>
                            </div>
                            <div className="comments__respond-content">
                                <div className="comments__respond-title">دیدگاه شما *</div>
                                <textarea className="comments__score-input-respond" value={newCommentBody} onChange={onchangeCommentHandler}></textarea>
                            </div>
                            <button type="submit" className="comments__respond-btn" onClick={() => props.submitComment(newCommentBody, newCommentScore)} >
                                ارسال
                            </button>
                        </div>
                    </>
                ) : (<div className='alert alert-warning'>
                    برای مشاهده و ثبت نظرات به حساب کاربری خود <Link to={"/login"}>
                        وارد </Link>شوید
                </div>)
            }

        </div>
    )
}
