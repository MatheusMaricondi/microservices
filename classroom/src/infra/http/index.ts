import express, { Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config()
const port = process.env.SERVER_PORT
const app = express()

app.use(express.json())

app.get('/my-courses/:email', async (req: Request, res: Response) => {
    const { email } = req.params
    
    res.status(201).json()
});

app.listen(port, () => {
    console.log(`purchase service its running at localhost:${port}`)
})