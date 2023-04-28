import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === "POST") {
    const { user_name, password } = req.body;
    if(!user_name || !password) {
        return res.status(400).send("Please enter the required fields.")
    }

    const user = await prisma.users.findUnique({
        where: {
            userName: user_name
        }
    })

    if(!user) {
        return res.status(400).send("Invalid Email")
    }

    const passwordValidated = bcrypt.compareSync(password, user.password)
    if(!passwordValidated) {
        return res.status(400).send("Invalid Password")
    }

    const token = jwt.sign(
        {id: user.id, userName: user.user_name},
        process.env.JWT_KEY,
        {expiresIn: "24h"}
    )

    return res.status(200).json({token})
  } 

  if (req.method === "GET") {
    const authHeader = req.headers.authorization
    const authToken = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(authToken, process.env.JWT_KEY)
      req.user = decoded;
      const user = await prisma.users.findUnique({
        where: {
          id: req.user.id
        }
      })

      delete user.password
      delete user.isAdmin

      return res.status(200).json(user)
    } catch {
      return res.status(400).send("User does not exist")
    }
  }
  
}
