import { newPurchase } from "../services/kafka/consumeEvents/newPurchase.service";


export class ConsumeEvents {
    static execute() {
        new newPurchase().execute({groupId: 'new-purchase', topic: 'new-purchase'})
    }
}