// News.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// define our document model
var News = new Schema({
	'id': Number,
	'title': String,
	'slug': Number,
	'body': String,
	'excerpt': String,
	'thumbnail': String,
	'creation_date': Date,
	'publication_date': Date,
	'content_id': Number
});


News.pre('save', function(next) {
    // this.keywords = extractKeywords(this.data);
    console.log('news presave', this._id);
    next();
});


module.exports = mongoose.model('News', News);