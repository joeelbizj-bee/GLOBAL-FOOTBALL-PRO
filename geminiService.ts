
import { GoogleGenAI, Type } from "@google/genai";
import { MatchEvent } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateCommentary(
  homeTeam: string,
  awayTeam: string,
  event: string,
  score: string
): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As a professional football commentator, provide a one-sentence live commentary for the following event in a match between ${homeTeam} and ${awayTeam}. 
    Score: ${score}. Event: ${event}. Keep it realistic, exciting, and never use capital letters except for names or official titles.`,
  });
  return response.text || "what a moment for football fans around the world!";
}

export async function getLiveNews(): Promise<string[]> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: 'list 3 current top news headlines from the world of football. do not use capital letters except for names, teams, and official titles.',
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });
  try {
    return JSON.parse(response.text || "[]");
  } catch {
    return ["transfer window heating up", "major injury update", "title race intensifies"];
  }
}
