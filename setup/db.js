const mongoose        = require('mongoose');

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME, SERVER_PORT } = process.env;

mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
    {
        useNewUrlParser: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(()=> {console.log('DataBase - OK'); console.log(`Serviço Disponível na porta ${SERVER_PORT}`)})