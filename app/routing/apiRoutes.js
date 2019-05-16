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

        let addedFriend = req.body
        let scoreArry = []
        
        // loop through the friends array to compare to the newly added friend
        for (let i = 0; i < friends.length; i++) {
            let total = 0
            let friendScores = friends[i].scores
            let friendName = friends[i].name
            // compare the arrays
            friendScores.forEach((score, index) => {
                total += Math.abs(parseInt(score) - parseInt(addedFriend.scores[index]))
            })
            // save the scores in an array
            scoreArry[i] = { friendName, total }
        }
        // sort the array
        scoreArry.sort((a, b) => {
            return a.total - b.total
        })
        friends.push(addedFriend)
        res.json(scoreArry)
        // res.send(scoreArry[0].friendName)
        // save the friends to a .json file. 
        // fs.writeFile('./app/data/friends.json', JSON.stringify(friends), 'utf8', e => e ? console.log(e) : console.log('success'))
    })

}
