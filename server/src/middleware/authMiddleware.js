import admin from "../config/firebaseAdmin.js";

export const verifyFirebaseToken = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "No token" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded; // 🔥 IMPORTANT
    next();
    console.log("Incoming token:", token);
    console.log("Decoded user:", decoded);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};