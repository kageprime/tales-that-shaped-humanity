export interface StoryChapter {
  number: string;
  title: string;
  paragraphs: string[];
  quote?: string;
}

export interface StoryPerspective {
  chapters: StoryChapter[];
}

export interface StoryData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  cardImage: string;
  heroImage: string;
  chapterImage: string;
  primaryColor: string;
  secondaryColor: string;
  readingTime: string;
  featured?: boolean;
  perspectives: {
    classic: StoryPerspective;
    modern: StoryPerspective;
    kids: StoryPerspective;
  };
  episodes?: string[];
}

export const stories: StoryData[] = [
  {
    slug: "creation",
    title: "The Creation",
    subtitle: "In the beginning, before time had a name...",
    featured: true,
    episodes: ["e1-before-the-beginning"],
    category: "Old Testament",
    cardImage: "/assets/card-creation.jpg",
    heroImage: "/assets/card-creation.jpg",
    chapterImage: "/assets/creation-landscape.jpg",
    primaryColor: "#D4A853",
    secondaryColor: "#5C2A2A",
    readingTime: "8 min read",
    perspectives: {
      classic: {
        chapters: [
          {
            number: "01",
            title: "In the Beginning",
            paragraphs: [
              "Before the first dawn painted the sky with light, before the mountains took their shape and the seas found their voice, there was the Word. And the Word was with the Creator, and the Word was the Creator.",
              "The earth was formless and empty, darkness covering the surface of the deep. But the Spirit of the Creator moved across the waters, and where it passed, possibility followed.",
              "Then light burst forth — not the gentle light of morning, but a brilliant, commanding radiance that split the darkness like a curtain torn in two. The Creator saw that the light was good, and separated it from the darkness, calling them day and night.",
            ],
            quote: "And the Creator saw that it was good.",
          },
          {
            number: "02",
            title: "The Six Days",
            paragraphs: [
              "On the second day, the vault of sky was stretched between the waters — a vast dome of blue that would one day hold clouds and stars. On the third day, dry land emerged from the receding waters, and vegetation burst forth in a riot of green — seed-bearing plants and fruit trees of every kind.",
              "The fourth day brought the great lights — the sun to rule the day, the moon to govern the night, and the stars scattered like diamonds across the dark velvet of the heavens. Each was set in its course, marking seasons and years, dividing time itself into measurable grace.",
              "On the fifth day, the waters teemed with living creatures — great whales and schools of silver fish, creatures that crawl and creatures that swim in endless variety. The sky filled with birds of every feather, winging their way across the blue dome in joyous flight.",
              "The sixth day brought the beasts of the earth — cattle and creeping things, wild animals of every kind. And finally, the pinnacle of creation: humanity, formed from the dust but breathed into with the very breath of the Creator, made in the divine image to steward this magnificent world.",
            ],
          },
          {
            number: "03",
            title: "Rest",
            paragraphs: [
              "On the seventh day, the Creator rested. Not from weariness — for divine power knows no fatigue — but from completeness. The work was finished, and it was very good.",
              "This rest was not emptiness but fullness — a sacred pause that would echo through all of time, establishing a rhythm of work and rest, creation and completion, that all creation would follow.",
              "And so the world was made — not in chaos, but in order. Not in violence, but in love. Not by accident, but by design. From the smallest atom to the widest galaxy, everything bore the fingerprints of its Maker.",
            ],
          },
        ],
      },
      modern: {
        chapters: [
          {
            number: "01",
            title: "The Spark of Everything",
            paragraphs: [
              "Picture the moment before the first moment. Not darkness as we know it, but a pregnant silence — the hush before the symphony begins. Something was about to happen. Something magnificent.",
              "Then — light. Not gradually, like dawn creeping over the horizon, but all at once. A cosmic flash that would make every fireworks display that ever followed seem like a whisper. The universe had its first heartbeat.",
            ],
          },
          {
            number: "02",
            title: "Building a World",
            paragraphs: [
              "Day by day, the Creator crafted with the precision of a master artist and the joy of a child at play. Sky — a canvas of blue. Land — sculpted from raw material. Plants — splashes of green and bursts of color.",
              "The sun became our timekeeper, the moon our nightlight, the stars our first poetry. Then came life — fish that dance in the deep, birds that paint the sky with their flight, animals that make the earth hum with activity.",
            ],
          },
          {
            number: "03",
            title: "The Human Touch",
            paragraphs: [
              "Finally — us. Shaped from the same stuff as the earth, but given something extra: breath, spirit, consciousness. We were made to care for this world, to name its creatures, to continue the creative work.",
              "And when it was all done? The Creator rested. Not because it was hard work, but because good work deserves a good pause. The Sabbath — the original weekend.",
            ],
          },
        ],
      },
      kids: {
        chapters: [
          {
            number: "01",
            title: "Before Everything",
            paragraphs: [
              "A long, long, LONG time ago — before you, before me, before anything — God was there. And God had a wonderful idea: 'I'm going to make a world!'",
              "First, God said 'Let there be LIGHT!' And WHOOSH! Everything went from super-duper dark to bright and beautiful. God liked it. A lot.",
            ],
          },
          {
            number: "02",
            title: "God's Art Project",
            paragraphs: [
              "Next, God made the sky — big and blue and beautiful. Then land popped up from the water like a surprise! And plants grew everywhere — flowers, trees, grass — like the biggest garden ever!",
              "God put a big bright sun in the sky for daytime, a gentle moon for nighttime, and sparkly stars that twinkle like God's night-lights.",
              "Then God made animals! Fish that swim-splash in the water, birds that fly-zoom in the sky, and animals that walk-pounce on the land. So many animals!",
            ],
          },
          {
            number: "03",
            title: "You and Me!",
            paragraphs: [
              "Finally, God made people! That's us! God shaped us like a potter shapes clay, then breathed life into us — like a big, gentle whisper. We were made to be God's friends and to take care of this amazing world.",
              "And when everything was done? God took a rest day — the very first nap time! And God looked at everything and said, 'This is VERY good!'",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "noah",
    title: "Noah's Ark",
    subtitle: "A journey of faith through the great flood.",
    category: "Old Testament",
    cardImage: "/assets/card-noah.jpg",
    heroImage: "/assets/card-noah.jpg",
    chapterImage: "/assets/noah-dove.jpg",
    primaryColor: "#3A5A6E",
    secondaryColor: "#8B4513",
    readingTime: "8 min read",
    perspectives: {
      classic: {
        chapters: [
          {
            number: "01",
            title: "A Righteous Man",
            paragraphs: [
              "In a world that had forgotten its Creator, one man walked a different path. Noah was righteous, blameless among the people of his time, and he walked faithfully with God.",
              "The earth had become corrupt in God's sight, filled with violence and wickedness. But Noah found favor in the eyes of the Lord. When God decided to cleanse the world with a great flood, He entrusted Noah with a sacred task — to build an ark that would preserve life.",
            ],
          },
          {
            number: "02",
            title: "The Great Flood",
            paragraphs: [
              "The rains came as God had said — forty days and forty nights of relentless downpour. The waters rose until even the highest mountains were covered. The ark, carrying Noah and his family along with pairs of every kind of animal, rode the swollen seas.",
              "Inside the ark, life continued. The animals settled into their places, and Noah's family cared for them through the long months. Outside, the world they had known was being washed clean, transformed by waters that knew no boundary.",
            ],
          },
          {
            number: "03",
            title: "A New Beginning",
            paragraphs: [
              "After many months, the waters began to recede. Noah sent out a dove, and it returned with an olive leaf in its beak — the first sign of dry land. When the earth was finally dry, God spoke to Noah: 'Come out of the ark, you and your family.'",
              "Noah built an altar and offered sacrifices in gratitude. Then God made a covenant with all creation, promising never again to destroy the earth with a flood. As a sign of this promise, God placed a rainbow in the clouds — a bridge of light that would remind every generation of divine mercy.",
            ],
          },
        ],
      },
      modern: {
        chapters: [
          {
            number: "01",
            title: "The Last Good Guy",
            paragraphs: [
              "Imagine being the only person who still cares. Everyone around you has given in to greed, cruelty, and selfishness — but you refuse to join them. That's Noah. The original underdog in a world gone wrong.",
              "When Noah gets a mission that sounds absolutely impossible — build a giant boat on dry land — he doesn't argue. He picks up his tools and gets to work. While everyone else laughs, Noah builds. That's faith.",
            ],
          },
          {
            number: "02",
            title: "When the Skies Opened",
            paragraphs: [
              "The storm of all storms hits. Forty days of rain that won't stop. The world becomes an ocean, and the ark becomes the only safe place on Earth.",
              "Inside, it's a floating zoo — lions and lambs, elephants and mice, all sharing the same space. Noah's family becomes the world's first animal rescue team, keeping everyone fed and calm through the chaos outside.",
            ],
          },
          {
            number: "03",
            title: "The Promise",
            paragraphs: [
              "The waters go down. The dove returns with a leaf — hope in feathered form. When they finally step onto dry land, everything is new. A fresh start for the whole world.",
              "God hangs the first rainbow in the sky — the original peace sign. A promise that no matter how bad things get, destruction isn't the end of the story. New beginnings are always possible.",
            ],
          },
        ],
      },
      kids: {
        chapters: [
          {
            number: "01",
            title: "Noah, God's Friend",
            paragraphs: [
              "Noah was the NICEST person around. Everyone else was being naughty, but Noah loved God and listened to Him. God told Noah to build a BIG boat — an ark!",
              "Noah got wood and hammers and nails. He built and built and BUILT! His neighbors laughed, but Noah kept building because God asked him to.",
            ],
          },
          {
            number: "02",
            title: "Animals on Board",
            paragraphs: [
              "Two by two, the animals came! Elephants and giraffes and bunnies and ducks — all marched onto the ark. SPLISH! Then the rain came. It rained and rained and RAINED!",
              "The whole world turned into a swimming pool! But inside the ark, everyone was cozy and safe. Noah's family fed the animals and played games while the boat went whoosh-whoosh on the water.",
            ],
          },
          {
            number: "03",
            title: "The Rainbow Promise",
            paragraphs: [
              "After a long time, Noah sent a little bird called a dove to check for dry land. The dove came back with a leaf! Yay!",
              "When they got off the boat, God put a beautiful RAINBOW in the sky. God said, 'I promise never to flood the whole world again.' And every time we see a rainbow, we remember God's promise!",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "jonah",
    title: "Jonah and the Whale",
    subtitle: "When running away leads exactly where you need to go.",
    category: "Old Testament",
    cardImage: "/assets/card-jonah.jpg",
    heroImage: "/assets/card-jonah.jpg",
    chapterImage: "/assets/jonah-storm.jpg",
    primaryColor: "#2E5EAA",
    secondaryColor: "#C4A35A",
    readingTime: "7 min read",
    perspectives: {
      classic: {
        chapters: [
          {
            number: "01",
            title: "The Prophet Who Ran",
            paragraphs: [
              "The word of the Lord came to Jonah son of Amittai: 'Go to the great city of Nineveh and preach against it, because its wickedness has come up before me.' But Jonah ran away from the Lord.",
              "He went down to Joppa and found a ship bound for Tarshish — the farthest place he could imagine from Nineveh. He paid the fare and boarded, thinking he could flee from the presence of the Almighty.",
            ],
          },
          {
            number: "02",
            title: "In the Belly of the Beast",
            paragraphs: [
              "The Lord sent a great wind upon the sea, and the ship was in danger of breaking up. The sailors cast lots to find who was responsible, and the lot fell on Jonah. 'Throw me into the sea,' he said, 'and it will become calm.'",
              "As Jonah sank into the deep, the Lord provided a great fish to swallow him. For three days and three nights, Jonah remained in its belly. In that dark, wet prison, he prayed — and his prayer rose like incense to heaven.",
            ],
          },
          {
            number: "03",
            title: "Second Chances",
            paragraphs: [
              "The Lord commanded the fish, and it vomited Jonah onto dry land. Again the word of the Lord came: 'Go to Nineveh.' This time, Jonah went.",
              "He walked through the great city, proclaiming God's message. To everyone's surprise — including Jonah's — the people believed. From the king to the commoner, they repented. And God, seeing their change of heart, relented from the disaster He had planned. Jonah learned that God's compassion extends far beyond what we can imagine.",
            ],
          },
        ],
      },
      modern: {
        chapters: [
          {
            number: "01",
            title: "The Runner",
            paragraphs: [
              "We've all been there. Life calls you to something bigger than yourself, and every instinct screams 'run the other way.' That's Jonah's story in a nutshell.",
              "God asks him to help some people he doesn't even like. Jonah's response? Buy a one-way ticket in the opposite direction. Classic avoidance. But here's the thing — you can't outrun your calling.",
            ],
          },
          {
            number: "02",
            title: "The Time-Out",
            paragraphs: [
              "Sometimes life puts you in a dark place so you can finally hear what matters. For Jonah, that dark place was inside a giant fish. Talk about a forced retreat.",
              "Three days of darkness, solitude, and reflection. No distractions, no escape. Just Jonah and his thoughts — and finally, his prayers. It turns out, the belly of a whale makes a pretty good meditation chamber.",
            ],
          },
          {
            number: "03",
            title: "The Bigger Picture",
            paragraphs: [
              "Spit out onto dry land, Jonah finally does what he was asked. He delivers the message. And against all odds, people listen. An entire city changes course because one reluctant prophet finally showed up.",
              "The lesson? Compassion doesn't follow our rules. It flows like water, reaching places we never expected. And second chances aren't just for the people we're helping — they're for us, too.",
            ],
          },
        ],
      },
      kids: {
        chapters: [
          {
            number: "01",
            title: "Jonah Says 'No Thanks!'",
            paragraphs: [
              "God asked Jonah to help some people. Jonah said 'Nope!' and got on a boat going the WRONG way! Silly Jonah!",
              "But God knew where Jonah was. A big storm came, and the boat went bumpity-bump! The sailors were scared. Jonah said, 'It's my fault! Throw me in the water!'",
            ],
          },
          {
            number: "02",
            title: "Inside the Big Fish",
            paragraphs: [
              "A GIANT fish swallowed Jonah! GULP! Inside the fish, it was dark and squishy. But Jonah talked to God and said, 'I'm sorry!'",
              "The fish went BLAAAHH and spit Jonah out onto the beach! Ptooey! Jonah was all slimy but safe. He learned his lesson!",
            ],
          },
          {
            number: "03",
            title: "Jonah Does It Right",
            paragraphs: [
              "This time Jonah said 'Okay!' and went to help the people. He told them to be nice, and guess what? They listened! Everyone said sorry and started being kind.",
              "God loves giving second chances! And Jonah learned that it's always better to do what God asks — even if it seems scary at first.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "david",
    title: "David and Goliath",
    subtitle: "The smallest stone that changed everything.",
    featured: true,
    category: "Old Testament",
    cardImage: "/assets/card-david.jpg",
    heroImage: "/assets/card-david.jpg",
    chapterImage: "/assets/david-stone.jpg",
    primaryColor: "#8B6914",
    secondaryColor: "#3D4F3D",
    readingTime: "7 min read",
    perspectives: {
      classic: {
        chapters: [
          {
            number: "01",
            title: "The Shepherd Boy",
            paragraphs: [
              "David was the youngest of eight sons, a shepherd boy from Bethlehem. While his brothers served in King Saul's army, David kept watch over his father's sheep in the hills.",
              "The prophet Samuel had already anointed David, pouring oil on his head in the presence of his brothers. A king's destiny rested on young shoulders, though only Samuel knew it then.",
            ],
          },
          {
            number: "02",
            title: "The Giant",
            paragraphs: [
              "The Philistine army had gathered for war, and their champion — Goliath of Gath — stood over nine feet tall. Day after day, he challenged the Israelites to single combat, but no one dared face him.",
              "David arrived at the camp to bring food to his brothers. He heard Goliath's taunts and saw the fear in the soldiers' eyes. 'Who is this uncircumcised Philistine that he should defy the armies of the living God?' David asked.",
            ],
          },
          {
            number: "03",
            title: "The Stone",
            paragraphs: [
              "David refused King Saul's armor — it was too heavy for him. Instead, he took his staff, chose five smooth stones from the stream, and approached Goliath with only his sling.",
              "The giant laughed at the boy, but David stood firm. 'You come against me with sword and spear, but I come against you in the name of the Lord Almighty.' One stone flew true, striking Goliath's forehead. The giant fell. And a shepherd boy showed a nation that faith is stronger than any sword.",
            ],
          },
        ],
      },
      modern: {
        chapters: [
          {
            number: "01",
            title: "The Underdog",
            paragraphs: [
              "A kid who spent his days with sheep, suddenly thrust into the biggest fight of his generation. David wasn't a soldier — he was a teenager with a part-time job watching animals.",
              "But here's the thing about underdogs — they don't know they're supposed to lose. David saw a bully, not a giant. He saw injustice, not inevitability. That's the power of perspective.",
            ],
          },
          {
            number: "02",
            title: "Facing the Giant",
            paragraphs: [
              "When everyone else sees an insurmountable problem, one person sees an opportunity. David walked into that valley while grown men hid in their tents.",
              "Saul offered him armor, but David knew his strength wasn't in metal plating — it was in knowing exactly who he was and what he could do. He stuck with what he knew: a sling and five smooth stones.",
            ],
          },
          {
            number: "03",
            title: "One Shot",
            paragraphs: [
              "It only takes one moment of courage, one well-placed effort, to change everything. David didn't need a hundred stones. He needed one good one.",
              "The giant fell. Not because David was stronger — he wasn't. Not because David was luckier — the odds were impossible. David won because he believed that the size of your courage matters more than the size of your opponent.",
            ],
          },
        ],
      },
      kids: {
        chapters: [
          {
            number: "01",
            title: "David the Shepherd",
            paragraphs: [
              "David was a boy who took care of sheep. He loved God very much! He played his harp and sang songs to the sheep.",
              "One day, David's daddy sent him to bring lunch to his big brothers. They were in the army! David packed sandwiches and went to find them.",
            ],
          },
          {
            number: "02",
            title: "The Biggest, Meanest Giant",
            paragraphs: [
              "Goliath was SUPER tall and scary! He yelled mean things every day. Everyone was afraid. But David said, 'My God is bigger than that giant!'",
              "The king said, 'You're just a little boy!' But David said, 'God helped me protect my sheep from lions. He'll help me with this giant too!'",
            ],
          },
          {
            number: "03",
            title: "Plink! Splat!",
            paragraphs: [
              "David picked up five smooth stones. He put one in his slingshot. WHOOSH! The stone went ZOOM through the air and bonked Goliath right on the head!",
              "The giant went BOOM! Down he fell! The littlest guy won the biggest fight! Everyone cheered! David showed that when God is with you, you can do ANYTHING!",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "nativity",
    title: "The Nativity",
    subtitle: "The night the world changed in a quiet stable.",
    featured: true,
    category: "New Testament",
    cardImage: "/assets/card-nativity.jpg",
    heroImage: "/assets/card-nativity.jpg",
    chapterImage: "/assets/nativity-star.jpg",
    primaryColor: "#C9B18A",
    secondaryColor: "#2C3E50",
    readingTime: "8 min read",
    perspectives: {
      classic: {
        chapters: [
          {
            number: "01",
            title: "The Annunciation",
            paragraphs: [
              "In the sixth month, God sent the angel Gabriel to Nazareth, to a virgin pledged to be married to a man named Joseph. The angel said to her, 'Greetings, you who are highly favored! The Lord is with you.'",
              "Mary was troubled, but the angel continued: 'Do not be afraid, Mary. You will conceive and give birth to a son, and you are to call him Jesus. He will be great and will be called the Son of the Most High.' Mary responded, 'I am the Lord's servant. May your word to me be fulfilled.'",
            ],
          },
          {
            number: "02",
            title: "The Journey",
            paragraphs: [
              "In those days Caesar Augustus issued a decree that a census should be taken of the entire Roman world. So Joseph went up from Nazareth to Bethlehem, the town of David, because he belonged to the house and line of David. He went there with Mary, who was pledged to be married to him and was expecting a child.",
              "While they were there, the time came for the baby to be born. But there was no room for them in the inn. So Mary gave birth to her firstborn son. She wrapped him in cloths and placed him in a manger, because there was no guest room available for them.",
            ],
          },
          {
            number: "03",
            title: "The Visitors",
            paragraphs: [
              "Nearby shepherds were keeping watch over their flocks when an angel appeared, and the glory of the Lord shone around them. 'Do not be afraid. I bring you good news of great joy. Today in the town of David a Savior has been born to you; he is the Messiah, the Lord.'",
              "The shepherds hurried to Bethlehem and found Mary and Joseph, and the baby lying in the manger. Later, Magi from the East followed a star to Bethlehem, bringing gifts of gold, frankincense, and myrrh. They bowed down and worshiped him — the King born in the most humble of places.",
            ],
          },
        ],
      },
      modern: {
        chapters: [
          {
            number: "01",
            title: "An Unexpected Call",
            paragraphs: [
              "When your whole life plan gets rewritten by something bigger than yourself — that's Mary's story. A young woman with dreams and plans, suddenly asked to carry the most important responsibility in history.",
              "She didn't ask for this. She wasn't looking for fame or significance. But when the moment came, she said yes. 'I am the Lord's servant.' Three simple words that changed everything.",
            ],
          },
          {
            number: "02",
            title: "No Room",
            paragraphs: [
              "The most important birth in history happened in a borrowed space — because sometimes greatness arrives where we least expect it. No palace, no throne, no royal welcome.",
              "Just a stable, some animals, and a couple doing their best with what they had. The Son of God wrapped in ordinary cloth, resting in a feeding trough. Humility isn't weakness — it's the birthplace of true greatness.",
            ],
          },
          {
            number: "03",
            title: "The Seekers",
            paragraphs: [
              "Shepherds — the working class of their day — and wise men — the intellectuals. The first to recognize that everything had changed. Society's margins and its elite, united by wonder.",
              "An angel choir for the shepherds. A guiding star for the scholars. God spoke in a language each could understand. The message was the same for everyone: something miraculous has happened. Come and see.",
            ],
          },
        ],
      },
      kids: {
        chapters: [
          {
            number: "01",
            title: "Mary's Special Job",
            paragraphs: [
              "An angel told Mary she would have a very special baby — God's own Son! Mary said, 'Okay, God!' She was so brave!",
              "Mary and Joseph got married. They loved each other very much and couldn't wait to meet their special baby!",
            ],
          },
          {
            number: "02",
            title: "Baby Jesus is Born!",
            paragraphs: [
              "Mary and Joseph had to travel to a town called Bethlehem. But when they got there, all the hotels were FULL! 'No room!' everyone said.",
              "So baby Jesus was born in a stable, with cows and sheep as His first friends! Mary wrapped Him in soft cloths and laid Him in the hay. He was the most beautiful baby ever!",
            ],
          },
          {
            number: "03",
            title: "Visitors and Presents",
            paragraphs: [
              "Angels told shepherds about the special baby, and they ran as fast as they could to see Him! Then wise men came from far away, following a bright star!",
              "They brought presents — gold, frankincense, and myrrh. Everyone wanted to see the special baby! Baby Jesus smiled at them all. The King of the whole world, born in a barn!",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "resurrection",
    title: "The Resurrection",
    subtitle: "The morning death itself could not contain.",
    category: "New Testament",
    cardImage: "/assets/card-resurrection.jpg",
    heroImage: "/assets/card-resurrection.jpg",
    chapterImage: "/assets/resurrection-garden.jpg",
    primaryColor: "#D4A853",
    secondaryColor: "#5C2A2A",
    readingTime: "8 min read",
    perspectives: {
      classic: {
        chapters: [
          {
            number: "01",
            title: "The Darkest Day",
            paragraphs: [
              "Jesus was crucified at a place called the Skull. Darkness came over the whole land until three in the afternoon. At the ninth hour, Jesus cried out, 'It is finished.' Then he bowed his head and gave up his spirit.",
              "Joseph of Arimathea took the body, wrapped it in linen, and placed it in a tomb cut in the rock. A large stone was rolled against the entrance. The disciples scattered, afraid. The Sabbath began, and with it, a day of silence and grief.",
            ],
          },
          {
            number: "02",
            title: "The Empty Tomb",
            paragraphs: [
              "Early on the first day of the week, Mary Magdalene went to the tomb and saw that the stone had been removed. She ran to Simon Peter and the other disciple. They went to the tomb and found the burial cloths lying there, neatly folded.",
              "As Mary stood outside the tomb weeping, she saw two angels in white. 'Why are you crying?' they asked. 'They have taken my Lord away,' she said. Then she turned and saw Jesus standing there, though she did not recognize him at first. 'Mary,' he said. And she knew.",
            ],
          },
          {
            number: "03",
            title: "He is Risen",
            paragraphs: [
              "Jesus appeared to his disciples, showing them his hands and side. Thomas, who had doubted, touched the wounds and declared, 'My Lord and my God!' Jesus responded, 'Blessed are those who have not seen and yet have believed.'",
              "Before ascending, Jesus commissioned his followers: 'Go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit. And surely I am with you always, to the very end of the age.' Death had been defeated. Hope was alive.",
            ],
          },
        ],
      },
      modern: {
        chapters: [
          {
            number: "01",
            title: "When Hope Seems Lost",
            paragraphs: [
              "The day after everything falls apart — when the dream dies and silence is all that's left. The disciples had given up everything to follow Jesus, and now he was gone.",
              "Have you ever had a day like that? When the person you trusted most is taken from you? When the future you imagined disappears? That was Saturday — the longest day in history.",
            ],
          },
          {
            number: "02",
            title: "The Empty Space",
            paragraphs: [
              "Sometimes the most important thing is what's NOT there anymore. Empty tombs. Folded grave clothes. A new beginning where an ending was expected.",
              "Mary went looking for a body and found a conversation. The gardener turned out to be the risen Lord. The empty tomb wasn't a crime scene — it was an invitation to believe in the impossible.",
            ],
          },
          {
            number: "03",
            title: "New Life",
            paragraphs: [
              "The story doesn't end at the tomb — it begins there. Transformation, renewed purpose, and a mission that would change the world. The disciples went from hiding in fear to changing history.",
              "That's the power of resurrection. Not just a dead body coming back to life — though that happened. It's the power to transform ordinary people into world-changers. It's hope that refuses to die.",
            ],
          },
        ],
      },
      kids: {
        chapters: [
          {
            number: "01",
            title: "The Saddest Day",
            paragraphs: [
              "Some mean people hurt Jesus, and He died. Jesus's friends were SO sad. They cried and cried. They put Jesus in a tomb and rolled a big, heavy stone in front of the door.",
              "It was the saddest day ever. Everyone thought they would never see Jesus again. They missed their friend so much.",
            ],
          },
          {
            number: "02",
            title: "The Surprise!",
            paragraphs: [
              "On Sunday morning, Mary went to visit the tomb. But when she got there — SURPRISE! The big stone was rolled away! Jesus was GONE!",
              "An angel said, 'Don't be afraid — Jesus is alive!' Mary was SO happy she ran to tell everyone! Jesus came back! The best surprise EVER!",
            ],
          },
          {
            number: "03",
            title: "Jesus is Alive!",
            paragraphs: [
              "Jesus visited all His friends! They were SO happy to see Him! He ate fish with them and gave them a big hug. His friend Thomas even poked His hand to make sure it was really Him!",
              "Jesus is alive forever and ever! He said He would always be with us, even until the end of the world! That's the best news in the whole wide world!",
            ],
          },
        ],
      },
    },
  },
];

export function getStoryBySlug(slug: string): StoryData | undefined {
  return stories.find((s) => s.slug === slug);
}

export function getNextStory(slug: string): StoryData | undefined {
  const idx = stories.findIndex((s) => s.slug === slug);
  return idx >= 0 ? stories[(idx + 1) % stories.length] : undefined;
}

export function getStoryByEpisodeSlug(episodeSlug: string): StoryData | undefined {
  return stories.find((s) => s.episodes?.includes(episodeSlug));
}
