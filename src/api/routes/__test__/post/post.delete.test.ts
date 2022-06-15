

import request from 'supertest';
import app from '../../../../app';
import { createUserGetCookie, signInGetCookie, createPost } from '../../../../test/utils';
import { PATHS } from '../../../constants';
import { email, password } from '../constants';

import { testPost } from './data';



it("Has a route handler listening.", async () => {
    const response = await request(app)
        .delete(PATHS.posts +'/s')
        .send({})
        expect(response.status).not.toBe(404);
});

it("Returns an unauthorized error if user is not logged in", async ( ) => {

})


it("Returns a bad request error if document ID does not exist.", async ( ) =>{
    
})

it("Returns an unautherized error if logged in user does not own document", async () => {

})

it("Returns ", () => {

})