import { PATHS } from '../../constants';
import  { email, password } from './constants';
import { createUserGetCookie } from '../../../test/utils';
import request  from 'supertest';
import app from '../../../app';
import mongoose from 'mongoose';



it('Created ticket is retrievable and matches submitted ticket.', async ( ) => {

    const cookie = await createUserGetCookie( email, password, 201 );
    


    const ticket = {
        title: "valid title",
        price: 15
    }
    const response = await request( app )
        .post( PATHS.tickets )
        .set('Cookie', cookie )
        .send( ticket );

        let ticketId = response.body._id;
        expect( response.status ).toBe( 201 );

        const retrievalResponse = await request( app )
            .get( `${PATHS.tickets}/${ticketId}` )
            .set('Cookie', cookie )
            .send( )
        let foundTicket = retrievalResponse.body.ticket;

        expect( Number( ticket.price ) ).toEqual( Number( foundTicket.price ) );
        expect( ticket.title).toEqual( foundTicket.title );

        return

    return;

})


it('Returns a 404 if the ticket is not found.', async ( ) => {

    const cookie = await createUserGetCookie( email, password, 201 );
    



    const ticket = {
        title: "valid title",
        price: 15
    }
    const ticketId = new mongoose.Types.ObjectId().toHexString();

    const response = await request( app )
        .get( `${PATHS.tickets}/${ticketId}` )
        .set('Cookie', cookie )
        .send( )

        expect( response.status ).toBe( 404 );

        return

    return;

})

