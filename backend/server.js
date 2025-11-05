import 'dotenv/config';
import app from './app.js';
import http from 'http';
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from './models/project.model.js'
import connect from './db/db.js'


connect();



const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        const projectId = socket.handshake.query.projectId;

        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return next(new Error('Invalid projectId'));
        }

        socket.project = await projectModel.findById(projectId);
          
        if(!token) {
            return next(new Error('Authentication error'))
        }
        const decoded = jwt.verify(token, process.env.Jwt_SECRET)

        if(!decoded) {
            return next(new Error('Authentication error'))
        }

        socket.user = decoded;

        next();
    }catch(error){
        next(error)
    }
})

socket.on('disconnect', ()=> {
    console.log('user disconnected');
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})