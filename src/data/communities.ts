/**
 * ---------------------------------------------------------------------------
 * Community catalogue
 * ---------------------------------------------------------------------------
 * Content, imagery and support destinations for every community on the site.
 * Crypto receiving addresses are shared across communities and live in
 * ./payments.
 * ---------------------------------------------------------------------------
 */

export type CategoryId =
  | "anime"
  | "manga"
  | "games"
  | "characters"
  | "music"
  | "tcg";

export const CATEGORY_LABEL: Record<CategoryId, string> = {
  anime: "Anime",
  games: "Games",
  manga: "Manga",
  characters: "Characters",
  music: "Music",
  tcg: "TCG",
};

/** Card background tints, taken from the Meccha Japan flip-card palette. */
export type CardTint =
  | "graphite"
  | "silver"
  | "aqua"
  | "blue"
  | "coral"
  | "orange"
  | "pink"
  | "yellow"
  | "lime"
  | "violet"
  | "cream";

export interface Community {
  id: number;
  slug: string;
  name: string;
  /** Rights holder / studio / publisher shown under the name. */
  creator: string;
  /** Short line used on cards. */
  blurb: string;
  /** Label shown on the detail page under the title. */
  labels: string;
  categories: CategoryId[];
  art: string;
  tint: CardTint;
  gallery: string[];
  supporters: number;
  weekly: number;
  supportId: string;
  destination: string;
  about: string[];
  allocation: { label: string; note: string }[];
  related: string[];
}

const gallery = (slug: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/img/products/${slug}-${i + 1}.jpg`);

export const communities: Community[] = [
  {
    id: 1,
    slug: "pokemon",
    name: "Pokémon",
    creator: "Pokémon world",
    blurb: "Games, animation and collectibles",
    labels: "Games / Animation / Collectibles",
    categories: ["games", "anime", "characters"],
    art: "/img/cards/pokemon.png",
    tint: "yellow",
    gallery: gallery("pokemon", 6),
    supporters: 12400,
    weekly: 1840,
    supportId: "MJP-PKMN-001",
    destination: "Pokémon Support Fund",
    about: [
      "Pokémon began in 1996 as a pair of Game Boy titles and grew into one of the most widely shared worlds in Japanese pop culture — games, animation, trading cards, music and an enormous amount of merchandise.",
      "The community here brings together the fans who follow new game releases, collect plush and figures, and follow the illustrators and animators whose work keeps the world going.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the people making new work." },
      { label: "Community initiatives", note: "Fan events, meet-ups and local gatherings." },
      { label: "Future projects", note: "Held for upcoming releases and collaborations." },
    ],
    related: ["nintendo", "splatoon", "sonic", "final-fantasy"],
  },
  {
    id: 2,
    slug: "pokemon-tcg",
    name: "Pokémon TCG",
    creator: "The Pokémon Company / Creatures",
    blurb: "Trading card game and illustrators",
    labels: "TCG / Illustration / Collectibles",
    categories: ["tcg", "games"],
    art: "/img/cards/pokemon-tcg-booster.png",
    tint: "violet",
    gallery: gallery("pokemon-tcg", 6),
    supporters: 8700,
    weekly: 1210,
    supportId: "MJP-PTCG-002",
    destination: "Pokémon TCG Support Fund",
    about: [
      "The Pokémon Trading Card Game has been printed since 1996, and every set is carried by a rotating cast of illustrators whose work fans follow card by card.",
      "Supporters here follow new set releases, the artists behind the cards, and the local shops and play spaces that keep the format alive.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the illustrators behind the cards." },
      { label: "Community initiatives", note: "Local tournaments and play spaces." },
      { label: "Future projects", note: "Held for upcoming sets and events." },
    ],
    related: ["pokemon", "yu-gi-oh", "digimon", "nintendo"],
  },
  {
    id: 3,
    slug: "dragon-ball",
    name: "Dragon Ball",
    creator: "Toei Animation / Shueisha",
    blurb: "Anime, manga and figures",
    labels: "Anime / Manga / Figures",
    categories: ["anime", "manga"],
    art: "/img/cards/dragon-ball.png",
    tint: "orange",
    gallery: gallery("dragon-ball", 6),
    supporters: 7950,
    weekly: 980,
    supportId: "MJP-DBAL-003",
    destination: "Dragon Ball Support Fund",
    about: [
      "Dragon Ball started in 1984 and shaped decades of action storytelling in anime and manga. Its cast has stayed in production continuously through new series, films and one of the deepest figure catalogues in Japan.",
      "This community is for the collectors, the animation fans, and everyone who grew up with it.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the people making new work." },
      { label: "Community initiatives", note: "Screenings, collector meet-ups and archives." },
      { label: "Future projects", note: "Held for upcoming series and film work." },
    ],
    related: ["naruto", "yu-gi-oh", "digimon", "demon-slayer"],
  },
  {
    id: 4,
    slug: "hatsune-miku",
    name: "Hatsune Miku",
    creator: "Crypton Future Media",
    blurb: "Virtual singer and her community",
    labels: "Music / Virtual Idols / Figures",
    categories: ["music", "characters"],
    art: "/img/cards/hatsune-miku.png",
    tint: "aqua",
    gallery: gallery("hatsune-miku", 6),
    supporters: 9300,
    weekly: 1420,
    supportId: "MJP-MIKU-004",
    destination: "Hatsune Miku Support Fund",
    about: [
      "Hatsune Miku is a virtual singer whose voice library has been used by hundreds of thousands of independent musicians, illustrators and animators since 2007.",
      "More than almost any other community on this site, the work here is made by fans — which is exactly what this section exists to support.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to independent producers and illustrators." },
      { label: "Community initiatives", note: "Concerts, fan albums and art collections." },
      { label: "Future projects", note: "Held for upcoming releases and collaborations." },
    ],
    related: ["sanrio", "rilakkuma", "final-fantasy", "splatoon"],
  },
  {
    id: 5,
    slug: "final-fantasy",
    name: "Final Fantasy",
    creator: "Square Enix",
    blurb: "Role-playing games and music",
    labels: "Games / Music / Figures",
    categories: ["games", "music"],
    art: "/img/cards/final-fantasy.png",
    tint: "blue",
    gallery: gallery("final-fantasy", 6),
    supporters: 6800,
    weekly: 870,
    supportId: "MJP-FFXX-005",
    destination: "Final Fantasy Support Fund",
    about: [
      "Since 1987 each Final Fantasy has been a fresh world with its own cast, art direction and score, tied together by a set of recurring ideas rather than a single continuity.",
      "The community covers the games, the orchestral concerts, and the long-running figure and art book lines.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the people making new work." },
      { label: "Community initiatives", note: "Concerts, art books and preservation." },
      { label: "Future projects", note: "Held for upcoming titles and remasters." },
    ],
    related: ["kingdom-hearts", "zelda", "monster-hunter", "pokemon"],
  },
  {
    id: 6,
    slug: "kingdom-hearts",
    name: "Kingdom Hearts",
    creator: "Square Enix",
    blurb: "Action RPG series",
    labels: "Games / Animation / Collectibles",
    categories: ["games"],
    art: "/img/cards/kingdom-hearts.png",
    tint: "violet",
    gallery: gallery("kingdom-hearts", 6),
    supporters: 4100,
    weekly: 520,
    supportId: "MJP-KGHT-006",
    destination: "Kingdom Hearts Support Fund",
    about: [
      "Kingdom Hearts joins original characters with worlds drawn from decades of animation, and has kept a devoted following since the first game in 2002.",
      "Supporters here follow the games, the soundtracks and a merchandise line built around the keyblades and the trio at the centre of the story.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the people making new work." },
      { label: "Community initiatives", note: "Fan events and community translations." },
      { label: "Future projects", note: "Held for upcoming entries in the series." },
    ],
    related: ["final-fantasy", "pokemon", "monster-hunter", "ghibli"],
  },
  {
    id: 7,
    slug: "yu-gi-oh",
    name: "Yu-Gi-Oh!",
    creator: "Konami / Shueisha",
    blurb: "Trading card game and anime",
    labels: "TCG / Anime / Collectibles",
    categories: ["tcg", "anime"],
    art: "/img/cards/yu-gi-oh.png",
    tint: "violet",
    gallery: gallery("yu-gi-oh", 6),
    supporters: 5600,
    weekly: 760,
    supportId: "MJP-YGOH-007",
    destination: "Yu-Gi-Oh! Support Fund",
    about: [
      "Yu-Gi-Oh! began as a manga about games and became one of the most played trading card games in the world, with a competitive scene that has run for over twenty years.",
      "This community covers the card game, the animation, and the illustration work behind both.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to illustrators and designers." },
      { label: "Community initiatives", note: "Local tournaments and play spaces." },
      { label: "Future projects", note: "Held for upcoming sets and events." },
    ],
    related: ["digimon", "dragon-ball", "pokemon", "pokemon-tcg"],
  },
  {
    id: 8,
    slug: "fullmetal-alchemist",
    name: "Fullmetal Alchemist",
    creator: "Bones / Square Enix",
    blurb: "Anime and manga classic",
    labels: "Anime / Manga / Figures",
    categories: ["anime", "manga"],
    art: "/img/cards/fullmetal-alchemist.png",
    tint: "silver",
    gallery: gallery("fullmetal-alchemist", 6),
    supporters: 3200,
    weekly: 410,
    supportId: "MJP-FMAL-008",
    destination: "Fullmetal Alchemist Support Fund",
    about: [
      "Fullmetal Alchemist ran from 2001 to 2010 and remains one of the most recommended entry points into anime and manga, with two television adaptations and a complete, self-contained story.",
      "The community is small and steady, and mostly built around the animation work and the figure lines that still appear years later.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the people making new work." },
      { label: "Community initiatives", note: "Screenings and reading groups." },
      { label: "Future projects", note: "Held for restorations and new editions." },
    ],
    related: ["jujutsu-kaisen", "demon-slayer", "frieren", "naruto"],
  },
  {
    id: 9,
    slug: "sanrio",
    name: "Sanrio",
    creator: "Sanrio",
    blurb: "Character design house",
    labels: "Characters / Goods / Collaborations",
    categories: ["characters"],
    art: "/img/cards/sanrio.png",
    tint: "pink",
    gallery: gallery("sanrio", 6),
    supporters: 10200,
    weekly: 1530,
    supportId: "MJP-SNRO-009",
    destination: "Sanrio Support Fund",
    about: [
      "Sanrio has been designing characters since 1960, and its roster — Hello Kitty, Cinnamoroll, Kuromi, Pompompurin and dozens more — is voted on by fans every year.",
      "Supporters follow the annual character rankings, the collaborations, and the enormous stationery and plush catalogue.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to character designers and illustrators." },
      { label: "Community initiatives", note: "Fan events and character rankings." },
      { label: "Future projects", note: "Held for upcoming collaborations." },
    ],
    related: ["rilakkuma", "hatsune-miku", "kirby", "animal-crossing"],
  },
  {
    id: 10,
    slug: "splatoon",
    name: "Splatoon",
    creator: "Nintendo",
    blurb: "Ink-based team shooter",
    labels: "Games / Music / Collectibles",
    categories: ["games", "music"],
    art: "/img/cards/splatoon.png",
    tint: "lime",
    gallery: gallery("splatoon", 6),
    supporters: 4400,
    weekly: 690,
    supportId: "MJP-SPLT-010",
    destination: "Splatoon Support Fund",
    about: [
      "Splatoon built an entire visual and musical identity around territory painting, in-game concerts and seasonal Splatfests where players pick a side.",
      "The community follows the bands, the seasonal events, and the plush and apparel lines that follow each one.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the people making new work." },
      { label: "Community initiatives", note: "Splatfest meet-ups and fan tournaments." },
      { label: "Future projects", note: "Held for upcoming seasons and updates." },
    ],
    related: ["nintendo", "animal-crossing", "kirby", "zelda"],
  },
  {
    id: 11,
    slug: "sonic",
    name: "Sonic the Hedgehog",
    creator: "SEGA",
    blurb: "Long-running platform series",
    labels: "Games / Animation / Collectibles",
    categories: ["games", "characters"],
    art: "/img/cards/sonic.png",
    tint: "blue",
    gallery: gallery("sonic", 6),
    supporters: 5100,
    weekly: 640,
    supportId: "MJP-SONC-011",
    destination: "Sonic Support Fund",
    about: [
      "Sonic has been running since 1991 across platform games, animation, comics and films, and has one of the most active fan-creation scenes of any game series.",
      "This community covers the games, the soundtracks and the figure and plush lines produced in Japan.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the people making new work." },
      { label: "Community initiatives", note: "Fan games, remixes and archives." },
      { label: "Future projects", note: "Held for upcoming titles and films." },
    ],
    related: ["nintendo", "pokemon", "kirby", "splatoon"],
  },
  {
    id: 12,
    slug: "nintendo",
    name: "Super Mario",
    creator: "Nintendo",
    blurb: "Nintendo's flagship world",
    labels: "Games / Characters / Collectibles",
    categories: ["games", "characters"],
    art: "/img/cards/nintendo.png",
    tint: "aqua",
    gallery: gallery("nintendo", 6),
    supporters: 11800,
    weekly: 1690,
    supportId: "MJP-MARO-012",
    destination: "Super Mario Support Fund",
    about: [
      "Super Mario has anchored Nintendo's consoles since 1985 and still sets the shape of platform games, with a cast that appears across sports titles, kart racing, films and an unusually large goods catalogue.",
      "Supporters here follow the mainline games, the spin-offs and the plush and homeware lines that come with them.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the people making new work." },
      { label: "Community initiatives", note: "Speedrun events and local tournaments." },
      { label: "Future projects", note: "Held for upcoming titles and hardware." },
    ],
    related: ["zelda", "splatoon", "animal-crossing", "kirby"],
  },
  {
    id: 13,
    slug: "zelda",
    name: "The Legend of Zelda",
    creator: "Nintendo",
    blurb: "Adventure series",
    labels: "Games / Music / Collectibles",
    categories: ["games", "music"],
    art: "/img/cards/zelda.png",
    tint: "lime",
    gallery: gallery("zelda", 4),
    supporters: 7300,
    weekly: 910,
    supportId: "MJP-ZLDA-013",
    destination: "The Legend of Zelda Support Fund",
    about: [
      "The Legend of Zelda has been reinventing its own formula since 1986, from top-down dungeons to open landscapes, with a musical tradition strong enough to fill concert halls.",
      "The community follows the games, the orchestral programmes and the collector figure lines.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the people making new work." },
      { label: "Community initiatives", note: "Concerts and community playthroughs." },
      { label: "Future projects", note: "Held for upcoming titles." },
    ],
    related: ["nintendo", "splatoon", "monster-hunter", "kirby"],
  },
  {
    id: 14,
    slug: "gundam",
    name: "Gundam",
    creator: "Sunrise / Bandai",
    blurb: "Mecha animation and model kits",
    labels: "Anime / Model Kits / Collectibles",
    categories: ["anime", "characters"],
    art: "/img/cards/gundam.png",
    tint: "silver",
    gallery: gallery("gundam", 6),
    supporters: 6200,
    weekly: 780,
    supportId: "MJP-GNDM-014",
    destination: "Gundam Support Fund",
    about: [
      "Gundam has run since 1979 and effectively created the mecha model kit hobby, with a modelling community that spans generations and every skill level.",
      "Supporters follow the animation, the kit releases and the builders who document their work.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to animators and kit designers." },
      { label: "Community initiatives", note: "Model build meets and contests." },
      { label: "Future projects", note: "Held for upcoming series and kit lines." },
    ],
    related: ["monster-hunter", "digimon", "fullmetal-alchemist", "dragon-ball"],
  },
  {
    id: 15,
    slug: "jujutsu-kaisen",
    name: "Jujutsu Kaisen",
    creator: "MAPPA / Shueisha",
    blurb: "Modern action anime",
    labels: "Anime / Manga / Figures",
    categories: ["anime", "manga"],
    art: "/img/cards/jujutsu-kaisen.png",
    tint: "graphite",
    gallery: gallery("jujutsu-kaisen", 6),
    supporters: 6900,
    weekly: 1120,
    supportId: "MJP-JJKS-015",
    destination: "Jujutsu Kaisen Support Fund",
    about: [
      "Jujutsu Kaisen moved from manga to one of the most watched anime adaptations of recent years, with animation work that gets discussed cut by cut.",
      "This community is for readers, animation fans and the very active figure collectors around it.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to animators and the production team." },
      { label: "Community initiatives", note: "Screenings and fan art showcases." },
      { label: "Future projects", note: "Held for upcoming seasons and films." },
    ],
    related: ["demon-slayer", "naruto", "spy-x-family", "frieren"],
  },
  {
    id: 16,
    slug: "naruto",
    name: "Naruto",
    creator: "Pierrot / Shueisha",
    blurb: "Ninja anime and manga",
    labels: "Anime / Manga / Figures",
    categories: ["anime", "manga"],
    art: "/img/cards/naruto.png",
    tint: "orange",
    gallery: gallery("naruto", 6),
    supporters: 7100,
    weekly: 850,
    supportId: "MJP-NRTO-016",
    destination: "Naruto Support Fund",
    about: [
      "Naruto ran for fifteen years and remains one of the defining long-form shonen series, with a sequel generation and a figure catalogue that keeps expanding.",
      "The community covers the manga, both anime runs and the collector lines.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the people making new work." },
      { label: "Community initiatives", note: "Reading groups and fan translations." },
      { label: "Future projects", note: "Held for upcoming adaptations." },
    ],
    related: ["dragon-ball", "jujutsu-kaisen", "demon-slayer", "gundam"],
  },
  {
    id: 17,
    slug: "demon-slayer",
    name: "Demon Slayer",
    creator: "ufotable / Shueisha",
    blurb: "Anime and manga",
    labels: "Anime / Manga / Figures",
    categories: ["anime", "manga"],
    art: "/img/cards/demon-slayer.png",
    tint: "graphite",
    gallery: gallery("demon-slayer", 4),
    supporters: 8100,
    weekly: 1280,
    supportId: "MJP-DMSL-017",
    destination: "Demon Slayer Support Fund",
    about: [
      "Demon Slayer's television and film adaptations set new records in Japan and pushed a whole generation of viewers toward theatrical anime.",
      "Supporters follow the animation studio's work, the soundtracks and the figure releases.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to animators and the production team." },
      { label: "Community initiatives", note: "Screenings and fan gatherings." },
      { label: "Future projects", note: "Held for upcoming arcs and films." },
    ],
    related: ["jujutsu-kaisen", "naruto", "frieren", "demon-slayer"],
  },
  {
    id: 18,
    slug: "ghibli",
    name: "Studio Ghibli",
    creator: "Studio Ghibli",
    blurb: "Animation studio",
    labels: "Animation Studio / Films / Goods",
    categories: ["anime", "characters"],
    art: "/img/cards/ghibli.png",
    tint: "aqua",
    gallery: gallery("ghibli", 4),
    supporters: 9600,
    weekly: 1040,
    supportId: "MJP-GHBL-018",
    destination: "Studio Ghibli Support Fund",
    about: [
      "Studio Ghibli has been making hand-drawn feature animation since 1985, and its films are among the most carefully preserved and re-watched in the medium.",
      "The community here is for the films, the soundtracks and the very distinctive goods that come out of the studio's own shops.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to animators and background artists." },
      { label: "Community initiatives", note: "Screenings, archives and restorations." },
      { label: "Future projects", note: "Held for upcoming films." },
    ],
    related: ["frieren", "rilakkuma", "sanrio", "kingdom-hearts"],
  },
  {
    id: 19,
    slug: "monster-hunter",
    name: "Monster Hunter",
    creator: "Capcom",
    blurb: "Co-operative hunting games",
    labels: "Games / Music / Figures",
    categories: ["games"],
    art: "/img/cards/monster-hunter.png",
    tint: "graphite",
    gallery: gallery("monster-hunter", 4),
    supporters: 5400,
    weekly: 720,
    supportId: "MJP-MHTR-019",
    destination: "Monster Hunter Support Fund",
    about: [
      "Monster Hunter is built around four-player hunts, long weapon mastery curves and a creature design catalogue that has grown steadily since 2004.",
      "Supporters follow the games, the orchestral concerts and the detailed figure lines.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the people making new work." },
      { label: "Community initiatives", note: "Community hunts and local events." },
      { label: "Future projects", note: "Held for upcoming titles and expansions." },
    ],
    related: ["gundam", "final-fantasy", "zelda", "kingdom-hearts"],
  },
  {
    id: 20,
    slug: "animal-crossing",
    name: "Animal Crossing",
    creator: "Nintendo",
    blurb: "Life simulation series",
    labels: "Games / Characters / Goods",
    categories: ["games", "characters"],
    art: "/img/cards/animal-crossing.png",
    tint: "lime",
    gallery: gallery("animal-crossing", 4),
    supporters: 6600,
    weekly: 830,
    supportId: "MJP-ACNH-020",
    destination: "Animal Crossing Support Fund",
    about: [
      "Animal Crossing runs on a real-time calendar, which is a small idea with an enormous effect: villages change while you are away, and seasons arrive when they arrive.",
      "The community covers the games, the seasonal events and the homeware and plush lines.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the people making new work." },
      { label: "Community initiatives", note: "Island tours and seasonal events." },
      { label: "Future projects", note: "Held for upcoming updates and titles." },
    ],
    related: ["nintendo", "splatoon", "sanrio", "kirby"],
  },
  {
    id: 21,
    slug: "kirby",
    name: "Kirby",
    creator: "HAL Laboratory / Nintendo",
    blurb: "Platform games and characters",
    labels: "Games / Characters / Plush",
    categories: ["games", "characters"],
    art: "/img/cards/kirby.png",
    tint: "pink",
    gallery: gallery("kirby", 4),
    supporters: 4900,
    weekly: 610,
    supportId: "MJP-KRBY-021",
    destination: "Kirby Support Fund",
    about: [
      "Kirby games are gentle on the surface and famously inventive underneath, with a soundtrack tradition that fans arrange and perform constantly.",
      "This community follows the games, the music and one of the best plush lines in Japan.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the people making new work." },
      { label: "Community initiatives", note: "Music arrangements and fan events." },
      { label: "Future projects", note: "Held for upcoming titles." },
    ],
    related: ["nintendo", "animal-crossing", "sanrio", "splatoon"],
  },
  {
    id: 22,
    slug: "digimon",
    name: "Digimon",
    creator: "Toei Animation / Bandai",
    blurb: "Anime, games and card game",
    labels: "Anime / TCG / Collectibles",
    categories: ["anime", "tcg", "games"],
    art: "/img/cards/digimon.png",
    tint: "blue",
    gallery: gallery("digimon", 4),
    supporters: 3800,
    weekly: 470,
    supportId: "MJP-DGMN-022",
    destination: "Digimon Support Fund",
    about: [
      "Digimon started with a virtual pet in 1997 and grew into animation, games and a card game with a strong competitive following.",
      "Supporters here follow the series, the card releases and the figure lines.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the people making new work." },
      { label: "Community initiatives", note: "Local tournaments and play spaces." },
      { label: "Future projects", note: "Held for upcoming sets and series." },
    ],
    related: ["yu-gi-oh", "pokemon", "dragon-ball", "gundam"],
  },
  {
    id: 23,
    slug: "spy-x-family",
    name: "SPY×FAMILY",
    creator: "Wit Studio / CloverWorks",
    blurb: "Comedy action anime",
    labels: "Anime / Manga / Figures",
    categories: ["anime", "manga"],
    art: "/img/cards/spy-x-family.png",
    tint: "cream",
    gallery: gallery("spy-x-family", 4),
    supporters: 5200,
    weekly: 760,
    supportId: "MJP-SPYF-023",
    destination: "SPY×FAMILY Support Fund",
    about: [
      "SPY×FAMILY balances espionage plotting against a very ordinary family comedy, and became one of the fastest-growing series of its year.",
      "The community follows the manga, both animation studios' work and the character goods.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to the people making new work." },
      { label: "Community initiatives", note: "Fan art showcases and screenings." },
      { label: "Future projects", note: "Held for upcoming seasons and films." },
    ],
    related: ["jujutsu-kaisen", "frieren", "demon-slayer", "rilakkuma"],
  },
  {
    id: 24,
    slug: "frieren",
    name: "Frieren",
    creator: "Madhouse / Shogakukan",
    blurb: "Fantasy anime and manga",
    labels: "Anime / Manga / Figures",
    categories: ["anime", "manga"],
    art: "/img/cards/frieren.png",
    tint: "silver",
    gallery: gallery("frieren", 4),
    supporters: 4600,
    weekly: 900,
    supportId: "MJP-FRRN-024",
    destination: "Frieren Support Fund",
    about: [
      "Frieren picks up after the quest is over and follows an elf mage through the centuries that come next — slow, quiet, and unusually well animated.",
      "Supporters follow the manga, the animation and the small but careful figure line.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to animators and the production team." },
      { label: "Community initiatives", note: "Reading groups and screenings." },
      { label: "Future projects", note: "Held for upcoming seasons." },
    ],
    related: ["ghibli", "demon-slayer", "spy-x-family", "fullmetal-alchemist"],
  },
  {
    id: 25,
    slug: "rilakkuma",
    name: "Rilakkuma",
    creator: "San-X",
    blurb: "Character design house",
    labels: "Characters / Goods / Plush",
    categories: ["characters"],
    art: "/img/cards/rilakkuma.png",
    tint: "cream",
    gallery: gallery("rilakkuma", 4),
    supporters: 3400,
    weekly: 380,
    supportId: "MJP-RLKM-025",
    destination: "Rilakkuma Support Fund",
    about: [
      "Rilakkuma has been San-X's most recognisable character since 2003, built entirely around the idea of resting properly.",
      "The community follows the seasonal goods, the stop-motion animation and the collaborations.",
    ],
    allocation: [
      { label: "Creator support", note: "Directed to character designers and illustrators." },
      { label: "Community initiatives", note: "Seasonal fan events." },
      { label: "Future projects", note: "Held for upcoming collaborations." },
    ],
    related: ["sanrio", "kirby", "ghibli", "animal-crossing"],
  },
];

const bySlug = new Map(communities.map((c) => [c.slug, c]));

export function getCommunity(slug: string): Community | undefined {
  return bySlug.get(slug);
}

export function getRelated(community: Community): Community[] {
  return community.related
    .map((slug) => bySlug.get(slug))
    .filter((c): c is Community => Boolean(c))
    .slice(0, 4);
}

export function searchCommunities(query: string): Community[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return communities.filter((c) => {
    const haystack = [
      c.name,
      c.slug.replace(/-/g, " "),
      c.creator,
      c.blurb,
      c.labels,
      ...c.categories.map((cat) => CATEGORY_LABEL[cat]),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export const mostSupported = [...communities]
  .sort((a, b) => b.supporters - a.supporters)
  .slice(0, 6);

export const featured = [
  "pokemon",
  "pokemon-tcg",
  "dragon-ball",
  "hatsune-miku",
  "final-fantasy",
  "sanrio",
  "sonic",
  "yu-gi-oh",
]
  .map((slug) => bySlug.get(slug))
  .filter((c): c is Community => Boolean(c));
