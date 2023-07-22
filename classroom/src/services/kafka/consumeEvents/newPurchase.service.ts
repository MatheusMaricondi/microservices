import { KafkaEvents } from "../kafkaEvents";

interface Consumer {
    topic: string,
    groupId: string
}

export class newPurchase {
    execute(consumer: Consumer) {
        const { topic, groupId } = consumer
        const newPurchase = new KafkaEvents().consumer(topic, groupId)
        // do anything with topic
        return newPurchase
    }
}