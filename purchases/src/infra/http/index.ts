import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { PurchaseAction } from "../../actions/purchase-product";

dotenv.config()
const port = process.env.SERVER_PORT
const app = express()

app.use(express.json())

app.post('/new-purchase', async (req: Request, res: Response) => {
    const { email, productId, name } = req.body
    const newPurchase = await new PurchaseAction().execute({
        email,
        productId,
        name
    })
    res.status(201).json(newPurchase)
});

app.listen(port, () => {
    console.log(`purchase service its running at localhost:${port}`)
})