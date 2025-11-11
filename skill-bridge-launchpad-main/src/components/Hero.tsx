import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      
      <div className="container relative px-4 py-20 md:py-28 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Turn Your Skills Into{" "}
                <span className="text-accent">Opportunities</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl max-w-2xl">
                Connect your tech skills with money-making opportunities. Skill Bridge matches your expertise with projects, gigs, and jobs that pay.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground group"
              >
                Start Matching
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-border hover:bg-muted"
              >
                See How It Works
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-foreground">$2M+</div>
                <div className="text-sm text-muted-foreground">Earned by Users</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Match Rate</div>
              </div>
            </div>
          </div>

          <div className="relative lg:order-last">
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
              <img
                src={heroImage}
                alt="Tech professionals collaborating"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
