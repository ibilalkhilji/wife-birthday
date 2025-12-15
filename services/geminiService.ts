import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateRomanticPoem = async (mood: string = "romantic and heartfelt"): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, beautiful birthday poem for my wife. 
      The mood should be ${mood}. 
      It should be about 3 stanzas long. 
      Do not include any markdown formatting like bolding or headers. 
      Just the text of the poem.`,
    });
    return response.text || "Roses are red, violets are blue, my world is amazing, because of you.";
  } catch (error) {
    console.error("Error generating poem:", error);
    return "To my dearest wife,\nMay your day be as beautiful as your smile,\nAnd your year as lovely as your heart.\nI love you more than words can say.";
  }
};

export const generateReasonsToLove = async (): Promise<string[]> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a list of 5 short, distinct, and sweet reasons why a husband loves his wife. 
      Return ONLY the reasons, separated by newlines. 
      Keep them under 15 words each.`,
    });
    
    const text = response.text || "";
    return text.split('\n').filter(line => line.trim().length > 0).slice(0, 5);
  } catch (error) {
    console.error("Error generating reasons:", error);
    return [
      "Your smile lights up my darkest days.",
      "Your kindness knows no bounds.",
      "You make our house feel like a home.",
      "You are my best friend and soulmate.",
      "I love growing old with you."
    ];
  }
};

export const generateSingleReason = async (exclude: string[]): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate ONE short, sweet, and unique reason why a husband loves his wife.
      It must be different from these: ${exclude.join(', ')}.
      Keep it under 15 words. Return ONLY the text.`,
    });
    return response.text?.trim() || "You are my everything.";
  } catch (error) {
    return "You make every day an adventure.";
  }
}