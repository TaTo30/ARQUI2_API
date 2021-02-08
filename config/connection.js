const {Pool} = require('pg')

var connectSetup = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
       rejectUnauthorized: false
    }
   } || {
    user: 'postgres',
    host: 'localhost',
    database: 'Arqui2_Pruebas'
}

const pool = new Pool(connectSetup)

exports.cn = pool

/*
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Arqui2_Pruebas'
})

pool.query('SELECT * FROM usuarios', (err, res) => {
    console.log(err, res);
    pool.end()
})
*/