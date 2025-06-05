
export const initializeRazorpay = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
  
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        reject(new Error("Failed to load Razorpay script"));
      };
  
      document.body.appendChild(script);
    });
  };