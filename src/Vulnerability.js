const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require("body-parser");
const {Pool} = require('pg');

const dotenv = require("dotenv");

dotenv.config()


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = new Pool({


    connectionString: process.env.CONN_STRING,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'web2lab1pr8baza',
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl : false


    })

 async function getDbSave( arg) {

  const utakmice = [];
  const kolo  = [];
  const rezultat  = [];

  var argToUse = 'SELECT naziv, rezultat, kolo from utakmica WHERE kolo = ' + "'" +arg + "'";

  console.log(argToUse)


  const results = await pool.query(argToUse);
  
  console.log("Database resposne ")
  //console.log( results)


  results.rows.forEach(r => {
    utakmice.push(r["naziv"]);
    });

   results.rows.forEach(r => {
    kolo.push(r["kolo"]);
    });

  results.rows.forEach(r => {
    rezultat.push(r["rezultat"]);
    });

  

  return [utakmice,kolo,rezultat];
}

async function getDbLogin( Username,Password) {

  const Usernames = [];
  const Passwords  = [];
  
  var Return = false;
  var UsernameRet = false;

  var argToUse = 'SELECT username, password from Secret_table' + ' WHERE username = ' + "'" +Username + "'" + " AND " + " password = " + "'" + Password + "'";
  var onlyUsername = 'SELECT username, password from Secret_table' + ' WHERE username = ' + "'" +Username + "'" ;
  

  console.log(argToUse)

  let results = "None"
  let ResUsername = "None"

  try{
  results = await pool.query(argToUse);
  ResUsername = await pool.query(onlyUsername);

  console.log(results.rowCount)

  console.log(onlyUsername)
  console.log(ResUsername.rowCount)
  }
  catch(error){
    console.error(error);

    
  }
  console.log("Database resposne - Logins")
  

  if(results.rowCount > 0){

    Return = true
    

 
  }

  if(ResUsername.rowCount > 0){

    UsernameRet = true
    

 
  }
  
  

  return [Return,UsernameRet];
}


app.get('/', async function (req, res) {
  

    

  res.render('index', {}); //printrez:printrez
});







app.post('/query', async function (req , res  ) {
  


  console.log(req.body);
  console.log(req.body.SQLinjection != undefined && req.body.SQLinjection == "on");
  
  

  if(req.body.SQLinjection == undefined && req.body.SQLinjection != "on" && !(req.body.Query == 1 || req.body.Query == 2 || req.body.Query == 3 || req.body.Query == 4 ) ){

    res.render('indexInvalidInput', {});

  }
  else {


    const allREsult = await getDbSave(req.body.Query)

    const utakmice = allREsult[0]
    const kolo = allREsult[1]
    const rezultat = allREsult[2]

    console.log( utakmice)
    

    const printrez = [];

    for (let i = 0; i <= utakmice.length - 1; i++)
          {

            printrez[i] = "Kolo: " + kolo[i] + "  Utakmica: " + utakmice[i] +
            " : " + rezultat [i]

          }


    res.render('indexQueried', {printrez:printrez});
  
  }
      
    
});



app.post('/login', async function (req , res  ) {
  

  console.log("Login called");
    
  console.log(req.body);
  
  
  

  

    const allREsult = await getDbLogin(req.body.Username,req.body.Password)

    if(allREsult[0] == true){

      res.render('secret', {}); 
    }

    if(allREsult[1] == true && req.body.BadAuth == "on"){
      
      console.log("Username Exists")
      res.render('indexExists', {}); 
    }

    else if(allREsult[1] == false && req.body.BadAuth == "on"){
      
      console.log("Username Exists")
      res.render('indexDoesntExist', {});  
    }

    else{

      res.render('indexBadCombo', {}); 

    }



});






  
  const hostname = '127.0.0.1';
  app.listen(port, hostname, () => {
  console.log(`Server locally running at http://${hostname}:${port}/ and from
  outside on ${externalUrl}`);
  })


/*
app.listen(4080);
module.exports = app;
*/