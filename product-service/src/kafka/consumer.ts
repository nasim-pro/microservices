import { Kafka } from 'kafkajs';
import Product from '../models/product.model';

const kafka = new Kafka({
    clientId: 'product-service',
    brokers: ['kafka:9092'],
});

export const createConsumer = () => {
    const consumer = kafka.consumer({ groupId: 'product-group' });

    const start = async () => {
        while (true) {
            try {
                console.log('⏳ Trying to connect Kafka consumer...');

                await consumer.connect();
                console.log('✅ Kafka Consumer Connected');

                await consumer.subscribe({
                    topic: 'order-created',
                    fromBeginning: true,
                });

                console.log('📡 Subscribed to topic: order-created');

                await consumer.run({
                    eachMessage: async ({ message }) => {
                        try {
                            const data = JSON.parse(message.value!.toString());

                            console.log('📥 ORDER_CREATED received:', data);

                            await Product.updateOne(
                                { _id: data.productId },
                                { $inc: { stock: -data.quantity } }
                            );

                            console.log('✅ Stock updated');
                        } catch (err) {
                            console.error('❌ Error processing message:', err);
                        }
                    },
                });

                // if run succeeds, break retry loop
                break;

            } catch (err: any) {
                console.error('❌ Kafka consumer error:', err?.message || err);

                // IMPORTANT: disconnect before retry
                try {
                    await consumer.disconnect();
                } catch (_) { }

                console.log('🔁 Retrying in 5 seconds...');
                await new Promise(res => setTimeout(res, 5000));
            }
        }
    };

    return { start };
};