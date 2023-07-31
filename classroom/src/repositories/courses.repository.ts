import { PrismaClient } from "@prisma/client"; 
const prisma = new PrismaClient()

export class CoursesRepository {
    async findCourse(courseCode: string) {
        const course = await prisma.courses.findFirst({
            select: {id: true},
            where: {courseCode}
        })
        return course?.id
    }
}