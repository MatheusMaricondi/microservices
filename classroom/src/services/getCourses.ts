import { StudentRepository } from "../repositories/student-repository";

interface StudentRequest {
    email: string,
    name: string
}

export class GetCourses {
    async execute(studentRequest: StudentRequest) {
        new StudentRepository().create({
            email: studentRequest.email,
            name: studentRequest.name
        })
    }
}