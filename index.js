const express = require('express');
const app = express();
const { dbConnection } = require('./config/config.js');
const routes = require('./routes/tasks.js')

const PORT = 3000;

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

dbConnection();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})