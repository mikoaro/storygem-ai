import { NextResponse } from "next/server";
// Imports the Google Cloud client library
import textToSpeech from "@google-cloud/text-to-speech";
// Import other required libraries
// import fs from "fs";
// import util from "util";
import { PinataSDK } from "pinata";

// Creates a client
const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
});

// /api/test/generate-audio
export async function POST(req: Request, res: Response) {
  // export async function POST(req) {
  try {
    const { text, id } = await req.json();
    console.log(text);

    // Construct the request
    const request = {
      input: { text: text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      // select the type of audio encoding
      audioConfig: { audioEncoding: "MP3" },
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    // const writeFile = util.promisify(fs.writeFile);
    // await writeFile("output.mp3", response.audioContent, "binary");

    const audioBuffer = Buffer.from(response.audioContent, "binary");

    // Create a Blob from the ArrayBuffer
    const blob = new Blob([audioBuffer], { type: "audio/mpeg" });

    // Create a File object, Upload to PINATA & Get the URL
    let url = "";
    try {
      const file = new File([blob], `${id}.mp3`, { type: "audio/mpeg" });
      const upload = await pinata.upload.file(file);
      console.log(upload);

      const data = await pinata.gateways.get(
        upload.cid
      );
      console.log(data);

      url = await pinata.gateways.createSignedURL({
        cid: upload.cid,
        expires: 2629800,
      });
      console.log(url);
    } catch (error) {
      console.log(error);
    }

    // {
    //     id: '019285b2-1206-7f66-84ed-0cc58b914e3f',
    //     name: '24557c92-be73-430f-adb5-af9e0309927d.mp3',
    //     cid: 'bafybeieguba6ps6k3r5pgruqcdhanrtwud2blljvfrqefqljhgqfy5wjuy',
    //     created_at: '2024-10-13T11:44:53.017Z',
    //     size: 534144,
    //     number_of_files: 1,
    //     mime_type: 'audio/mpeg',
    //     user_id: 'ec34cd8b-ffea-4885-92fa-5116ca93e191'
    //   }
    //   {
    //     data: Blob { size: 534144, type: 'audio/mpeg' },
    //     contentType: 'audio/mpeg'
    //   }
    //   https://gray-fancy-rattlesnake-26.mypinata.cloud/files/bafybeieguba6ps6k3r5pgruqcdhanrtwud2blljvfrqefqljhgqfy5wjuy?X-Algorithm=PINATA1&X-Date=1728819894&X-Expires=2629800&X-Method=GET&X-Signature=3b55a739812d7bf50d30bd60afa9c959598b042abf53a395097084dea2d652cb

    
    return NextResponse.json({result: url});

    // return NextResponse.json(
    //   {
    //     // result: JSON.parse(result.response.text()),
    //     result: url,
    //   },
    //   { status: 200 }
    // );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error + " internal server error" },
      { status: 500 }
    );
  }
}
