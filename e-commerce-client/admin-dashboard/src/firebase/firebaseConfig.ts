import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { MessagePayload } from "firebase/messaging";
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_APP_API_KEY,
//     authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_APP_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_APP_APP_ID,
//     measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID
//   };

const firebaseConfig = {
  apiKey: "AIzaSyAZffT1NjiCZqym3Xih6fv80Ro3RJIg9V0",
  authDomain: "ecommerce-3b6c5.firebaseapp.com",
  projectId: "ecommerce-3b6c5",
  storageBucket: "ecommerce-3b6c5.firebasestorage.app",
  messagingSenderId: "287966294892",
  appId: "1:287966294892:web:29ec16e8c0e1b5e6b87949",
  measurementId: "G-E76HVHFK6N"
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app);






export const requestForToken = async () => {
    try {
    
      const permission = await Notification.requestPermission()
      console.log(permission,"permission")
      if(permission === 'granted'){
          return getToken(messaging, {
              vapidKey:"BC3UufsjmD9b5J-vRqZrhXQac6E8pDH6f5GHrKZXK4glgaQPMcC6QfXuWDo9vmTWZQVH8AIz_zdbrLGigWVeNFg"
          })
          
      }
    } catch (err) {
      console.log('An error occurred while retrieving token. ', err);
    }
  };
  
 
    export const onMessageListener = () =>
      new Promise<MessagePayload>((resolve) => {
        onMessage(messaging, (payload) => {
          console.log("🔥 Foreground notification received:", payload);
    
          
          if (Notification.permission === "granted") {
            new Notification(payload.notification?.title || "New Message", {
              body: payload.notification?.body,
            
            });
          }
    
          resolve(payload); 
        });
      });
    