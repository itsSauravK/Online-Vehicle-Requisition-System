const router = require('express').Router();
const express = require('express');
const {
  registerUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  updateUser,
  getUserById,
  getAllUsers
} = require('../controllers/user.controllers');

const { auth, admin } = require('../middleware/auth.middleware');

router.route('/').post(registerUser).get(auth, admin, getAllUsers);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/verify/:verificationToken', verifyEmail);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);
router.route('/:id').get(getUserById).put(auth, admin, updateUser);
module.exports = router;
