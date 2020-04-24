const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
    const minQuery = Artist
        .find({})
        .sort({age: 1})
        // 1 means sort ascending; -1 sorts descending
        .limit(1)
        // limits to first result only; try to limit the amount that is loaded to NodeJS server; .then executes code to server
        .then(artists => artists[0].age);
        // only care about the age; not other elements in schema

    const maxQuery = Artist
        .find({})
        .sort({ age: -1})
        .limit(1)
        .then(artists => artists[0].age);

    // wait for both to resolve
    return Promise.all([minQuery, maxQuery])
        .then((result) => {
            return {min: result[0], max: result[1]};
        });
};
