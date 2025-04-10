import express from 'express';
const app = express();
import cors from 'cors';


import indexRouter from './routes/index.route.js'


app.use('/', indexRouter)
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
  
export default app;