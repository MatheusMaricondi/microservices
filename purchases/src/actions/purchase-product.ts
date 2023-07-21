import { PurchaseRepository } from "../repositories/purchase-repository";
import { UserRepository } from "../repositories/user-repository";
import kafka from "../infra/messaging/kafka";

interface PurchaseRequest {
    email: string,
    productId: string,
    name: string
}

export class PurchaseAction {
    async execute(purchaseRequest: PurchaseRequest) {
        const userId = await new UserRepository().findUser(purchaseRequest.email)
        if(userId) {
            await new PurchaseRepository().create({
                consumerId: userId.id,
                productId: purchaseRequest.productId
            })
        }else {
            await new UserRepository().create({
                email: purchaseRequest.email,
                name: purchaseRequest.name
            })
        }

        const producer = kafka.producer()

        await producer.connect()
        await producer.send({
            topic: 'new-purchase',
            messages: [
                { key: 'email', value: purchaseRequest.email },
                { key: 'productId', value: purchaseRequest.productId }
            ],
        })
        await producer.disconnect()

        return purchaseRequest
    }
}