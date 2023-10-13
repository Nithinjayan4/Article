import express from 'express'
import { PORT, mongoURL } from './config.js';
import mongoose from 'mongoose';
import articleRoute from './routes/articleRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import bodyParser from 'body-parser';




const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.use('/article', articleRoute);
app.use ('/categories',categoryRoute)






mongoose
  .connect(mongoURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });