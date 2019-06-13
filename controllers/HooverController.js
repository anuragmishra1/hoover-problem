'use strict';

const joi = require('joi');

const Services = require('../services');

const schema = joi.object().keys({
    roomSize: joi.array().items(
        joi.number().required()
    ).max(2).required(),
    coords: joi.array().items(
        joi.number().required()
    ).max(2).required(),
    patches: joi.array().items(
        joi.array().items(
            joi.number().required()
        ).max(2).required()
    ).required(),
    instructions: joi.string().required()
});

const calculate = (req, res) => {
    joi.validate(req.body, schema, async (err, value) => {
        if (err) {
            return res.status(422).send({
                status: 'error',
                message: 'Invalid request data'
            });
        } else {
            const data = req.body;

            const [colSize, rowSize] = [...data.roomSize];
            let currentPosition = Number(data.coords.join(''));
            let noOfPatchesCleaned = 0;

            const patches = [];
            for (let i = 0; i < data.patches.length; i++) {
                let coords = Number(data.patches[i].join(''));
                patches.push(coords);
            }

            const instructions = data.instructions.split('');

            for (let direction of instructions) {
                let { position, row, col } = await moveHoover(currentPosition.toString(), direction);
                currentPosition = position;
                if (row >= rowSize || col >= colSize) {
                    return res.status(400).send({
                        status: 'error',
                        message: 'Instructions are not correct.'
                    });
                }
                if (patches.includes(currentPosition)) {
                    noOfPatchesCleaned++;
                    let index = patches.findIndex(patch => patch === currentPosition);
                    patches.splice(index, 1);
                }
            }

            const output = {
                coords: currentPosition.toString().split(''),
                patches: noOfPatchesCleaned
            };

            saveDataInDB(data, output);

            return res.send(output);
        }
    });
};

const moveHoover = (currentPosition, direction) => {
    let [col, row] = currentPosition.split('');
    col = Number(col);
    row = Number(row);

    switch (direction) {
        case 'N':
            row += 1;
            break;
        case 'S':
            row -= 1;
            break;
        case 'E':
            col += 1;
            break;
        case 'W':
            col -= 1;
            break;
        default:
            break;
    };

    return {
        position: Number(col.toString() + row.toString()),
        col,
        row
    }
};

const saveDataInDB = async (input, output) => {
    const objToSave = {
        input: input,
        output: output
    };

    try {
        await Services.Hoover.create(objToSave);
    } catch (err) {
        throw err;
    }
};

const getRecords = async (req, res) => {
    let results = [];
    try {
        results = await Services.Hoover.find({}, { __v: 0 }, {});
    } catch (err) {
        throw err;
    }

    return res.send({
        data: results
    });
};

module.exports = {
    calculate,
    getRecords
};
