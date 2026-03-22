import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['kafka:9092'],
});

export const producer = kafka.producer();

export const connectProducer = async () => {
    await producer.connect();
    console.log('✅ Kafka Producer Connected');
};

export const sendOrderCreatedEvent = async (data: {
    orderId: string;
    productId: string;
    quantity: number;
}) => {
    await producer.send({
        topic: 'order-created',
        messages: [
            {
                key: data.productId, // good practice (partitioning)
                value: JSON.stringify(data),
            },
        ],
    });

    console.log('📤 ORDER_CREATED event sent:', data);
};