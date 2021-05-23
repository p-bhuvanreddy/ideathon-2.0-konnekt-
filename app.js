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
  event_status :String
},
{
    collection : 'presentevents'
});

var pdetailsModel = mongoose.model("pevents", schema);
app.get("/", function (req, res) {
res.render("index",{ pevents: null })

})
app.get("/index", function (req, res) {   
pdetailsModel.find({}, function (err, allpevents) {
    if (err) {
        console.log(err);
    } 
    else {
        res.render("index", { pevents: allpevents })
    }
})
})

app.listen(3000, "localhost", function () {
console.log("server has started");
})