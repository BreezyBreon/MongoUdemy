const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {

    it("can create a subdocument", (done) => {
        const joe = new User ({ 
            name: "Joe", 
            posts: [{title:"Post Title here"}]
        });

        joe.save()
            .then(() => User.findOne({name: "Joe"}))
            .then((user) => {
                assert(user.posts[0].title === "Post Title here");
                done();
            });
    });

    it("can add subdocs to an existing record", (done) => {
        const joe = new User({
            name: "Joe",
            posts: []
        });
        joe.save()
            .then(() => User.findOne({name: "Joe"}))
            .then((user) => {
                user.posts.push({ title: "New post here"});
                return user.save();
            })
            .then(() => User.findOne({name: "Joe"}))
            .then((user) => {
                assert(user.posts[0].title === "New post here");
                done();
            });
    });

    it("can remove existing subdocs from a record", (done) => {
        const joe = new User({
            name: "Joe",
            posts: [{title: "new post to delete"}]
        });
        joe.save()
            .then(() => User.findOne({name: "Joe"}))
            .then((user) => {
                const postToRemove = user.posts[0];
                postToRemove.remove();
                return user.save();
            })
            .then(() => User.findOne({name: "Joe"}))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });
    });
});