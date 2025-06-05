// import * as admin from 'firebase-admin';
// import * as dotenv from 'dotenv';
// import { readFileSync } from 'fs';

// dotenv.config();

// export const firebaseAdminProvider = {
//   provide: 'FIREBASE_ADMIN',
//   useFactory: () => {
//     const serviceAccountPath = process.env.FIREBASE_CREDENTIALS_PATH;

//     if (!serviceAccountPath) {
//       throw new Error('FIREBASE_CREDENTIALS_PATH is missing in the environment variables.');
//     }

//     let serviceAccount;
//     try {
//       serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'));
//     } catch (error) {
//       console.error('Error reading Firebase credentials file:', error);
//       throw new Error('Invalid Firebase credentials file.');
//     }

//     try {
//       return admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//       });
//     } catch (error) {
//       console.error('Firebase initialization error:', error);
//       throw error;
//     }
//   },
// };

// src/notification/firebase-admin.provider.ts
import { Provider } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

export const firebaseAdminProvider: Provider = {
  provide: 'FIREBASE_ADMIN',
  useFactory: () => {
    const credentialsPath = path.resolve(process.cwd(), process.env.FIREBASE_CREDENTIALS_PATH || '');

if (!fs.existsSync(credentialsPath)) {
  throw new Error(`Firebase credentials file not found at path: ${credentialsPath}`);
}

const serviceAccount = require(credentialsPath);


    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  },
};




