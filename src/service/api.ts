// src/services/api.ts
import axios from "axios";

// Example function to send reset email
export const sendResetEmail = async (email: string) => {
  try {
    const response = await axios.post("/api/reset-password", { email });
    return response.data; // Assuming your API returns some confirmation
  } catch (error) {
    throw new Error("Failed to send reset email");
  }
};
