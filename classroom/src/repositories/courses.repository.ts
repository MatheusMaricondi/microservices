import { PrismaClient } from "@prisma/client"; 
const prisma = new PrismaClient()

interface UserRequest {
    userId: number
}

export class StudentCourseRepository {
    async execute(userRequest: UserRequest) {
        const studentCourses = await prisma.studentCourses.findMany({
            select: {courseId: true, course: true, student: true},
            where: {studentId: userRequest.userId}
        })
        return studentCourses
    }
}