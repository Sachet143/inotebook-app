const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let obj = {
        a: 'sachet',
    }
    res.json(obj);
})

module.exports = router;