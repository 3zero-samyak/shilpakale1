// Editorial collection metadata
// This file contains ONLY presentation-layer editorial information that Shopify does not store.
// Product membership and product data come from Shopify Storefront API.

export interface CollectionEditorial {
  id: string; // Must match Shopify collection handle
  number: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
}

export const collectionEditorial: CollectionEditorial[] = [
  {
    id: 'architectures-of-intelligence',
    number: '01',
    title: 'Architectures of Intelligence',
    subtitle: 'THE BLUEPRINT CHRONICLES',
    description: 'Built systems, engineering, structure, climate, acoustics.',
    longDescription:
      'This collection explores the intelligence embedded in built environments — from acoustic engineering in ancient temples to structural innovations that responded to climate, material availability, and cultural purpose. Each object represents a specific architectural insight that shaped how societies understood and manipulated space.',
  },
  {
    id: 'landscapes-of-power',
    number: '02',
    title: 'Landscapes of Power',
    subtitle: 'THE SHIFTED LANDSCAPES',
    description: 'Routes, rivers, borders, terrain, seas, and defence geography.',
    longDescription:
      'Geography has always been power. This collection examines how natural and constructed landscapes — rivers, mountain passes, fortified terrains, maritime routes — shaped political boundaries, military strategy, and trade networks. Each piece captures a moment when landscape became infrastructure.',
  },
  {
    id: 'sovereign-systems',
    number: '03',
    title: 'Sovereign Systems',
    subtitle: 'THE STATECRAFT CODEX',
    description: 'Administration, seals, oaths, intelligence, and military order.',
    longDescription:
      'Sovereignty requires systems. This collection traces the administrative, symbolic, and organizational technologies that allowed empires and kingdoms to function — from royal seals that authenticated power to military hierarchies that coordinated large-scale operations. Each object represents a system of control, legitimacy, or order.',
  },
  {
    id: 'measures-of-time-and-cosmos',
    number: '04',
    title: 'Measures of Time & Cosmos',
    subtitle: 'THE CALCULATED SKY',
    description: 'Astronomy, timekeeping, calendars, geometry, and cosmic systems.',
    longDescription:
      'The measurement of time and space was a civilizational achievement. This collection highlights the instruments, calendars, and geometric systems that allowed societies to track celestial movements, synchronize agricultural cycles, and understand their place in the cosmos. Each piece is an artifact of precision.',
  },
  {
    id: 'matter-and-making',
    number: '05',
    title: 'Matter & Making',
    subtitle: 'THE MATERIAL CODEX',
    description: 'Metallurgy, alloy science, stone, craft, surface, and material transformation.',
    longDescription:
      'Material knowledge is cultural knowledge. This collection focuses on how societies transformed raw materials — through metallurgy, stone carving, alloy science, and surface finishing — into objects of utility, ritual, and art. Each piece documents a specific material intelligence.',
  },
  {
    id: 'living-lineages',
    number: '06',
    title: 'Living Lineages',
    subtitle: 'THE LIVING ETHOS',
    description: 'Rituals, community practice, domestic knowledge, craft, and living traditions.',
    longDescription:
      'Not all intelligence is monumental. This collection celebrates the knowledge systems embedded in domestic life, ritual practice, craft traditions, and community memory — often passed orally, practiced daily, and rarely documented. Each object honours a living tradition.',
  },
];

// Helper function to get collection editorial data by handle
export function getCollectionEditorial(handle: string): CollectionEditorial | undefined {
  return collectionEditorial.find((collection) => collection.id === handle);
}
