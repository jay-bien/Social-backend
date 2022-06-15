import { sign } from 'jsonwebtoken';
import request from 'supertest';
import app from '../../../../app';
import { createUserGetCookie, createPost } from '../../../../test/utils';
import { PATHS } from '../../../constants';
import { email, password } from '../constants';



it('Returns an unauthorized error if user tries to vote  without being logged in.', async () => {
    const response = await request(app)
        .get(PATHS.votes)
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

    const vote = await request(app)
        .get(PATHS.votes + '/')
        .set('Cookie', cookie)
        .send({})

        // console.log("Vote:", {vote})

})


it("Returns a 200 and increments the like counter and like collection if request is good.", async () => {

})

it("Returns a 200 and decrements the like counter if user likes twice", async () => {

})


it("Returns a 200 and incrments the dislike counter and dislike collection.", async () => {

})

it("Returns a 200 and decrements the dislike collection and count if request is valid", async () => {

})