/*
 * GET users listing.
 */
var models = require("../models");
var Lecture = models.Lecture;

Array.prototype.sortByProp = function(p) {
    return this.sort(function(a, b) {
        return(a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
};

exports.login = function(req, res) {
    res.redirect('http://olinapps.com/external?callback=http://olin-lectures.herokuapp.com/')
}

exports.list = function(req, res) {
    Lecture.find({}, function(err, lectures) {
        lectures = lectures.sortByProp('time');
        res.render('list', {
            title: 'Recent Lectures',
            lectures: lectures
        });
    });
};

exports.lecture = function(req, res) {
    Lecture.findOne({
        title: req.params.title
    }, function(err, lecture) {
        if(err) {
            console.log(err);
        } else {
            var old_url = lecture.url;
            var url = old_url.split('=');
            var id = url[1];
            var title = lecture.class_name + ': ' + lecture.title;
            console.log(id);
            res.render('index', {
                title: 'Olin Lectures',
                lecture: lecture,
                url: id
            });
        }
    });
};

exports.add = function(req, res) {
    res.render('add', {
        title: 'Add a New Lecture'
    });
};

exports.create = function(req, res) {
    var time = new Date().getTime() / -1000;
    var title = req.body.title;
    var url = req.body.url;
    var class_name = req.body.class_name;
    var lecture = new Lecture({
        time: time,
        title: title,
        url: url,
        class_name: class_name
    });
    lecture.save(function(err) {
        if(err) {
            console.log("Error: ", err);
        }
        console.log(lecture);
        res.redirect('/add');
    });
};

exports.home = function(req, res) {
    req.session.uid = req.body.sessionid;
    console.log(req.session.uid);
    res.render('home', {
        title: 'Olin Lectures',
        uid: "'" + req.session.uid + "'",
    });
};

exports.userdata = function(req, res) {
    console.log("Userdata")
}
