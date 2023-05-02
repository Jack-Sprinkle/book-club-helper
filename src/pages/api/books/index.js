import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import nextConnect from "next-connect";
import multer from "multer";

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    if(req.method === "POST") {
        const {title, author, description, monthRecommended} = req.body;

        if (!title || !author || !description || monthRecommended < 0) {
            return res.status(400).send("Please enter the required fields.")
        }

        const upload = multer({
            storage: multer.diskStorage({
                destination: './public/uploads',
                filename: (req, file, cb) => cb(null, file.originalname)
            })
        })

        const uploadMiddleware = upload.array('image')
        handler.use(uploadMiddleware);

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
        let nextMonth = currentDate.getMonth() + 1;

        try {
            const books = await prisma.books.findMany({
                where: {
                    monthRecommended: nextMonth
                },
                select: {
                    id: true,
                    title: true,
                    author: true,
                    description: true,
                    votes: true
                }
            })

            return res.status(200).json(books)
        } catch {
            return res.status(400).send("Failed to get books for this month.")
        }
    }

    if(req.method ==="PUT") {
        const {bookId, vote} = req.body;
        if(!bookId || !vote) {
            return res.status(400).send("Failed to cast vote.")
        }

        try {
            const currentVote = await prisma.books.findUnique({
                where: {
                    id: bookId
                },
                select: {
                    votes: true
                }
            })
            const newVote = currentVote.votes + vote
            const updateVote = await prisma.books.update({
                where: {
                    id: bookId
                },
                data: {
                    votes: newVote
                }
            })
            return res.status(202).send("Vote cast successfully!")
        
        } catch {
            return res.status(500).send("Failed to cast vote.")
        }
    }
}