const {Router, request, response} = require('express')
const Usuario = require('../models/usuarios')
const pgconnect = require('../config/connection')

const router = Router()
const PG_POOL = pgconnect.cn;

router.get('/', (request, response) => {
    response.send("Funcionando")
})

router.post('/getUser', (request, response) => {
    const User = new Usuario();
    User.Data(request.body.usuario)
    let query = User.Query()
    PG_POOL.query(query, (err, res) => {
        if (err) {
            response.send(User.Response(false, err.message));
        }else{
            response.send(User.Response(true, res.rows));
        }
    })
});

router.post('/newUser', (request, response) => {
    const User = new Usuario();
    User.Data(request.body)
    let query = User.Query()
    PG_POOL.query(query, (err, res) => {
        if (err) {
            response.send(User.Response(false, err.message));
        } else {
            response.send(User.Response(true, {oid: res.oid, rowCount: res.rowCount}))
        }
    })
})

router.post('/validateUser', (request, response) => {
    const User = new Usuario();
    User.Data(request.body.usuario, request.body.password)
    let query = User.Query();
    PG_POOL.query(query, (err, res) => {
        if (err) {
            response.send(User.Response(false, err.message))
        } else {
            response.send(User.Response(true, res.rows))
        }
    })
})

router.post('/setCoach', (request, response) => {
    const User = new Usuario();
    User.Data(request.body.trainee, request.body.coach, 0)
    let query = User.Query();
    PG_POOL.query(query, (err, res) => {
        if (err) {
            response.send(User.Response(false, err.message))
        } else {
            response.send(User.Response(true, {oid: res.oid, rewCount: res.rowCount}))
        }
    })
})

module.exports = router
