import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section id="get-started" className="py-20 md:py-28 bg-card">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 md:p-16 shadow-[var(--shadow-lg)]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNGgydjJoLTJ2LTJ6bTAgNGgtMnYyaDJ2LTJ6bTAtOHYyaDJ2LTJoLTJ6bS0yLTJ2Mmgydi0yaC0yem0tMiAwaDJ2LTJoLTJ2MnptMCAwdi0ySDMwdjJoMnptLTQgMGgydi0yaC0ydjJ6bS0yIDBoMnYtMmgtMnYyem0tMiAyaDJ2LTJoLTJ2MnptMCAydjJoMnYtMmgtMnptMCAyaC0ydjJoMnYtMnptMiAydjJoMnYtMmgtMnptMiAwaDJ2LTJoLTJ2MnptMCAwaC0ydjJoMnYtMnptMiAyaDJ2LTJoLTJ2MnptMi0yaC0ydjJoMnYtMnptMC0ydjJoMnYtMmgtMnptMC0yaDJ2LTJoLTJ2MnptMC0ydjJoMnYtMmgtMnptLTItMnYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
          
          <div className="relative text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
              Ready to Turn Skills Into Income?
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of tech professionals already earning with Skill Bridge. Get matched with your first opportunity in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground group"
              >
                Create Your Profile
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
