var express = require("express");
var mongoose = require("mongoose");

var cheerio = require("cheerio");
var axios = require("axios");

var app = express();


// Make public a static folder
app.use(express.static("public"));

// Save the URL of our database as well as the name of our collection
// var databaseUrl = "news";
// var collections = ["scrapedData"];

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/8080";

mongoose.connect(MONGODB_URI);


//Routes

app.get("/scrape", (req, res) => {
  axios.get("https://www.theonion.com").then(function (response) {

    var $ = cheerio.load(response.data);
    var results = [];

    $("div.content-meta__headline__wrapper").each(function (i, element) {

      var title = $(element).find("h6").text();
      var link = $(element).find("a.js_curation-click").attr("href");
      // var img = $(element).find("a.js_curation-click").find("span.image-container--desktop-image").find("img").attr("data-src");
      const scrape = {
        title: title,
        link: link,
        //  img: img,
      }

      db.scrapedData.insert(scrape, function (err, data) { });
      results.push(scrape);
    });

    res.json(results);
  });

})

app.get("/articles", (req, res) => {
  db.scrapedData.find({})
    .then(scrapedData => res.json(scrapedData))

});

// app.get("/articles/:id", (req,res) => {
//   db.articles.findOne({_id: req.params.id})
//   .populate("comments")
//   .then(articles => res.json(articles))
// })

// app.post("/articles/:id", (req, res) => {
//   db.comments.create(req.body)
//   .then(dbcomments => db.comments.findOneAndUpdate({_id:req.params.id}, {$set:{comments:dbcomments.id}}))
// .then(dbarticles => res.json(dbarticles))
// })

app.listen(8080, function () {
  console.log("App running on port 8080!");
});
