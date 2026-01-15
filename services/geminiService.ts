
import { GoogleGenAI } from "@google/genai";

export class AIStylistService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getStylingAdvice(userPrompt: string, context: any) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a professional fashion stylist. A user is asking for advice: "${userPrompt}". 
        The current inventory includes: ${JSON.stringify(context.products.map((p: any) => ({name: p.name, category: p.category})))}.
        Provide friendly, stylish advice and recommend 1-2 items from the inventory. Keep it under 100 words.`,
      });
      return response.text;
    } catch (error) {
      console.error("AI Stylist Error:", error);
      return "I'm having a little trouble connecting to my fashion brain right now. How else can I help you today?";
    }
  }
}

export const aiStylist = new AIStylistService();
