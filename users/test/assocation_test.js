const mongoose = require('mongoose');
const assert = require('assert');
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
    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({name: 'Joe'})
            .populate('blogPosts')
            .then((user) =>{
                // console.log(user.blogPosts[0]);
                assert(user.blogPosts[0].title === 'JS is great');
                done();
            });
    });

    it('saves a full relation graph', (done) => {
        User.findOne({name: 'Joe'})
        .populate({
            path: 'blogPosts',
            populate: {
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'author',
                    model: 'user'
                }
            }
        })
        .then((user) => {
            assert(user.name === 'Joe');
            assert(user.blogPosts[0].title === 'JS is great');
            assert(user.blogPosts[0].comments[0].content === 'solid post yo');
            assert(user.blogPosts[0].comments[0].author.name === 'Joe');
            
            // console.log(user.blogPosts[0].comments[0]);
            done();
        });
    });

});