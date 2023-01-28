const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Database is connected successful')
}).catch(err => console.log(err.message))