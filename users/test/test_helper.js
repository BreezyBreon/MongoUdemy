const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


before((done) => {
    mongoose.connect("mongodb://localhost/users_test", { useNewUrlParser: true,  useUnifiedTopology: true });
    mongoose.connection
        .once("open", () => { done(); })
        .on("error", (error) =>{
            console.warn("Warning", error);
        });
});


// hook is a function that will be executed first before any other code
// when mongo brings in the collections, it lowercases everything (blogPosts = blogposts)
beforeEach((done) => {
    const {users, comments, blogposts } = mongoose.connection.collections;



   users.drop(() => {
       comments.drop(() => {
           blogposts.drop(() => {
            done();
           });
       });
    });
});
