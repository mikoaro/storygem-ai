import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

// /api/test/generate-caption
export async function POST(req: Request, res: Response) {
  // export async function POST(req) {
  try {
    const { audioFileUrl } = await req.json();

    const client = new AssemblyAI({
      apiKey: process.env.ASSEMBLYAI_CAPTION_API_KEY,
    });

    const FILE_URL = audioFileUrl;

    // You can also transcribe a local file by passing in a file path
    // const FILE_URL = './path/to/file.mp3';

    // Request parameters
    const data = {
      audio: FILE_URL,
    };

    const transcript = await client.transcripts.transcribe(data);
    console.log(transcript.text);

    return NextResponse.json(
      {
        result: transcript,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error + " internal server error" },
      { status: 500 }
    );
  }
}
