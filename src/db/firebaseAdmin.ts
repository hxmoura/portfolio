import admin, { ServiceAccount } from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as ServiceAccount
    ),
  });
}

export { admin };
