var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/olincourseware');

var lectureSchema = mongoose.Schema({
    url: String,
    class_name: String,
    title: String,
    office_hours: String,
    time: Number
});

var Lecture = mongoose.model('Lecture', lectureSchema);

exports.Lecture = Lecture;