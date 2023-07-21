import kafka from '../../infra/messaging/kafka'

export class KafkaEvents {
    async consumer(topic: string, groupId: string) {
        const consumer = kafka.consumer({groupId})
        async () => {
            await consumer.connect()
            await consumer.subscribe({ topic, fromBeginning: true })
            await consumer.run({
              eachBatch: async ({ batch }) => {
                console.log('consume event',batch)
              },
              eachMessage: async ({ topic, partition, message }) => {
                const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
                console.log(`- ${prefix} ${message.key}#${message.value}`)
              },
            })
          }
    }
}