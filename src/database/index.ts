import mongoose from "mongoose";
import consola from "consola";
import { ConnectOptions } from "mongoose";

const connect = () => {
    try {
        const URL = process.env.MONGODB_URI ?? "";
        consola.start("Connecting to database");

        mongoose.connect(URL);

        mongoose.connection.on('open', () => {
            consola.success("Database connection established");
        })
    } catch (error) {
        consola.error(error);
    }
}

export default connect;