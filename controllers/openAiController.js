const { Configuration, OpenAIApi, default: OpenAI } = require('openai');

// Check if API key is provided
if (!process.env.OPENAI_API_KEY) {
  console.error('Please provide your OpenAI API key in the OPENAI_API_KEY environment variable.');
  process.exit(1);
}

// Configure OpenAI API
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;

  // Map size to image dimensions
  const imageSize = {
    small: '256x256',
    medium: '512x512',
    large: '1024x1024',
  }[size] || '512x512'; // Default to medium size

  try {
    // Call OpenAI API to generate image
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};

module.exports = { generateImage };
