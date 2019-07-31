const request = require('request');
const mysql = require('mysql');
module.exports = {

 


/**
* Return random image URLs from an API
* @param string keyword -search term
*@ param int imageCount -number of random images
* @ return array of images URLS
*/
getRandomImages_cb: function (keyword, imageCount, callback) {
  let requestURL = "https://api.unsplash.com/photos/random/?query=" + keyword + "&count=" + imageCount + "&orientation=landscape&client_id=20f34db7a19919b3214f186ad5c0a72069967789fec93d56b2835dbadc1b7d82";
  request(requestURL, function(error, repsonse, body) {
    console.log('error:', error); //Print the error if one occured
    
    if (!error) {
      let photoData = JSON.parse(body);
      let imageURLs= [];
      for (let i = 0; i <photoData.length; i++) {
        imageURLs.push(photoData[i].urls.regular)
      }
      //console.log(imageURLs);
      
     callback(imageURLs);
    } else {
      console.log("results.ejs", {"error": "Unable to access API"})
    }
  });//request
},


getRandomImages: function(keyword, imageCount) {
  let requestURL = "https://api.unsplash.com/photos/random/?query=" + keyword + "&count=" + imageCount + "&orientation=landscape&client_id=20f34db7a19919b3214f186ad5c0a72069967789fec93d56b2835dbadc1b7d82";
  
  return new Promise( function(resolve, reject) {
  request(requestURL, function(error, repsonse, body) {
    console.log('error:', error); //Print the error if one occured
    
    if (!error) {
      let photoData = JSON.parse(body);
      let imageURLs= [];
      for (let i = 0; i <imageCount; i++) {
        imageURLs.push(photoData[i].urls.regular)
      }
      //console.log(imageURLs);
      resolve(imageURLs);
    
    } else {
      console.log("results.ejs", {"error": "Unable to access API"})
    }
  });//request
  }); //promise
}, 
  
  //create database connection and return db connection
  createConnection: function(){
    var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "img_gallary"
  });
    return conn;
  }

}