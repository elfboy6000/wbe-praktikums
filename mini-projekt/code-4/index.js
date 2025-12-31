/**
 *  Webservice mit Express
 *  WBE-Praktikum
 */

var express = require('express')
var app = express()

function error(status, msg) {
    var err = new Error(msg)
    err.status = status
    return err
}

function guidGenerator() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())
}

// serve static files from /public
app.use(express.static('public'))

// valid API keys
var apiKeys = ['wbeweb', 'c4game']

// API key middleware
app.use('/api', function(req, res, next){
    var key = req.query['api-key']

    if (!key) return next(error(400, 'api key required'))
    if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key'))

    req.key = key
    next()
})

app.use(express.json())

// in-memory DB
var data = {
    1234567890: { demodata: "wbe is an inspiring challenge" },

    // Connect4 initial state stored under datakey "c4state"
    c4state: {
        board: [
            [ '', '', '', '', '', '', '' ],
            [ '', '', '', '', '', '', '' ],
            [ '', '', '', '', '', '', '' ],
            [ '', '', '', '', '', '', '' ],
            [ '', '', '', '', '', '', '' ],
            [ '', '', '', '', '', '', '' ]
        ],
        next: 'b',
        gameOver: false,
        winner: ''
    }
}

// GET
app.get('/api/data/:id', function(req, res, next){
    var id = req.params.id
    var result = data[id]
    if (result) res.send(result)
    else next()
})

// POST (create new id)
app.post('/api/data', function (req, res, next) {
    let id = guidGenerator()
    data[id] = req.body
    res.send({id})
})

// DELETE
app.delete('/api/data/:id', function(req, res, next){
    var id = req.params.id
    delete data[id]
    res.sendStatus(204)
})

// PUT (overwrite existing)
app.put('/api/data/:id', function(req, res, next){
    var id = req.params.id
    if (data[id]) {
        data[id] = req.body
        res.send(req.body)
    }
    else next()
})

// error middleware
app.use(function(err, req, res, next){
    res.status(err.status || 500)
    res.send({ error: err.message })
})

// 404
app.use(function(req, res){
    res.status(404)
    res.send({ error: "not found" })
})

app.listen(3000)
console.log('Express started on port 3000')
