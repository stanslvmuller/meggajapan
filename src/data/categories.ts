import type { CardTint, Community } from "./communities";

export interface CategoryTileDef {
  label: string;
  note: string;
  href: string;
  art: string;
  tint: CardTint;
}

export const categoryTiles: CategoryTileDef[] = [
  {
    label: "Anime & Manga",
    note: "Series and their studios",
    href: "/studios?category=anime",
    art: "/img/cards/demon-slayer.png",
    tint: "graphite",
  },
  {
    label: "Games",
    note: "Consoles, handhelds and PC",
    href: "/studios?category=games",
    art: "/img/cards/nintendo.png",
    tint: "aqua",
  },
  {
    label: "Characters",
    note: "Character design houses",
    href: "/studios?category=characters",
    art: "/img/cards/sanrio.png",
    tint: "pink",
  },
  {
    label: "Music & Virtual Idols",
    note: "Voices, bands and concerts",
    href: "/studios?category=music",
    art: "/img/cards/hatsune-miku.png",
    tint: "violet",
  },
  {
    label: "Trading Card Games",
    note: "Sets, illustrators and play spaces",
    href: "/studios?category=tcg",
    art: "/img/cards/pokemon-tcg.png",
    tint: "blue",
  },
  {
    label: "Animation Studios",
    note: "The teams behind the frames",
    href: "/studios?group=animation-studios",
    art: "/img/cards/ghibli.png",
    tint: "cream",
  },
  {
    label: "Publishers",
    note: "Magazines and collected editions",
    href: "/studios?group=publishers",
    art: "/img/cards/one-piece.png",
    tint: "coral",
  },
  {
    label: "Game Studios",
    note: "Development and publishing houses",
    href: "/studios?group=game-studios",
    art: "/img/cards/final-fantasy.png",
    tint: "silver",
  },
];

const GROUPS: Record<string, { label: string; match: string[] }> = {
  "animation-studios": {
    label: "Animation Studios",
    match: [
      "Toei Animation",
      "MAPPA",
      "ufotable",
      "Bones",
      "Madhouse",
      "Wit Studio",
      "CloverWorks",
      "Pierrot",
      "Sunrise",
      "Studio Ghibli",
    ],
  },
  publishers: {
    label: "Publishers",
    match: ["Shueisha", "Shogakukan"],
  },
  "game-studios": {
    label: "Game Studios",
    match: [
      "Nintendo",
      "SEGA",
      "Capcom",
      "Konami",
      "Square Enix",
      "HAL Laboratory",
      "Bandai",
      "Crypton Future Media",
    ],
  },
};

export function groupLabel(group: string): string | undefined {
  return GROUPS[group]?.label;
}

export function matchesGroup(community: Community, group: string): boolean {
  const definition = GROUPS[group];
  if (!definition) return true;
  return definition.match.some((needle) => community.creator.includes(needle));
}
