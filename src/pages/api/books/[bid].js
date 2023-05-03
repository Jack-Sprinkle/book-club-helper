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

})

export default ratingBookRoute;