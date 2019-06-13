'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hoover = new Schema({
    input: {
        roomSize: [{ type: Number, required: true }],
        coords: [{ type: Number, required: true }],
        patches: [[{ type: Number, required: true }]],
        instructions: { type: String, trim: true, required: true }
    },
    output: {
        coords: [{ type: Number, required: true }],
        patches: { type: Number, required: true }
    }
});

module.exports = mongoose.model('hoover', hoover);
