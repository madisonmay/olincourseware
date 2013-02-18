
/*
 * GET users listing.
 */
 var models = require("../models");
 var Lecture = models.Lecture

exports.list = function(req, res){
    Lecture.find({}, function(err, lectures) {
        res.render('list', {title: 'Recent Lectures', lectures: lectures});
    })
};

exports.lecture = function(req, res){
    Lecture.findOne({ title: req.params.title }, function (err, lecture) {
        if (err) { 
            console.log(err); 
        }
        else {
            var old_url = lecture.url;
            var url = old_url.split('=');
            var id = url[1];
            var title = lecture.class_name + ': ' + lecture.title
            console.log(id);
            res.render('index', { title: 'Olin Courseware', lecture: lecture, url: id, title: title });
        }
  });
};

exports.add = function(req, res){
    res.render('add', {title: 'Add a New Lecture'})
}

exports.create = function(req, res) {
    var time = new Date().getTime() / -1000;
    var title = req.body.title;
    var url = req.body.url;
    var class_name = req.body.class_name;
    var lecture = new Lecture({time: time, title: title, url: url, class_name: class_name});
    lecture.save( function(err) {
        if (err) {
            console.log("Error: ", err);
        }
        console.log(lecture);
        res.redirect('/add');
    })
}