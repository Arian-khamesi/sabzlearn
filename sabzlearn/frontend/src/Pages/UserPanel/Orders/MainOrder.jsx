import React, { useEffect, useState } from 'react'
import "./MainOrder.css"
import { useParams } from 'react-router-dom'

export default function MainOrder() {

    const [mainOrder, setMainOrder] = useState({})
    const { ordersID } = useParams()
    console.log(ordersID);
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        fetch(`http:localhost:5000/v1/orders/${ordersID}`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMainOrder(data);
            });
    }, [])

    return (
        <div class="col-9">
            <div class="mainOrder">
                <span>سفارش # { } در تاریخ { } ثبت شده است و در حال حاضر در  وضعیت { } می باشد</span>
                <h3>مشخصات سفارش</h3>
                <table class="mainOrder__table">
                    <thead class="mainOrder__table-header">
                        <tr class="mainOrder__table-header-list">
                            <th class="mainOrder__table-header-item"><span>مجموع</span><span>محصول</span></th>
                        </tr>
                    </thead>
                    <tbody class="mainOrder__table-body">
                        <tr class="mainOrder__table-body-list">
                            <td class="mainOrder__table-body-item">
                                <span> { }تومان</span><span>{ }</span>
                            </td>
                        </tr>
                        <tr class="mainOrder__table-body-list">
                            <td class="mainOrder__table-body-item">
                                <span> { }تومان</span><span>جمع کل سبد خرید :</span>
                            </td>
                        </tr>
                        <tr class="mainOrder__table-body-list">
                            <td class="mainOrder__table-body-item">
                                <span> { }تومان</span><span>قیمت نهایی :</span>
                            </td>
                        </tr>
                    </tbody>
                    <button className="btn btn-success mt-4 btn-font">سفارش دوباره</button>
                </table>
            </div>
        </div>
    )
}
