
import { useStore } from "./Zustand";

export async function Call() {
    try {
      console.log("//////////////////////////////////////////////////");
      const result = await fetch("http://192.168.1.7:3000/events"); 
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const response = await result.json();
      useStore.getState().setDetails(response) 
      // console.log(useStore.getState().details, "...................................");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  