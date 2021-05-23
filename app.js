var express = require("express"),
app = express(),
bodyparser = require("body-parser"),
mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/events", {useNewUrlParser: true});

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var schema = new mongoose.Schema({
  event_name : String,
  event_date : String,
  registration_end_date : String,
  registration_link : String,
},
{
    collection : 'presentevents'
});
var detailsModel = mongoose.model("events", schema);
app.get("/", function (req, res) {
res.render("index",{ events: null })
})
app.get("/getdetails", function (req, res) {   
detailsModel.find({}, function (err, allevents) {
    if (err) {
        console.log(err);
    } else {
        res.render("index", { events: allevents })
    }
})
})
app.listen(3000, "localhost", function () {
console.log("server has started");
})