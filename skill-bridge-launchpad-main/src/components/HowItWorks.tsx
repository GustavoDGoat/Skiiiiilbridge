import { UserPlus, Zap, Wallet } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Add Your Skills",
    description: "Create your profile and list your tech skills. From coding to design, we match all expertise.",
  },
  {
    icon: Zap,
    title: "Get Matched",
    description: "Our AI algorithm connects you with relevant opportunities that fit your skill set and preferences.",
  },
  {
    icon: Wallet,
    title: "Start Earning",
    description: "Accept projects, complete work, and get paid. It's that simple to monetize your expertise.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-card">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to start earning with your skills
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-background border border-border hover:shadow-[var(--shadow-md)] transition-all"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent">
                  <Icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-border" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
