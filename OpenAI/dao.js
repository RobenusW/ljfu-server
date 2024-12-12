import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Fetch results from OpenAI API
export const fetchOpenAIResults = async (query) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `Provide a list of ${query} with a short description for each.`,
        },
      ],
      max_tokens: 200,
    });

    const resultText = response.choices[0].message.content;

    // Parse OpenAI's response into structured data
    const results = resultText
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((item) => {
        const [title, description] = item.split(":");
        return { title: title.trim(), description: description.trim() };
      });

    return results;
  } catch (error) {
    console.error("Error fetching results from OpenAI:", error);
    throw new Error("Failed to fetch results from OpenAI");
  }
};
