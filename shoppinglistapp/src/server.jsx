const fs = require("fs")
const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var list = JSON.parse(fs.readFileSync('./list.JSON'))

app.get('/list', (req, res) => {
    res.send(list)
})

app.post('/list', (req, res) => {
    list.push(req.body)
})

app.delete('/list', (req, res) => {

    var itemName = req.body.item
    var index;
    // alert(req.body.item)

    for (var i = 0; i < list.length; i++) {
        if (list[i].item === itemName) {
            index = i;
        }
    }

    list.splice(list.indexOf(index), 1)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))