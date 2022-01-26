import app from '../app';
import request from 'supertest';
import { PATHS } from '../api/constants'

export const createUserGetCookie = async (email: string, password: string, password2: string, expectCode: number): Promise<string[]> => {
    const response = await request(app)
        .post(PATHS.signup)
        .send({ email, password, password2 })

    expect(response.status).toBe(expectCode);
    const cookie = response.get('Set-Cookie');

    return cookie;
}


export const signInGetCookie = async (email: string, password: string, expectCode: number): Promise<string[]> => {
    ;

    const response = await request(app)
        .post(PATHS.signin)
        .send(
            {
                email,
                password
            }
        )

    expect(response.statusCode).toBe(expectCode);
    const cookie = response.get('Set-Cookie');
    return cookie;
}


interface User {
    id: string
    email: string,
    username: string
}


export const getCurrentUser = async (expectCode: number, cookie?: string[]): Promise<User> => {

    const cook = (cookie && cookie.length >= 0) ? cookie : [];
    const response = await request(app)
        .get(PATHS.currentUser)
        .set('Cookie', cook)
        .send({})
        .expect(expectCode);

    return response.body;
}

export const signOut = async (expectCode: number): Promise<string[]> => {

    const response = await request(app)
        .post(PATHS.signout)
        .send({})
        .expect(expectCode)
    return response.get('Set-Cookie');
}



interface CreatePostOptions {
    expectCode: number,
    cookie: string[]
}

interface PostInformation {
    title: string,
    type: string,
    content?: string,
    link?: string,
}

export const createPost = async (post: PostInformation, options: CreatePostOptions): Promise<{ id: string, title: string }> => {

    const { cookie, expectCode } = options;

    const response = await request(app)
        .post(PATHS.posts)
        .set("Cookie", cookie)
        .send(
            post
        );

    return response.body.data
    return null

}