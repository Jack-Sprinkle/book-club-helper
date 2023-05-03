import nextConnect from "next-connect";
import authMiddleware from "../middleware/authorize";
import { PrismaClient } from "@prisma/client";

const ratingBookRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
})

ratingBookRoute.use(authMiddleware);

ratingBookRoute.put(async (req, res) => {
  const prisma = new PrismaClient();
  const { bid } = req.query
  const {userRating} = req.body
  try {
    const currentRating = await prisma.books.findUnique({
      where: {
        id: bid
      },
      select: {
        userRatings: true,
        numberOfRatings: true
      }
    })
    const newNumberOfRatings = currentRating.numberOfRatings + 1
    const newRating = (currentRating.userRatings + userRating) / newNumberOfRatings

    const updatedRating = await prisma.books.update({
      where: {
        id: bid
      },
      data: {
        userRatings: newRating,
        numberOfRatings: newNumberOfRatings
      }
    })

    return res.status(204).send("Rating updated successfully")
  } catch {
    return res.status(500).send("Failed to update rating")
  }
})

export default ratingBookRoute;