import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Center | Agaate",
  description: "Educational content for modern farming.",
};

export default function KnowledgeCenterPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-6">Knowledge Center</h1>
      <p className="text-xl text-muted-foreground max-w-2xl">
        Farming guides, best practices, and expert articles.
      </p>
    </div>
  );
}
