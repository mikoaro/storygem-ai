import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

// Mock data structure (in a real app, you'd fetch this data from an API or database)
const cards = [
  { id: 1, title: "Latest Smartphone", description: "The newest flagship phone", image: "/placeholder.svg?height=400&width=600", category: "Technology", longDescription: "Experience the cutting-edge technology with our latest smartphone. Featuring an advanced camera system, powerful processor, and stunning display, this device sets a new standard for mobile computing." },
  { id: 2, title: "Laptop Revolution", description: "Next-gen laptops are here", image: "/placeholder.svg?height=400&width=600", category: "Technology", longDescription: "Discover the future of computing with our revolutionary laptops. Combining sleek design with unparalleled performance, these devices are perfect for both work and play." },
  { id: 3, title: "Mountain Peaks", description: "Explore the highest summits", image: "/placeholder.svg?height=400&width=600", category: "Nature", longDescription: "Embark on a journey to the world's most majestic mountain peaks. From the Himalayas to the Andes, experience breathtaking views and challenging climbs that will test your limits." },
  { id: 4, title: "Ocean Wonders", description: "Dive into the deep blue", image: "/placeholder.svg?height=400&width=600", category: "Nature", longDescription: "Plunge into the mysteries of the deep blue sea. Explore vibrant coral reefs, encounter fascinating marine life, and discover the beauty that lies beneath the waves." },
]

export default function DetailsPage({ params }: { params: { id: string } }) {
  const card = cards.find(c => c.id === parseInt(params.id))

  if (!card) {
    return <div>Card not found</div>
  }

  return (
    <main className="container mx-auto py-6">
      <Card className="overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          width={600}
          height={400}
          className="w-full h-64 object-cover"
        />
        <CardHeader>
          <CardTitle className="text-2xl">{card.title}</CardTitle>
          <CardDescription>{card.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Category: {card.category}</p>
          <p>{card.longDescription}</p>
        </CardContent>
        <div className="p-6">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </Card>
    </main>
  )
}