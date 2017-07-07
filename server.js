//
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mustacheExpress = require("mustache-express");
mongoose.Promise = require("bluebird");
const Album = require("./models/Album");
const app = express();
const port = process.env.PORT || 8000;
const dbURL = "mongodb://localhost:27017/albumdb";

app.use(bodyParser.urlencoded({ extended: false }));
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");
app.use(express.static("./public"));

mongoose.connect(dbURL).then(function(err, db) {
  if (err) {
    console.log("error", err);
  }
  console.log("Connected to MOONGOOSE DB.");
});

// ROUTES //
// app.get("/", (req, res) => {
//   res.render("index", {userName: name});
// });

app.get("/add", (req, res) => {
  res.render("add");
});

app.get("/", (req, res) => {
  Album.find()
    .then(foundAlbums => {
      res.render("index", { albums: foundAlbums });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get("/add", (req, res) => {
  res.render("add");
});

// BUILD EDIT MUSTACHE PAGE WITH POPULATED INPUTS
app.get("/edit/:id", (req, res) => {
  Album.findById(req.params.id)
    .then(foundAlbum => {
      res.render("edit", { album: foundAlbum });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});
// ////////////////////////////////////////////

app.post("/create", (req, res) => {
  let albumData = req.body;
  console.log(req.body);
  let newObj = { title: albumData.single[0], track: albumData.single[1] };
  albumData.single = [newObj];
  let newAlbum = new Album(albumData);
  console.log("newAlbum: ", newAlbum);
  newAlbum
    .save()
    .then(savedAlbum => {
      res.render("index", { albums: foundAlbums });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

/////////////////////////

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
