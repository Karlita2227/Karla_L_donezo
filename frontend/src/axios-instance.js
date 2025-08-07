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

// const getAxiosClient = async () => {
//   const currentSession = await supabase.auth.getSession();


//   const axiosInstance = axios.create({
//     // baseURL: "http://localhost:8080", // 👈 Your backend URL
//     headers: {
//       Authorization: `Bearer ${currentSession.data.session.access_token}`,
//     }
//   });

//   return axiosInstance;
// };

// export default getAxiosClient;

const getAxiosClient = async () => {
  const currentSession = await supabase.auth.getSession();
  const { data } = await supabase.auth.getSession();
  if (!data.session) throw new Error("No active session");
  supabase.auth.getSession().then(console.log);
  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${currentSession.data.session.access_token}`,
    },
  });
  return instance;
};
export default getAxiosClient
