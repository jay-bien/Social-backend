import { sign } from 'jsonwebtoken';
import request from 'supertest';
import app from '../../../app';
import { createUserGetCookie, signInGetCookie, createPost } from '../../../test/utils';
import { PATHS } from '../../constants';
import { email, password } from './constants';


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


it("Has a route handler listening.", async () => {

    const response = await request(app)
        .post(PATHS.posts)
        .send({})
    expect(response.status).not.toBe(404);
});



it('Returns an unauthorized error if user is not logged in.', async () => {
    const response = await request(app)
        .post(PATHS.posts)
        .send({

        })
    expect(response.status).toBe(401)

})



it("Returns a bad request error if post is missing title", async () => {

    const cookie = await createUserGetCookie(email, password, password, 201);
    const noTitle = { ...testPost };
    delete noTitle.title;

    const response = await request(app)
        .post(PATHS.posts)
        .set('Cookie', cookie)
        .send({

        })
    expect(response.status).toBe(400)
})
it("Returns a bad request error if post is missing type", async () => {

    const cookie = await createUserGetCookie(email, password, password, 201);
    const noType = { ...testPost };
    delete noType.type;

    const response = await request(app)
        .post(PATHS.posts)
        .set('Cookie', cookie)
        .send( noType )
    expect(response.status).toBe(400)
})

it("Returns a bad request error if post has bad type", async () => {

    const cookie = await createUserGetCookie(email, password, password, 201);
    const badType = { ...testPost };
    badType.type = "nonsense"

    const response = await request(app)
        .post(PATHS.posts)
        .set('Cookie', cookie)
        .send( badType )
    expect(response.status).toBe(400)
})




it("Returns a 200 and created text post on success.", async () => {
    const cookie = await createUserGetCookie(email, password, password, 201);
    const response = await request(app)
        .post(PATHS.posts)
        .set('Cookie', cookie)
        .send( testPost )

        expect(response.status).toBe(201);

        const createdPost = response.body.data;
        expect( createdPost.title ).toBe( testPost.title );
        expect( createdPost.content ).toBe( testPost.content );
       
})
it("Returns a 200 and created link post on success.", async () => {
    const cookie = await createUserGetCookie(email, password, password, 201);
    
    testPost.type = "link";
    const response = await request(app)
        .post(PATHS.posts)
        .set('Cookie', cookie)
        .send( testPost )

        expect(response.status).toBe(201);

        const createdPost = response.body.data;
        expect( createdPost.title ).toBe( testPost.title );
        expect( createdPost.link ).toBeDefined()
        expect( createdPost.link.length ).toBeGreaterThan( 1 );
       
})

