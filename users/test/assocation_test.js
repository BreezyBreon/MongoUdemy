const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'JS is great', content: 'Sure is!'});
        comment = new Comment({ content: 'solid post yo'});

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.author = joe;

        // joe.save();
        // blogPost.save();
        // comment.save();

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    // it.only will npm run test only this test, otherwise all it tests
    it.only('saves a relation between a user and a blogpost', (done) => {
        User.findOne({name: 'Joe'})
            .then((user) =>{
                console.log(user);
                done();
            });
    });
});