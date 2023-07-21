import { PrismaClient } from "@prisma/client"; 
const prisma = new PrismaClient()

interface UserRequest {
    email: string,
    name: string
}

export class UserRepository {
    async create(userRequest: UserRequest) {
        await prisma.user.create({
            data: {
                email: userRequest.email,
                name: userRequest.name
            }
        })
    }
    async findUser(email: string) {
        const user = await prisma.user.findFirst({
            select: {id: true},
            where: {email}
        })
        return user
    }
}
