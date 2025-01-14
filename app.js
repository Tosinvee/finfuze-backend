require('dotenv').configDotenv()
const express = require('express');
//const connectDB = require('./src/config/connect')
const pgDB = require('./src/config/connect')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const notFoundMiddleware = require('./src/middleware/notFound');
const error_handler_middleware = require('./src/middleware/errorHandler');
const corsOptions = require('./src/config/cors');
const authRouter  = require("./src/routes/authRoute")
//Middleware
app.use(cors(corsOptions))
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Router
app.all('/', (req, res)=> {
    try{
        console.log('Hello world!');
        res.status(200).json({data: 'Success!'})
    }catch(error){
        throw error;
    }
})
app.use("/api/v1/auth",authRouter)
//Error handling middlware
app.use(notFoundMiddleware)
app.use(error_handler_middleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        //await connectDB(process.env.MONGO_URI)
        await console.log(pgDB.options)
        app.listen(port, () => {
            console.log(`listening on port: ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()