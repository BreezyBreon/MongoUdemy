const assert = require("assert");
const User = require("../src/user");

// validateSync is a synchronus validation test, can store in a variable right away
// validate is an asynchronus validation (pull something from the db for validation)
describe("Validating records", () => {
    it("requires a user name",() => {
        const user = new User({name: undefined});
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === "Name is required");
    });

    it("requires a user name longer than 2 characters",() => {
        const user = new User({name: "Al"});
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === "Name must be longer than 2 characters");
    });

    // .then is called when saving a valid record
    // .catch is called when trying to save an invalid record
    it("dissallows invalid records from being saved",(done) => {
        const user = new User({name: "Al"});
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;
            assert(message === "Name must be longer than 2 characters");
            done();
        });        
    });

    
});