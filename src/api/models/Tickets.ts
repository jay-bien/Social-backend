import mongoose from 'mongoose';
import { ObjectID } from "mongodb";


interface TicketAttrs{
    title: string,
    price: number,
    created_by: string,
}

interface TicketDoc extends mongoose.Document {
    title: string,
    price: number,
    created_by: string
}

interface TicketModel extends mongoose.Model< any >{
    build( attrs : TicketAttrs ) : TicketDoc;
}

const ticketSchema = new mongoose.Schema({
    title:{
        type: String,
        isRequired: true
    },
    price: {
        type: String,
        isRequired: true
    },
    created_by: {
        type: ObjectID,
        isRequired: true
    },
    owned_by:{
        type: Number,
        isRequired: false
    },
    event_id:{
        type: Number,
        isRequired: false
    },
    date_purchased: {
        type: Date,
    },
    resolved:{
        type: Number
    },
    deadline:{
        type: Date
    },
    recurring: {
        type: Boolean,
    },
    recur_interval:{
        type: String,
    },
    status_id: {
        type: Number,
    }

}, 
);

ticketSchema.statics.build = ( attrs: TicketAttrs ) => {

    return new Ticket( attrs );
};


const Ticket = mongoose.model< TicketDoc, TicketModel >( 'Ticket', ticketSchema );



export { Ticket }