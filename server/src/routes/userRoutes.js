import express from "express";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";
import prisma from "../config/db.js";

const router = express.Router();

router.post("/create",verifyFirebaseToken, async (req, res) => {
  try {
    const {uid , email} = req.user;
    let user = await prisma.user.findUnique({
      where: {
         uid
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          uid,
          email,
        },
      });
    }

    res.json(user);
}
catch (error) {
    res.status(500).json({message:"Error creating user"});
}
});

export default router;