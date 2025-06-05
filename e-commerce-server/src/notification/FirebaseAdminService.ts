import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

config(); // Load env variables

@Injectable()
export class FirebaseAdminService {

  private readonly app: admin.app.App;
  private readonly messaging: admin.messaging.Messaging;
  // private messaging;

  constructor() {
    if (!admin.apps.length) {
      const serviceAccountPath = process.env.FIREBASE_CREDENTIALS_PATH || '';
      const fullPath = path.resolve(serviceAccountPath);

      const serviceAccount = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      console.log('🔥 Firebase initialized using credentials at:', fullPath);
    }

    this.messaging = admin.messaging();
  }

//   if (admin.apps.length === 0) {
//     const serviceAccountPath = process.env.FIREBASE_CREDENTIALS_PATH;
//     if (!serviceAccountPath) {
//       throw new Error('FIREBASE_CREDENTIALS_PATH is not defined in environment variables');
//     }

//     const fullPath = path.resolve(serviceAccountPath);
//     if (!fs.existsSync(fullPath)) {
//       throw new Error(`Firebase credentials file not found at ${fullPath}`);
//     }

//     const serviceAccount = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    
//     this.app = admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     });
//     console.log('🔥 Firebase initialized successfully');
//   } else {
//     this.app = admin.apps[0]!; // The non-null assertion is safe here
//   }

//   this.messaging = this.app.messaging();
// }


  // async sendNotificationToToken(token: string, title: string, body: string) {
  //   const message = {
  //     token,
  //     notification: {
  //       title,
  //       body,
  //     },
  //   };

  //   try {
  //     const response = await this.messaging.send(message);
  //     console.log('✅ Notification sent successfully:', response);
  //   } catch (error) {
  //     console.error('❌ Error sending notification:', error);
  //   }
  // }

  async sendNotificationToToken(token: string, title: string, body: string) {
    if (!token) {
      throw new Error('FCM token is required');
    }

    const message = {
      token,
      notification: { title, body },
      apns: { // For iOS
        payload: {
          aps: {
            sound: 'default',
          },
        },
      },
      android: { // For Android
        notification: {
          sound: 'default',
          channel_id: 'order_notifications',
        },
      },
    };

    try {
      const response = await this.messaging.send(message);
      console.log(' Notification sent successfully to', token);
      return response;
    } catch (error) {
      console.error(' Error sending notification:', error);
      throw error; // Re-throw to handle in calling function
    }
  }
}
