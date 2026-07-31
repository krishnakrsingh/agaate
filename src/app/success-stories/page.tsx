import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories | Agaate",
  description: "Read stories of farmers who transformed their yield with Agaate.",
};

export default function SuccessStoriesPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-6">Success Stories</h1>
      <p className="text-xl text-muted-foreground max-w-2xl">
        Real results from real farmers across India.
      </p>
    </div>
  );
}
