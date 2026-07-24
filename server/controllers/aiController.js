import axios from "axios";

export const chatWithAI = async (req, res) => {
  try {

   const {
  message,
  page,
  movie,
  history,
} = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

  let context = "";

if (page) {
  context += `Current Page: ${page}\n`;
}

if (movie) {
  context += `
Current Movie:
Title: ${movie.title}
Overview: ${movie.overview}
Genres: ${movie.genres?.join(", ")}
Rating: ${movie.rating}
Release Date: ${movie.releaseDate}
`;
}

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
       model: "openai/gpt-oss-20b:free",

      messages: [
  {
    role: "system",
    content: `
You are CineStream AI, an expert movie recommendation assistant.

Your purpose is to help users discover movies and TV shows.

Rules:

1. Recommend only real movies and TV shows.
2. Never invent titles.
3. Reply only in English.
4. Use Markdown.
5. Never use Markdown tables.
6. Keep answers concise.
7. Explain WHY each recommendation fits.
8. Never answer unrelated topics.
9. If asked something outside movies or TV, reply:
"I'm CineStream AI 🤖. I specialize in movies and TV shows."

You also receive information about the user's current page, current movie and recent conversation.

If the current movie is available, use it to personalize your recommendations.

If the user says:

"Recommend something"

while viewing Interstellar,

assume they want recommendations similar to Interstellar.

Never ignore the provided context.
`,
  },

  ...(history || []),

  {
    role: "system",
    content: context,
  },

  {
    role: "user",
    content: message,
  },
],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      success: true,
      reply: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};