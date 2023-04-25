import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    if(req.method === "POST") {
        const {title, author, description} = req.body;

        if (!title || !author || !description) {
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
                }
            })

            return res.status(201).send("Book recommendation added.")
        } catch {
            return res.status(400).send("Failed to add book recommendation.")
        }

    }
}