// const friends = require('../data/friends')
const friends = require('../data/friends.json')
const questions = require('../data/questions.js')
const fs = require('fs')

module.exports = app => {
    // GET data
    app.get('/friends', (req, res) => {
        res.json(friends)
    })
    // GET questions data
    app.get('/questions', (req, res) => {
        res.json(questions)
    })

    // POST user to dataset
    app.post('/friends', (req, res) => {
        // testing out response
        // res.send(req.body)
        let newFriend = req.body
        friends.push(newFriend)
        res.send('New friend added')
        console.log(friends)
        // save the friends to s .json file. 
        fs.writeFile('./app/data/friends.json', JSON.stringify(friends), 'utf8', e => e ? console.log(e) : console.log('success'))
    })

}
