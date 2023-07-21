import { PrismaClient } from "@prisma/client"; 
const prisma = new PrismaClient()

interface StudentRequest {
    email: string,
    name: string
}

export class StudentRepository {
    async create(userRequest: StudentRequest) {
        await prisma.student.create({
            data: {
                email: userRequest.email,
                name: userRequest.name
            }
        })
    }
    async findUser(email: string) {
        const user = await prisma.student.findFirst({
            select: {id: true},
            where: {email}
        })
        return user
    }
}