/* Shared content for App + AppMobile
   Keeps I18N + builders in one place so both apps can import safely.
*/

import bgHome from "./assets/backgrounds/home.jpg";
import bgYoga from "./assets/backgrounds/yoga.jpg";
import bgEducation from "./assets/backgrounds/education.jpg";
import bgWellness from "./assets/backgrounds/wellness.jpg";

/* ================= I18N ================= */
export const I18N = {
  pl: {
    // (PASTE YOUR FULL POLISH I18N HERE)
  },
  en: {
    // (PASTE YOUR FULL ENGLISH I18N HERE)
  },
};

export function getInitialLang() {
  const saved = typeof window !== "undefined" ? window.localStorage.getItem("ow_lang") : null;
  if (saved === "pl" || saved === "en") return saved;
  return "pl";
}

/* ================= LOCAL ASSET BACKGROUNDS MAP ================= */
export const BACKGROUNDS = {
  home: bgHome,
  yoga: bgYoga,
  education: bgEducation,
  wellness: bgWellness,
};

/* ================= DATA BUILDERS ================= */
export function buildCategories(t) {
  return [
    {
      key: "yoga",
      title: t.categories.yoga.title,
      subtitle: t.categories.yoga.subtitle,
      quote: t.quote.yoga_2,
      description: t.copy.yogaIntro,
      accent: "from-[#8fb8ae] via-[#7aa89f] to-[#6b988f]",
      heroImage: BACKGROUNDS.yoga,
      children: [
        { key: "kids", title: t.subtopics.yoga.kids.title, blurb: t.subtopics.yoga.kids.blurb, route: "#/yoga/kids" },
        { key: "adults", title: t.subtopics.yoga.adults.title, blurb: t.subtopics.yoga.adults.blurb, route: "#/yoga/adults" },
        { key: "seniors", title: t.subtopics.yoga.seniors.title, blurb: t.subtopics.yoga.seniors.blurb, route: "#/yoga/seniors" },
      ],
    },
    {
      key: "education",
      title: t.categories.education.title,
      subtitle: t.categories.education.subtitle,
      quote: t.quote.education,
      description: t.copy.educationIntro,
      accent: "from-[#aab3c2] via-[#8e97a6] to-[#737d8a]",
      heroImage: BACKGROUNDS.education,
      children: [
        { key: "no-sugar-adults", title: t.subtopics.education.noSugarAdults.title, blurb: t.subtopics.education.noSugarAdults.blurb, route: "#/education/no-sugar-adults" },
        { key: "no-sugar-kids", title: t.subtopics.education.noSugarKids.title, blurb: t.subtopics.education.noSugarKids.blurb, route: "#/education/no-sugar-kids" },
        { key: "whats-up-body-kids", title: t.subtopics.education.whatsUpBodyKids.title, blurb: t.subtopics.education.whatsUpBodyKids.blurb, route: "#/education/whats-up-body-kids" },
        { key: "whats-up-body-adults", title: t.subtopics.education.whatsUpBodyAdults.title, blurb: t.subtopics.education.whatsUpBodyAdults.blurb, route: "#/education/whats-up-body-adults" },
        { key: "no-upf-adults", title: t.subtopics.education.noUPFAdults.title, blurb: t.subtopics.education.noUPFAdults.blurb, route: "#/education/no-upf-adults" },
        { key: "tox-free", title: t.subtopics.education.toxFree.title, blurb: t.subtopics.education.toxFree.blurb, route: "#/education/tox-free" },
      ],
    },
    {
      key: "wellness",
      title: t.categories.wellness.title,
      subtitle: t.categories.wellness.subtitle,
      quote: t.quote.wellness_home,
      description: t.copy.wellnessIntro,
      accent: "from-[#c7b8a8] via-[#a48f7c] to-[#8a7461]",
      heroImage: BACKGROUNDS.wellness,
      children: [
        { key: "body-mind", title: t.subtopics.wellness.bodyMind.title, blurb: t.subtopics.wellness.bodyMind.blurb, route: "#/wellness/body-mind" },
        { key: "release", title: t.subtopics.wellness.release.title, blurb: t.subtopics.wellness.release.blurb, route: "#/wellness/release" },
        { key: "beauty", title: t.subtopics.wellness.beauty.title, blurb: t.subtopics.wellness.beauty.blurb, route: "#/wellness/beauty" },
      ],
    },
  ];
}

const WELLNESS_PRODUCTS_BASE = [
  { id: "p1", price: "£24", for: "body-mind" },
  { id: "p2", price: "£18", for: "body-mind" },
  { id: "p3", price: "£16", for: "release" },
  { id: "p4", price: "£20", for: "release" },
  { id: "p5", price: "£14", for: "beauty" },
  { id: "p6", price: "£28", for: "beauty" },
];

export function buildProducts(t) {
  return WELLNESS_PRODUCTS_BASE.map((p) => ({ ...p, title: t.products[p.id].title, tone: t.products[p.id].tone }));
}