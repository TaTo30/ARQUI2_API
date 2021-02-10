const express = require('express'); 
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(cors())

app.use(require('./routes/users'))
app.use(require('./routes/registers'))

app.listen(PORT, () => {
    console.log(`API REST inicializada en ${PORT}`);
})