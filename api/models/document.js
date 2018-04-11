const mongoose = require('mongoose');
const Schema = mongoose.Schema;



var documentSchema = new Schema({
    document_code : String,
    content_hash: String,
    parent_hash: String,
    document_name: String,
    document_status: String,
    publisher: String
});

module.exports = mongoose.model('document', documentSchema);