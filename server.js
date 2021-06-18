const express = require('express');
const connectDB = require('./config/db')

const app = express()

// connect DB
//בקובץ DB כשחיברנו אותו למונגו ועשינו EXPORT כאן אנחנו מחברים אותו לסרבר
connectDB();

//Init MiddleWare
app.use(express.json({extended: false}))



app.get('/',(req,res)=>
    res.json({msg:'welcome CS API'}))

//DEFINDE ROUTES - הגדרת הראוטים
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contacts'));


const PORT =process.env.PORT || 5000

app.listen(PORT,()=>console.log(`server start on port ${PORT}`))
