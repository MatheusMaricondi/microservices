import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { GetCourses } from "../../services/getCourses.service"
import { ConsumeEvents } from "../../actions/consume"

dotenv.config()
const port = process.env.SERVER_PORT
const app = express()

app.use(express.json())

ConsumeEvents.execute() // consume new events
app.get('/my-courses/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const studentCourses = await new GetCourses().execute({userId: parseInt(id)})
    res.status(201).json(studentCourses)
});

app.listen(port, () => {
    console.log(`classroom service its running at localhost:${port}`)
})