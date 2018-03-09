const express = require('express');
const router = express.Router();
const lugg = require('./lug')


router.use('/lug', lugg)

module.exports = router;
