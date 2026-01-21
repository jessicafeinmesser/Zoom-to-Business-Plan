
import { GoogleGenAI, Type } from "@google/genai";
import { AutomationResult } from "../types";

const API_KEY = process.env.API_KEY || "";

export const processMeetingNotes = async (meetingText: string): Promise<AutomationResult> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      Analyze the following meeting transcript/notes. 
      
      TASK:
      1. Provide a concise Summary in the SAME language as the meeting transcript.
      2. Generate a professional "High-Level Business Plan" tailored to the client's needs in the SAME language as the meeting transcript.
      3. Create a condensed "GHL Note" in the SAME language as the meeting transcript.
      
      If the input is Hebrew, the output MUST be in Hebrew. If the input is English, the output MUST be in English.
      
      TRANSCRIPT:
      ${meetingText}

      Format the output as a JSON object.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          businessPlan: { type: Type.STRING },
          ghlNote: { type: Type.STRING }
        },
        required: ["summary", "businessPlan", "ghlNote"]
      }
    }
  });

  const rawJson = response.text;
  const parsed = JSON.parse(rawJson);

  return {
    transcript: meetingText,
    summary: parsed.summary,
    businessPlan: parsed.businessPlan,
    ghlNote: parsed.ghlNote
  };
};

export const generatePythonScript = async (config: {
  zoomSecret: string;
  ghlApiKey: string;
  locationId: string;
}): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `
      Write a complete Python script (using FastAPI) that serves as a webhook endpoint for Zoom 'recording.completed'.
      
      SPECIFIC REQUIREMENTS:
      1. When the recording is received, use the Google Gemini API to transcribe the audio.
      2. EXPLICITLY INSTRUCT THE AI: "Transcribe the audio. Generate a summary and business plan in the ORIGINAL language of the spoken audio (e.g., if the audio is in Hebrew, write the plan in Hebrew)."
      3. Validate the Zoom Webhook Secret: "${config.zoomSecret}"
      4. Use GHL API Key: "${config.ghlApiKey}" and Location ID: "${config.locationId}".
      5. Include robust error handling for audio file processing.
      
      Use the google-generativeai Python SDK.
    `,
    config: {
      thinkingConfig: { thinkingBudget: 2000 }
    }
  });

  return response.text;
};
