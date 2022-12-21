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

function QueryStringToJSON(location) {            
  var pairs = location.split('&');
  
  var result = {};
  pairs.forEach(function(pair) {
      pair = pair.split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
  });

  return JSON.parse(JSON.stringify(result));
}


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


async function getDbID( arg) {

  const movie_name = [];
  const direcetor  = [];
  const genre  = [];

 

  
  argToUse = 'SELECT movie_id, movie_name, direcetor, genre, stars, rating, imdb_ranking, awards, movie_year, movie_length  from movies';
  
  //argAppend = ' WHERE movie_id = ' + '"' + arg + '"';
  argAppend = ' WHERE movie_id = ' + arg ;

  argToUse = argToUse + argAppend

  console.log(argToUse)


  let results = await pool.query(argToUse);

  console.log(results)
  
var dataRet = []

results.rows.forEach(r => {
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
  });
  
  
  return {"data" : dataRet};

  //return ({"data" : dataRet}) / dataRet
  //return [movie_name,direcetor,genre];
 
}

async function getDbIDS() {



 

  
  argToUse = 'SELECT movie_id, movie_name, direcetor, genre, stars, rating, imdb_ranking, awards, movie_year, movie_length  from movies';
  let results = await pool.query(argToUse);


  
var dataRet = []

results.rows.forEach(r => {
      dataRet.push(
       (r["movie_id"])
      )
  });
  
  
  return {"IDS" : dataRet};

  //return ({"data" : dataRet}) / dataRet
  //return [movie_name,direcetor,genre];
 
}

async function getDbActors() {



 

  
  argToUse = 'SELECT movie_id, movie_name, direcetor, genre, stars, rating, imdb_ranking, awards, movie_year, movie_length  from movies';
  let results = await pool.query(argToUse);


  
var dataRet = []

results.rows.forEach(r => {
      dataRet.push(
       (r["stars"])
      )
  });
  
  
  return {"Actors" : dataRet};

  //return ({"data" : dataRet}) / dataRet
  //return [movie_name,direcetor,genre];
 
}

async function getDbDirectors() {



 

  
  argToUse = 'SELECT movie_id, movie_name, direcetor, genre, stars, rating, imdb_ranking, awards, movie_year, movie_length  from movies';
  let results = await pool.query(argToUse);


  
var dataRet = []

results.rows.forEach(r => {
      dataRet.push(
       (r["direcetor"])
      )
  });
  
  
  return {"Directors" : dataRet};

  //return ({"data" : dataRet}) / dataRet
  //return [movie_name,direcetor,genre];
 
}

async function InsertDb(args) {



  console.log(args)

 
  
  
  argToUse = 'INSERT INTO movies ( movie_id, movie_name, direcetor, genre, stars, rating, imdb_ranking, awards, movie_year, movie_length )' + " VALUES " + "(";
  
  argsParsed = args.toString()

  inputDp = argToUse + argsParsed + ")"

  console.log(inputDp)
  

  let results = await pool.query(inputDp);


  
  console.log(results)

  
  
  return results

 
}

async function DeleteDb(id) {



  console.log(id)

  
  argToUse = 'DELETE FROM movies WHERE movie_id =';
  
 

  inputDp = argToUse + id;

 
  

  let results = await pool.query(inputDp);


  
  console.log(results)

  
  
  return results

 
}

async function PutDb(id,args) {

  /*
  UPDATE table
SET column1 = value1,
    column2 = value2, ...
WHERE
    condition;
*/

  keys = Object.keys(args)
  values = Object.values(args)

  console.log(id)
  console.log(keys)
  console.log(values)
  
  argToUse = 'UPDATE movies SET '                 // WHERE movie_id =';
  
  keylength = keys.length
 
  for (let i = 0; i < keylength; i++) {
    console.log(argToUse)
    argToUse = argToUse + String(keys[i]) + " = " + String(values[i]) + ","

  } 

  argToUse = argToUse.slice(0,-1);

  argToUse += " WHERE movie_id = " + id

  
  console.log(argToUse)

  

  let results = await pool.query(argToUse);


  
  console.log(results)

  
  
  return results
  

 
}





app.get('/', async function (req, res) {
  

    

  res.render('index', {}); //printrez:printrez
});


app.get('/collection', async function (req, res) {

  const data = await getDbSave()

  res.json(JSON.parse(data));


});

app.get('/ids', async function (req, res) {

  const data = await getDbIDS()


  res.json(data);


});

app.get('/actors', async function (req, res) {

  const data = await getDbActors()


  res.json(data);


});

app.get('/directors', async function (req, res) {

  const data = await getDbDirectors()


  res.json(data);


});


app.get('/:id', async function (req, res) {
  
  console.log(req.params.id)
  let id = 100 + req.params.id;
  
  const data = await getDbID(req.params.id)

  res.json(data);
});

app.get('/specification', async function (req, res) {

  const data = await getDbDirectors()


  res.json(data);


});

app.post('/addMovie', async function (req , res  ) {
  

  let urlR = req.url
  let urlParams = urlR.split("?")
  let params = urlParams[1]
  let parsed = querystring.parse(params) 
 
  console.log(parsed);
  
  //wrong column names

  if(parsed.movie_id != undefined && parsed.direcetor != undefined && 
    parsed.movie_name != undefined && parsed.genre != undefined && parsed.genre != undefined
    && parsed.stars != undefined && parsed.rating != undefined && parsed.imdb_ranking != undefined && parsed.awards != undefined && parsed.movie_year != undefined 
    && parsed.movie_length != undefined)
    {

      res.json({"okay":"Good column names"})

      InsertDb([parsed.movie_id, parsed.movie_name, parsed.direcetor, parsed.genre, parsed.stars, parsed.rating, parsed.imdb_ranking, parsed.awards, parsed.movie_year, parsed.movie_length])


    }

    else{

      res.json({"error":"Wrong column names"})
    }


      
    
});

app.delete('/', async function (req , res  ) {
  

  let urlR = req.url
  let urlParams = urlR.split("?")
  let params = urlParams[1]
  let parsed = querystring.parse(params) 
 
  console.log(parsed);
  
  //wrong column names

  if(parsed.movie_id != undefined)
    {

      res.json({"okay":"Good column names"})

      DeleteDb(parsed.movie_id)


    }

    else{

      res.json({"error":"Wrong column names"})
    }


      
    
});




app.put('/', async function (req , res  ) {
  

  let urlR = req.url
  let urlParams = urlR.split("?")
  let params = urlParams[1]
  //let parsed = querystring.parse(params)
  var parsed = QueryStringToJSON(params);


  console.log(parsed)
    
  //wrong column names

  if(parsed.movie_id != undefined)
    {


      
      PutDb(parsed.movie_id, parsed)
      res.json({"sucsess":"Went thru"})
      

    }

    else{

      res.json({"error":"Wrong column names"})
    }


      
    
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