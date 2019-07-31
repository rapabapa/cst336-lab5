const express = require("express");
const app = express();

app.set();

app.set('view egine', 'ejs');
app.use(express.static('public'));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

//routes

//root route
app.get("/", async function(req, res) {
  let requestURL = "https://api.unsplash.com/photos/random/?orientation=landscape&client_id=20f34db7a19919b3214f186ad5c0a72069967789fec93d56b2835dbadc1b7d82";
 let keyword = req.query.keyword;
  
  var imageURLs = await tools.getRandomImages("", 1);
  //console.log("imageURLs: ", imageURLs);
  res.render("index.ejs", {"imageURLs": imageURLs})
 });
//search route
app.get("/search", async function(req, res) {
  let keyword = req.query.keyword;
  
  var imageURLs = await tools.getRandomImages(keyword, 9);
  console.log("imageURLs: ", imageURLs);
  res.render("results.ejs", {"imageURLs": imageURLs, "keyword": keyword})
 // getRandomImages_cb(keyword, 9, function(imageURLs){
 //   console.log("imageURLs: ", imageURLs);
 //     res.render("results.ejs", {"imageURLs": imageURLs});
  //})

});  //search

app.get("/api/updateFavorites", function(req, res) {
  var conn = tools.createConnection();
  var sql; 
  var sqlParams;
 if (req.query.action == "add") {
  sql = "INSERT INTO favorites (imageURL, keyword) Values (?, ?)";
  sqlParams = [req.query.imageURL, req.query.keyword];
 } else {
   sql = "DELETE FROM favorites WHERE imageURL =?";
  sqlParams = [req.query.imageURL];
}
  
  conn.connect( function(err){
    if (err) throw err;
    conn.query(sql, sqlParams, function(err, result){
       if (err) throw err;
    });//query
  });//connect
  res.send("it works!");
});//updateFavorites

app.get("/displayKeywords", async function(req, res){
  var imageURLs = await tools.getRandomImages("", 1);
  var conn = tools.createConnection();
  var sql = "SELECT DISTINCT keyword FROM `favorites` ORDER BY keyword";
  
  conn.connect( function(err) {
    if (err) throw err;
    conn.query(sql, function(err, result){
        if (err) throw err;
      console.log(result)
      res.render("favorites.ejs", { "rows" : result, "imageURLs":imageURLs})
      
    });//query
  });//connect
 
 
});//displayKeywords

app.get("/api/displayFavorites", function(req, res){
  var conn = tools.createConnection();
  var sql = "SELECT imageURL FROM favorites Where keyword = ?";
  var sqlParms = [req.query.keyword];
  
   conn.connect( function(err) {
    if (err) throw err;
    conn.query(sql, sqlParms, function(err, results){
        if (err) throw err;
      console.log(results)
      res.send(results);
      
    });//query
  });//c
});//displayfavorites route

//server listen
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Express Server is Running...")
})