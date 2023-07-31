import { StudentCourseRepository } from "../repositories/studentCourses.repository"

interface StudentRequest {
    userId: number
}

export class GetCourses {
    async execute(studentRequest: StudentRequest) {
        const studentCourses = await new StudentCourseRepository().execute(studentRequest)
        
        return studentCourses
    }
}