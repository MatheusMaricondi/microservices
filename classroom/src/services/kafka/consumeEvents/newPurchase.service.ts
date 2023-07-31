import { KafkaEvents } from "../kafkaEvents";
import { StudentCourseRepository } from "../../../repositories/studentCourses.repository"
import { StudentRepository } from "../../../repositories/student.repository"
import { CoursesRepository } from "../../../repositories/courses.repository"

interface Consumer {
    topic: string,
    groupId: string
}
interface IStudentCourse {
    email: string,
    productId: string
}

export class newPurchase {
    courseId = null
    async execute(consumer: Consumer) {
        const { topic, groupId } = consumer
        await new KafkaEvents(this.create).consumer(topic, groupId)
    }
    async create(messages: IStudentCourse) {
        const studentId = await new StudentRepository().findUser(messages.email)
        const courseId = await new CoursesRepository().findCourse(messages.productId)
        if(studentId && courseId)
            await new StudentCourseRepository().create({studentId, courseId})
    }
}