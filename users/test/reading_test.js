const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () =>{
    let joe;


beforeEach((done) => {
    joe = new User({ name: "Joe"});
    joe.save()
        .then(() => done());
});

// User.find returns an array, User.findOne returns a single record
    it("finds all users with a name of joe", (done) => {
        User.find({name: "Joe"})
            .then((users) => {
                assert(users[0]._id.toString() === joe._id.toString())
                done();
            });
    });
// use done function since this is a asynchronus test
    it('find a user with a particular id', (done) => {
        User.findOne({_id: joe._id})
        // use single 'user' instead of 'users' since the findOne command only returns one record, not an array
            .then((user) => {
                assert(user.name === 'Joe');
                done();
            });
    });
});