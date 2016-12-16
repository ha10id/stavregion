// Category.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// define our document model
var Region = new Schema({
	'img': String,
	'href': String,
	'title': String
});

Region.virtual('id')
.get(function() {
	return this._id.toHexString();
});

Region.pre('save', function(next) {
    // this.keywords = extractKeywords(this.data);
    console.log('region presave', this._ogv);
    next();
});


module.exports = mongoose.model('Region', Region);