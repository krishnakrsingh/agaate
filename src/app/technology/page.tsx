import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology | Agaate",
  description: "Precision farming technology for every field.",
};

export default function TechnologyPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 bg-white">
      <div className="relative h-[40vh] w-full mb-12">
        <img src="https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=2070&auto=format&fit=crop" alt="Agaate Technology" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white uppercase tracking-wider">Technology Showcase</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 pb-24">
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">
          AI, IoT sensors, and drones bringing precision farming to your field.
        </p>
      </div>
    </div>
  );
}
