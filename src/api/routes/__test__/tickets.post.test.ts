
import { PATHS } from '../../constants';
import  { email, password } from './constants';
import { createUserGetCookie } from '../../../test/utils';
import request  from 'supertest';
import app from '../../../app';
import { Ticket } from '../../models';


it('has a post route handler listening at api path/tickets for ', async ( ) => {

    const response = await request( app )
        .post( PATHS.tickets )
        .send("")
        
    expect( response.status ).not.toEqual( 404 );
    return;
})
it('cannot be accessed if user is not signed in', async ( ) => {

    const response = await request( app )
    .post( PATHS.tickets )
    .send({})
    
    expect( response.status ).toBe( 401 )
    return

})
it('returns an error if price cannot be converted to a floating 0 or greater', async ( ) => {

    const cookie = await createUserGetCookie( email, password, 201 );

    // no price
    const response = await request( app )
        .post( PATHS.tickets )
        .set('Cookie', cookie )
        .send({
            title: "Title Valid",
            price: ''
        });
        
        // price is string not able to be converted to float
    const response2 = await request( app )
                    .post( PATHS.tickets )
                    .set('Cookie', cookie )
                    .send({
                        title:"Valid title",
                        price: "string"
                    });
        
    expect( response.status ).toBe( 400 );
    expect( response2.status ).toBe( 400 );
    return;
})


it('returns an error if no title or is invalid', async ( ) => {
    const cookie = await createUserGetCookie( email, password, 201 );

    
    const response = await request( app )
        .post( PATHS.tickets )
        .set('Cookie', cookie )
        .send({
            title: "",
            price: 18
        });
        
    expect( response.status ).toBe( 400 )
    return;
});


it('Creates a ticket succesfully.', async ( ) => {

    const cookie = await createUserGetCookie( email, password, 201 );

    let allTickets = await Ticket.find( { } )
    expect( allTickets.length ).toBe( 0 );


    const ticket = {
        title: "creates a ticket success",
        price: 15
    }
    const response = await request( app )
        .post( PATHS.tickets )
        .set('Cookie', cookie )
        .send( ticket );

     

    allTickets = await Ticket.find({})
    expect( allTickets.length ).toBeGreaterThan( 0 );

    return;

})


