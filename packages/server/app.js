import express from 'express';
const app = express()
import 'dotenv/config'
import cors from 'cors';
import logger from 'morgan';
import cookieParser from "cookie-parser"


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/api', productRouter)
app.use('/uploads', express.static('uploads'));

import connect from './schemas/index.js'
import indexRouter from './routes/index.js'
import userRouter from'./routes/user.route.js'
import productRouter from './routes/product.route.js'

connect();

export default app

