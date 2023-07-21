import kafka from '../infra/messaging/kafka'
import { KafkaEvents } from '../services/kafka/kafkaEvents'

interface Consumer {
    topic: string,
    groupId: string
}
export class ConsumeCourses {
    async execute(consumer: Consumer) {
        const { topic, groupId } = consumer
        new KafkaEvents().consumer(topic, groupId)
       
    }
}