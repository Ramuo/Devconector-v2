import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';

import {notFound, errorHandler} from './middleware/errorMiddleware.js'

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import postRoutes from './routes/postRoutes.js';

const port = process.env.PORT || 5000;

//CONNECT TO MongoDB
connectDB();

//INITIALIZE EXPRESS
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Cookie parsr middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json('API is running')
});



//ROUTES
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);



//MIDDLEWARE ERROR HANDLERS
app.use(notFound);
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`));