import request from 'supertest';
import app from '../../../../app';
import { createUserGetCookie, signInGetCookie, createPost } from '../../../../test/utils';
import { PATHS } from '../../../constants';
import { email, email2, password } from '../constants';

const testPost = {
    title: "Test title",
    link: "https://google.com",
    content: "Optional content goes here",
    author: "",
    categories: ["Business"],
    tags: [""],
    type: "text",
    created_at: Date.now(),
}

const testComment = {
    content: "This is a test comment "
}


it("Has a route handler listening", async( ) => {
    const response = await request( app )
        .post(`${PATHS.comments}/a`)
        .send({})

    expect( response.status ).not.toBe( 404 );
})

it("Returns an unauthorized error if user is not logged in.", async ( )=> {
    const response = await request( app )
        .post(`${PATHS.comments}/a`)
        .send({ })

    expect( response.status ).toBe( 401 )
})


it("Returns a  bad request error if post does not exist.", async ( )=> {
    const cookie = createUserGetCookie( email, password, password );

    const response = await request( app )
        .post(`${PATHS.comments}/a`)
        .send({})

        expect( response.status ).toBe( 400 )
})

it("Returns a bad request error if there is no text in the post.", async ( )=> {
    const cookie = await createUserGetCookie( email, password, password );
    const post = await createPost( testPost, { cookie: cookie, expectCode: 201 } );
    const id = post.id;

    const response = await request( app )
        .post(`${PATHS.comments}/${id}`)
        .set('Cookie', cookie)
        .send({})

    expect( response.status ).toBe( 400 )
})

it("Returns the added comment.", async ( )=> {
    const cookie = await createUserGetCookie( email, password, password );
    const post = await createPost( testPost, { cookie: cookie, expectCode: 201 } );
    const id = post.id;

    

    const response = await request( app )
        .post(`${PATHS.comments}/${id}`)
        .set('Cookie', cookie)
        .send( testComment )

    expect( response.status ).toBe( 201 );
    const comment = response.body.data;
    expect( comment ).toBeDefined();
    expect( comment.content ).toBe( testComment.content );
})
