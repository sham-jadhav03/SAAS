import { GoogleGenerativeAI } from "@google/generative-ai"


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

export const genarateResult = async (prompt) => {

    const result = await model.generateContent(prompt)

    return result.response.text();
}

