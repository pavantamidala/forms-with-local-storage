let inputs = document.querySelectorAll("input")
let submitButton = document.querySelector(".submit")
let container = document.querySelector(".container")
let deleteAll = document.querySelector(".deleteall")
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
    let allPersons = gettingAllPersonsArray()
    person = creatingObjects(allPersons)

    settingAllPersonsArrayToLocal(person)
    e.preventDefault()
    removingFormValues()
    window.location.reload()
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
        person[personDetails[i]] = inputs[i].value

    }
    person["id"] = gettingLastPersonId(arr)


    arr.push(person)
    return arr
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

deleteAll.addEventListener("click",function(){
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