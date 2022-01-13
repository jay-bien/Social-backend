import mongoose, { CallbackWithoutResult, ConnectOptions } from 'mongoose';
import { DatabaseConnectionError } from '../errors';
const dbUrl = process.env.MONGO_URL || "mongodb://localhost/fluance";


const start = async () => {

    try {
        const options =
        {
            useFindAndModify: true,
            useCreateIndex: true,

            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        let db = await mongoose.connect(dbUrl, options as ConnectOptions);


    } catch (e) {
        console.log({ e });
        console.log("Unable to connect to database.");
        throw new DatabaseConnectionError("Cannot connect to databse.")
    }

}

export { start }