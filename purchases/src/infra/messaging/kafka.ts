import { Kafka } from "kafkajs"

const kafka = new Kafka({
  clientId: 'purchases',
  brokers: ['localhost:9092'],
})

export default kafka