
import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
export default function Home() {
  return(
     <div>
      <div className="grid-background"></div>
      <HeroSection />
      <section className="w-full">
        <div className="mx-auto py-24 gradient rounded-lg">
          <div className=" flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
              Ready to Accelerate your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
              Join Thousands of professionals who are advancing their careers with AI-powered guidance.
            </p>
          </div>
        </div>
      </section>
    </div>
    
  );
}
