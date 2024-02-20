import React, { useEffect, useState } from "react";
import DataTable from "./../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetch(`http://localhost:5000/v1/tickets`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTickets(data);
      });
  }, []);

  console.log(tickets);

  /////////////show ticket body///////////////////////
const showTicketsBody=(msg)=>{
swal({
    title:msg,
    buttons:"بازگشت"
})
}

///////////////////////answer tickets//////////////////////
const answerTickets=(id)=>{
swal({
    title:"لطفا پاسخ این تیکت را وارد نمایید :",
    content:"input",
    buttons:"ارسال"
})
.then(res=>{
    const answerTCK={
        ticketID:id,
        body:res,
    }
    fetch("http://localhost:5000/v1/tickets/answer",{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body:JSON.stringify(answerTCK)
    }).then(res=>{
      res.ok && swal({title:"پاسخ با موفقیت ارسال شد",icon:"success",buttons:"بازگشت"})
    })
})
}


  return (
    <>
      <DataTable title="تیکت‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>عنوان</th>
              <th>نوع تیکت</th>
              <th>دوره</th>
              <th>اولویت</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user}</td>
                <td>{ticket.title}</td>
                <td>{ticket.departmentSubID}</td>
                <td>{ticket.course ? ticket.course : "---"}</td>
                <td>
                  {ticket.priority === 1 && "بالا"}
                  {ticket.priority === 2 && "متوسط"}
                  {ticket.priority === 3 && "کم"}
                </td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn" onClick={()=>showTicketsBody(ticket.body)}>
                    مشاهده
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn" onClick={()=>answerTickets(ticket._id)}>
                    پاسخ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
