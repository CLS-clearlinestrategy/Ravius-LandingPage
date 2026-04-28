import { ProcessBlockConfig } from "@/config/siteConfig";
import RevealBlock from "@/components/core/RevealBlock";
import SplitText from "@/components/core/SplitText";
import ParallaxLayer from "@/components/core/ParallaxLayer";
import {
  Zap, Layers, Shield, Sparkles, Rocket, Palette,
  Code2, BarChart3, Globe, Lock, MessageSquare, PenTool, Layout, Target,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Layers, Shield, Sparkles, Rocket, Palette,
  Code2, BarChart3, Globe, Lock, MessageSquare, PenTool, Layout, Target,
};

interface ProcessContentBlockProps {
  data: ProcessBlockConfig;
}

const ProcessContentBlock = ({ data }: ProcessContentBlockProps) => {
  return (
    <section id={data.id} className="relative py-20 md:py-28 overflow-hidden">
      {/* Decorative parallax elements */}
      <ParallaxLayer speed={0.2} className="absolute top-[10%] left-[5%] pointer-events-none select-none z-0">
        <div className="w-64 h-64 rounded-full glass-bubble" style={{ animationDelay: '0s' }} aria-hidden="true" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.35} className="absolute bottom-[10%] right-[8%] pointer-events-none select-none z-0">
        <div className="w-56 h-56 rounded-full glass-bubble" style={{ animationDelay: '-2s' }} aria-hidden="true" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.15} className="absolute top-[40%] left-[75%] pointer-events-none select-none z-0">
        <div className="w-40 h-40 rounded-full glass-bubble" style={{ animationDelay: '-4s' }} aria-hidden="true" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.1} className="absolute bottom-[30%] left-[10%] pointer-events-none select-none z-0">
        <div className="w-24 h-24 rounded-full glass-bubble" style={{ animationDelay: '-1s' }} aria-hidden="true" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.5} className="absolute top-[60%] left-[20%] pointer-events-none select-none z-0 opacity-20 blur-xl">
        <div className="w-16 h-16 rounded-full bg-primary/20" aria-hidden="true" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.2} className="absolute top-[20%] right-[30%] pointer-events-none select-none z-0 opacity-15 blur-2xl">
        <div className="w-32 h-32 rounded-full bg-secondary/30" aria-hidden="true" />
      </ParallaxLayer>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <RevealBlock className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            <SplitText
              text={data.title}
              tag="span"
              splitType="words"
              delay={40}
              duration={1}
              ease="power3.out"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              className="inline"
              textAlign="center"
            />{" "}
            {data.highlight && (
              <SplitText
                text={data.highlight}
                tag="span"
                splitType="chars"
                delay={35}
                duration={0.9}
                ease="power3.out"
                from={{ opacity: 0, y: 25 }}
                to={{ opacity: 1, y: 0 }}
                className="text-primary inline"
                textAlign="center"
              />
            )}
          </h2>
          {data.description && (
            <p className="text-muted-foreground text-lg leading-relaxed">
              {data.description}
            </p>
          )}
        </RevealBlock>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden sm:block" />

          <div className="space-y-12">
            {data.steps.map((step, i) => {
              const Icon = iconMap[step.icon];
              const isEven = i % 2 === 0;

              return (
                <div
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div className="glass-subtle rounded-2xl p-6 hover:glass-strong transition-all duration-500">
                      <RevealBlock key={i} delay={i * 150}>

                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </RevealBlock>
                    </div>
                  </div>

                  <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shadow-[0_0_20px_hsla(var(--primary),0.15)]">
                    {Icon ? (
                      <Icon className="w-5 h-5 text-primary" />
                    ) : (
                      <span className="text-sm font-bold text-primary">
                        {i + 1}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>

              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessContentBlock;
