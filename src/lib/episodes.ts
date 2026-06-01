export interface EpisodeSegment {
  sound?: string;
  hebrew?: string;
  hebrewTranslation?: string;
  text: string[];
}

export interface EpisodeData {
  slug: string;
  episode: string;
  title: string;
  subtitle: string;
  series: string;
  narrator: string;
  posterImage: string;
  heroImage: string;
  primaryColor: string;
  secondaryColor: string;
  featured?: boolean;
  segments: EpisodeSegment[];
  nextSlug?: string;
}

export const episodes: EpisodeData[] = [
  {
    slug: "e1-before-the-beginning",
    episode: "E1",
    title: "Before the Beginning — A Hollow and a Hum",
    subtitle: "A meditation on the first lines of Genesis, where silence gives way to light.",
    featured: true,
    series: "BIBLEVERSE",
    narrator: "Kuki Sage of Light",
    posterImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&q=80",
    primaryColor: "#8B7EC8",
    secondaryColor: "#1A1533",
    segments: [
      {
        sound: "Sound of slow, deep, resonant silence. Not empty, but full — like listening to the inside of a seashell, or the space between heartbeats. A low, soft hum begins, almost imperceptible at first, like the universe tuning itself.",
        text: [
          "Have you ever stood in a forest so ancient, the trees seem to hold their breath? Or listened to the dark before dawn — not the dark of fear, but the dark of waiting? That is where this story begins. Not with a bang, not with a blaze… but with a longing.",
        ],
      },
      {
        hebrew: "Bereshit bara Elohim et hashamayim ve'et ha'aretz.",
        hebrewTranslation: "In the beginning, God created the heavens and the earth.",
        text: [
          "The Hebrew poets who wrote this down did not begin with dates or diagrams. They began with a mystery.",
          "But the next line is the one that haunts me:",
        ],
      },
      {
        hebrew: "Veha'aretz hayetah tohu vavohu.",
        hebrewTranslation: "And the earth was formless and void.",
        text: [
          "Some translations say \"wild and waste.\" Others, \"chaos and emptiness.\" But the ancient rabbis listened deeper. They heard in \"tohu vavohu\" a kind of primordial yearning — a hollow waiting to be filled. A hum waiting to become a hymn.",
        ],
      },
      {
        sound: "The hum grows subtly, layered with a faint, whispering wind.",
        text: [
          "And then — the ruach Elohim — the breath, the wind, the Spirit of God — hovering. Not fixing, not forcing. Hovering. Like a mother bird over unhatched eggs. Like a poet over a blank page.",
          "What was God doing in that hovering? Perhaps listening. Perhaps loving what was not yet seen. Perhaps making space — not just in the cosmos, but in the very nature of creation — for potential. For relationship.",
          "This is the first truth of the Bible: Before God speaks light — God attends. God dwells in the depth. Even the void is held.",
        ],
      },
      {
        sound: "The hum resolves into a single, clear, sustained note — pure and gentle.",
        hebrew: "Yehi or.",
        hebrewTranslation: "Let there be light.",
        text: [
          "Not the light of sun or star — not yet. This is the light before light. The firstborn of creation. A light that does not cast shadows. A light that reveals not shapes, but sacredness.",
          "And God saw that the light was good. Tov. The first sacred word of value in the universe. Good. Beautiful. Whole.",
          "But here is the wonder — the darkness was not cursed. It was named night. Given its place in the rhythm of all things. The first act of creation, then, is not destruction of dark, but ordering of it. Making room for both — day and night — and calling the rhythm good.",
        ],
      },
      {
        sound: "A slow, cosmic tide — waves of light and darkness breathing.",
        text: [
          "And so it unfolds — not as a lecture, but as a liturgy. A six-day poem of separation and saturation. Sky from waters. Land from seas. Vegetation reaching up from the soil. Sun, moon, stars — not as gods, as some ancient peoples believed — but as lamps. Timekeepers. Gifts.",
          "Then — life. Swarming, swimming, soaring life. Each after its kind. Not random emergence, but called-out, blessed abundance. And God saw that it was tov me'od — very good.",
        ],
      },
      {
        sound: "Birdsong emerges, water splashes, a gentle rustling of leaves.",
        hebrew: "Na'aseh adam betsalmenu.",
        hebrewTranslation: "Let us make humankind in our image.",
        text: [
          "Image Dei. The divine imprint. Not in a statue's form, but in a breath's potential. To create. To choose. To love. To steward. To walk with God in the cool of the day.",
        ],
      },
      {
        hebrew: "Vayipach be'apav nishmat chayim.",
        hebrewTranslation: "God breathed into his nostrils the breath of life.",
        text: [
          "The same breath that hovered over the waters — now dwells within dust. Holy animation. Heaven in earth.",
        ],
      },
      {
        sound: "A heartbeat emerges softly beneath the music.",
        text: [
          "And God rested. The seventh day — not because God was tired, but because rest is part of the pattern. A sanctuary in time. A reminder that being precedes doing. That the world is not a machine to run, but a gift to receive.",
        ],
      },
      {
        sound: "Music swells gently, then settles into a quiet, melodic refrain.",
        text: [
          "So what is this story? A science text? No. A myth? Not in the way we use the word. It is a theological overture — the first notes in a symphony that will span betrayal and redemption, exile and return, crucifixion and resurrection.",
          "It tells us: The world is not an accident. Life is not a burden. Darkness is not final. And you — you are not a cosmic afterthought. You are breathed on by the same Spirit that hovered over the first hollow. You carry the image of the One who called light out of waiting.",
        ],
      },
      {
        sound: "Sound returns to the soft, deep hum from the beginning.",
        text: [
          "So if you today are in a season of tohu vavohu — formlessness, void, waiting — remember: the Spirit hovers over your depths, too. And the first word God speaks into chaos is not \"Fix yourself,\" but \"Let there be light.\"",
          "And it is good.",
        ],
      },
      {
        sound: "Music fades to silence for three full seconds.",
        text: [
          "Until next time, this is Kuki Sage of Light, walking with you through the forests of Scripture. In the beginning — and even now — there is grace.",
        ],
      },
    ],
  },
  {
    slug: "e2-the-garden-and-the-voice",
    episode: "E2",
    title: "The Garden and the Voice — Trust, Trees, and the Tear",
    subtitle: "A meditation on Eden, the fracture of trust, and the first thread of redemption.",
    series: "BIBLEVERSE",
    narrator: "Kuki Sage of Light",
    posterImage: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80",
    primaryColor: "#5B8C5A",
    secondaryColor: "#1A2E1A",
    segments: [
      {
        sound: "Gentle, warm, living ambience — birdsong, soft breeze through leaves, distant flowing water. The air feels close, alive, safe.",
        text: [
          "After the cosmos — intimacy. God did not place the human in a fortress, a factory, or a frontier. He planted a garden.",
          "East, in Eden — a name that in Hebrew whispers delight, or perhaps place of abundant water. And there, in that curated wildness, God placed the human — ha'adam — formed from the soil — ha'adamah. Earthling from earth. Named for his origin. And into his keeping was given every tree pleasing to the sight and good for food.",
        ],
      },
      {
        sound: "The garden hums with life — leaves rustling, water flowing.",
        text: [
          "Every tree, save two. One, in the very heart of the garden: The Tree of Life. The other, close by: The Tree of the Knowledge of Good and Evil.",
          "This was the first boundary. Not a wall, but a word. Not a restriction, but a definition of relationship: \"You may freely eat of every tree. But of this one tree, you shall not eat, for in the day that you eat of it, you shall surely die.\"",
          "What was death to a being who had only known breath? Perhaps it was not a threat, but a loving warning — like a father saying to a child, \"Do not touch the fire, for it will burn you.\" The boundary was not to withhold good, but to preserve life. To make space for trust. For obedience is the language of love when you cannot yet see the reason.",
        ],
      },
      {
        sound: "The garden ambience continues, but a subtle, almost imperceptible shift — a faint, dry rustle, like scales on stone.",
        text: [
          "Enter the serpent. Arum — cunning. More subtle than any beast of the field. And it does not roar. It questions.",
          "\"Did God really say, 'You shall not eat of any tree in the garden'?\" Notice the twist — already, the generous \"eat from every tree\" becomes \"you cannot eat from any tree.\" The serpent paints God as withholding, suspicious, severe.",
          "The woman — isha — answers, but her memory is already bending. She adds to God's command: \"Neither shall you touch it.\" God never said \"touch.\" Had the man, in his care, added that protection? Had love become a fence, and the fence become a distortion?",
          "Then the serpent's lie, wrapped in a truth: \"You will not surely die. For God knows that in the day you eat of it, your eyes will be opened, and you will be like God, knowing good and evil.\"",
          "The temptation was not to wickedness, but to divinity. Not to rebel against God, but to become God — to no longer need to trust, to no longer need to receive, to seize wisdom without dependence.",
        ],
      },
      {
        sound: "A moment of absolute silence — no birds, no breeze. Then a soft, decisive pluck, and a chew. Then a sharp intake of breath.",
        text: [
          "She ate. She gave to her man, who was with her. And he ate. And their eyes were opened — but not to glory. To nakedness. To vulnerability. To the terrifying awareness of their own exposure.",
          "And they sewed fig leaves together. The first human industry — not stewardship, but shame-management.",
        ],
      },
      {
        sound: "A cool wind rises. The garden sounds are distant now, thinner.",
        text: [
          "Then — the sound of the LORD God walking in the garden in the cool of the day. \"Where are you?\"",
          "Not an interrogator's demand. A father's call to a hiding child. The voice that once said \"Let there be light\" now speaks three of the most heartbreaking words in all of Scripture: \"Where are you?\"",
          "The man answers: \"I heard your voice in the garden, and I was afraid, because I was naked, and I hid.\"",
          "Fear. Nakedness. Hiding. Three new realities in a world that once knew only safety, intimacy, and presence.",
        ],
      },
      {
        sound: "The wind grows steady, mournful.",
        text: [
          "And then — the first blame. \"The woman whom you gave to be with me — she gave me fruit, and I ate.\" It is not just, \"The woman did it.\" It is, \"The woman you gave me did it.\" The rebellion completes itself: now God's own gift is used as an accusation against Him.",
          "The woman, in turn, blames the serpent. But the serpent does not speak again.",
          "And so the unraveling — the curse, yes, but also the mercy within it. The serpent is humbled, but a promise is planted in the curse itself: \"He will bruise your head, and you will bruise his heel.\" A proto-gospel, whispered in the ruins.",
          "Pain in childbearing, yes — but also multiplied conception. Life will continue. Toil and thorns, yes — but the ground will still yield. You will eat. And death — yes, you will return to dust.",
        ],
      },
      {
        sound: "A slow, heavy, resonant sound — like a great gate closing, but far away.",
        text: [
          "But even here, a mercy: God makes them garments of skin. Something had to die to cover their shame. An innocent life given, so they could be clothed in grace.",
          "This is the first sacrifice. The first glimpse of redemption — that God will kill to cover, will shed blood to make modest the ones who rebelled.",
          "And then — exile. God sends them out from the garden, lest they eat of the Tree of Life and live forever in brokenness. East of Eden. Away from the presence. Cherubim and a flaming sword guard the way back.",
          "This is not merely punishment. It is protection. Eternal life in a state of separation from God would be hell. So God in His mercy closes the way — and begins the long, patient work of opening another.",
        ],
      },
      {
        sound: "The mournful wind remains, but underneath, a faint, steady, deep pulse — like a distant, slow heartbeat.",
        text: [
          "So the story of the Garden is not merely about a \"fall.\" It is about the fracture of trust. It is about the choice to seize rather than receive. It is about the immediate consequence: not thunderbolts from heaven, but hiding from Love.",
          "And it is about the first thread of a promise — that the One who walked in the garden will walk into the dust again. That the voice that called \"Where are you?\" will one day call \"Lazarus, come forth!\" And that the way to the Tree of Life, though guarded, is not forgotten. It will reopen, in a city where leaves are for the healing of the nations.",
        ],
      },
      {
        sound: "A slow, aching melody, with a single high note of hope that lingers above it.",
        text: [
          "Where are you hiding today? What fig leaves have you sewn? And can you hear, even now, the sound of footsteps in the garden — the God who still walks toward you in the cool of the day, still calling, still waiting to clothe you in something better than leaves?",
        ],
      },
      {
        sound: "Soundscape fades to the distant, guarded gate, and then to silence.",
        text: [
          "Next time: The First Family — Cain, Abel, and the Cry from the Ground. Until then, walk softly. You are still loved, east of Eden.",
          "I am Kuki Sage of Light. This is BibleVerse.",
        ],
      },
      {
        sound: "A single, resonant bell toll, fading into the wind.",
        text: [],
      },
    ],
  },
];

export function getEpisodeBySlug(slug: string): EpisodeData | undefined {
  return episodes.find((e) => e.slug === slug);
}

export function getNextEpisode(slug: string): EpisodeData | undefined {
  const idx = episodes.findIndex((e) => e.slug === slug);
  return idx >= 0 && idx < episodes.length - 1 ? episodes[idx + 1] : undefined;
}
