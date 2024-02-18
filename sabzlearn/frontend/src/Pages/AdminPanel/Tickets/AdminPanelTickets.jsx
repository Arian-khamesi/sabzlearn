import React, { useEffect, useState } from "react";
import DataTable from "./../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

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


  return (
    <>
      <DataTable title="تیکت‌ها">
        <table class="table">
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
                  <button type="button" class="btn btn-primary edit-btn" onClick={()=>showTicketsBody(ticket.body)}>
                    مشاهده
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
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
