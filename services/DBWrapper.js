'use strict';

const models = require('../models');

module.exports = function (modelName) {
    const module = {};

    module.find = async (criteria, projection, options) => {
        options.lean = true;
        return await models[modelName].find(criteria, projection, options);
    };

    module.create = async (objToSave) => {
        const data = await new models[modelName](objToSave).save();
        return data.toObject();
    };

    return module;
};
