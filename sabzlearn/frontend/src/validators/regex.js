const emailValidator = (value) => {
    const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g

    return emailPattern.test(value)
}


const phoneValidator = (value) => {
    const phonePattern = /^\d+$/g

    return phonePattern.test(value)
}


export { emailValidator, phoneValidator };