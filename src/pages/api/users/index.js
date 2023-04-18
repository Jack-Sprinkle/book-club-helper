import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === "POST") {
    const { user_name, password } = req.body;
    if(!user_name || !password) {
        return res.status(400).send("Please enter the required fields")
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

    return res.json({token})
  } else {
    return res.status(400).send("Endpoint does not exist")
  }
}
