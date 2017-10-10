// server.js
// where your node app starts

// init project
var manuscript = require('./manuscript')(process.env.SITE, process.env.TOKEN)
var express = require('express'); 
var app = express();  



// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", async function (req, res) {
  
  // console.log("xxx")
  // console.log(manuscript.validate())
  // let valid = await manuscript.isValid();
  // console.log(valid)
  
  // manuscript.someFunction("apple", "banana", "pear")
  
  try {
    let people = await manuscript.viewPerson();
    res.send(people);
  } catch(error) {
    res.send(error);   
  }  
}); 

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



