import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser  from 'cookie-parser';
import userRoutes from '../src/routes/user.routes.js';
import projectRoutes from '../src/routes/project.routes.js'
import aiRoutes from '../src/routes/ai.routes.js';



const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/ai', aiRoutes);

app.get('/', (req, res)=>{
    res.send('hello AI');
})

export default app;