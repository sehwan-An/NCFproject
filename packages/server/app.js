import express from 'express';
import 'dotenv/config'

const app = express()
import connect from './schemas/index.js'
import indexRouter from './routes/index.js'
import userRouter from'./routes/user.route.js'


connect();

app.use(express.json());
app.use('/', indexRouter)
app.use('/users', userRouter)

export default app

