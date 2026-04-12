import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (err) {
        console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT env var:", err);
    }
} else {
    // Fallback to local file for development
    try {
        const jsonPath = path.join(__dirname, "serviceAccountKey.json");
        serviceAccount = JSON.parse(readFileSync(jsonPath, "utf8"));
    } catch (err) {
        console.warn("Firebase serviceAccountKey.json not found, and FIREBASE_SERVICE_ACCOUNT env var is missing.");
    }
}

if (serviceAccount) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} else {
    console.error("Firebase Admin could not be initialized: No credentials found.");
}

export default admin;