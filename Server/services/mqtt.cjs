require('dotenv').config({ path: `${__dirname}/../.env` });
const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');
const { saveDataToMongoDB } = require('../utils/db.cjs');

const keyPath = path.resolve(__dirname, '../certificates/sales-cloudext-prfi002024oamk1.key');
const certPath = path.resolve(__dirname, '../certificates/sales-cloudext-prfi002024oamk1.pem');

// MQTT broker URL and options
const brokerUrl = 'mqtts://a39cwxnxny8cvy.iot.eu-west-1.amazonaws.com:8883';
const options = {
    key: fs.readFileSync(keyPath), // Load the key
    cert: fs.readFileSync(certPath), // Load the certificate
    rejectUnauthorized: false,
};

// MQTT topic to subscribe to
const topic = 'cloudext/json/pr/fi/prfi002024oamk1/#'; // Topic

// Create a client instance
const client = mqtt.connect(brokerUrl, options);

// Handle connection event
client.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Subscribe to the topic
    client.subscribe(topic, (err) => {
        if (err) {
            console.error('Failed to subscribe to MQTT topic:', err);
        } else {
            console.log('Subscribed to MQTT topic:', topic);
        }
    });
});

// Handle message event
client.on('message', async (topic, message) => {
    console.log('Received message:', message.toString());
    // Handle the received message here
    const data = JSON.parse(message.toString());
    await saveDataToMongoDB(data); // Call the function to save data to the database
});

// Handle error event
client.on('error', (err) => {
    console.error('MQTT client error:', err);
});

// Handle close event
client.on('close', () => {
    console.log('Disconnected from MQTT broker');
});
