import express from 'express';
import auth  from '../middleware/auth';
import userController from '../controllers/user.controller.js';
const router = new express.Router();

router.get('/user', auth, userController.findById);
router.post('/user', userController.create);
router.put('/user', auth, userController.update);
router.put('/user/notifications', auth, userController.updateNotifications);
router.get('/user/notifications', auth, userController.findNotifications);
router.delete('/user', auth, userController.remove);