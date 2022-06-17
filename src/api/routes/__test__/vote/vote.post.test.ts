import { sign } from 'jsonwebtoken';
import request from 'supertest';
import app from '../../../../app';
import { createUserGetCookie, createPost } from '../../../../test/utils';
import { PATHS } from '../../../constants';
import { email, password } from '../constants';


it("Has a route handler listening", async ( ) => {

    const response = await request( app )
        .post(`${PATHS.votes}/a`)
        .send({})

    expect( response.status ).not.toBe( 404 );
})

it('Returns an unauthorized error if user tries to vote  without being logged in.', async () => {
    const response = await request(app)
        .get(`${PATHS.votes}/`)
        .send({})
        expect(response.status).toBe(401)

})


it("Returns a bad request error if comment id is not included.", async () => {

    const cookie = await createUserGetCookie(email, password, password, 201);
    const post = await createPost({
        title: "Testing testing",
        type: "text"
    }, {
        expectCode: 201,
        cookie
    });

    const postId = post.id;

    expect( postId ).toBeDefined();

    const vote = await request(app)
        .get(PATHS.votes + '/')
        .set('Cookie', cookie)
        .send({})

    expect( vote.status ).toBe( 400 );
})


it("Returns a bad request error if comment id is invalid included.", async () => {

    const cookie = await createUserGetCookie(email, password, password, 201);
    const post = await createPost({
        title: "Testing testing",
        type: "text"
    }, {
        expectCode: 201,
        cookie
    });

    const postId = post.id;

    expect( postId ).toBeDefined();

    const vote = await request(app)
        .get(PATHS.votes + '/as')
        .set('Cookie', cookie)
        .send({})

    expect( vote.status ).toBe( 400 );
})


it("Increments the likes", async () => {

    const cookie = await createUserGetCookie(email, password, password, 201);
    const post = await createPost({
        title: "Testing testing",
        type: "text"
    }, {
        expectCode: 201,
        cookie
    });

    const postId = post.id;

    expect( postId ).toBeDefined();

    // todo check post.likes length
    // todo compare post.likes length;

    const voteResponse = await request(app)
        .get(`${PATHS.votes}/${postId}/up`)
        .set('Cookie', cookie)
        .send({})
    const votedPost = voteResponse.body.data;

    expect( voteResponse.status ).toBe( 200 );
    expect( Array.isArray( post?.likes?.length) ).toBe( true );
    expect( Array.isArray( votedPost?.likes?.length ) ).toBe( true );
    expect( votedPost.likes.length ).toBeGreaterThan( post.likes.length );
})

it("Increments the dislikes.", async () => {
    const cookie = await createUserGetCookie(email, password, password, 201);
    const post = await createPost({
        title: "Testing testing",
        type: "text"
    }, {
        expectCode: 201,
        cookie
    });

    const postId = post.id;

    expect( postId ).toBeDefined();

    const voteResponse = await request(app)
        .get(`${PATHS.votes}/${postId}/down`)
        .set('Cookie', cookie)
        .send({})
    const votedPost = voteResponse.body.data;

    expect( voteResponse.status ).toBe( 200 );
    expect( Array.isArray( post?.dislikes?.length) ).toBe( true );
    expect( Array.isArray( votedPost?.dislikes?.length ) ).toBe( true );
    expect( votedPost.dislikes.length ).toBeGreaterThan( post.dislikes.length );
})

it("Decrements the likes when liked twice.", async () => {
    const cookie = await createUserGetCookie(email, password, password, 201);
    const post = await createPost({
        title: "Testing testing",
        type: "text"
    }, {
        expectCode: 201,
        cookie
    });

    const postId = post.id;

    expect( postId ).toBeDefined();

    const voteResponse = await request(app)
        .get(`${PATHS.votes}/${postId}/up`)
        .set('Cookie', cookie)
        .send({})
    const votedPost = voteResponse.body.data;
    const voteResponse2 = await request(app)
    .get(`${PATHS.votes}/${postId}/up`)
    .set('Cookie', cookie)
    .send({});
    const votedPost2 = voteResponse2.body.data;

    expect( voteResponse.status ).toBe( 200 );
    expect( Array.isArray( post?.likes?.length) ).toBe( true );
    expect( Array.isArray( votedPost?.likes?.length ) ).toBe( true );
    expect( Array.isArray( votedPost2?.likes?.length ) ).toBe( true );

    expect( votedPost.likes.length ).toBeGreaterThan( post.likes.length );
    expect( post.likes.length ).toBe( votedPost2.likes.length );
})


it("Decrements the dislikes when disliked twice", async () => {
    const cookie = await createUserGetCookie(email, password, password, 201);
    const post = await createPost({
        title: "Testing testing",
        type: "text"
    }, {
        expectCode: 201,
        cookie
    });

    const postId = post.id;

    expect( postId ).toBeDefined();

    const voteResponse = await request(app)
        .get(`${PATHS.votes}/${postId}/up`)
        .set('Cookie', cookie)
        .send({})
    const votedPost = voteResponse.body.data;
    const voteResponse2 = await request(app)
    .get(`${PATHS.votes}/${postId}/up`)
    .set('Cookie', cookie)
    .send({});
    const votedPost2 = voteResponse2.body.data;

    expect( voteResponse.status ).toBe( 200 );
    expect( Array.isArray( post?.dislikes?.length) ).toBe( true );
    expect( Array.isArray( votedPost?.dislikes?.length ) ).toBe( true );
    expect( Array.isArray( votedPost2?.dislikes?.length ) ).toBe( true );

    expect( votedPost.dislikes.length ).toBeGreaterThan( post.dislikes.length );
    expect( post.dislikes.length ).toBe( votedPost2.dislikes.length );
})

