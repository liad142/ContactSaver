const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            //כדי להימנע מאזהרות בקונסול נוסיף את האופציות הבאות אך זה לא חובה
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: false
        })
        console.log('MONGO DB IS CONNECTED')
    } catch (err) {
        console.log('err.message', err)

    }
}
module.exports = connectDB;
