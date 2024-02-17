import React, { useContext } from 'react'

import './Register.css'
import { Link } from 'react-router-dom'
import TopBar from '../../Components/TopBar/TopBar'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'

import Input from '../../Components/Form/Input'
import Button from '../../Components/Form/Button'
import { requiredValidator, minValidator, maxValidator, emailValidator, phoneValidator } from '../../validators/rules'

import { useForm } from '../../hooks/useForm'

import AuthContext from '../../context/authContext'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'


export default function Register() {

    const authContext = useContext(AuthContext)
    // console.log(authContext);


    const [formState, onInputHandler] = useForm({
        fullname: {
            value: "",
            isValid: false
        },
        username: {
            value: "",
            isValid: false
        },
        email: {
            value: "",
            isValid: false
        },
        phone: {
            value: "",
            isValid: false,
        },
        password: {
            value: "",
            isValid: false
        },
        confirmPassword: {
            value: "",
            isValid: false
        },
    }, false)

    const navigate = useNavigate();

    const registerUserHandler = (event) => {
        event.preventDefault()
        console.log('user register');

        const newUserInfo = {
            name: formState.inputs.fullname.value,
            username: formState.inputs.username.value,
            email: formState.inputs.email.value,
            phone: Number(formState.inputs.phone.value),
            password: formState.inputs.password.value,
            confirmPassword: formState.inputs.confirmPassword.value,
        };

        console.log(newUserInfo);
        if (newUserInfo.password.value === newUserInfo.confirmPassword.value) {
            fetch("http://localhost:5000/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUserInfo),
            }).then(res => res.json())
                // } else {
                //     if (res.status === 403) {
                //         swal({
                //             title: "دسترسی این شماره به سایت مسدود است",
                //             icon: "error",
                //             buttons: "تغییر شماره"
                //         })
                //     }
                //     return false;


                .then((result) => {
                    console.log(result)
                    authContext.login(result.accessToken, result.user)
                    swal({
                        title: `${formState.inputs.username.value} عزیز با موفقیت در سایت ثبت نام شدید`,
                        icon: "success",
                        buttons: 'ورود به پنل کاربری',
                        onClose: redirector()
                    })
                })
        }
        else {
            alert("رمز عبور با تکرار آن یکسان نیست")
        }

    }

    const redirector = () => {
        navigate('/');
    }

    return (
        <>
            <TopBar />
            <NavBar />

            <section className="login-register">
                <div className="login register-form">
                    <span className="login__title">ساخت حساب کاربری</span>
                    <span className="login__subtitle">خوشحالیم قراره به جمع ما بپیوندی</span>
                    <div className="login__new-member">
                        <span className="login__new-member-text">قبلا ثبت‌نام کرده‌اید؟ </span>
                        <Link className="login__new-member-link" to="/login">
                            وارد شوید
                        </Link>
                    </div>
                    <form action="#" className="login-form">
                        <div className="login-form__username">
                            <Input
                                className="login-form__username-input"
                                type="text"
                                id="fullname"
                                placeholder="نام و نام خانوادگی"
                                element='input'
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                    // emailValidator()
                                ]}
                                onInputHandler={onInputHandler}
                            />
                            <Input
                                className="login-form__username-input"
                                type="text"
                                id="username"
                                placeholder="نام کاربری"
                                element='input'
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                    // emailValidator()
                                ]}
                                onInputHandler={onInputHandler}
                            />
                            <i className="login-form__username-icon fa fa-user"></i>
                        </div>
                        <div className="login-form__password">
                            <Input
                                className="login-form__username-input"
                                type="text"
                                id="email"
                                placeholder="آدرس ایمیل"
                                element='input'
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(40),
                                    emailValidator()
                                ]}
                                onInputHandler={onInputHandler}
                            />

                            <i className="login-form__password-icon fa fa-envelope"></i>
                        </div>

                        <div className="login-form__phone-number login-form__parent">
                            <Input
                                className="login-form__username-input"
                                onInputHandler={onInputHandler}
                                element="input"
                                id="phone"
                                type="text"
                                placeholder="شماره تماس"
                                validations={[requiredValidator(), minValidator(10), maxValidator(11), phoneValidator()]}
                            />
                            <i className="login-form__password-icon fa fa-phone"></i>
                        </div>

                        <div className="login-form__password">
                            <Input
                                className="login-form__username-input"
                                type="password"
                                id="password"
                                placeholder="رمز عبور"
                                element='input'
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                    // emailValidator()
                                ]}
                                onInputHandler={onInputHandler}
                            />
                            <Input
                                className="login-form__password-input"
                                type="password"
                                id="confirmPassword"
                                placeholder="تکرار رمز عبور"
                                element='input'
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                    // emailValidator()
                                ]}
                                onInputHandler={onInputHandler}
                            />
                            <i className="login-form__password-icon fa fa-lock-open"></i>
                        </div>
                        <Button className={`login-form__btn ${formState.isInputValid ? "success-sub" : "error-sub"}`} type="submit" onClick={registerUserHandler} disabled={!formState.isInputValid}>
                            <i className="login-form__btn-icon fa fa-user-plus"></i>
                            <span className="login-form__btn-text">عضویت</span>
                        </Button>
                    </form>
                    <div className="login__des">
                        <span className="login__des-title">سلام کاربر محترم:</span>
                        <ul className="login__des-list">
                            <li className="login__des-item">
                                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                                استفاده کنید.
                            </li>
                            <li className="login__des-item">
                                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
                            </li>
                            <li className="login__des-item">
                                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
