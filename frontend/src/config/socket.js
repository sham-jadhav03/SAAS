import { setDragLock } from 'framer-motion';
import socket from 'socket.io-client';

let socketInstance = null;

export const initializeSocket = (projectId) => {
  
    socketInstance = socket(import.meta.env.VITE_API_URL, {
        auth: {
            token: localStorage.getItem('token')
        },
        quary: {
            projectId
        }
    });

    return socketInstance;
}

export const receiveMessage = (evenName, cb) => {
    socketInstance.on(evenName, cb);
}

export const sendMessage = (evenName, cb) =>{
    socketInstance.on(evenName, cb)
}