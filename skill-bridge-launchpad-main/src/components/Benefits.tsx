import { Target, TrendingUp, Shield, Clock } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Perfect Matches",
    description: "Our smart algorithm ensures you only see opportunities that align with your skills and interests.",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Income",
    description: "Turn downtime into earnings. Work on projects that fit your schedule and expertise level.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Safe and reliable payment processing. Get paid for your work without hassle or delays.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Work when you want, where you want. Full-time, part-time, or just occasional projects.",
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Why Choose Skill Bridge?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The smartest way to monetize your technical expertise
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex flex-col space-y-4 p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent transition-colors">
                  <Icon className="h-6 w-6 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
