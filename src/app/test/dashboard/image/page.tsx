"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ArweaveWalletKit, ConnectButton } from "arweave-wallet-kit";
import { message, createDataItemSigner, result } from "@permaweb/aoconnect";
import { toast } from "sonner";

interface ImageData {
  id: string;
  url: string;
}

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nft, setNft] = useState("");
  const [nfts, setNfts] = useState<ImageData[]>([]);
  const myProcess = "gdHA99OPasQdMThnFqujwYBsPPyIpO4esle7fADcie0";

  async function mintNft(imageNft: string) {
    const response = await message({
      process: myProcess,
      tags: [{ name: "Action", value: "MintNft" }],
      signer: createDataItemSigner(window.arweaveWallet),
      data: imageNft,
    });
    const r = await result({
      message: response,
      process: myProcess,
    });
    // setMessageResponse(r.Messages[0].Data);
    toast(r.Messages[0].Data);
  }

  async function listNfts() {
    try {
      setLoading(true);
      const response = await message({
        process: myProcess,
        tags: [{ name: "Action", value: "ListNfts" }],
        signer: createDataItemSigner(window.arweaveWallet),
        data: nft,
      });
      const r = await result({
        message: response,
        process: myProcess,
      });
      console.log(r.Messages[0].Data);
      const data: ImageData[] = JSON.parse(r.Messages[0].Data);
      console.log(data);
      setNfts(data);
    } catch (err) {
      setError("An error occurred while fetching list");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const generateImage = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/test/generate-image-dall-e", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      console.log("Image URL: ", data);
      if (response.ok) {
        setImages((prevImages) => [data.imageUrl, ...prevImages]);
        setPrompt("");
        setNft(data.imageUrl);
        await mintNft(data.imageUrl);
        //await listNfts();
      } else {
        setError(data.error || "Failed to generate image");
      }
    } catch (err) {
      setError("An error occurred while generating the image");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listNfts();
  }, [])



  return (
    <ArweaveWalletKit
      config={{
        permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION"],
        ensurePermissions: true,
      }}
    >
      <ConnectButton profileModal={true} />
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-md mx-auto mb-8">
          <CardHeader>
            <CardTitle>AI Image Generator</CardTitle>
            <CardDescription>
              Enter a prompt to generate an image
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="prompt">Prompt</Label>
                <Input
                  id="prompt"
                  placeholder="Enter your prompt here"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={generateImage} disabled={loading || !prompt}>
              {loading ? "Generating..." : "Generate Image"}
            </Button>
          </CardFooter>
        </Card>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {nfts.map((image, index) => (
            <div key={index} className="relative aspect-square">
             <Image
                src={image.url}
                alt={`Generated Image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
                className="rounded-lg shadow-lg object-cover"
              />
         
            </div>
          ))}
        </div>
      </div>
    </ArweaveWalletKit>
  );
}
