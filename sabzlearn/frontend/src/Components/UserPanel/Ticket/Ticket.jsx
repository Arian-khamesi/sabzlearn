import React from 'react'
import "./Ticket.css"
import { Link } from 'react-router-dom'

export default function Ticket({_id, title, departmentSubID, user, answer, departmentID ,createdAt}) {
    return (
        <div className="ticket-content">
            {/* <span className="ticket-content__title">نمایش 1 تیکت</span> */}
            <div className="ticket-content__box">
                <div className="ticket-content__right">
                    <div className="ticket-content__right-right">
                        <Link className="ticket-content__link" to={`answer/${_id}`}>
                            {title}
                        </Link>
                        <span className="ticket-content__category">
                            <i className="fa fa-ellipsis-v ticket-content__icon"></i>
                            <div className='ticket-child'>
                                <span style={{ fontWeight: "bold", fontSize: "14px" }}>{departmentID}</span>
                                <span style={{ borderTop: "1px solid" }}>{departmentSubID}</span>
                            </div>
                        </span>

                    </div>
                    <div className="ticket-content__right-left">
                        <span className="ticket-content__name">{user}</span>
                    </div>
                </div>
                <div className="ticket-content__left">
                    <div className="ticket-content__left-right">
                        <div className="ticket-content__condition">
                            <span className="ticket-content__condition-text">
                                {answer ? "پاسخ داده شده" : "در صف انتظار"}
                            </span>
                        </div>
                    </div>
                    <div className="ticket-content__left-left">
                        <span className="ticket-content__time">{createdAt.slice(0,10)}</span>
                        <span className="ticket-content__time-month">8 ماه قبل</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
