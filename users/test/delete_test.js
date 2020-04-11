const assert = require('assert');
const User = require('../src/user')
// npm run test

// remove, findOneAndRemove, findByIdAndRemove
// Model Class = User
// Model Class = joe or user
describe('Deleting a user', () => {
    let joe;
    
    beforeEach((done) => {
        joe = new User({name: "Joe"});
        joe.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        // joe instance
        joe.remove()
            .then(() =>
                User.findOne({name: "Joe"}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method remove', (done) => {
        // User class
        // remove is being deprecated, use deleteOne or deleteMany
        User.deleteMany({ name: 'Joe'})
        .then(() =>
                User.findOne({name: "Joe"}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class findOneandRemove', (done) => {
        User.findOneAndRemove({name: "Joe" })
            .then(() =>
                User.findOne({name: "Joe"}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(joe._id)
        .then(() =>
            User.findOne({name: "Joe"}))
        .then((user) => {
            assert(user === null);
            done();
        });
    });
});




