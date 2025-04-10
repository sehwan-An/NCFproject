import express from 'express';
import 'dotenv/config'
import cors from 'cors';

const app = express()
import connect from './schemas/index.js'
import indexRouter from './routes/index.js'
import userRouter from'./routes/user.route.js'


connect();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use('/', indexRouter)
app.use('/users', userRouter)

export default app

