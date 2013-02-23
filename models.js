var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/olincourseware');

var lectureSchema = mongoose.Schema({
    url: String,
    class_name: String,
    title: String,
    office_hours: String,
    time: Number
});

var classSchema = mongoose.Schema({
    class_name: String,
    office_hours: String,
    photo: String,
    professors: String,
    prerequisites: String
});

var Lecture = mongoose.model('Lecture', lectureSchema);

var Class = mongoose.model('Class', classSchema);

exports.Lecture = Lecture;
