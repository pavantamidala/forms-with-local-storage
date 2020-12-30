let inputs = document.querySelectorAll("input")
let submitButton = document.querySelector(".submit")
let container = document.querySelector(".container")
let deleteAll = document.querySelector(".deleteall")
let dateValidatorPara = document.querySelector(".date-validator")
let firstNameValidatorPara = document.querySelector(".firstname-validator")
let lastNameValidatorPara = document.querySelector(".lastname-validator")
let numberValidatorPara = document.querySelector(".number-validator")
let emaiValiatorPara = document.querySelector(".email-validator") 
let validatorParas = document.querySelectorAll(".validator")
// total objects array
let allPersonsArray = []
window.addEventListener('load', function () {
    if (localStorage.length === 0) {
        settingAllPersonsArrayToLocal(allPersonsArray)
    }
})
window.addEventListener('load', function () {
    let innerArray = gettingAllPersonsArray()
    let largeArray;
    if (innerArray.length === 0) {
        largeArray = innerArray
    }
    else {
        let sortedArray = sortingArray(innerArray)
        largeArray = sortedArray
    }
    for (let i = 0; i < (largeArray.length); i++) {
        let editButton = document.createElement('button')
        editButton.innerText = "Edit"
        let deleteButton = document.createElement('button')
        deleteButton.innerText = "Delete"
        editButton.className = "edit"
        deleteButton.className = "delete"
        for (let detail in largeArray[i]) {
            if (detail === "id") {
                editButton.id = largeArray[i][detail]
                deleteButton.id = largeArray[i][detail]
            } else {

                let h4 = document.createElement('h4')
                h4.innerText = `${detail} ${largeArray[i][detail]}`
                h4.id = largeArray[i].id
                container.appendChild(h4)
            }

            container.appendChild(deleteButton)
            container.appendChild(editButton)
        }
        editButton.addEventListener('click', function () {
            let edtiButtonId = editButton.id
            let arrayPersonValues
            let indexOfPerson
            // getting person from largeArray
            for (let i = 0; i < largeArray.length; i++) {
                for (let detail in largeArray[i]) {

                    if (Number(edtiButtonId) === largeArray[i][detail]) {
                        arrayPersonValues = largeArray[i]
                        indexOfPerson = i
                    }
                }
            }
            //getting values from arrayPersonvalues
            let personValues = []
            for (let key in arrayPersonValues) {
                personValues.push(arrayPersonValues[key])
            }

            //setting person to inputs
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = personValues[i]
            }

            let removedPerson = largeArray.splice(indexOfPerson, 1)
            settingAllPersonsArrayToLocal(largeArray)
            for (let i = 0; i < 7; i++) {
                let element = document.getElementById(edtiButtonId)
                element.remove()
            }


        })
        deleteButton.addEventListener('click', function () {
            let deleteButtonId = deleteButton.id

            let indexOfPerson
            // getting person from largeArray
            for (let i = 0; i < largeArray.length; i++) {
                for (let detail in largeArray[i]) {
                    if (Number(deleteButtonId) === largeArray[i][detail]) {
                        indexOfPerson = i
                    }
                }
            }
            largeArray.splice(indexOfPerson, 1)
            settingAllPersonsArrayToLocal(largeArray)
            window.location.reload()
        })
    }
}


)
submitButton.addEventListener("click", function (e) {
    let k = 0
    let allPersons = gettingAllPersonsArray()
    person = creatingObjects(allPersons)
    console.log(typeof (person))
    if (typeof (person) === "object") {
        settingAllPersonsArrayToLocal(person)
        e.preventDefault()
        removingFormValues()
        k=k+1
        window.location.reload()
    }
    e.preventDefault()
    if(k===0){
        for (let para of validatorParas) {
            para.style.display = "block"
        }
    }
})


// setting allpersonsArray  to localStorage
function settingAllPersonsArrayToLocal(type) {
    localStorage.setItem('allPersonsArray', JSON.stringify(type))
}

// getting allpersonsArray 
function gettingAllPersonsArray() {

    let arr = JSON.parse(localStorage.getItem('allPersonsArray'))
    return arr
}

// creating objects with input data

function creatingObjects(arr) {
    let person = {}

    let personDetails = ["First Name:", "Last Name:", "Dob:", "Mobile No:", "Email:"]
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].id === "date") {
            if (dateValidator(inputs[i].value)) {
                person[personDetails[i]] = inputs[i].value
            }else{
                inputs[i].addEventListener("click",function(){
                    dateValidatorPara.style.display = "none"
                })
            }
        }
        else if(inputs[i].id ==="firstname"){
            if(nameValidator(inputs[i].value,firstNameValidatorPara)){
                person[personDetails[i]] = inputs[i].value
            }else{
                inputs[i].addEventListener("click",function(){
                    firstNameValidatorPara.style.display = "none"
                })
            }
        }else if(inputs[i].id ==="lastname"){
            if(nameValidator(inputs[i].value,lastNameValidatorPara)){
                    person[personDetails[i]] = inputs[i].value
            }else{
                inputs[i].addEventListener("click",function(){
                    lastNameValidatorPara.style.display = "none"
                })
            }
        }
        else if(inputs[i].id ==="phone"){
            if(numberValidator(inputs[i].value)){
                person[personDetails[i]] = inputs[i].value
            }else{
                inputs[i].addEventListener("click",function(){
                    numberValidatorPara.style.display = "none"
                })
            }
        }
        
        if(inputs[i].id==="email"){
        person[personDetails[i]] = inputs[i].value
        }
        
    }
    person["id"] = gettingLastPersonId(arr)
    
    
    if (Object.keys(person).length === 6) {
        arr.push(person)
        return arr
    }
}
function gettingLastPersonId(arr) {
    if (arr.length < 1) {
        return 0
    } else {
        return Number(arr[arr.length - 1].id) + 1
    }
}

function removingFormValues() {
    for (let input of inputs) {
        input.value = ''
    }
}

deleteAll.addEventListener("click", function () {
    localStorage.clear()
    window.location.reload()
})

function sortingArray(array) {
    let newArray = array.sort(compare)

    function compare(a, b) {
        let firstDate = new Date(a["Dob:"]); // Your timezone!
        let secondDate = new Date(b["Dob:"])
        let firstEpoch = firstDate.getTime() / 1000.0;
        let secondEpoch = secondDate.getTime() / 1000.0;
        return secondEpoch - firstEpoch
    }
    return newArray
}

function dateValidator(str) {
    if (str.length === 0) {
        dateValidatorPara.innerText = "date of birth required"
        dateValidatorPara.style.background = "red"
        sendingBackValuesToForm()
        return false
    }
    else {
        return true
    }
}
function sendingBackValuesToForm(){
    for (let inp of inputs) {
        let val = inp.value
        inp.value = val
    }
}
function nameValidator(str,para){
    if(str.length>=3 && str.length <=25){
        return true
    }else{
        para.innerText = "name must be more than 3 characters and less than 25 characters "
        para.style.background = "red"
        sendingBackValuesToForm()
        return false
    }
}

function numberValidator(str){
    if(String(str).length===10){
        return true
    }else{
        numberValidatorPara.innerText = "Number must be 10 digits"
        numberValidatorPara.style.background = "red"
        sendingBackValuesToForm()
        return false
    }
}

