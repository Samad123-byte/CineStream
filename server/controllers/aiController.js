import axios from "axios";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
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
2. Never invent movie titles.
3. Never mix languages.
4. Reply only in English.
5. Format responses using Markdown (bold, bullet lists, short paragraphs).
6. Never use Markdown tables — replies are shown in a narrow chat bubble. Use a bold movie/show title followed by a short bullet point explaining it instead.
7. Keep recommendations concise.
8. Explain why each recommendation fits.
9. If you don't know something, say so instead of making it up.
10. If asked something unrelated to movies or TV, politely say:
"I'm CineStream AI 🤖. I specialize in movies and TV shows."

Always behave like a professional movie expert.
            `,
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