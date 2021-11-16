import { PATHS } from '../../constants';
import  { email, password } from './constants';
import { createUserGetCookie } from '../../../test/utils';
import request  from 'supertest';
import app from '../../../app';
import mongoose from 'mongoose';


it('has a put router handler listening at api path/tickets ', async ( ) => {

    const response = await request( app )
        .put( `${PATHS.tickets}/kl` )
        .send("")
        
    expect( response.status ).not.toEqual( 404 );
    return;
})

it( 'Returns a 401 if user is not signed in', async ( ) =>{

    const response = await request( app )
                .put( PATHS.tickets + '/l' )
                .send()
        expect( response.status ).toBe( 401 );
    
})

it( 'Returns a 401 if user is does not own ticket', async ( ) =>{

    const cookie = await createUserGetCookie( "email1@gmail.com", password, 201 );
    const cookie2 = await createUserGetCookie( "email2@gmail.com", password, 201 );

    const ticket = {
        title: "creates a ticket success",
        price: 15
    }

    const response = await request( app )
        .post( PATHS.tickets )
        .set('Cookie', cookie )
        .send( ticket );

    expect( response.status ).toBe( 201 );

    console.warn( response.body );

    const ticketId = response.body._id;

    const putResponse = await request( app )
        .put( PATHS.tickets + '/' + ticketId)
        .set( "Cookie", cookie2 )
        .send( {
            title: "title12",
            price: 17
        } );

        console.error( putResponse.body )

    expect( putResponse.status ).toBe( 401 )
})

it( 'Returns a 400 if no title and price, or price is invalid.', async( ) =>{

    const cookie = await createUserGetCookie( "email1@gmail.com", password, 201 );

    const ticket = {
        title: "creates a ticket success",
        price: 15
    }

    const response = await request( app )
        .post( PATHS.tickets )
        .set('Cookie', cookie )
        .send( ticket );

    expect( response.status ).toBe( 201 );


    const ticketId = response.body._id;

    const putResponseNoTitle = await request( app )
        .put( PATHS.tickets + '/' + ticketId)
        .set( "Cookie", cookie )
        .send( {
            price: 17
        } );

    expect( putResponseNoTitle.status ).toBe( 400 );

    const putResponseNoPrice = await request( app )
        .put( PATHS.tickets + '/' + ticketId)
        .set( "Cookie", cookie )
        .send( {
            title:"Success"
        } );

    expect( putResponseNoPrice.status ).toBe( 400 )

    const putResponseBadPrice = await request( app )
        .put( PATHS.tickets + '/' + ticketId)
        .set( "Cookie", cookie )
        .send( {
            title:"Success"
        } );

    expect( putResponseBadPrice.status ).toBe( 400 )
    

})



it( 'Returns a 404 if ticket is not found', async ( ) =>{

    const response = await request( app )
    .put( PATHS.tickets + mongoose.Types.ObjectId().toHexString() )
    .send( {
        title: "title",
        price: 12
    } )

    expect( response.status ).toBe( 404 )

})



it( 'Successfully updates ticket.', async( ) =>{

    const cookie = await createUserGetCookie( "email1@gmail.com", password, 201 );

    const ticket = {
        title: "creates a ticket success",
        price: 15
    }

    const response = await request( app )
        .post( PATHS.tickets )
        .set('Cookie', cookie )
        .send( ticket );

    expect( response.status ).toBe( 201 );


    const ticketId = response.body._id;

    const newPrice = 17;
    const newTitle = "new title";

    const putResponse= await request( app )
        .put( PATHS.tickets + '/' + ticketId)
        .set( "Cookie", cookie )
        .send( {
            title: newTitle,
            price: newPrice
        } );


    console.warn( putResponse.body );
    expect( putResponse.status ).toBe( 200 );
    expect( putResponse.body.ticket.title ).toBe( newTitle );
    expect( putResponse.body.ticket.price).toBe( String( newPrice ) );

   
    

})
