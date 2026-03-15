import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDatabase from './config/db';
import routes from './routes/index';

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Routes
app.use('/', routes); // Use the indexed routes

connectDatabase(); // Wait for the database connection
app.listen(port, () => { console.log(`product-service is running on port ${port}`) });
