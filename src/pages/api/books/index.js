import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import nextConnect from "next-connect";
import authMiddleware from "../middleware/authorize";

const booksRoute = nextConnect({});

booksRoute.use(authMiddleware);


booksRoute.get(async (req, res) => {
    const prisma = new PrismaClient();
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
});

booksRoute.put(async (req, res) => {
    const prisma = new PrismaClient();
    const { bookId, vote } = req.body;
    if (!bookId || !vote) {
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
});

export default booksRoute;
