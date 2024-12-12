import { fetchOpenAIResults } from "./dao.js";

export default function OpenAIRoutes(app) {
  const searchResults = async (req, res) => {
    try {
      const { query } = req.body; // Modern express.json() parses this
      const results = await fetchOpenAIResults(query);
      res.status(200).json({ results });
    } catch (error) {
      console.error("Error fetching OpenAI results:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching results." });
    }
  };

  app.post("/api/search", searchResults);
}
