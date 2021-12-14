const express = require('express');

const cookieParser = require('cookie-parser');

const userRouter = require('./Routers/userRouter');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
// const authRouter = require('./Routers/authRouter');
const bookingRouter = require('../learn/Routers/bookingRouter');
const app = express();
app.use(express.static('/public/build'));
app.use(express.json());
const port = process.env.PORT||5000;
app.listen(port);
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/plan', planRouter);

app.use('/review', reviewRouter);

app.use('/booking', bookingRouter);






