const { fetch, alert } = window
const getSelections = document.getElementById('questionSet')

const getQuestions = _ => {
    fetch('/questions')
        .then(r => r.json())
        .then(questions => {
            document.querySelector('#questionSet').innerHTML = ''
            questions.forEach(({ Q }, index) => {
                let qDiv = document.createElement('div')
                qDiv.innerHTML = `
                <h4>Question ${index + 1}</h4>
                <p>${Q}</p>
                <select class='qOption' class="custom-select custom-select-sm mb-3" style="width:50%">
                    <option selected>Select Option</option>
                    <option value="1">1 (Strongly Disagree)</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5 (Strongly Agree)</option>
                </select>
                `
                document.querySelector('#questionSet').append(qDiv)
            })
        })
        .catch(e => console.error(e))
}

const getResults = _ => {
    // console.log(questionSet.querySelectorAll('.qOption'))
    // console.log(questionSet.querySelectorAll('.qOption').length)
    let answerSel = questionSet.querySelectorAll('.qOption')
    let answerArry = []
    answerSel.forEach(selection => {
        answerArry.push(selection.selectedIndex)
    })
    return answerArry

}

document.querySelector('#submit').addEventListener('click', e => {
    e.preventDefault()
    fetch('/friends', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.querySelector('#userName').value,
            photo: document.querySelector('#photoLink').value,
            scores: getResults()
        })
    })
    .then(_ => {
        alert('Friend Added')
        getQuestions()
    })
    .catch(e => console.error(e))
})


getQuestions()