const express = require('express');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
connectDB();
const cookieParser = require('cookie-parser');
const app = express();
const indexRouter = require('./routes/index.routes');

app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/',indexRouter);
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
