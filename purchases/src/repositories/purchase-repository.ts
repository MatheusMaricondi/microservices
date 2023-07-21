import { PrismaClient } from "@prisma/client"; 
const prisma = new PrismaClient()

interface PurchaseProductRequest {
    consumerId: number,
    productId: string
}

export class PurchaseRepository {
    async create(purchaseProductRequest: PurchaseProductRequest) {
        await prisma.purchase.create({
            data: {
                consumerId: purchaseProductRequest.consumerId, 
                productId: purchaseProductRequest.productId,
                createdAt: new Date()
            }
        })
    }
}
