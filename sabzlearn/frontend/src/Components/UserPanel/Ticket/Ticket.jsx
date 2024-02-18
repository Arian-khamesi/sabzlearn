import React from 'react'
import "./Ticket.css"
import { Link } from 'react-router-dom'

export default function Ticket({_id, title, departmentSubID, user, answer, departmentID ,createdAt}) {
    return (
        <div class="ticket-content">
            {/* <span class="ticket-content__title">نمایش 1 تیکت</span> */}
            <div class="ticket-content__box">
                <div class="ticket-content__right">
                    <div class="ticket-content__right-right">
                        <Link class="ticket-content__link" to={`answer/${_id}`}>
                            {title}
                        </Link>
                        <span class="ticket-content__category">
                            <i class="fa fa-ellipsis-v ticket-content__icon"></i>
                            <div className='ticket-child'>
                                <span style={{ fontWeight: "bold", fontSize: "14px" }}>{departmentID}</span>
                                <span style={{ borderTop: "1px solid" }}>{departmentSubID}</span>
                            </div>
                        </span>

                    </div>
                    <div class="ticket-content__right-left">
                        <span class="ticket-content__name">{user}</span>
                    </div>
                </div>
                <div class="ticket-content__left">
                    <div class="ticket-content__left-right">
                        <div class="ticket-content__condition">
                            <span class="ticket-content__condition-text">
                                {answer ? "پاسخ داده شده" : "در صف انتظار"}
                            </span>
                        </div>
                    </div>
                    <div class="ticket-content__left-left">
                        <span class="ticket-content__time">{createdAt.slice(0,10)}</span>
                        <span class="ticket-content__time-month">8 ماه قبل</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
