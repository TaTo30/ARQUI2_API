const Router = require('express')
const {Usuario, Type} = require('../models/usuarios')
const pgconnect = require('../config/connection')

const router = Router()
const PG_POOL = pgconnect.cn;

router.get('/', (request, response) => {
    response.send("Funcionando")
})

router.post('/getUser', (request, response) => {
    const User = new Usuario();
    User.Data(Type.GETUSER, request.body)
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
    User.Data(Type.NEWUSER, request.body)
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
    User.Data(Type.VALIDATEUSER, request.body)
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
    User.Data(Type.SETCOACH, request.body)
    let query = User.Query();
    PG_POOL.query(query, (err, res) => {
        if (err) {
            response.send(User.Response(false, err.message))
        } else {
            response.send(User.Response(true, {oid: res.oid, rowCount: res.rowCount}))
        }
    })
})

router.post('/updateUser', (request, response) => {
    const User = new Usuario();
    User.Data(Type.UPDATEUSER, request.body)
    let query = User.Query();
    PG_POOL.query(query, (err, res) => {
        if (err) {
            response.send(User.Response(false, err.message))
        } else {
            response.send(User.Response(true, {oid: res.oid, rowCount: res.rowCount}))
        }
    })
})



module.exports = router
