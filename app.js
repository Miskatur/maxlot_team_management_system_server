const express = require("express");
const cors = require("cors");
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const teamRoute = require('./routes/teamRoute')
const messageRoute = require('./routes/messageRoute')
const cookieParser = require('cookie-parser')
const helmet = require('helmet');
const http = require('http');
const socketIo = require('socket.io');
const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};

// middleware

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const server = http.createServer(app);
const io = socketIo(server);


// Api route 
app.use('/api/v1/products', productRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/team', teamRoute)
app.use('/api/v1/message', messageRoute)


// checking if any error or api issue 
app.get('/', (req, res) => {
    res.status(200).json({ status: 200, message: "Welcome to the app!" });
});

io.on('connection', (socket) => {
    socket.emit('connected', 'Socket connected')
    console.log('a user connected', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});

module.exports = app;