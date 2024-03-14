import express from 'express';
import cors from 'cors';
import UserRoutes from './routes/user'
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());




/* ROUTES */
UserRoutes(app)
export default app;