import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { body } from 'express-validator';
import * as authMiddleWare from '../middleware/auth.middleware.js';


const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 3 characters long'),
    userController.createUserController
);

router.post('/login',
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
    userController.loginController
);

router.get('/profile', authMiddleWare.authUser, userController.profileController);

router.get('/logout', authMiddleWare.authUser, userController.logoutController)

export default router;