const assert = require('assert');
const User = require('../src/user');
// capital User represents entire User model, not a specific user

describe('Creating records', () => {
    it('saves a user', (done) => {
        const joe = new User({name: 'Joe'});

        joe.save()
        .then(() => {
            // Has joe been saved succesfully?
            assert(!joe.isNew);
            done();
        });
    });
});

