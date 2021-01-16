import * as admin from "firebase-admin";

const serviceAccount = require("./firebaseKeys.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
} catch (e) {
  // error
}

const firestore = admin.firestore();

export default firestore;
