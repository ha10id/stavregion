// SimpleNews.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// define our document model
var SimpleNews = new Schema({
	'title': String,
	'img': String,
	'href': String,
	'created_by': String,
	'changed_by': String,
	'creation_date': Date,
	'publication_date': Date
});


SimpleNews.pre('save', function(next) {
    // this.keywords = extractKeywords(this.data);
    console.log('Simplenews presave', this._id);
    next();
});


module.exports = mongoose.model('SimpleNews', SimpleNews);