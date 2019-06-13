'use strict';

const express = require('express');
const router = express.Router();

const { HooverController } = require('../controllers');

router.get('/', (req, res) => {
    res.send('API server is running');
});

router.post('/get_output', HooverController.calculate);
router.get('/get_records', HooverController.getRecords);

module.exports = router;
