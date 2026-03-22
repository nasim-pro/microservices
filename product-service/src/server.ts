// import dotenv from 'dotenv';
// dotenv.config();
// import express from 'express';
// import connectDatabase from './config/db';
// import routes from './routes/index';
// import { createConsumer } from './kafka/consumer';

// const app = express();
// const port = parseInt(process.env.PORT || '3000', 10);

// app.use(express.json());

// // Routes
// app.use('/', routes); // Use the indexed routes
// const consumer = createConsumer();
// await consumer.start();
// connectDatabase(); // Wait for the database connection
// app.listen(port, () => { console.log(`product-service is running on port ${port}`) });


import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDatabase from './config/db';
import routes from './routes/index';
import { createConsumer } from './kafka/consumer';

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());
app.use('/', routes);

async function start() {
    try {
        // ✅ DB first
        connectDatabase();
        console.log('MongoDB connected');

        // ✅ Kafka consumer
        const consumer = createConsumer();
        await consumer.start();
        console.log('Kafka consumer started');

        // ✅ Start server
        app.listen(port, () => {
            console.log(`product-service running on port ${port}`);
        });

    } catch (err) {
        console.error('Startup error:', err);
        process.exit(1);
    }
}

start();