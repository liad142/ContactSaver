const express = require('express');
const connectDB = require('./config/db')
const path = require('path')

const app = express()

// connect DB
//בקובץ DB כשחיברנו אותו למונגו ועשינו EXPORT כאן אנחנו מחברים אותו לסרבר
connectDB();

//Init MiddleWare
app.use(express.json({extended: false}))


//DEFINDE ROUTES - הגדרת הראוטים
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contacts'));

//serve static asses it production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'))

    //__DIRNAME תסתכל על התיקייה הנוכחית
    //ואז תסתכל על קליינט - בילד - אינדקס HTML
    app.get('*',(req,res)=>
    res.sendFile(path.resolve(__dirname,'client','build','index.html')))
}

const PORT =process.env.PORT || 5000

app.listen(PORT,()=>console.log(`server start on port ${PORT}`))
