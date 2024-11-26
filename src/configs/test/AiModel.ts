import { api } from '@/convex/_generated/api';
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);



const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});


const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a script to generate 30 seconds video on topic: Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and contentText as field",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "imagePrompt": "A bustling medieval marketplace, full of people, stalls selling goods, and animals. The sky is overcast, with a hint of rain in the air.",\n    "contentText": "In the heart of 14th century London, a young woman named Agnes stood on the edge of the bustling marketplace, her heart pounding with fear. The plague, a horrifying disease that swept across Europe, had reached the city\'s gates, leaving a trail of death in its wake."\n  },\n  {\n    "imagePrompt": "A close-up of Agnes\' face, a mixture of fear and determination in her eyes. Her features are etched with worry.",\n    "contentText": "Agnes, a skilled herbalist, knew the plague\'s devastating effects. The city\'s doctors were helpless, their remedies failing to stop the relentless spread of the disease. Agnes, however, believed she could find a way to fight back."\n  },\n  {\n    "imagePrompt": "Agnes in her small cottage, surrounded by herbs and books, her face illuminated by the flickering candlelight.",\n    "contentText": "She spent long hours researching ancient texts, experimenting with different herbs and remedies. The pressure was immense, knowing that each passing day brought more deaths."\n  },\n  {\n    "imagePrompt": "Agnes walking through a darkened street, the faces of the townspeople are shrouded in fear. The streets are empty, except for the occasional cart carrying the dead.",\n    "contentText": "Fear gripped the city. People died in their homes, their families too terrified to touch their bodies. The streets were eerily quiet, punctuated only by the mournful tolls of the death bell."\n  },\n  {\n    "imagePrompt": "Agnes kneeling beside a sick person, administering a concoction made from herbs. The sick person looks weak but hopeful.",\n    "contentText": "Agnes, defying the fear, ventured into the plague-stricken houses. She treated the sick with her herbal concoctions, her touch bringing a flicker of hope in the face of despair."\n  },\n  {\n    "imagePrompt": "A montage of Agnes\'s success. People recovering from the plague, children playing, life returning to the streets. The sun shines brightly.",\n    "contentText": "Her remedies worked. Slowly but surely, the death toll began to decline. People began to recover, their faces regaining their lost color. Life, though tinged with sadness for those lost, started to return to the city."\n  },\n  {\n    "imagePrompt": "Agnes standing proudly in the marketplace, surrounded by grateful townspeople. The sun shines brightly on her face.",\n    "contentText": "Agnes, the young woman who dared to fight, became a beacon of hope. The people hailed her as their savior, their gratitude etched in their eyes."\n  }\n]\n```\n\n**How to use this JSON:**\n\n1. **Image Generation:** Use the `imagePrompt` text to generate AI images. You can use tools like Midjourney, DALL-E, or Stable Diffusion.\n2. **Video Editing:** Use the `contentText` as narration for your video. Combine the generated images with the narration to create a 30-second video.\n\n**Tips:**\n\n* **Adjust the image prompts:**  You can modify the prompts to better suit your desired visual style.\n* **Add music and sound effects:** Enhance the emotional impact of the video with appropriate sound design.\n* **Keep it concise:**  A 30-second video requires a concise and engaging story.\n* **Focus on the emotional impact:**  Emphasize Agnes\'s courage, the fear of the plague, and the relief of recovery. \n\nRemember, the success of the video depends on the quality of both the images and the narration. Use this JSON as a starting point and tailor it to your specific needs.\n',
        },
      ],
    },
  ],
});

export default chatSession;

// curl \
//   -H 'Content-Type: application/json' \
//   -d '{"contents":[{"parts":[{"text":"Explain how AI works"}]}]}' \
//   -X POST 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY'
