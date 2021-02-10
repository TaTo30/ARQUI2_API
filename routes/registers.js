const Router = require('express');
const {Registro, Type} = require('../models/registros')
const pgconnect = require('../config/connection');

const router = Router();
const PG_POOL = pgconnect.cn;

router.post('/regInterval', (request, response) => {
    const Reg = new Registro()
    Reg.Data(Type.INTERVAL, request.body);
    let query = Reg.Query()
    PG_POOL.query(query, (err, res) => {
        if (err) {
            response.send(Reg.Response(false, err.message))
        } else {
            response.send(Reg.Response(true, res.rows))
        }
    })
});

router.post('/regAll', (request, response) => {
    const Reg = new Registro()
    Reg.Data(Type.ALL, request.body)
    let query = Reg.Query()
    PG_POOL.query(query, (err, res) => {
        if (err) {
            response.send(Reg.Response(false, err.message))
        } else {
            response.send(Reg.Response(true, res.rows))
        }
    })
})

router.post('/regAgregate', (request, response) => {
    const Reg = new Registro()
    Reg.Data(Type.AGREGATE, request.body)
    let query = Reg.Query()
    PG_POOL.query(query, (err, res) => {
        if (err) {
            response.send(Reg.Response(false, err.message))
        } else {
            response.send(Reg.Response(true, res.rows))
        }
    })
})

router.post('/newReg', (request, response) => {
    const Reg = new Registro()
    Reg.Data(Type.INSERT, request.body)
    let query = Reg.Query()
    PG_POOL.query(query, (err, res) => {
        if (err) {
            response.send(Reg.Response(false, err.message))
        } else {
            response.send(Reg.Response(true, {oid: res.oid, rowCount: res.rowCount}))
        }
    })
})

module.exports = router;