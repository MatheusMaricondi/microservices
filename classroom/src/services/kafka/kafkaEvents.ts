import kafka from '../../infra/messaging/kafka'

export class KafkaEvents {
    async consumer(topic: string, groupId: string) {
      const consumer = kafka.consumer({groupId})
      await consumer.connect()
      await consumer.subscribe({ topic, fromBeginning: true })
      await consumer.run({
        eachBatch: async ({ batch }) => {
          console.log('consume event',batch)
        },
        eachMessage: async ({ topic, partition, message }) => {
          console.log(`${message.key} -- ${message.value}`)
        },
      })
    }
}

