const cors = require('cors');
const mysql = require('./mysqllib/db');
require('dotenv/config');

const app = require('./app')

const api = process.env.API_URL;  
const port = process.env.PORT || 3000;

mysql.query("SELECT 1")
.then(
    () => { console.log("MySQl Database Connection Ready!") })
.catch((err)=> {
    console.log(err)
  })

app.listen(port, ()=> {
    console.log("App running on port "+port);
} )
