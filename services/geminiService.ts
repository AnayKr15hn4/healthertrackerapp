
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function getDailyHealthTip(username: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, friendly, and professional 1-sentence health tip for a user named ${username}. Focus on preventative care, hydration, or mental wellness.`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text || "Stay hydrated and take a short walk today for better heart health!";
  } catch (error) {
    return "Remember to prioritize sleep and maintain a balanced diet.";
  }
}

export async function searchNearbyDoctors(lat: number, lng: number): Promise<any[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Find 5 highly rated medical clinics near Secaucus High School, NJ.",
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng
            }
          }
        }
      },
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    if (!chunks || chunks.length === 0) throw new Error();
    
    return chunks.map((chunk: any) => ({
      title: chunk.maps?.title || "Medical Professional",
      uri: chunk.maps?.uri || "#",
      address: chunk.maps?.location?.address || "Nearby Secaucus, NJ",
    }));
  } catch (error) {
    return [
      { title: "Secaucus Medical Center", uri: "https://www.google.com/maps/search/Secaucus+Medical+Center", address: "Meadowlands Pkwy, Secaucus, NJ" },
      { title: "Riverside Medical Group", uri: "https://www.google.com/maps/search/Riverside+Medical+Group+Secaucus", address: "714 10th St, Secaucus, NJ" },
      { title: "Hackensack Meridian Health", uri: "https://www.google.com/maps/search/Hackensack+Meridian+Health+Secaucus", address: "55 Meadowlands Pkwy, Secaucus, NJ" },
      { title: "Secaucus Pediatric Center", uri: "https://www.google.com/maps/search/Secaucus+Pediatric+Center", address: "1351 Paterson Plank Rd, Secaucus, NJ" },
      { title: "Highland Medical Lab", uri: "https://www.google.com/maps/search/Highland+Medical+Lab+Secaucus", address: "Plaza Center, Secaucus, NJ" }
    ];
  }
}
