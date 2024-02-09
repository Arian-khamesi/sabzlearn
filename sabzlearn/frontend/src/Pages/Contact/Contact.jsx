import React from 'react';
import TopBar from '../../Components/TopBar/TopBar';
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer'

import Input from '../../Components/Form/Input'
import Button from '../../Components/Form/Button'
import { requiredValidator, minValidator, maxValidator, emailValidator ,phoneValidator } from '../../validators/rules'

import './Contact.css'
import { useForm } from '../../hooks/useForm'

import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'




export default function Contact() {

 const navigate = useNavigate();

  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      body: {
        value: "",
        isValid: false,
      },
    },
    false
  );



  const addNewContact = (event) => {
    event.preventDefault()
    console.log("درخواست شما برای مدیران سایت ارسال شد");
    const newOpinion = {
      name: formState.inputs.name.value,
      email: formState.inputs.email.value,
      phone: Number(formState.inputs.phone.value),
      body: formState.inputs.body.value,
    }
    console.log(newOpinion);

    fetch("http://localhost:5000/v1/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOpinion),
    }).then(res => res.json())
      .then(result => {
        swal({
          title: `${formState.inputs.name.value} عزیز نظر شما با موفقیت ثبت شد`,
          icon: "success",
          buttons: 'ورود به پنل کاربری',
          onClose: redirector()
        })
      })

  };

 const redirector = () => {
        navigate('/');
    }

  return (
    <>
      <TopBar />
      <NavBar />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ارتباط با ما</span>
          <span className="login__subtitle">
            نظر یا انتقادتو بنویس برامون :)
          </span>
          <form action="#" className="login-form">
            <div className="login-form__username login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="input"
                id="name"
                className="login-form__username-input"
                type="text"
                placeholder="نام و نام خانوادگی"
                validations={[requiredValidator(), minValidator(6), maxValidator(20) ]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="input"
                id="email"
                className="login-form__password-input"
                type="text"
                placeholder="آدرس ایمیل"
                validations={[requiredValidator(), minValidator(8), maxValidator(50), emailValidator()]}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__phone-number login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="input"
                id="phone"
                className="login-form__password-input"
                type="text"
                placeholder="شماره تماس"
                validations={[requiredValidator(), minValidator(10), maxValidator(11),phoneValidator()]}
              />
              <i className="login-form__password-icon fa fa-phone"></i>
            </div>
            <div className="login-form__text login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="textarea"
                id="body"
                className="login-form__text-input"
                placeholder="متن خود را وارد کنید"
                validations={[requiredValidator(), minValidator(10)]}
              />
            </div>
            <Button
              className={`login-form__btn ${formState.isInputValid === true
                ? "login-form__btn-success"
                : "login-form__btn-error"
                }`}
              type="submit" onClick={addNewContact} disabled={!formState.isInputValid}
            >
              <span className="login-form__btn-text">ارسال</span>
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  )
}
