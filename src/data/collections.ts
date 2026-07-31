// Collection metadata
export interface Collection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
}

export const collections: Collection[] = [
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

// Product metadata
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  collectionId: string;
  longDescription?: string;
  material?: string;
  dimensions?: string;
  storyUrl?: string;
  story?: {
    eyebrow: string;
    title: string;
    introduction: string;
    sections: {
      heading: string;
      content: string;
    }[];
    closingNote?: string;
    sources?: string;
  };
}

export const products: Product[] = [
  {
    id: 'light-in-stone',
    name: 'Light in Stone',
    description: 'A study of carved relief and shadow',
    category: 'Architecture',
    image: '/images/brand/a.jpeg',
    collectionId: 'architectures-of-intelligence',
    longDescription:
      'Carved stone reveals how light becomes architecture. This object documents the deliberate manipulation of relief depth to create shadow patterns that shift with the sun — a technique mastered in South Indian temple construction where sculptural form doubled as time-keeping device.',
    material: 'Cast stone composite with natural aggregate',
    dimensions: '240mm × 180mm × 45mm',
    storyUrl: '/stories/the-temple-that-measured-light',
    story: {
      eyebrow: 'ARCHITECTURAL INTELLIGENCE',
      title: 'Light in Stone',
      introduction:
        'In South Indian temple architecture, carved relief is not merely decorative. It is a calculated system where depth, angle, and orientation transform sunlight into a readable instrument. The stone becomes both surface and clock, marking time through shadow.',
      sections: [
        {
          heading: 'The Technique',
          content:
            'Temple sculptors understood that relief depth determines shadow length. By carving figures and motifs at specific depths and angles, they created patterns that shifted predictably with the sun\'s movement. Shallow relief cast short shadows at noon; deep undercuts extended them at dawn and dusk. The stone surface became a sundial, legible to those who knew how to read it.',
        },
        {
          heading: 'Functional Beauty',
          content:
            'This was not accidental decoration. Temples operated on strict schedules — ritual timings, offerings, processions. In an era before mechanical clocks, architecture itself kept time. Priests and attendants learned to read shadow patterns, correlating specific reliefs with specific hours. Form followed function, but both were inseparable.',
        },
        {
          heading: 'The Object',
          content:
            'This piece isolates a section of relief carving, capturing the interplay between carved depth and shadow. It documents a moment when architecture was also infrastructure — when aesthetic choice encoded practical knowledge, and beauty served a measurable purpose.',
        },
      ],
      closingNote:
        'Every surface contains intelligence. This object preserves one example of how form can be designed to measure, mark, and make visible the passage of time.',
      sources: 'Research based on temple architecture studies from Tamil Nadu, Karnataka, and Andhra Pradesh, 7th-13th centuries CE.',
    },
  },
  {
    id: 'the-subtractive-temple',
    name: 'The Subtractive Temple',
    description: 'Form through absence and excavation',
    category: 'Architecture',
    image: '/images/brand/b.jpeg',
    collectionId: 'architectures-of-intelligence',
    longDescription:
      'Rock-cut architecture reverses construction logic. Rather than building up, it removes stone to reveal space. This piece traces the engineering precision required to excavate monolithic structures from living rock — a tradition spanning Ajanta, Ellora, and Kailasa.',
    material: 'Sandstone with hand-carved detail',
    dimensions: '200mm × 200mm × 60mm',
    storyUrl: '/stories/the-mountain-released-into-form',
    story: {
      eyebrow: 'SUBTRACTIVE ARCHITECTURE',
      title: 'The Subtractive Temple',
      introduction:
        'Rock-cut architecture inverts the logic of construction. Instead of assembling materials to build form, it removes stone to reveal space. This required extraordinary precision — a single miscalculation could destroy years of work. The result was permanent, irreversible, and monumental.',
      sections: [
        {
          heading: 'The Method',
          content:
            'Excavation began at the top and worked downward, carving away solid rock to expose chambers, pillars, and facades. Unlike assembled structures where errors could be corrected, every chisel stroke in rock-cut architecture was final. Architects had to visualize the complete three-dimensional form before cutting began, planning drainage, structural support, and ornamentation simultaneously.',
        },
        {
          heading: 'Engineering Precision',
          content:
            'Sites like Ellora\'s Kailasa Temple required removing an estimated 200,000 tons of rock to create a freestanding structure carved from a single cliff face. The precision involved — maintaining symmetry, structural integrity, and aesthetic detail while working from top to bottom — represents one of history\'s most ambitious architectural achievements. The structural calculations had to account for hidden stress points within the living rock.',
        },
        {
          heading: 'The Archive',
          content:
            'This object isolates the principle of subtractive form-making. It documents a tradition where architecture was not built but revealed — where the removal of material was itself the construction process. The technique demanded foresight, patience, and absolute confidence in the unseen form waiting within the stone.',
        },
      ],
      closingNote:
        'Some forms are not made. They are uncovered. This object preserves the logic of architecture through subtraction.',
      sources: 'Research based on rock-cut architecture at Ajanta, Ellora, and Mahabalipuram, 2nd century BCE to 9th century CE.',
    },
  },
  {
    id: 'the-floating-illusion',
    name: 'The Floating Illusion',
    description: 'Engineering disguised as magic',
    category: 'Engineering',
    image: '/images/brand/c.jpeg',
    collectionId: 'architectures-of-intelligence',
    longDescription:
      'Certain architectural traditions achieved structural impossibilities through precise geometry and hidden counterweights. This object reveals the engineering intelligence behind seemingly gravity-defying cantilevers and suspended platforms — where physics masqueraded as spectacle.',
    material: 'Brass with oxidized patina',
    dimensions: '180mm × 120mm × 80mm',
    storyUrl: '/stories/the-palace-that-became-a-ship',
    story: {
      eyebrow: 'STRUCTURAL ILLUSION',
      title: 'The Floating Illusion',
      introduction:
        'Some structures appear to defy gravity. Overhanging balconies, suspended platforms, and cantilevers that project impossibly far from their supports — these were not accidents of design. They were calculated achievements, engineered through hidden counterweights, precise load distribution, and geometric principles that made the invisible do the work.',
      sections: [
        {
          heading: 'The Cantilever Principle',
          content:
            'Traditional architecture often concealed its structural logic. Cantilevered elements — projecting beams or platforms — relied on counterbalancing weight hidden within walls or beneath floors. The visible extension was always shorter than the invisible anchor. What appeared to float was actually held in tension, with forces distributed through carefully calculated angles and load-bearing points.',
        },
        {
          heading: 'Spectacle as Function',
          content:
            'These structures served dual purposes. Functionally, they provided shade, viewing platforms, or defensive overhangs. Symbolically, they demonstrated mastery — proof that the builders understood forces invisible to the eye. The illusion was intentional. Architecture became theater, with structural intelligence performing as magic.',
        },
        {
          heading: 'The Object',
          content:
            'This piece isolates the principle of hidden counterbalance. It captures a moment when engineering disguised itself as impossibility, when calculation presented itself as wonder. The form documents the intelligence required to make the solid appear weightless.',
        },
      ],
      closingNote:
        'Not all structure is visible. Sometimes the most sophisticated engineering is that which hides itself completely.',
      sources: 'Research based on traditional cantilever architecture in Rajasthan, Gujarat, and Kerala, 15th-18th centuries CE.',
    },
  },
  {
    id: 'terrain-of-resistance',
    name: 'Terrain of Resistance',
    description: 'Geography as strategic defense',
    category: 'History',
    image: '/images/brand/d.jpeg',
    collectionId: 'landscapes-of-power',
    longDescription:
      'Hill forts transformed landscape into military infrastructure. Strategic positioning on elevated terrain created defensive advantages that required minimal fortification. This piece maps how geography itself became a weapon — dictating empire boundaries and war outcomes.',
    material: 'Terracotta with relief topography',
    dimensions: '280mm × 200mm × 40mm',
    storyUrl: '/stories/the-mountain-that-became-a-defence-system',
    story: {
      eyebrow: 'DEFENSIVE GEOGRAPHY',
      title: 'Terrain of Resistance',
      introduction:
        'Hill forts did not merely occupy elevated terrain — they transformed landscape into weapon. Steep slopes became walls. Ridgelines became sight-lines. Rivers became moats. The fort was an extension of the mountain, and the mountain became infrastructure. Geography itself was militarized.',
      sections: [
        {
          heading: 'Strategic Elevation',
          content:
            'Positioning on high ground provided multiple defensive advantages: visibility across approaching routes, natural protection from siege engines, difficulty of uphill assault, and control over surrounding water sources. Fortifications built at elevation required less construction — the terrain did the work. A simple wall on a cliff edge provided the same protection as a massive rampart on flat ground.',
        },
        {
          heading: 'Topographic Intelligence',
          content:
            'Selecting fort locations required reading the land for military advantage. Planners identified natural choke points, defensible approaches, and terrain features that could be integrated into fortification design. The Sahyadri hill forts of the Maratha empire exemplify this — each positioned to control trade routes, communicate via signal fires, and resist siege through landscape advantage alone.',
        },
        {
          heading: 'The Object',
          content:
            'This piece maps the logic of defensive terrain. It documents how elevation, slope angle, and natural barriers were converted into military infrastructure. The relief surface captures a principle: that geography, when properly understood, becomes architecture.',
        },
      ],
      closingNote:
        'Some fortifications are built. Others are simply recognized. This object preserves the intelligence of seeing landscape as defense.',
      sources: 'Research based on Maratha hill forts of Maharashtra and Deccan plateau fortifications, 15th-18th centuries CE.',
    },
  },
  {
    id: 'ports-routes-power',
    name: 'Ports, Routes, Power',
    description: 'Trade networks that shaped empires',
    category: 'Trade',
    image: '/images/brand/e.jpeg',
    collectionId: 'landscapes-of-power',
    longDescription:
      'Maritime trade routes were not discovered — they were built through navigational knowledge, monsoon science, and port infrastructure. This object traces how control over these routes determined which kingdoms rose and which declined.',
    material: 'Composite with embedded copper route lines',
    dimensions: '320mm × 240mm × 30mm',
    storyUrl: '/stories/when-the-sea-became-a-route-of-power',
    story: {
      eyebrow: 'MARITIME NETWORKS',
      title: 'Ports, Routes, Power',
      introduction:
        'Maritime trade routes were not natural features waiting to be discovered. They were constructed through accumulated knowledge — monsoon wind patterns, coastal navigation markers, port infrastructure, and diplomatic networks. Control over these routes meant control over wealth, and wealth meant power. The ocean was not an obstacle. It was infrastructure.',
      sections: [
        {
          heading: 'Monsoon Science',
          content:
            'Indian Ocean trade depended on understanding seasonal wind reversals. The southwest monsoon (June-September) enabled sailing from Africa and Arabia to India. The northeast monsoon (November-February) powered return voyages. This six-month cycle structured trade calendars, port schedules, and economic planning. Navigators who mastered monsoon timing gained competitive advantage — arriving first at ports, avoiding storms, and optimizing cargo cycles.',
        },
        {
          heading: 'Port as Power',
          content:
            'Ports were not passive docking points. They were customs stations, warehouses, diplomatic centers, and information hubs. Control over a major port meant taxing goods, regulating merchants, and monitoring competing kingdoms. The Chola Empire\'s dominance of South Indian and Southeast Asian trade in the 11th century was built on port control — from Nagapattinam to Sri Vijaya, each port extended political influence through commerce.',
        },
        {
          heading: 'The Network',
          content:
            'This object maps the interconnected system of routes, ports, and monsoon knowledge that structured Indian Ocean trade. It documents how maritime networks became political infrastructure, and how empires rose not through land conquest alone, but through control of sea routes.',
        },
      ],
      closingNote:
        'Trade routes are not lines on maps. They are systems of knowledge, infrastructure, and power. This object preserves one such system.',
      sources: 'Research based on Indian Ocean trade networks, 1st century BCE to 15th century CE, with focus on Chola and Arab maritime traditions.',
    },
  },
  {
    id: 'stone-river-and-empire',
    name: 'Stone, River & Empire',
    description: 'How materials moved through history',
    category: 'Material',
    image: '/images/brand/f.jpeg',
    collectionId: 'matter-and-making',
    longDescription:
      'Monumental construction required supply chains. Granite quarries, river transport networks, and labor coordination systems moved millions of tons of stone across regions. This piece documents the material logistics that made empires physically possible.',
    material: 'Layered stone with river-worn texture',
    dimensions: '260mm × 180mm × 50mm',
    storyUrl: '/stories/stone-river-and-empire',
    story: {
      eyebrow: 'MATERIAL LOGISTICS',
      title: 'Stone, River & Empire',
      introduction:
        'Monumental architecture required more than design skill. It required logistics. Thousands of tons of stone had to be quarried, transported, and assembled. Rivers became highways. Quarries became strategic resources. Labor forces became institutions. The temple was not just built — it was the endpoint of a vast supply chain.',
      sections: [
        {
          heading: 'The Quarry System',
          content:
            'Granite for major South Indian temples came from specific quarries chosen for stone quality, grain structure, and color. Quarrying was precise work — stone had to be extracted in usable blocks without fracturing. Workers used controlled heating and cooling to split rock along natural planes, then shaped blocks on-site before transport. Each quarry supplied specific temples, creating material signatures traceable across centuries.',
        },
        {
          heading: 'River as Infrastructure',
          content:
            'Moving multi-ton stone blocks overland was nearly impossible with available technology. Rivers provided the solution. Blocks were floated on rafts or rolled onto boats during monsoon season when water levels were high. The Kaveri, Krishna, and Tungabhadra rivers became transport arteries, with loading points at quarries and unloading docks near construction sites. Temple location was often determined by river access.',
        },
        {
          heading: 'The Archive',
          content:
            'This object layers stone textures to document the journey from quarry to temple. It captures the intelligence embedded in material logistics — the knowledge required to transform geological resources into architectural monuments. The surface records what empires knew: that monumental vision required equally monumental coordination.',
        },
      ],
      closingNote:
        'Architecture is not only about what is built. It is also about how materials arrive. This object preserves the logistics of monumentality.',
      sources: 'Research based on granite quarries and river transport systems of Tamil Nadu and Karnataka, 9th-13th centuries CE.',
    },
  },
  {
    id: 'the-chettinad-floor-archive',
    name: 'The Chettinad Floor Archive',
    description: 'Pattern as cultural memory',
    category: 'Design',
    image: '/images/brand/g.jpeg',
    collectionId: 'living-lineages',
    longDescription:
      'Athangudi tiles preserve a 19th-century floor-making tradition from Tamil Nadu. Each pattern encodes regional motifs, color-mixing knowledge, and application techniques passed down through families. This object honors a craft lineage still practiced today.',
    material: 'Cement composite tile with traditional pigments',
    dimensions: '200mm × 200mm × 18mm',
    storyUrl: '/stories/the-floor-that-became-a-tabletop-archive',
    story: {
      eyebrow: 'LIVING CRAFT TRADITION',
      title: 'The Chettinad Floor Archive',
      introduction:
        'Athangudi tiles are not mass-produced. Each is hand-made using techniques passed down through generations of artisan families in the Chettinad region of Tamil Nadu. The patterns encode local motifs. The colors come from natural mineral pigments mixed to precise ratios. The process is slow, manual, and exact. This is architecture as living tradition.',
      sections: [
        {
          heading: 'The Making Process',
          content:
            'Each tile is cast in a mold, with colored cement poured in layers to form the pattern. No two tiles are identical — slight variations in pigment mixing, curing time, and hand-finishing create subtle differences. After casting, tiles are cured underwater for weeks, then sun-dried and polished. The result is a durable, richly colored surface that improves with age and wear.',
        },
        {
          heading: 'Pattern as Archive',
          content:
            'Chettinad tile patterns reflect the region\'s mercantile history — geometric forms borrowed from European, Arab, and Southeast Asian influences, adapted through local aesthetic sensibilities. Each pattern name carries meaning, referencing flowers, stars, waves, or architectural elements. Families guard pattern recipes, with specific color combinations and motifs marking individual workshops.',
        },
        {
          heading: 'Continuity and Change',
          content:
            'The craft nearly disappeared in the late 20th century as machine-made tiles became cheaper. Revival efforts in the 1990s brought Athangudi tiles back into architectural use, now valued precisely for their hand-made irregularity. Contemporary architects specify these tiles not despite their slow production but because of it — choosing craft continuity over industrial efficiency.',
        },
      ],
      closingNote:
        'Some traditions survive because they refuse to be efficient. This object honors a craft that values process over speed, and hand knowledge over mechanical reproduction.',
      sources: 'Research based on Athangudi tile-making traditions in Chettinad, Tamil Nadu, 19th century to present.',
    },
  },
  {
    id: 'the-four-faces-of-water',
    name: 'The Four Faces of Water',
    description: 'Sacred geometry in utility',
    category: 'Ritual',
    image: '/images/brand/h.jpeg',
    collectionId: 'living-lineages',
    longDescription:
      'Stepwells combined hydraulic engineering with ritual architecture. Descending into the earth to reach water became a choreographed spiritual experience. This piece explores how functional infrastructure doubled as sacred space through geometric precision.',
    material: 'Stone with carved stepwell geometry',
    dimensions: '220mm × 220mm × 70mm',
    storyUrl: '/stories/water-held-below-the-earth',
    story: {
      eyebrow: 'RITUAL INFRASTRUCTURE',
      title: 'The Four Faces of Water',
      introduction:
        'Stepwells are simultaneously utilitarian and sacred. They provide access to groundwater through descending staircases carved into the earth. But they are also pilgrimage sites, meditation spaces, and architectural marvels. The descent to water is not merely functional — it is ceremonial, with each level marked by carved pillars, shrines, and geometric precision.',
      sections: [
        {
          heading: 'Hydraulic Intelligence',
          content:
            'Stepwells solved the problem of seasonal water-table fluctuation. In regions where water levels dropped significantly in summer, surface wells became inaccessible. Stepwells allowed descent to whatever depth water was available, with multiple platforms providing access year-round. The engineering required calculating load-bearing capacity, drainage, structural stability, and cooling through natural ventilation.',
        },
        {
          heading: 'Sacred Geometry',
          content:
            'The descent into a stepwell was designed as a spiritual journey. Symmetrical staircases, repeating arches, and columned galleries created a rhythmic procession toward water. The geometry imposed order on the act of retrieval, transforming a mundane task into ritual. At the deepest level, cool air, dim light, and the sound of water created an atmosphere distinct from the world above.',
        },
        {
          heading: 'The Object',
          content:
            'This piece abstracts the four-sided symmetry common to many stepwells. It documents how infrastructure became architecture, and how necessity was elevated to art. The carved geometry captures the intelligence of designing for both function and meaning.',
        },
      ],
      closingNote:
        'Not all functional structures are purely practical. Some are designed to make utility sacred. This object preserves that intelligence.',
      sources: 'Research based on stepwells of Gujarat and Rajasthan, particularly Adalaj, Rani ki Vav, and Chand Baori, 6th-16th centuries CE.',
    },
  },
  {
    id: 'the-ghatika-yantra',
    name: 'The Ghatika Yantra',
    description: 'Ancient precision in measuring time',
    category: 'Science',
    image: '/images/brand/i.jpeg',
    collectionId: 'measures-of-time-and-cosmos',
    longDescription:
      'Water clocks achieved remarkable accuracy before mechanical horology. The Ghatika Yantra measured time through controlled water flow, calibrated to astronomical observations. This object represents the intersection of hydraulics, astronomy, and ritual timekeeping.',
    material: 'Brass with water-flow calibration marks',
    dimensions: '160mm diameter × 140mm height',
    storyUrl: '/stories/time-measured-by-water',
    story: {
      eyebrow: 'HYDRAULIC TIMEKEEPING',
      title: 'The Ghatika Yantra',
      introduction:
        'Before mechanical clocks, time was measured through water. The Ghatika Yantra — a water clock — dripped water at a controlled rate through a calibrated vessel. As the water level changed, marked intervals indicated elapsed time. The device was precise enough to coordinate temple rituals, astronomical observations, and daily schedules. Water became measurement.',
      sections: [
        {
          heading: 'The Mechanism',
          content:
            'A typical Ghatika Yantra consisted of a perforated bowl placed in a larger vessel of water. The bowl slowly filled through the hole, sinking when full. The time taken to sink — precisely calibrated — measured a fixed interval called a "ghatika," approximately 24 minutes. Multiple cycles marked hours, with attendants tracking cycles to maintain accuracy. The hole size, bowl weight, and water temperature were all calibrated variables.',
        },
        {
          heading: 'Astronomical Calibration',
          content:
            'Water clocks were synchronized with celestial observations. The length of day and night varies seasonally, so ghatika durations were adjusted based on solar and lunar calculations. This required continuous astronomical observation and mathematical correction. Temple timekeepers maintained these calibrations, ensuring that ritual schedules aligned with cosmic cycles. The Ghatika Yantra was not just a clock — it was an instrument connecting earthly time to celestial motion.',
        },
        {
          heading: 'The Object',
          content:
            'This piece preserves the logic of hydraulic timekeeping. It documents an era when time was fluid — literally — and measurement required intimate knowledge of water behavior, material properties, and astronomical mathematics. The calibration marks record the intelligence required to make time visible and reliable.',
        },
      ],
      closingNote:
        'Time is not self-evident. It must be constructed, measured, and maintained. This object preserves one method of that construction.',
      sources: 'Research based on water clocks used in South Indian temples and astronomical observatories, 7th-18th centuries CE.',
    },
  },
];

// Helper function to get products by collection
export function getProductsByCollection(collectionId: string): Product[] {
  return products.filter((product) => product.collectionId === collectionId);
}

// Helper function to get collection by ID
export function getCollectionById(id: string): Collection | undefined {
  return collections.find((collection) => collection.id === id);
}

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
