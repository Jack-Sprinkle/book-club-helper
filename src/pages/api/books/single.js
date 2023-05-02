import { PrismaClient } from "@prisma/client";
import nextConnect from "next-connect";
import authMiddleware from '../middleware/authorize';

const singleBookRoute = nextConnect({});

singleBookRoute.use(authMiddleware);

singleBookRoute.get(async (req, res) => {
    const prisma = new PrismaClient();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth()

    try {
        const selectedBook = await prisma.books.findMany({
            where: {
                monthRecommended: currentMonth
            },

            orderBy: [
                {
                    votes: 'desc'
                }
            ],

            take: 1,

            select: {
                id: true,
                title: true,
                author: true,
                description: true,
                userRatings: true,
            }
        })



        return res.status(200).json(selectedBook[0])
    } catch {
        return res.status(400).send("Failed to find selected book")
    }
})

export default singleBookRoute;