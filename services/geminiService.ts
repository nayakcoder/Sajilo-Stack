import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key is missing. Please ensure process.env.API_KEY is available.");
    // In a real app, we might handle this gracefully, but for this strict types setup, 
    // we assume the environment is correct as per instructions.
    throw new Error("API Key missing");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7, // Slightly creative but focused
      topK: 40,
    }
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    const result = await chat.sendMessage({ message });
    return result.text || "I remain silent. (No response generated)";
  } catch (error) {
    console.error("Gemini Interaction Error:", error);
    return "Connection to the neural interface disrupted. Please try again later.";
  }
};