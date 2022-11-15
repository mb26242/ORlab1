const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require("body-parser");
const {Pool} = require('pg');

const dotenv = require("dotenv");
dotenv.config()

///////////

var staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath));

app.set('static', path.join(__dirname, 'static'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('static'));

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

  const movie_name = [];
  const direcetor  = [];
  const genre  = [];

 

  
  argToUse = 'SELECT movie_id, movie_name, direcetor, genre, stars, rating, imdb_ranking, awards, movie_year, movie_length  from movies'
  



  console.log(argToUse)


  let results = await pool.query(argToUse);

  var IDs = []
  var StringCheck = ""

  if(arg != undefined){

   

    results.rows.forEach(r => {

      StringCheck = ((r["movie_name"]) + (r["direcetor"])+(r["movie_id"])+(r["genre"])+(r["stars"])+(r["rating"])+(r["imdb_ranking"])+ (r["awards"])+(r["movie_year"])+(r["movie_length"]))

      if (StringCheck.includes(arg)){
        IDs.push((r["movie_id"]))
      }

    });

  }

  
  console.log("Database resposne ")
  console.log( results)

/*
  results.rows.forEach(r => {
    movie_name.push(r["movie_name"]);
    direcetor.push(r["direcetor"]);
    genre.push(r["genre"]);
  });
*/
  
var dataRet = []

results.rows.forEach(r => {

  if ( ( arg == undefined ) || (arg != undefined && (r["movie_id"]) in IDs)){

      dataRet.push(
        {
        "movie_name": (r["movie_name"]),
        "direcetor" : (r["direcetor"]),
        "movie_id" : (r["movie_id"]),
        "genre" : (r["genre"]),
        "stars" : (r["stars"]),
        "rating" : (r["rating"]),
        "imdb_ranking" : (r["imdb_ranking"]),
        "awards" : (r["awards"]),
        "movie_year" : (r["movie_year"]),
        "movie_length" : (r["movie_length"])
        }
      )

  }


});
  
  
  return JSON.stringify({"data" : dataRet})

  //return ({"data" : dataRet}) / dataRet
  //return [movie_name,direcetor,genre];
 
}





app.get('/', async function (req, res) {
  

    

  res.render('index', {}); //printrez:printrez
});







app.post('/query', async function (req , res  ) {
  


  console.log(req.body);
 
  
  



  const data = await getDbSave(req.body.Query)

    

  console.log( data)
    
  var movie_name = data[0]
  var direcetor = data[1]
  var genre = data[2]


  res.render('index', {data}); //movie_name,direcetor,genre
  
  
      
      
    
});

app.get('/queryAJAX', async function (req , res  ) {
  
  console.log(req.body);
 

  const data = await getDbSave(req.body.Query)

  console.log( data)
    
  var movie_name = data[0]
  var direcetor = data[1]
  var genre = data[2]


  //res.render('index', {data}); //movie_name,direcetor,genre
  
  res.send(data)
    
});







app.listen(4080);

module.exports = app;