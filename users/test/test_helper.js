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

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        // ready to run the next test
        done();
    });
});
