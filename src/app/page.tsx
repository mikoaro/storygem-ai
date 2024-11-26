"use client";

// import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Hero from "@/components/Hero";
// import Hero2 from "@/components/Hero2"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { db } from "@/configs/test/db";
import { useUser } from "@clerk/nextjs";
import { Users } from "@/configs/test/schema";
import { eq } from "drizzle-orm";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';



const categories = [
  {
    id: 1,
    name: "Technology",
    cards: [
      {
        id: 1,
        title: "Latest Smartphone",
        description: "The newest flagship phone",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        title: "Laptop Revolution",
        description: "Next-gen laptops are here",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    id: 2,
    name: "Nature",
    cards: [
      {
        id: 3,
        title: "Mountain Peaks",
        description: "Explore the highest summits",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 4,
        title: "Ocean Wonders",
        description: "Dive into the deep blue",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
];

export default function Home() {
  const { user } = useUser();
  const { push } = useRouter();

  useEffect(() => {
     push('/test/dashboard/image');
  }, []);

  useEffect(() => {
    user && isNewUser()
  }, [user])

  const isNewUser = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

    console.log(result)

    if (!result[0]) {
      await db.insert(Users).values({
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl
      });
    }
  };

  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // return (
  //   <div className="bg-white text-black min-h-screen">
  //     {/* Navbar */}
  //     <Header />

  //     {/* Hero Section */}
  //     <Hero />

  //     {/* Trending Now Section */}
  //     <section className="pb-20 bg-white -mt-24 pt-10">
  //       <div className="container mx-auto px-4">
  //         <h2 className="text-3xl font-semibold text-black mb-6">
  //           Trending Now
  //         </h2>
  //         <div className="flex flex-wrap">
  //           {[...Array(6)].map((_, i) => (
  //             <div
  //               key={i}
  //               className="lg:w-1/6 md:w-1/4 sm:w-1/3 w-1/2 px-2 mb-4"
  //             >
  //               <div className="relative">
  //                 <Image
  //                   alt={`Movie Thumbnail ${i + 1}`}
  //                   className="w-full h-auto rounded"
  //                   src={""}
  //                   width={300}
  //                   height={400}
  //                 />
  //                 <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
  //                   <Button variant="secondary" size="sm">
  //                     Play
  //                   </Button>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </section>
  //     <main className="container mx-auto py-6">
  //       <h1 className="text-3xl font-bold mb-6">Explore Categories</h1>
  //       {categories.map((category) => (
  //         <div key={category.id} className="mb-8">
  //           <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
  //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //             {category.cards.map((card) => (
  //               <Card key={card.id} className="overflow-hidden">
  //                 <Image
  //                   src={card.image}
  //                   alt={card.title}
  //                   width={300}
  //                   height={200}
  //                   className="w-full h-48 object-cover"
  //                 />
  //                 <CardHeader>
  //                   <CardTitle>{card.title}</CardTitle>
  //                   <CardDescription>{card.description}</CardDescription>
  //                 </CardHeader>
  //                 <CardFooter>
  //                   <Link
  //                     href={`/${category.name}/${card.id}`}
  //                     className="text-blue-500 hover:underline"
  //                   >
  //                     View Details
  //                   </Link>
  //                 </CardFooter>
  //               </Card>
  //             ))}
  //           </div>
  //         </div>
  //       ))}
  //     </main>
  //   </div>
  // );
}
