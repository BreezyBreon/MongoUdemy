const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);
// used above based on deprecation warning for findOneAndDelete


const UserSchema = new Schema ({
    name: String
});

const User = mongoose.model('user', UserSchema);
module.exports = User;


