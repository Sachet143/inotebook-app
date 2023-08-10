const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a user using: POST "/api/auth". Doesn't required Auth
router.post('/createuser', (req, res) => {

    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);
});

module.exports = router;