import { generateJWT } from "@/server/token";
import { useState } from "react";

export function useFetcher() {

  // Generate a new JWT token and store the new token in the state
  const refreshToken = async () => {
    const newToken = await generateJWT();
    console.log(newToken);
    localStorage.setItem("tinybirdJWT", newToken);
    return newToken;
  };

  // Function to fetch data from Tinybird URL with a JWT token
  // If the token expires, a new one is generated in the server
  return async (endpoint: string) => {
    const url = new URL(endpoint)

    const response = await fetch(url);

    if (response.status === 200) {
      return response.json();
    }
    if (response.status === 403) {
      const newToken = await refreshToken();
      url.searchParams.set('token', newToken)
      return fetch(url).then((res) => res.json());
    }
  };
}
