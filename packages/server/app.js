import express from 'express';
const app = express();


import indexRouter from './routes/index.route.js'


app.use('/', indexRouter)
app.use(express.json());
app.use(express.urlencoded({extended: true}));
  
export default app;