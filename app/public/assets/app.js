const { fetch, alert } = window
const getSelections = document.getElementById('questionSet')

const getQuestions = _ => {
    fetch('/questions')
        .then(r => r.json())
        .then(questions => {
            document.querySelector('#userName').innerHTML = ''
            document.querySelector('#photoLink').innerHTML = ''
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

// selects the value from the drop down
const getResults = _ => {
    let answerSel = questionSet.querySelectorAll('.qOption')
    let answerArry = []
    answerSel.forEach(selection => {
        answerArry.push(selection.selectedIndex)
    })
    return answerArry
}

// submit the survey
document.querySelector('#submit').addEventListener('click', e => {
    e.preventDefault()
    // use the friends route
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
        .then(r => r.json())
        .then( r => {
            console.log(r)
            // alert(r[0].friendName)
            let match = r[0].friendName
            let modalDiv = document.createElement('div')
            modalDiv.createElement =  `
                <div class="modal" tabindex="-1" role="dialog" id='myModal'>
                    <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title">Here is your match!</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                        <p>${match}</p>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                    </div>
                </div>
                `
            document.querySelector('#questionSet').append(modalDiv)
            getQuestions()
        })
        .catch(e => console.error(e))
})

getQuestions()