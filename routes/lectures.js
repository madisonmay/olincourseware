/*
 * GET users listing.
 */


var request = require("request");
var models = require("../models");
var Lecture = models.Lecture;
var User = models.User;

Array.prototype.sortByProp = function(p) {
    return this.sort(function(a, b) {
        return(a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
};

exports.login = function(req, res) {
    res.redirect('http://olinapps.com/external?callback=http://localhost:3000/home')
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
    request({uri: 'http://directory.olinapps.com/api/me?sessionid='+req.session.uid},
        function(error, response, body) {
            body = JSON.parse(body);
            name = body.name;
            uid = body.id;
            User.findOne({uid: uid}, function(err, db_user) {
                if (err) {
                    console.log(err);
                } else if (db_user) {
                    user = db_user
                    console.log("User exists")
                    res.render('home', {title: 'Olin Lectures', user: user});
                } else {
                    console.log("New user created")
                    var new_user = new User({uid: uid, name: name});
                    new_user.save(function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('home', {title: 'Olin Lectures', user: new_user});
                        }
                    })
                }
            })
        });
};

exports.notes = function(req, res) {
    console.log("Notes")
    res.render('notes', {title: "Lecture Notes"});
};


