const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({ 
    news: { type: Array, required: true }, 
});

module.exports = mongoose.model('newsModel', newsSchema);