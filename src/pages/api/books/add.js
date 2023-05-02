import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import nextConnect from "next-connect";
import authMiddleware from "../middleware/authorize";


const addBookRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
      },
      onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
      },
})


addBookRoute.use(authMiddleware)

addBookRoute.post(async(req, res) => {
    console.log(req.body)
    const prisma = new PrismaClient();
    const { title, author, description, monthRecommended } = req.body;

    if (!title || !author || !description || monthRecommended < 0) {
        return res.status(400).send("Please enter the required fields.")
    }

    try {
        await prisma.books.create({
            data: {
                id: uuidv4(),
                title: title,
                author: author,
                description: description,
                selected: false,
                monthRecommended: monthRecommended,
                votes: 0
            }
        })

        return res.status(201).send("Book recommendation added.")
    } catch {
        return res.status(400).send("Failed to add book recommendation.")
    }
});

export default addBookRoute;
