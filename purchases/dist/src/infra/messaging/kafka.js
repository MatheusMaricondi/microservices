"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'purchases',
    brokers: ['localhost:9092'],
});
exports.default = kafka;
