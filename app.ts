import express from "express";
import cors from "cors";
// import productRoute from './routes/productRoute';
import userRoute from './routes/userRoute';
import teamRoute from './routes/teamRoute';
import { RequestHandler } from 'express';

// import messageRoute from './routes/messageRoute';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import http from 'http';
// import socketIo from 'socket.io';
const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};

// middleware

// middleware
const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const server = http.createServer(app);
// const io = new socketIo.Server(server, {
//     cors: {
//         origin: [process.env.BASE_URL],
//         methods: ['GET', 'POST']
//     }
// });


// Api route 
// app.use('/api/v1/products', productRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/team', teamRoute)
// app.use('/api/v1/message', messageRoute)


// checking if any error or api issue 
const welcomeHandler: RequestHandler = (req, res) => {
    res.status(200).json({ status: 200, message: "Welcome to the app!" });
};

app.get('/', welcomeHandler);

// io.on('connection', (socket) => {
//     socket.emit('connected', 'Socket connected')
//     console.log('a user connected', socket.id);

//     socket.on('disconnect', () => {
//         console.log('Client disconnected:', socket.id);
//     });

//     socket.on('error', (error) => {
//         console.error('Socket error:', error);
//     });
// });

export default app;

