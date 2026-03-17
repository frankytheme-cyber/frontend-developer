export type Project = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
};

export const webProjects: Project[] = [
  {
    id: "sartori-di-verona",
    name: "Sartori di Verona",
    description:
      "Sito istituzionale per storica cantina vitivinicola della Valpolicella (125+ anni). Theme WordPress custom, WPML multilingua, storytelling visivo dei vigneti e delle cantine.",
    tech: ["WordPress", "PHP", "WPML", "Contact Form 7", "SCSS"],
    liveUrl: "https://sartoridiverona.it/",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=400&fit=crop",
  },
  {
    id: "domini-veneti",
    name: "Domini Veneti",
    description:
      "Portale per consorzio vinicolo veronese con catalogo vini, prenotazioni esperienze in cantina e shop online. Gestione contenuti multilingua e structured data Schema.org.",
    tech: ["WordPress", "WooCommerce", "WPML", "PHP", "JavaScript"],
    liveUrl: "https://dominiveneti.it/",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop",
  },
  {
    id: "fiamm-easy-rider",
    name: "FIAMM Easy Rider",
    description:
      "Sito internazionale per la linea AGM di batterie moto, scooter e powersport di FIAMM Energy Technology. Theme Roots Sage, build asset con Webpack, Instagram Feed integrato.",
    tech: ["WordPress", "Roots Sage", "Webpack", "WPML", "GTM"],
    liveUrl: "https://fiammeasyrider.com/",
    image: "/images/fiamm.jpg",
  },
  {
    id: "molino-spadoni",
    name: "Molino Spadoni",
    description:
      "Sito corporate per storico molino italiano: catalogo prodotti (farine, pizza, pasta, birre artigianali), ricette, sezione B2B e recruiting. Slider Swiper, form avanzati.",
    tech: ["WordPress", "WPML", "Swiper.js", "Contact Form 7", "GTM"],
    liveUrl: "https://www.molinospadoni.it/",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop",
  },
  {
    id: "dimmidisi",
    name: "Dimmidisi",
    description:
      "Sito per brand alimentare di prodotti freschi pronti (zuppe, risotti, insalate). Layout Elementor custom, animazioni scroll, integrazione Facebook Pixel e Analytics.",
    tech: ["WordPress", "Elementor Pro", "Swiper.js", "GTM", "Facebook Pixel"],
    liveUrl: "https://www.dimmidisi.it/",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
  {
    id: "banor-sicav",
    name: "Banor SICAV",
    description:
      "Sito istituzionale per SICAV lussemburghese (fondo di investimento). Documentazione fondi, NAV aggiornati, sezione investor relations. WPML EN/IT, compliance GDPR.",
    tech: ["WordPress", "WPML", "PHP", "Iubenda", "Google Analytics"],
    liveUrl: "https://banorsicav.com/",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
  },
  /* {
    id: "ballarini-interni",
    name: "Ballarini Interni",
    description:
      "Portfolio e showroom digitale per studio di arredamento veronese. Gallerie prodotto animate con GSAP, layout Elementor full-custom, schede collezioni.",
    tech: ["WordPress", "Elementor", "GSAP", "Swiper.js", "GTM"],
    liveUrl: "https://ballarini-interni.com/",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=400&fit=crop",
  }, */
];

export const cryptoProjects: Project[] = [
  {
    id: "uniswap-pool-analyzer",
    name: "Uniswap Pool Analyzer",
    description:
      "Dashboard per analisi delle liquidity pool su Uniswap. Metriche di pool, performance dei range tick, fee earned e impermanent loss in tempo reale.",
    tech: ["React", "TypeScript", "Uniswap SDK", "The Graph", "Tailwind CSS"],
    liveUrl: "https://uniswapanalyzer.vercel.app/",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
  },
  {
    id: "rebalance-tool",
    name: "Rebalance Tool",
    description:
      "Calcolatore per il ribilanciamento del portafoglio: inserisci asset, target allocation e capitale — il tool calcola acquisti e vendite ottimali per riallineare i pesi.",
    tech: ["JavaScript", "Tailwind CSS", "HTML", "DOM API"],
    liveUrl: "https://www.rebalance-tool.com",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop",
  },
  {
    id: "order-book-simulator",
    name: "Order Book Simulator",
    description:
      "Simulatore di order book real-time con matching engine Price/Time priority. Supporta ordini limit e market, visualizzazione book depth e storico dei trade eseguiti.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://order-book-simulator.vercel.app/",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
  },
];
