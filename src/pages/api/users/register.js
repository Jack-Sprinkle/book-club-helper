import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import nextConnect from "next-connect";

const registerRoute = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  }
})

registerRoute.post(async (req, res) => {
  const prisma = new PrismaClient();
  //desctucture request body
  const { user_name, password } = req.body;

  //make sure there is a user name and password in the request body
  if (!user_name || !password) {
    return res.status(400).send("Please enter the required fields");
  }

  //Hash and salt the user password before storing in the database
  const salt = bcrypt.genSaltSync(2);
  const hashedPassword = bcrypt.hashSync(password, salt);

  //create the user in the database

  try {
    await prisma.users.create({
      data: {
        id: uuidv4(),
        userName: user_name,
        password: hashedPassword,
      },
    });

    return res.status(201).send("Registered Successfully");
  } catch {
    return res.status(400).send("Failed to Register")
  }
});

export default registerRoute;


