import { Kafka } from "kafkajs"

const kafka = new Kafka({
  clientId: 'classroom',
  brokers: ['localhost:9092'],
})

export default kafka 