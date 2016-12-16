// News.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// define our document model
var Newstext = new Schema({
	'cmsplugin_ptr_id': Number,
	'body': String
});

Newstext.virtual('id')
    .get(function() {
        return this._id.toHexString();
});

Newstext.pre('save', function(next) {
    // this.keywords = extractKeywords(this.data);
    console.log('news presave', this._id);
    next();
});


module.exports = mongoose.model('Newstext', Newstext);