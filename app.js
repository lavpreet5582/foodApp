const express = require('express');
var cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./Routers/userRouter');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
// const authRouter = require('./Routers/authRouter');
const bookingRouter = require('./Routers/bookingRouter');
const app = express();

app.use(cors());
app.use(express.static('public/build'));
app.use(express.json());
const port = process.env.PORT||3000;
// console.log(port);
app.listen(port);
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/plans', planRouter);

app.use('/review', reviewRouter);

app.use('/booking', bookingRouter);






