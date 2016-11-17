// News.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// define our document model
var News = new Schema({
	'title': String,
	'slug': String,
	'thumbnail': String,
	'creation_date': Date
});

News.virtual('id')
    .get(function() {
        return this._id.toHexString();
});

News.pre('save', function(next) {
    // this.keywords = extractKeywords(this.data);
    console.log('news presave', this._id);
    next();
});


module.exports = mongoose.model('News', News);