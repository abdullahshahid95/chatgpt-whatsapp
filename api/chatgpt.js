const { OPENAI_API_KEY } = process.env,
  url = "https://api.openai.com/v1/engines/davinci/completions";

const getCompletion = async (prompt) => {
  return await axios.post(
    url,
    {
      prompt,
      temperature: 0.5,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );
};

module.exports = {
  getCompletion,
};
