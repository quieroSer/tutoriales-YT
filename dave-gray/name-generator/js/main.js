import { namesOne, namesTwo } from './names.js'

const initApp = () => {
    document.getElementById('submitForm').addEventListener('submit', (event) => {
        event.preventDefault()
        //clear out suggestions
        clearSuggestions()
        //generate names 
        const namesArray = generateNames()
        console.log(namesArray)
        //display names
        displayNames(namesArray)
    })
}

document.addEventListener('DOMContentLoaded', initApp)

const clearSuggestions = () => {
    const display = document.getElementById('suggestionSection')
    if (!display.classList.contains('hidden')) { display.classList.toggle('hidden')} //si es que hidden no esta en la lista de
    //clases de display (que a su vez es el elemento que tiene la ID suggestionSection), entonces añade hidden a la lista de clases
    const list = document.querySelector('.suggestionSection ol')
    list.innerHTML = ""
}

const generateNames = () => {
    const randomNumArr = []
    for (let i = 0; i < 4; ) {
        const randomNumber = Math.floor(Math.random() * 10)
        if (randomNumArr.includes(randomNumber)) continue
        randomNumArr.push(randomNumber)
        i++
    }
    const suggestion1 = namesOne[randomNumArr[0]] + namesTwo[randomNumArr[3]]
    const suggestion2 = namesOne[randomNumArr[1]] + namesTwo[randomNumArr[0]]
    const suggestion3 = namesOne[randomNumArr[2]] + namesTwo[randomNumArr[1]]
    const suggestion4 = namesOne[randomNumArr[3]] + namesTwo[randomNumArr[2]]

    return [suggestion1, suggestion2, suggestion3, suggestion4]

}

const displayNames = (namesArray) => {
    const list = document.querySelector('.suggestionSection ol')
    const rawFirstName = document.getElementById("submitSection__textInput").value
    const firstName = sanitizeInput(rawFirstName)
    namesArray.forEach(element => {
        list.innerHTML += `<li>
            <a href="https://youtube.com/${element}" target="_blank">${element}</a></li>`
        list.innerHTML += `<ul>
            <li><a href="https://youtube.com/${firstName}s${element}" target="_blank">${firstName}s${element}</a></li>
            <li><a href="https://youtube.com/${element}with${firstName}" target="_blank">${element}with${firstName}</a></li>
            </ul>`
    });
    const display = document.getElementById('suggestionSection')
    if (display.classList.contains('hidden')) { display.classList.toggle('hidden')}
}

const sanitizeInput = (inputValue) => {
    const div = document.createElement('div')
    div.textContent = inputValue
    return div.innerHTML
}

