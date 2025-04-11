import express from 'express';
const app = express()
import 'dotenv/config'
import cors from 'cors';
// import cookieParser from "cookie-parser"

import connect from './schemas/index.js'
import indexRouter from './routes/index.js'
import userRouter from'./routes/user.route.js'
import postRouter from './routes/product.route.js'

connect();
// app.use(logger('dev'))
// app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/api', postRouter)

export default app

