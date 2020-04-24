const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
        const minQuery = Artist
        .find({})
        .sort({yearsActive: 1})
        // 1 means sort ascending; -1 sorts descending
        .limit(1)
        // limits to first result only; try to limit the amount that is loaded to NodeJS server; .then executes code to server
        .then(artists => artists[0].yearsActive);
        // only care about the age; not other elements in schema

    const maxQuery = Artist
        .find({})
        .sort({ yearsActive: -1})
        .limit(1)
        .then(artists => artists[0].yearsActive);

// wait for both to resolve
return Promise.all([minQuery, maxQuery])
    .then((result) => {
        return {min: result[0], max: result[1]};
    });
};
