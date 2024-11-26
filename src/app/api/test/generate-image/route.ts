import Replicate from "replicate";
import { NextResponse } from "next/server";
import axios from "axios";
import { PinataSDK } from "pinata";
import fs from "fs";
import util from "util";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
});

// /api/test/generate-image
export async function POST(req: Request, res: Response) {
  try {
    const { prompt } = await req.json();

    console.log(prompt);

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // const replicate = new Replicate({
    //   auth: process.env.REPLICATE_API_TOKEN,
    //   useFileOutput: false
    // });
    // https://github.com/replicate/replicate-javascript/issues/320
    

    const model =
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637";

    const input = {
      input: {
        width: 1024,
        height: 1280,
        prompt: prompt,
        scheduler: "K_EULER",
        num_outputs: 1,
        guidance_scale: 0,
        negative_prompt: "worst quality, low quality",
        num_inference_steps: 4,
      },
    };

    //console.log(input);

    const output = await replicate.run(model, { input });
    console.log(output);
    //=> ["https://replicate.delivery/yhqm/VyD24fDyzM2nQSg0nQc58W2...

    // Save to PINATA
    // const base64String =
    //   "data:image/png;base64," + (await convertImageToBase64(output[0]));
    const fileName = Date.now().toString();

    // const file = new File([base64String], `${fileName}.png`, {
    //   type: "image/png",
    // });
    // const upload = await pinata.upload.file(file);
    // const upload = await pinata.upload.base64(base64String);
    // const upload = await pinata.upload.base64(base64String).addMetadata({
    //   name: `${fileName}.png`,
    // });

    // Write the binary audio content to a local file
    // const writeFile = util.promisify(fs.writeFile);
    // await writeFile("output.mp3", response.audioContent, "binary");

    const imageBuffer = await convertImageToBase64(output[0]) //Buffer.from(output[0], "utf-8");

    // Create a Blob from the ArrayBuffer
    const blob = new Blob([imageBuffer], { type: "image/png" });

    const file = new File([blob], `${fileName}.png`, { type: "image/png" });
    const upload = await pinata.upload.file(file);
    // console.log(upload);

    const pinataFileUrl = await pinata.gateways.createSignedURL({
      cid: upload.cid,
      expires: 2629800,
    });
    console.log(pinataFileUrl);

    return NextResponse.json(
      {
        result: pinataFileUrl,
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

const convertImageToBase64 = async (outputUrl) => {
  try {
    const response = await axios.get(outputUrl, {
      responseType: "arraybuffer",
    });
    // const base64String = Buffer.from(response.data).toString("base64");
    // return base64String;
    const buffer = Buffer.from(response.data, "utf-8");
    return buffer;
  } catch (error) {
    console.log("Error", error);
  }
};

