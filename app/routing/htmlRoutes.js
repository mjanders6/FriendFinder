const { join } = require('path')

module.exports = app => {
    app.get('/', (req, res) => {
        res.sendFile(join(__dirname, '../public/index.html'))
    })

}
