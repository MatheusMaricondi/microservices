import kafka from '../../infra/messaging/kafka'

interface IMessage {
  key: string | any,
  value: string | any
}

export class KafkaEvents {
  consumeService
  messagesList = {}

  constructor(consumeService: Function) {
    this.consumeService = consumeService
  }
    async consumer(topic: string, groupId: string) {
      const consumer = kafka.consumer({groupId})
      await consumer.connect()
      await consumer.subscribe({ topic })
      await consumer.run({
        eachBatchAutoResolve: false,
        eachBatch: async ({ batch, resolveOffset, heartbeat, isRunning, isStale }) => {
          for (let message of batch.messages) {
              if (!isRunning() || isStale()) break
              const key12 = message.key?.toString()
              this.messagesList = {...this.messagesList, [key12 || '']: message.value?.toString()}
              await resolveOffset(message.offset)
              await heartbeat()
          }
          this.processMessage(this.messagesList)
        }
      })
    }
    async processMessage(message: {}) {
      await this.consumeService(message)
    }
}

