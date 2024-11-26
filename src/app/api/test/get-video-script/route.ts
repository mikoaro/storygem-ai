import chatSession from "@/configs/test/AiModel";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const schema = {
  description: "List of video scripts",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      imagePrompt: {
        type: SchemaType.STRING,
        description: "image prompt",
        nullable: false,
      },
      contentText: {
        type: SchemaType.STRING,
        description: "content text",
        nullable: false,
      },
    },
    required: ["imagePrompt", "contentText"],
  },
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

// /api/test/get-video-script
// export async function POST(req: Request, res: Response) {
export async function POST(request: NextRequest) {
  // console.log("apiKey =======");
  // console.log(apiKey);

  // export async function POST(req) {
  try {
    const { prompt } = await request.json();
    // console.log(prompt);

    console.log("result --- response -- text 1");
    // const result = await chatSession.sendMessage(prompt);
    const result = await model.generateContent(prompt);
    
    console.log(result.response.text());
    console.log("result --- response -- text 2");

    return NextResponse.json(result.response.text());

    // return NextResponse.json(
    //   {
    //     result: JSON.parse(result.response.text()),
    //   },
    //   { status: 200 }
    // );
  } catch (error) {
    return NextResponse.json(
      { error: error + " internal server error" },
      { status: 500 }
    );
  }
}


// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(request: NextRequest) {
//   // Parse the JSON body from the request
//   const body = await request.json();

//   // Log the received body (in a real application, you might use this for filtering or searching)
//   console.log('Received body:', body);

//   // This is mock data. In a real application, you'd typically fetch this from a database.
//   const products = [
//     { id: 1, name: 'Laptop', price: 999.99 },
//     { id: 2, name: 'Smartphone', price: 699.99 },
//     { id: 3, name: 'Headphones', price: 199.99 },
//     { id: 4, name: 'Tablet', price: 499.99 },
//   ];

//   // Simulate a slight delay to show loading state
//   await new Promise(resolve => setTimeout(resolve, 1000));

//   // You could use the body to filter products here
//   // For example, if body.filter === 'expensive', you could filter products over a certain price

//   return NextResponse.json(products);
// }