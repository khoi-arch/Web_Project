const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config({ path: './src/Database/.env' });
const routes = require('./routers');
const app = express();
const db = require('./Database/dbConnection')
dotenv.config();
db.connectDB();
const port = process.env.PORT;
app.use(express.json());
routes(app)

app.get('/',(req,res) => {
    res.send('HELLO')
})
app.listen(port, () =>{
    console.log(`Server is running at http://localhost:${port}`);
})