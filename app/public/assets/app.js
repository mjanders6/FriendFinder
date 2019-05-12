const { fetch, alert } = window

const getQuestions = _ => {
    fetch('/questions')
        .then(r => r.json())
        .then(questions => {
            console.log(questions)
            document.querySelector('#questionSet').innerHTML = ''
            questions.forEach(({ Q }) => {
                let qDiv = document.createElement('div')
                qDiv.innerHTML = `
                <h5>${Q}</h5>
                <select class="custom-select custom-select-sm mb-3" style="width:50%">
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

getQuestions()