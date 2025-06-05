
importScripts('https://www.gstatic.com/firebasejs/11.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.5.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAZffT1NjiCZqym3Xih6fv80Ro3RJIg9V0",
  authDomain: "ecommerce-3b6c5.firebaseapp.com",
  projectId: "ecommerce-3b6c5",
  storageBucket: "ecommerce-3b6c5.firebasestorage.app",
  messagingSenderId: "287966294892",
  appId: "1:287966294892:web:29ec16e8c0e1b5e6b87949",
  measurementId: "G-E76HVHFK6N"
};





firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: "/ayurmanthra-separator.png",
  };
console.log("notification received");

  self.registration.showNotification(notificationTitle, notificationOptions);
});