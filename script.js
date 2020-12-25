let submit = document.querySelector('button')
let inputs = document.querySelectorAll('input')
let form = document.querySelector('form')
let edit = document.querySelector('#edit')
let container = document.querySelector(".container")
let h2 = document.querySelector('h2')
let deleteButton = document.querySelector("#delete")
h2.style.display = "none"
let formArr = []
let genderObj = {}
let userDetailObj;
edit.style.display = "none"
deleteButton.style.display = "none"
submit.addEventListener("click", function (e) {

    for (let input of inputs) {
        if (input.className === "gender") {
            if (input.checked) {
                genderObj[input.id] = input.checked
            }
        }
        else if (input.className !== "gender") {
            formArr.push(input.value)
        }
    }
    e.preventDefault()
    for (let input of inputs) {
        input.value = ""
        if (input.className === "gender") {
            input.checked = false;
        }
    }
    localStorage.setItem("userDataArr", JSON.stringify(formArr))
    localStorage.setItem('userGenderObj', JSON.stringify(genderObj))
    let userData = JSON.parse(localStorage.getItem("userDataArr"))
    let userGender = JSON.parse(localStorage.getItem("userGenderObj"))
    let details = ["First Name:", "Last Name:", "Date:", "Mobile No:", "Email:"]
    h2.style.display = "block"
    for (let i = 0; i < userData.length; i++) {
        let h4 = document.createElement('h4')
        h4.className = "fourth"
        h4.innerText = `${details[i]}  ${userData[i]}`
        container.appendChild(h4)

    }
    for (let key in userGender) {
        let h4 = document.createElement('h4')
        h4.className = "fourth"
        h4.innerText = `${key} : ${userGender[key]}`
        container.appendChild(h4)

    }
    deleteButton.style.display = "block"
    form.style.display = "none"
    edit.style.display = "block"
    document.body.appendChild(container)
    container.style.display = "block"
})
edit.style.display = "none"



edit.addEventListener('click', function () {
    edit.style.display = "none"
    let headingFourElements = document.querySelectorAll(".fourth")
    form.style.display = "block"
    for (let element of headingFourElements) {
       
        element.remove()
    }

    let userData = JSON.parse(localStorage.getItem("userDataArr"))
    let userGender = JSON.parse(localStorage.getItem("userGenderObj"))
    let i = 0
    for (let input of inputs) {
        input.value = userData[i]
        i++
        for (let key in userGender) {
            if (input.id === key) {
                input.checked = userGender[key]
            }
        }
    }
    genderObj = {}
    formArr.length = 0
    container.style.display = "none"
})


// function nameValidation(str, para) {
//     if (str.length === 0 || (str.length >= 3 && str.length <= 25)) {
//         para.style.display = "none"
//         return true
//     }
//     else {
//         para.innerText = "name must be greaterthan 3 characters and less than 25 characters"
//         para.style.display = "block"
//         return false
//     }
// }
// function numberValidator(numberValue, para) {
//     if ((numberValue > 10 && numberValue < 10) || isNaN(numberValu)) {
//         para.style.display = "none"
//         return true
//     } else {
//         para.innerText = "number must be equals to 10 digits"
//         return false
//     }
// }

deleteButton.addEventListener('click', function () {

    localStorage.clear()

    let headingFourElements = document.querySelectorAll(".fourth")
    form.style.display = "block"
    for (let element of headingFourElements) {

        element.remove()
    }
    formArr.length = 0
    genderObj = {}
    localStorage.clear()
    form.style.display = "block"
    container.style.display = "none"
})

window.addEventListener('load',function(){
    let userData = JSON.parse(localStorage.getItem("userDataArr"))
    let userGender = JSON.parse(localStorage.getItem("userGenderObj"))
    if(userData !== null){
        utilityFunction()
    }
    else{
        form.style.display = "block"
    }
})
function utilityFunction(){
    let userData = JSON.parse(localStorage.getItem("userDataArr"))
    let userGender = JSON.parse(localStorage.getItem("userGenderObj"))
    let details = ["First Name:", "Last Name:", "Date:", "Mobile No:", "Email:"]
    h2.style.display = "block"
    for (let i = 0; i < userData.length; i++) {
        let h4 = document.createElement('h4')
        h4.className = "fourth"
        h4.innerText = `${details[i]}  ${userData[i]}`
        container.appendChild(h4)

    }
    for (let key in userGender) {
        let h4 = document.createElement('h4')
        h4.className = "fourth"
        h4.innerText = `${key} : ${userGender[key]}`
        container.appendChild(h4)

    }
    deleteButton.style.display = "block"
    form.style.display = "none"
    edit.style.display = "block"
    document.body.appendChild(container)
    container.style.display = "block"
}