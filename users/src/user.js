const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("./post");



mongoose.set('useFindAndModify', false);
// used above based on deprecation warning for findOneAndDelete


const UserSchema = new Schema ({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: "Name must be longer than 2 characters"
        },
        required: [true, "Name is required"]
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

// don't use a fat arrow function here to ensure 'this' function stays within these bounds
UserSchema.virtual("postCount").get(function() {
    return this.posts.length;
});


const User = mongoose.model('user', UserSchema);
module.exports = User;


