const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routers');
const app = express();
const db = require('./config/dbConnection')
const passport = require('./config/passport')
dotenv.config();
db.connectDB();
const port = process.env.PORT;
app.use(express.json());
routes(app)
passport(app)

app.get('/',(req,res) => {
    res.send('HELLO')
})
app.listen(port, () =>{
    console.log(`Server is running at http://localhost:${port}`);
})