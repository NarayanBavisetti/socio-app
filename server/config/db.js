const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURL')

const connectDB = async () => {
    try{
        mongoose.connect(db, { useUnifiedTopology: true ,  useNewUrlParser: true  })
        console.log("Connections successful");
    }catch(err){
        console.log(err.message)
    }
}
module.exports = connectDB;