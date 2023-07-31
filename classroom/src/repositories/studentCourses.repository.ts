import { PrismaClient } from "@prisma/client"; 
const prisma = new PrismaClient()

interface UserRequest {
    userId: number
}
interface StudentRequest {
    courseId: number,
    studentId: number
}

export class StudentCourseRepository {
    async execute(userRequest: UserRequest) {
        const [studentCourses] = await prisma.studentCourses.findMany({
            select: {courseId: true },
            where: {studentId: userRequest.userId}
        })
        const [userCourses] = await prisma.courses.findMany({
            select: {courseCode: true, courseName: true},
            where: {id: studentCourses.courseId}
        })
        return userCourses
    }
    async create(studentRequest: StudentRequest) {
        await prisma.studentCourses.create({
            data: {
                courseId: studentRequest.courseId,
                studentId: studentRequest.studentId
            }
        })
    }
}