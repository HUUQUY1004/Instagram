const mongoose = require('mongoose')
async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/instagram')
        console.log("Connect to MongoDB successfully");
    } catch (error) {
        console.log("Connect to MongoDB failure");
    }
}
module.exports = {connect}