export interface NavLink {
  label: string;
  href: string;
}



export interface BackgroundGifConfig {
  /** @deprecated kept for reference. Use videoWebm / videoMp4 instead. */
  gifUrl: string;
  /** WebM (VP9) primary format: ~60% smaller, GPU-composited */
  videoWebm?: string;
  /** MP4 (H.264) Safari / iOS fallback */
  videoMp4?: string;
  overlayColor: string;
  blur: string;
}

export interface ScrollVideoSlide {
  title: string;
  highlight?: string;
  description?: string;
}

export interface ScrollVideoConfig {
  src: string;
  scrollHeight: string;
  videoOpacity: number;
  slides: ScrollVideoSlide[];
  /**
   * Static image rendered on mobile instead of the scroll-scrubbed video.
   * Gets a GPU-accelerated parallax effect. Falls back to no image if omitted.
   */
  mobileFallbackImage?: string;
}

/* ── Content Block Discriminated Union ── */

interface BaseBlock {
  id: string;
  title: string;
  highlight?: string;
  description?: string;
}

export interface ImageBlockConfig extends BaseBlock {
  type: "image";
  imageUrl: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  features?: string[];
}

export interface VideoBlockConfig extends BaseBlock {
  type: "video";
  videoUrl: string;
  posterImage?: string;
  videoPosition?: "left" | "right";
}

export interface FeatureBlockItem {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesBlockConfig extends BaseBlock {
  type: "features";
  items: FeatureBlockItem[];
}

export interface FAQBlockConfig extends BaseBlock {
  type: "faq";
  questions: { question: string; answer: string }[];
}

export interface TestimonialsBlockConfig extends BaseBlock {
  type: "testimonials";
  testimonials: { name: string; role: string; content: string; avatarUrl: string }[];
}

export interface LogoBarBlockConfig extends BaseBlock {
  type: "logobar";
  logos: { name: string; logoUrl: string }[];
}

export interface ProcessBlockConfig extends BaseBlock {
  type: "process";
  steps: { icon: string; title: string; description: string }[];
}

export interface TeamBlockConfig extends BaseBlock {
  type: "team";
  members: { name: string; role: string; photoUrl: string }[];
}

export interface StatsBlockConfig extends BaseBlock {
  type: "stats";
  stats: { value: string; label: string }[];
}

export interface ContactBlockConfig {
  id: string;
  type: "contact";
}

export interface ExperiencesBlockConfig {
  id: string;
  type: "experiences";
}

export type ContentBlockConfig =
  | ImageBlockConfig
  | VideoBlockConfig
  | FeaturesBlockConfig
  | FAQBlockConfig
  | TestimonialsBlockConfig
  | LogoBarBlockConfig
  | ProcessBlockConfig
  | TeamBlockConfig
  | StatsBlockConfig
  | ContactBlockConfig
  | ExperiencesBlockConfig;

export interface ExperienceCard {
  icon: string;
  title: string;
  description: string;
  tag?: string;
}

export interface ContactFormContent {
  title: string;
  subtitle: string;
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  nav: NavLink[];

  scrollVideo: ScrollVideoConfig;
  features: FeatureItem[];
  contentBlocks: ContentBlockConfig[];
  experiences: {
    title: string;
    subtitle: string;
    cards: ExperienceCard[];
  };
  contact: ContactFormContent;
  footer: {
    copyright: string;
    tagline: string;
    socials: SocialLink[];
  };
  backgroundGif: BackgroundGifConfig;
}

export const siteConfig: SiteConfig = {
  name: "Ravius",
  description: "Plataforma moderna para escalar seu negócio digital.",

  nav: [
    { label: "Início", href: "#scroll-video" },
    { label: "Serviços", href: "#differentials" },
    { label: "Contato", href: "#contact" },
  ],

  backgroundGif: {
    // ─── GIF source (kept for reference / emergency fallback) ───────────────
    gifUrl: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmpxcXoxN252N3R2MzZzaTRvcGJzNHY5MDJ2aXNzM3hranRtdXI0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3BZHlKZbrJwL0buDOc/giphy.gif",
    // ─── Preferred: local looping video (add files to /public after encoding) ─
    // Convert with: ffmpeg -i input.gif -c:v libvpx-vp9 -b:v 0 -crf 40 -an /public/bg-loop.webm
    //               ffmpeg -i input.gif -c:v libx264 -crf 35 -an /public/bg-loop.mp4
    videoWebm: "/bg-loop.webm",
    videoMp4: "/bg-loop.mp4",
    overlayColor: "bg-black/80",
    blur: "blur-3xl",
  },



  scrollVideo: {
    src: "/herovideo-op.mp4",
    scrollHeight: "300vh",
    videoOpacity: 0.5,
    mobileFallbackImage: "/01.png",
    slides: [
      {
        title: "Você merece um sistema",
        highlight: "melhor.",
        description: "Software ruim é barato e custa caro. Resolva isso.",
      },
      {
        title: "Transformamos sistemas em vantagem competitiva.",
        description: "Fundamos a Ravius para mudar a realidade das empresas.",
      },
    ],
  },

  features: [
    { icon: "Zap", title: "Performance extrema", description: "Otimizado com requestAnimationFrame e lazy loading para 60fps constantes." },
    { icon: "Layers", title: "Modular por design", description: "Hooks isolados, config centralizada e componentes desacoplados." },
    { icon: "Shield", title: "TypeScript estrito", description: "Interfaces tipadas para cada dado, garantindo segurança e previsibilidade." },
    { icon: "Sparkles", title: "Animações sofisticadas", description: "Parallax, scroll reveal e transições suaves com Lenis integrado." },
  ],

  contentBlocks: [
    {
      id: "differentials",
      type: "features",
      title: "Conheça nossas",
      highlight: "especialidades",
      description:
        "Cada detalhe foi projetado para entregar a melhor experiência possível, do código à interface final.",
      items: [
        { icon: "Code2", title: "Softwares sob medida", description: "Sistemas robustos e escaláveis desenvolvidos especificamente para as necessidades únicas do seu negócio." },
        { icon: "Layout", title: "Sites modernos que captam leads", description: "Design premium focado em conversão, com performance extrema e SEO otimizado para o Google, isso aumenta o alcance do seu negócio." },
        { icon: "Rocket", title: "Entregas rápidas", description: "Metodologia ágil e arquitetura modular que permitem colocar seu projeto no ar em tempo recorde." },
        { icon: "Target", title: "Consultorias estratégicas", description: "Direcionamento técnico especializado para garantir a melhor escolha de tecnologia e infraestrutura." },
      ],
    },
    {
      id: "stats",
      type: "stats",
      title: "Resultados que",
      highlight: "falam por si",
      description: "Números reais de clientes que adotaram o Padrão Ravius em seus negócios.",
      stats: [
        { value: "+100%", label: "Aumento em conversões" },
        { value: "1.2s", label: "Tempo médio de carregamento" },
        { value: "+20", label: "Projetos entregues" },
      ],
    },

    /*
    {
      id: "demo-video",
      type: "video",
      title: "Veja em",
      highlight: "ação",
      description:
        "Assista como o Padrão Ravius acelera a criação de interfaces modernas com scroll suave, parallax e animações baseadas em física real.",
      videoUrl: "https://www.youtube.com/embed/k2maqlyUuVw",
      posterImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
      videoPosition: "left",
    },
    */
    {
      id: "process",
      type: "process",
      title: "Como",
      highlight: "funciona",
      description: "Um processo claro e eficiente para transformar sua presença digital em semanas, não meses.",
      steps: [
        { icon: "MessageSquare", title: "Descoberta", description: "Entendemos seu negócio, público-alvo e objetivos para traçar a estratégia ideal." },
        { icon: "PenTool", title: "Design & Prototipação", description: "Criamos protótipos interativos com seu branding aplicado ao Padrão Ravius." },
        { icon: "Code2", title: "Desenvolvimento", description: "Implementação modular com as melhores tecnologias, testes e disponibilidade total." },
        { icon: "Rocket", title: "Lançamento & Suporte", description: "Deploy em produção com monitoramento, analytics e suporte contínuo pós-lançamento." },
      ],
    },
    {
      id: "contact",
      type: "contact",
    },
    {
      id: "logos",
      type: "logobar",
      title: "Empresas que",
      highlight: "confiam",
      description: "Parceiros e clientes que já utilizam o Padrão Ravius em seus projetos.",
      logos: [
        { name: "Clínica Visage", logoUrl: "https://placehold.co/160x48/0A0A0A/FFFDE0?text=Visage&font=outfit" },
        { name: "Aura Spa", logoUrl: "https://placehold.co/160x48/0A0A0A/FFFDE0?text=Aura+Spa&font=outfit" },
        { name: "Solutio", logoUrl: "https://placehold.co/160x48/0A0A0A/FFFDE0?text=Solutio&font=outfit" },
        { name: "Agência Nix", logoUrl: "https://placehold.co/160x48/0A0A0A/FFFDE0?text=Agência Nix&font=outfit" },
        { name: "Clínica Visage", logoUrl: "https://placehold.co/160x48/0A0A0A/FFFDE0?text=Visage&font=outfit" },
        { name: "Aura Spa", logoUrl: "https://placehold.co/160x48/0A0A0A/FFFDE0?text=Aura+Spa&font=outfit" },
        { name: "Solutio", logoUrl: "https://placehold.co/160x48/0A0A0A/FFFDE0?text=Solutio&font=outfit" },
        { name: "Agência Nix", logoUrl: "https://placehold.co/160x48/0A0A0A/FFFDE0?text=Agência Nix&font=outfit" }
      ],
    },
    {
      id: "testimonials",
      type: "testimonials",
      title: "O que nossos clientes",
      highlight: "dizem",
      description: "Depoimentos reais de profissionais que transformaram seus negócios com o Padrão Ravius.",
      testimonials: [
        {
          name: "Dra. Camila Almeida",
          role: "Diretora Comercial",
          content: "Depois de contratar, nosso agendamento online cresceu 100%. A landing page transmite exatamente a sofisticação que nossos pacientes esperam.",
          avatarUrl: "https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fGZhY2V8ZW58MHx8MHx8fDA%3D",
        },
        {
          name: "João Marcelo",
          role: "Dono de estabelecimento",
          content: "O sistema que eles criaram, mudou todo o nosso fluxo de trabalho. A equipe conseguiu produzir mais em menos tempo, com muito mais organização e eficiência em cada setor.",
          avatarUrl: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHx8MHx8fDA%3D",
        },
        {
          name: "Sabrina Soares",
          role: "Fotógrafa",
          content: "Ter uma página que reflete a identidade do meu estúdio era essencial. A Ravius entregou isso com uma estratégias de marketing que funcionam.",
          avatarUrl: "https://images.unsplash.com/photo-1661694134633-a97b382ddeb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fGZhY2UlMjBhbWF0ZXVyfGVufDB8fDB8fHww"
        },
      ],
    },
    {
      id: "faq",
      type: "faq",
      title: "Perguntas",
      highlight: "frequentes",
      description: "Respostas diretas para as dúvidas mais comuns antes de contratar a Ravius.",
      questions: [
        {
          question: "Isso realmente vai trazer resultado ou é só mais um site bonito?",
          answer: "Nosso foco não é só estética é performance. Cada projeto é pensado para gerar conversão, velocidade e clareza na comunicação. Um site bonito sem resultado não faz sentido para nós.",
        },
        {
          question: "Por que eu não deveria usar um template pronto ou plataforma como Wix?",
          answer: "Você até pode e em alguns casos faz sentido. Mas templates limitam crescimento, performance e diferenciação. Nós criamos soluções sob medida, pensadas para escalar junto com o seu negócio.",
        },
        {
          question: "E se eu precisar mudar algo depois que estiver pronto?",
          answer: "Você não fica preso. Estruturamos tudo para facilitar mudanças rápidas seja conteúdo simples ou evolução do produto. Além disso, oferecemos suporte contínuo.",
        },
        {
          question: "Como sei que não vou ter dor de cabeça com o projeto?",
          answer: "Trabalhamos com processos claros, prazos definidos e comunicação constante. Você sempre sabe o que está sendo feito e em que etapa estamos.",
        },
        {
          question: "Isso é só para empresas grandes ou funciona para negócios menores também?",
          answer: "Funciona para ambos. Adaptamos a solução ao momento do seu negócio desde páginas rápidas para validação até sistemas mais robustos.",
        },
        {
          question: "O que acontece se meu negócio crescer?",
          answer: "Ótimo o projeto já nasce preparado para isso. Nossa arquitetura permite escalar sem precisar reconstruir tudo do zero.",
        },
        {
          question: "Vocês somem depois da entrega?",
          answer: "Não. Podemos continuar acompanhando seu projeto com melhorias, otimizações e suporte técnico sempre que você precisar.",
        },
        {
          question: "Como funciona o início do projeto?",
          answer: "Começamos entendendo seu negócio, objetivos e público. A partir disso, definimos a melhor estrutura e seguimos com desenvolvimento de forma transparente.",
        },
      ]
    },
  ],

  experiences: {
    title: "Experiências que",
    subtitle: "inspiram",
    cards: [
      { icon: "Rocket", title: "Lançamento Rápido", description: "Do conceito ao deploy em horas, não semanas. Estrutura pronta para produção.", tag: "Velocidade" },
      { icon: "Palette", title: "Design System", description: "Tokens, variantes e componentes coesos que mantêm a consistência visual.", tag: "Visual" },
      { icon: "Code2", title: "Developer Experience", description: "TypeScript estrito, hooks isolados e zero dependências desnecessárias.", tag: "DX" },
      { icon: "BarChart3", title: "Performance First", description: "IntersectionObserver, rAF e lazy loading para métricas Core Web Vitals perfeitas.", tag: "Metrics" },
      { icon: "Globe", title: "Pronto para o Mundo", description: "Config centralizada facilita i18n, multi-tema e personalização por cliente.", tag: "Scale" },
      { icon: "Lock", title: "Segurança Integrada", description: "Validação com Zod, sanitização de inputs e boas práticas desde o dia zero.", tag: "Security" },
    ],
  },

  contact: {
    title: "Vamos conversar?",
    subtitle: "Envie sua mensagem e retornaremos em breve.",
    fields: {
      name: { label: "Nome", placeholder: "Seu nome completo" },
      email: { label: "E-mail", placeholder: "seu@email.com" },
      message: { label: "Mensagem", placeholder: "Como podemos ajudar?" },
    },
    submitLabel: "Enviar mensagem",
    successMessage: "Mensagem enviada com sucesso!",
    errorMessage: "Erro ao enviar. Tente novamente.",
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Ravius. Todos os direitos reservados.`,
    tagline: "Construído com o Padrão Ravius.",
    socials: [
      { platform: "Instagram", url: "https://www.instagram.com/ravius.dev/", icon: "Instagram" },
      { platform: "Email", url: "mailto:clearstrategyline@gmail.com", icon: "Mail" },
    ],
  },
};
