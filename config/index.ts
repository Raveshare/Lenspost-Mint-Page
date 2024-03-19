const PROD_BACKEND_URL = "https://api.lenspost.xyz";
const DEV_BACKEND_URL = "https://lenspost-development.up.railway.app";

const APP_URL = "https://app.lenspost.xyz/"


export const config = {
     BACKEND_URL:
    process.env.ENVIRONMENT === "production"
      ? PROD_BACKEND_URL
      : DEV_BACKEND_URL,

      ENVIRONMENT: process.env.ENVIRONMENT || "development",

    APP_URL: process.env.ENVIRONMENT === "production" ? APP_URL : "http://localhost:3000" 
}