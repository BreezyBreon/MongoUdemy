const assert = require("assert");
const User = require("../src/user");

describe("updating records", () =>{
    let joe;

    beforeEach((done) => {
        joe = new User({ name: "Joe", likes: 0})
        joe.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
        .then(() => User.find({}))
        .then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
        });
    }

    it("instance using set n save", (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    it("instance using update", (done) => {
       assertName(joe.updateOne({ name: "Alex"}), done); 
    });

    // class based updates
    it("A model class can update", (done) => {
        assertName(
            User.updateOne({ name: "Joe"}, {name: "Alex"}),
            done)
        });

    it("A model class can update one record", (done) => {
        assertName(
            User.findOneAndUpdate({name:"Joe"}, {name: "Alex"})
            ,done)
    });

    it("A model class can find a record with an ID and update", (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, {name: "Alex"})
            ,done);
    });

    // mongo db update operators
    it("A user can have their postCount incremented by 1", (done) => {
        User.updateMany({name: "Joe"}, {$inc: {likes: 1} })
            .then(() => User.findOne({name: "Joe"}))
            .then((user) => {    
                assert(user.likes === 1);
                    done();
        });
    });
});