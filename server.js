const cookieParser = require('cookie-parser')
const { notFound, errorHandler } = require('./middlewares/errorHandler')
const connectDb = require('./config/dbConnection')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const port = process.env.PORT || 5050

app.use('/users', require('./routes/userRoute'))
app.use('/products', require('./routes/productRoute'))
app.use('/auth', require('./routes/authRoute'))
app.use('/carts', require('./routes/cartRoute'))

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
    connectDb()
    console.log(`Listening to ${port}`);
})