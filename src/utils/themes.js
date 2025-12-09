export const themes = {
  jungle: {
    name: 'Jungle',
    icon: '🦁',
    colors: ['#4CAF50', '#8BC34A', '#CDDC39'],
    stickers: ['🦁', '🐯', '🐘', '🦒', '🐒', '🦜', '🌴', '🍃', '🌺', '🦋'],
    titles: [
      '{name}\'s Jungle Adventure',
      '{name} and the Wild Safari',
      '{name} Explores the Rainforest',
      '{name}\'s Animal Friends',
      '{name}\'s Jungle Quest',
      '{name} the Jungle Explorer'
    ],
    texts: [
      '{name} ventured deep into the lush jungle, where colorful parrots flew overhead and monkeys swung from tree to tree.',
      'In the heart of the jungle, {name} discovered a world full of wonder, from majestic lions to playful elephants.',
      '{name} loved exploring the rainforest, making friends with all the amazing animals that lived there.',
      'Every day, {name} went on exciting safari adventures, learning about the incredible wildlife of the jungle.',
      'The jungle was {name}\'s favorite place to play, surrounded by towering trees and exotic creatures.',
      '{name} became the greatest jungle explorer, discovering new paths and befriending every animal along the way.'
    ]
  },
  space: {
    name: 'Space',
    icon: '🚀',
    colors: ['#2196F3', '#3F51B5', '#673AB7'],
    stickers: ['🚀', '🌟', '🌙', '⭐', '🪐', '👽', '🛸', '🌎', '☄️', '🌌'],
    titles: [
      '{name}\'s Space Adventure',
      '{name} the Astronaut',
      '{name} Among the Stars',
      '{name}\'s Cosmic Journey',
      '{name} Explores the Galaxy',
      '{name}\'s Mission to the Moon'
    ],
    texts: [
      '{name} blasted off into space, soaring past twinkling stars and colorful planets on an amazing cosmic journey.',
      'Floating in zero gravity, {name} explored distant galaxies and discovered new worlds beyond imagination.',
      '{name} became a brave astronaut, traveling through the solar system and making friends with friendly aliens.',
      'In the vastness of space, {name} marveled at the beauty of nebulas, asteroids, and shooting stars.',
      '{name}\'s spacecraft zoomed through the Milky Way, visiting planets and learning about the mysteries of the universe.',
      'As the greatest space explorer, {name} charted new constellations and brought back stories of cosmic wonders.'
    ]
  },
  ocean: {
    name: 'Ocean',
    icon: '🐠',
    colors: ['#00BCD4', '#03A9F4', '#2196F3'],
    stickers: ['🐠', '🐟', '🐙', '🦈', '🐬', '🐳', '🦀', '⭐', '🐚', '🌊'],
    titles: [
      '{name}\'s Ocean Adventure',
      '{name} Under the Sea',
      '{name} the Deep Sea Explorer',
      '{name}\'s Underwater World',
      '{name} and the Marine Friends',
      '{name}\'s Coral Reef Discovery'
    ],
    texts: [
      '{name} dove beneath the waves, discovering a magical underwater world filled with colorful fish and coral reefs.',
      'Swimming through the ocean, {name} made friends with playful dolphins, graceful sea turtles, and curious octopi.',
      '{name} explored the deep blue sea, finding hidden treasures and learning about the amazing creatures that live there.',
      'In the crystal-clear water, {name} swam alongside whales and watched schools of tropical fish dance through the coral.',
      '{name} loved the ocean\'s mysteries, from tiny seahorses to giant sharks, each one more fascinating than the last.',
      'As an expert ocean explorer, {name} protected the seas and all the wonderful marine life that called it home.'
    ]
  },
  princess: {
    name: 'Princess/Hero',
    icon: '👑',
    colors: ['#E91E63', '#9C27B0', '#FF4081'],
    stickers: ['👑', '🦄', '🏰', '⚔️', '🛡️', '💎', '🌟', '🦋', '🌹', '✨'],
    titles: [
      '{name} the Brave Hero',
      'Princess {name}\'s Adventure',
      '{name}\'s Royal Quest',
      '{name} the Fearless',
      '{name}\'s Magical Kingdom',
      '{name} and the Enchanted Castle'
    ],
    texts: [
      '{name} was a brave hero who embarked on epic quests, protecting the kingdom with courage and kindness.',
      'Princess {name} lived in a magnificent castle, where every day brought new magical adventures and wonderful friends.',
      'With a shining sword and a brave heart, {name} defended the realm from dragons and discovered hidden treasures.',
      '{name} ruled the kingdom with wisdom and grace, making sure everyone was happy and safe in the magical land.',
      'In the enchanted forest near the castle, {name} befriended unicorns and discovered ancient secrets of the realm.',
      'As the greatest hero of all time, {name} showed that true strength comes from being kind, brave, and true to yourself.'
    ]
  }
};

export function getThemeData(themeName) {
  return themes[themeName] || themes.jungle;
}

export function getRandomTitle(themeName) {
  const theme = getThemeData(themeName);
  return theme.titles[Math.floor(Math.random() * theme.titles.length)];
}

export function getRandomText(themeName) {
  const theme = getThemeData(themeName);
  return theme.texts[Math.floor(Math.random() * theme.texts.length)];
}

export function replaceName(text, name) {
  return text.replace(/{name}/g, name);
}
