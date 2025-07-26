// import axios from "axios";
// import supabase from "./client";

// const getAxiosClient = async () => {
//   // Get the supabase session
//   // create an axios instance with the supabase access_token
//   // Return the instance
//   // Fill code here
// };

// export default getAxiosClient;

import axios from "axios";
import supabase from "./client";

const getAxiosClient = async () => {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  if (error || !session) {
    console.error("❌ No session found or error getting session:", error);
    throw new Error("User is not authenticated.");
  }

  const accessToken = session.access_token;

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8081", // 👈 Your backend URL
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });

  return axiosInstance;
};

export default getAxiosClient;

