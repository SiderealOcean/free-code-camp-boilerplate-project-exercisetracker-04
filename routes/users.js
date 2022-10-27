const express = require('express');
const router = express.Router();

const { newUser, newExercise, log, allUser } = require('../controllers/users');

// API => /api/users/

router.post('/users/', newUser);

router.post('/users/:_id/exercises', newExercise);

router.get('/users/:_id/logs', log);

router.get('/users', allUser);


module.exports = router;