import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { formData } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are a professional resume writer.
      Based on this data: ${JSON.stringify(formData)},
      return ONLY a valid JSON object with this exact structure:
      {
        "personal": {
          "name": "",
          "phone": "",
          "email": "",
          "linkedin": "",
          "location": ""
        },
        "summary": "A strong two to three sentence professional summary highlighting skills, experience, and career goals.", 
        "skills": ["Skill 1", "Skill 2"],
        "experience": ["Bullet point about experience", "Another bullet"],
        "education": ["Education entry", "Another education entry"],
        "projects": ["Project entry", "Another project entry"]
      }
      Rules:
      - No HTML, no markdown.
      - Keep skills concise.
      - Use action verbs in experience & projects.
      - Summary must be based only on the provided user data.
      - Keep everything professional.
    `;

    let jsonResponse = null;

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        jsonResponse = JSON.parse(text);
        break;
      } catch (err) {
        console.error(`Gemini attempt ${attempt + 1} failed:`, err.message);
        if (attempt < 1) await new Promise(res => setTimeout(res, 2000 * (attempt + 1)));
      }
    }

    if (!jsonResponse) {
      return new Response(JSON.stringify({ error: "overloaded" }), { status: 503 });
    }

    return new Response(JSON.stringify(jsonResponse), { status: 200 });
  } catch (error) {
    console.error("Resume Generation Error:", error);
    return new Response(JSON.stringify({ error: "server_error" }), { status: 500 });
  }
}
