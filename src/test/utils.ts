import app  from '../app';
import request from 'supertest';
import { PATHS } from '../api/constants'

export const createUserGetCookie = async ( email: string, password: string, password2: string, expectCode: number ): Promise< string[] > => {
    const response = await request( app )
        .post( PATHS.signup )
        .send( { email, password, password2 } )
        
        console.log({ password }, { email });
        console.log( response.text );
        expect( response.status ).toBe( expectCode );

        const cookie = response.get('Set-Cookie');
        
        return cookie;
}


export const signInGetCookie = async ( email: string, password: string, expectCode: number ) : Promise< string[] > => {;

    console.log({ email, password });
    const response = await request( app )
    .post( PATHS.signin )
    .send(
        {
            email, 
            password
        }
    )
    
    console.log( response.text );
    expect( response.statusCode ).toBe( 201 );

    const cookie = response.get('Set-Cookie');
    return cookie;
}


interface User {
    id: string
    email: string
}
interface UserRes {
    user : User | null
}

export const getCurrentUser = async ( expectCode: number, cookie? : string[] ) : Promise< UserRes > => {

    const cook = ( cookie && cookie.length >= 0 ) ? cookie : [];
    const response = await request( app )
        .get( PATHS.currentUser )
        .set('Cookie', cook )
        .send({})
        .expect( expectCode );

        return response.body;
}

export const signOut = async ( expectCode: number ): Promise< string[] > => {

    const response = await request( app )
        .post( PATHS.signout )
        .send({ })
        .expect( expectCode )
        return response.get( 'Set-Cookie' );
}