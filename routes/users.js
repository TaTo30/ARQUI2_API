const {Router, response} = require('express')
const pgconnect = require('../config/connection')

const router = Router()
const PG_POOL = pgconnect.cn;

router.get('/', (request, response) => {
    response.send("Funcionando")
})

router.get('/getUsers', (request, response) => {
    let query = 'select * from usuarios'
    PG_POOL.query(query, (err, res) => {
        if (err) {
            console.error(err);
        }else{
            console.log(res.rows);
            response.send(res.rows);
        }
    })
});

router.post('/setUsers', (request, response) => {
    user = request.body;
    let query = `insert into usuarios (nombres, apellidos, edad, sexo, peso, estatura)
    values('${user.nombres}', '${user.apellidos}', ${user.edad}, '${user.sexo}', ${user.peso}, ${user.estatura})`
    PG_POOL.query(query, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log(res);
            response.send({
                'status':'recibido'
            })
        }
    })
})

module.exports = router
