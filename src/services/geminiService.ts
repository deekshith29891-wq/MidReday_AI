/**
 * Service to interface with live Google Gemini API or OpenAI API if configured in Settings.
 * Fallback is handled automatically by the local Medical AI Specialist Engine.
 */
export class GeminiService {
  static async queryGeminiLive(prompt: string, apiKey?: string, systemInstruction?: string): Promise<string | null> {
    if (!apiKey) {
      return null;
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemInstruction ? systemInstruction + '\n\n' : ''}${prompt}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        console.warn('Gemini API returned error status, falling back to local specialist engine:', response.status);
        return null;
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return text || null;
    } catch (err) {
      console.warn('Live AI network call failed, gracefully using Demo AI Specialist Engine', err);
      return null;
    }
  }
}
