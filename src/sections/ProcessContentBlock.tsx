import React, { memo } from "react";
import { ProcessBlockConfig } from "@/config/siteConfig";
import RevealBlock from "@/components/core/RevealBlock";
import SplitText from "@/components/core/SplitText";
import ParallaxLayer from "@/components/core/ParallaxLayer";
import {
  Zap, Layers, Shield, Sparkles, Rocket, Palette,
  Code2, BarChart3, Globe, Lock, MessageSquare, PenTool, Layout, Target,
  LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Zap, Layers, Shield, Sparkles, Rocket, Palette,
  Code2, BarChart3, Globe, Lock, MessageSquare, PenTool, Layout, Target,
};

const DECORATIVE_BUBBLES = [
  { speed: 0.2, position: "top-[10%] left-[5%]", size: "w-64 h-64", delay: '0s', variant: 'glass' },
  { speed: 0.35, position: "bottom-[10%] right-[8%]", size: "w-56 h-56", delay: '-2s', variant: 'glass' },
  { speed: -0.15, position: "top-[40%] left-[75%]", size: "w-40 h-40", delay: '-4s', variant: 'glass' },
  { speed: 0.1, position: "bottom-[30%] left-[10%]", size: "w-24 h-24", delay: '-1s', variant: 'glass' },
  { speed: 0.5, position: "top-[60%] left-[20%]", size: "w-16 h-16", variant: 'glow', color: "bg-primary/20", extraClass: "opacity-50 blur-xl" },
  { speed: -0.2, position: "top-[20%] right-[30%]", size: "w-32 h-32", variant: 'glow', color: "bg-secondary/30", extraClass: "opacity-30 blur-2xl" },
];

interface ProcessContentBlockProps {
  data: ProcessBlockConfig;
}

const ProcessContentBlock = memo(({ data }: ProcessContentBlockProps) => {
  return (
    <section id={data.id} className="relative py-20 md:py-28 overflow-hidden">
      {/* Decorative parallax elements */}
      {DECORATIVE_BUBBLES.map((bubble, idx) => (
        <ParallaxLayer 
          key={idx} 
          speed={bubble.speed} 
          className={`absolute ${bubble.position} pointer-events-none select-none z-0 ${bubble.extraClass || ""}`}
        >
          <div 
            className={`${bubble.size} rounded-full ${bubble.variant === 'glass' ? 'glass-bubble' : bubble.color}`} 
            style={bubble.delay ? { animationDelay: bubble.delay } : {}} 
            aria-hidden="true" 
          />
        </ParallaxLayer>
      ))}

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
          {/* Vertical line - hidden on mobile, shown from sm up */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden sm:block" />

          <div className="space-y-12">
            {data.steps.map((step, i) => {
              const Icon = iconMap[step.icon];
              const isEven = i % 2 === 0;

              return (
                <RevealBlock key={i} delay={i * 150}>
                  <div
                    className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content Card */}
                    <div className={`flex-1 w-full ${isEven ? "md:text-right" : "md:text-left"}`}>
                      <div className="glass-subtle rounded-2xl p-6 hover:glass-strong transition-all duration-500 group">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shadow-[0_0_20px_hsla(var(--primary),0.15)] bg-background">
                      {Icon ? (
                        <Icon className="w-5 h-5 text-primary" />
                      ) : (
                        <span className="text-sm font-bold text-primary">
                          {i + 1}
                        </span>
                      )}
                    </div>

                    {/* Spacer for desktop layout */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

ProcessContentBlock.displayName = "ProcessContentBlock";

export default ProcessContentBlock;

