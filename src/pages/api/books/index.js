import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    if(req.method === "POST") {
        const {title, author, description, monthRecommended} = req.body;

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

    }

    if(req.method === "GET") {
        const currentDate = new Date()
        let currentMonth = currentDate.getMonth()

        try {
            const books = await prisma.books.findMany({
                where: {
                    monthRecommended: currentMonth
                },
                select: {
                    title: true,
                    author: true,
                    description: true
                }
            })

            return res.status(200).json(books)
        } catch {
            return res.status(400).send("Failed to get books for this month.")
        }
    }
}