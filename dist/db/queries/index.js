"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUniques = void 0;
async function checkUniques(params) {
    const { model, data, filter } = params;
    const uniques = {};
    const entity = await model.findOne(filter);
    if (!entity)
        return null;
    for (const key of Object.keys(data)) {
        if (data[key] !== entity[key])
            uniques[key] = data[key];
    }
    return uniques;
}
exports.checkUniques = checkUniques;
