import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { onMessageListener, requestForToken } from "./firebase/firebaseConfig";
import { NotificationToast } from "./components/NotificationToast";
import { AlertColor } from "@mui/material";
import { saveFcmTokenService } from "./services/notificationService";

export default function App() {
  const [fcmToken, setFcmToken] = useState<string | undefined>();
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  // Fetch FCM token and save it
  useEffect(() => {
    const fetchAndSaveToken = async () => {
      try {
        const token = await requestForToken();
        setFcmToken(token);
        console.log("FCM Token:", token);
        
        if (token) {
          
          const response = await saveFcmTokenService({ deviceToken: token });
          console.log(response, "----send fcm");
        } else {
          console.log("no fcm token received",fcmToken);
        }
      } catch (error) {
        console.log("Error handling FCM token:", error);
      }
    };
    
    fetchAndSaveToken();
  }, []);

  // Listen for incoming messages

useEffect(() => {
  const setupMessageListener = async () => {
    try {
      const payload = await onMessageListener();
      console.log("Received message:", payload);
      setNotification({
        open: true,
        message: `${payload.notification?.title}\n${payload.notification?.body}`,
        severity: "info",
      });
    } catch (error) {
      console.error("Error in message listener:", error);
    }
  };

  setupMessageListener();
}, []);
  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered ', registration);
        })
        .catch((err) => {
          console.log('Service Worker registration failed:', err);
        });
    }
  }, []);

  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <>
      <RouterProvider router={AppRoutes} />
      <NotificationToast
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleClose}
      />
    </>
  );
}