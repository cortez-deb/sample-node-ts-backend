import app from "./index";
import 'dotenv/config';
import connect from './database';


(() => {
    connect();
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`User test server running on port ${process.env.SERVER_PORT}`)
    })
})();