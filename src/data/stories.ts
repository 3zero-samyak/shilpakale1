/**
 * SHILPAKALE Story Data
 * 
 * Canonical source for all nine launch stories.
 * Used by:
 * - /stories index page
 * - /stories/[storySlug] dynamic pages
 * - Product story overlays (via getStoryByProductHandle)
 * 
 * Do not duplicate this data elsewhere.
 */

export type StorySection = {
  heading: string;
  paragraphs: string[];
};

export type ShilpakaleStory = {
  number: string;
  productName: string;
  productHandle: string;
  productType: string;
  storyTitle: string;
  storySlug: string;
  storyLine: string;
  preview: string;
  collectionName: string;
  collectionSlug: string;
  openingStatement: string;
  sections: StorySection[];
};

export const stories: ShilpakaleStory[] = [
  {
    number: '01',
    productName: 'Light in Stone',
    productHandle: 'light-in-stone',
    productType: 'Architecture model',
    storyTitle: 'The Temple That Measured Light',
    storySlug: 'the-temple-that-measured-light',
    storyLine: 'A temple where sunlight, shadow, and sacred architecture meet.',
    preview: 'At Sringeri, zodiac-marked pillars, sunlight, and shadow meet within sacred architecture. The temple becomes a study in how stone can receive and reveal the movement of time.',
    collectionName: 'Architectures of Intelligence',
    collectionSlug: 'architectures-of-intelligence',
    openingStatement: 'Stone remains still. Light moves across it. Between them, time becomes visible.',
    sections: [
      {
        heading: 'THE FOUNDATION',
        paragraphs: [
          'The Vidyashankara Temple at Sringeri stands where the Tunga River bends. Built in the 14th century, its architecture combines structure with celestial observation. Twelve stone pillars mark the twelve zodiac signs, arranged to receive sunlight at specific times of the year. The floor becomes a receiving surface. As the sun moves across the sky and through the seasons, shadows fall on corresponding pillars, marking time through light and stone.',
          'This is not symbolic decoration. The pillars are positioned with geometric precision. The zodiac sequence follows the annual solar path. On certain days, sunlight enters through specific openings, casting shadows that align with particular zodiac markers. The temple structure acts as an architectural timepiece, making the movement of celestial bodies observable through terrestrial shadow.',
        ],
      },
      {
        heading: 'THE HISTORICAL WORLD',
        paragraphs: [
          'In medieval South India, temples functioned as centers of knowledge. They housed scholars, astronomers, and mathematicians. Time measurement was essential for ritual schedules, agricultural planning, and astronomical study. Temples maintained calendars, calculated planetary positions, and coordinated regional festivals. Architecture became infrastructure for this knowledge work.',
          'The Vidyashankara Temple emerged from this context. Its construction involved temple architects, astronomers, and stone carvers working together. The zodiac pillars required understanding solar paths, shadow angles, and stone placement. The building process encoded astronomical knowledge into physical form, creating a structure where observation became architectural experience.',
        ],
      },
      {
        heading: 'THE HIDDEN INTELLIGENCE',
        paragraphs: [
          'What makes this system intelligent is its passivity. The temple does not move. Light moves. Shadow moves. The architecture simply receives what the sun provides and makes it legible. The stone surface remains fixed while the shadows trace patterns across it. Time, which is invisible and continuous, becomes visible and marked.',
          'The intelligence lies in designing space to capture natural phenomena. The angles of pillars, the placement of openings, the height of the roof -- these architectural decisions determine what becomes visible and when. Form shapes experience. Stone shapes time. The building is both object and instrument.',
        ],
      },
      {
        heading: 'WHY IT MATTERS NOW',
        paragraphs: [
          'In an era of digital timekeeping, the idea of measuring time through sunlight and shadow seems archaic. Yet this medieval system reveals something we have lost: the understanding that measurement is not neutral. Every measuring instrument embeds assumptions about what matters and what can be ignored. Digital clocks abstract time into uniform units, detached from seasonal variation or geographic location.',
          'The Vidyashankara Temple shows us time as a relationship between earth, architecture, and sky. The shadows do not just mark time -- they make visible the movement that produces time. This is a form of knowledge that requires physical presence, patient observation, and the willingness to work within natural constraints rather than overcome them.',
        ],
      },
      {
        heading: 'THE SHILPAKALE INTERPRETATION',
        paragraphs: [
          'Light in Stone is not a reconstruction. It is a minimal architectural study in stone, created to hold the idea of how shadow can mark time. The form references temple pillars without replicating their ornamentation. The proportions reflect the relationship between vertical elements and horizontal surfaces. It is reduced to a question: what happens when light meets stone?',
          'This is an object for considering the intelligence of passive systems. It sits in domestic space as a reminder that architecture can be an instrument, that form can capture natural phenomena, that intelligence is not always active. It carries the memory of a place where time was made visible, not through digital precision, but through the patient alignment of stone, light, and shadow.',
        ],
      },
    ],
  },
  {
    number: '02',
    productName: 'The Subtractive Temple',
    productHandle: 'the-subtractive-temple',
    productType: 'Architecture model',
    storyTitle: 'The Temple Carved from a Single Rock',
    storySlug: 'the-temple-carved-from-a-single-rock',
    storyLine: 'A structure created not by building up, but by carving down.',
    preview: 'At Ellora, the Kailash Temple was not assembled but excavated -- carved top-down from continuous rock. The architecture does not rest on the ground; it emerges from it.',
    collectionName: 'Architectures of Intelligence',
    collectionSlug: 'architectures-of-intelligence',
    openingStatement: 'To build a temple, first remove everything that is not a temple.',
    sections: [
      {
        heading: 'THE FOUNDATION',
        paragraphs: [
          'Most architecture is additive. Stone is quarried, transported, and assembled. Walls rise from foundations. Structures grow upward through accumulated material. The Kailash Temple at Ellora represents the opposite logic: subtractive architecture. A single massive rock face was identified, and the temple was carved downward, removing an estimated 200,000 tons of stone to reveal courtyards, shrines, and columned halls.',
          'This is not metaphorical removal. Workers began at the top of the cliff, cutting trenches to define the outer boundaries. They carved downward through solid basalt, creating the roof first, then the upper stories, finally reaching the base. What remains is continuous with the bedrock. The temple did not arrive at Ellora. It was already there, waiting to be disclosed.',
        ],
      },
      {
        heading: 'THE HISTORICAL WORLD',
        paragraphs: [
          'Rock-cut architecture has a long history across India, from the Buddhist caves at Ajanta to the Shore Temple at Mahabalipuram. These structures demonstrate an understanding of geology, structural mechanics, and spatial planning. Builders identified suitable rock faces -- stable stone with minimal fracturing. They assessed internal stress patterns to ensure carved chambers would remain standing. They planned drainage to prevent water accumulation that could weaken the structure.',
          'The Kailash Temple, attributed to the 8th century Rashtrakuta dynasty, represents the pinnacle of this tradition. Its scale and complexity surpass earlier rock-cut monuments. The design includes a main shrine, subsidiary shrines, gateways, columned halls, and sculpted elephants -- all carved from continuous rock. The architectural program required coordinating stone carvers, structural engineers, and religious planners over decades of work.',
        ],
      },
      {
        heading: 'THE HIDDEN INTELLIGENCE',
        paragraphs: [
          'The intelligence of subtractive architecture lies in its demand for complete mental visualization. When assembling a structure, builders can adjust as they go. Walls can be rebuilt. Columns can be repositioned. But in rock-cut architecture, the form must exist fully conceived before execution. The relationship between solid and void, between remaining stone and removed space, determines everything.',
          'Carving downward also means upper levels support nothing -- they are relieved of structural load as excavation progresses. Lower sections bear increasing weight as chambers and courtyards are hollowed out below. The masons had to understand load distribution within living rock, accounting for hidden faults and stress concentrations. The temple\'s survival for over a millennium confirms their calculations were sound.',
        ],
      },
      {
        heading: 'WHY IT MATTERS NOW',
        paragraphs: [
          'Additive thinking dominates contemporary practice. We assume progress means accumulation: more material, more energy, more systems. Subtractive thinking inverts this. It asks not what to add, but what to remove. Not what to construct, but what to reveal. This is not minimalism for aesthetic effect. It is a method for working within constraints, for finding form through discipline rather than through accumulation.',
          'The Kailash Temple shows us that subtraction requires greater foresight than addition. Mistakes cannot be corrected by adding more material. Every cut is permanent. The carved form must be right from the beginning, which means the mental model must be complete before physical work begins. This is a different relationship to making -- one where thinking precedes action, where planning is not optional, where restraint is a form of intelligence.',
        ],
      },
      {
        heading: 'THE SHILPAKALE INTERPRETATION',
        paragraphs: [
          'The Subtractive Temple is not a replica of Ellora. It is a study in stone of the subtractive principle. Minimal forms carved from single blocks suggest the idea of removal without imitating ornamental detail. The object holds the memory of rock-cut thinking: that form can emerge through discipline, that structure can be found rather than imposed, that less can reveal more.',
          'This is an object for slow consideration. It sits in domestic space as a reminder that intelligence is not always about addition. It carries a question: what would happen if we designed by removal instead of accumulation? What forms might we find if we started with the whole and carved away the unnecessary? It is a small stone presence that points to a larger architectural tradition, one where patience, precision, and complete mental visualization were essential tools.',
        ],
      },
    ],
  },
  {
    number: '03',
    productName: 'The Floating Illusion',
    productHandle: 'the-floating-illusion',
    productType: 'Architecture model',
    storyTitle: 'The Palace That Appeared to Float on Water',
    storySlug: 'the-palace-that-appeared-to-float-on-water',
    storyLine: 'A palace designed to create the illusion of floating on water.',
    preview: 'At Mandu, the Jahaz Mahal sits between two lakes, creating the visual impression of a ship floating on water. The architecture does not float -- it relies on placement, proportion, and reflection.',
    collectionName: 'Architectures of Illusion',
    collectionSlug: 'architectures-of-illusion',
    openingStatement: 'The palace does not float. But placed between water, it suggests floating. Architecture becomes illusion through placement.',
    sections: [
      {
        heading: 'THE FOUNDATION',
        paragraphs: [
          'The Jahaz Mahal at Mandu sits on a narrow strip of land between two artificial lakes. From a distance, the structure appears to float on water. The visual effect depends on precise placement: the building occupies the thin ridge between water bodies, so that from certain vantage points, the surrounding land disappears and only water and architecture remain visible. The proportions of the structure -- long, narrow, horizontal -- reinforce the illusion of a ship.',
          'This is not accidental design. The Jahaz Mahal was built in the 15th century as part of Mandu\'s royal complex. The site was engineered: the lakes were created, the land shaped, the structure positioned to maximize visual effect. The architecture does not actually float. It sits on solid foundations. But through placement and proportion, it creates the appearance of weightlessness, of separation from the land.',
        ],
      },
      {
        heading: 'THE HISTORICAL WORLD',
        paragraphs: [
          'Mandu, located on a plateau in central India, developed as a fortified city and pleasure retreat under the Malwa Sultanate. Water management was central to the site -- artificial lakes, stepwells, and channels ensured water supply for the palace complex and surrounding settlements. The landscape was not passive backdrop but active infrastructure. Lakes provided water, moderated temperature, and created visual scenery.',
          'The Jahaz Mahal\'s design reflects a broader tradition of water-based architecture across the subcontinent. From the reflecting pools of Mughal gardens to the stepped tanks of Gujarat, water was used to enhance spatial experience, to create reflections that doubled architectural presence, to introduce movement into static stone. The Jahaz Mahal extends this tradition by using water not just as ornament but as the primary context that defines the building\'s visual identity.',
        ],
      },
      {
        heading: 'THE HIDDEN INTELLIGENCE',
        paragraphs: [
          'The intelligence of the Jahaz Mahal lies in how it uses context to alter perception. The structure itself is solid stone, firmly rooted. But by controlling what is visible -- eliminating land, maximizing water, shaping proportions -- the architects created an illusion of floating. The building does not defy gravity. It uses placement to suggest it might.',
          'This is architectural thinking as optical thinking. The designers understood how distance, viewpoint, and surrounding landscape affect perception. They shaped not just the building but also the conditions for viewing the building. The lakes are not decoration; they are essential to the effect. Remove the water, and the palace is simply a long building on a ridge. The architecture depends on its relationship to the landscape -- and the landscape was designed to produce that relationship.',
        ],
      },
      {
        heading: 'WHY IT MATTERS NOW',
        paragraphs: [
          'We tend to think of architecture as fixed objects in space. But the Jahaz Mahal reminds us that architecture is also about perception -- how a building is seen, from where it is seen, and what surrounds it. The structure does not float, but it persuades the viewer it might. This is a form of intelligence that works through suggestion rather than declaration.',
          'In a world saturated with literal statements, the Jahaz Mahal offers a different approach: creating effects through context, not through the object alone. It shows us that intelligent design is not always about the thing itself, but about the relationships that make the thing visible. The palace does not announce its presence through height or ornament. It achieves presence through absence -- by removing the land from view and leaving only water and stone.',
        ],
      },
      {
        heading: 'THE SHILPAKALE INTERPRETATION',
        paragraphs: [
          'The Floating Illusion is not a model of the Jahaz Mahal. It is a study of the principle: how placement and proportion create visual effects. The form is minimal, referencing the long horizontal proportions of Mandu without replicating its details. It is an object that suggests floating through shape and surface, even when it sits on a solid base.',
          'This is an object for considering how context shapes perception. It sits in domestic space as a reminder that architecture is not just material and structure, but also illusion and suggestion. It carries the memory of a place where water, stone, and viewpoint combined to create an effect that exceeded the physical facts. It asks: what can we make visible by controlling what remains hidden?',
        ],
      },
    ],
  },
  {
    number: '04',
    productName: 'Terrain of Resistance',
    productHandle: 'terrain-of-resistance',
    productType: 'Terrain model',
    storyTitle: 'The Forts Built into Mountain Geography',
    storySlug: 'the-forts-built-into-mountain-geography',
    storyLine: 'Fortifications that work with geography, not against it.',
    preview: 'Across the Sahyadri hills, forts were positioned not as isolated strongholds but as nodes in a distributed defense network. Geography itself became infrastructure.',
    collectionName: 'Landscapes of Power',
    collectionSlug: 'landscapes-of-power',
    openingStatement: 'The mountain is not the site for the fort. The mountain is the fort.',
    sections: [
      {
        heading: 'THE FOUNDATION',
        paragraphs: [
          'The Sahyadri mountain range runs parallel to India\'s western coast. Across these hills, hundreds of forts were built, modified, and rebuilt over centuries. These were not isolated structures but interconnected nodes in a regional defense system. Forts communicated through signal fires. Supplies moved along protected routes. Natural features -- cliffs, plateaus, water sources -- determined fort placement.',
          'Each fort worked with terrain. Steep slopes reduced the need for high walls. Plateau tops provided defensible space. Natural springs ensured water supply during sieges. Builders did not impose geometric plans on the landscape. They found defensible positions and enhanced them. The result was a network of fortifications that could not be separated from the geography that supported them.',
        ],
      },
      {
        heading: 'THE HISTORICAL WORLD',
        paragraphs: [
          'The Sahyadri forts were developed and maintained by multiple powers, including the Marathas under Shivaji in the 17th century. Maratha military strategy emphasized mobility, dispersed control, and knowledge of terrain. Fortifications were not just military positions but administrative centers, supply depots, and symbols of regional authority. Controlling the hills meant controlling trade routes, coastal access, and interior pathways.',
          'The forts demonstrate sophisticated site selection. Engineers assessed approach routes, water availability, visibility, and communication links. Some forts occupied summit positions with commanding views. Others guarded passes or river crossings. The network functioned collectively: losing one fort did not collapse the system. This was distributed resilience, centuries before the term existed in engineering.',
        ],
      },
      {
        heading: 'THE HIDDEN INTELLIGENCE',
        paragraphs: [
          'The intelligence of the Sahyadri forts lies in recognizing that geography is not neutral. Terrain provides advantages and constraints. Intelligent design works with these features, not against them. A cliff face reduces the need for masonry walls. A plateau provides natural defensive perimeter. A spring eliminates supply vulnerability. The fort builders did not conquer the mountain; they inhabited it strategically.',
          'This is infrastructure thinking applied to landscape. The hills were not obstacles to overcome but resources to deploy. The forts relied on understanding local geology, hydrology, and microclimates. Successful defense required not just walls and weapons, but knowledge of terrain -- where paths could be ambushed, where signals could be seen, where forces could regroup. The landscape itself became a military asset.',
        ],
      },
      {
        heading: 'WHY IT MATTERS NOW',
        paragraphs: [
          'Contemporary infrastructure often treats landscape as a blank surface. We impose roads, buildings, and systems without asking what the terrain already provides. The Sahyadri forts offer a different model: design that begins with understanding local conditions, that enhances rather than replaces natural features, that works with existing flows rather than redirecting them.',
          'This is not romanticizing the past. It is recognizing that ignoring geography leads to inefficiency. Building in flood plains leads to flooding. Ignoring solar orientation increases energy demand. Neglecting wind patterns reduces ventilation. The fort builders understood that intelligent design requires responding to place -- and that the best infrastructure amplifies what is already there.',
        ],
      },
      {
        heading: 'THE SHILPAKALE INTERPRETATION',
        paragraphs: [
          'Terrain of Resistance is not a replica of any single fort. It is a carved stone study of how elevation, fortification, and landscape interact. The form suggests ridges, plateaus, and defensive walls without attempting literal representation. It is an object that holds the memory of how geography can become architecture.',
          'This is an object for thinking about place-based design. It sits in domestic space as a reminder that the best infrastructure does not fight the terrain -- it uses the terrain. It carries a question: what would contemporary design look like if we started with the landscape, not despite it? What efficiencies might we gain if we worked with geography rather than imposing plans that ignore it?',
        ],
      },
    ],
  },
  {
    number: '05',
    productName: 'Ports, Routes, Power',
    productHandle: 'ports-routes-power',
    productType: 'Maritime map study',
    storyTitle: 'The Maritime Network That Shaped Trade',
    storySlug: 'the-maritime-network-that-shaped-trade',
    storyLine: 'A network of ports, routes, and monsoon patterns that connected kingdoms.',
    preview: 'The Chola maritime network linked South India to Southeast Asia through ports, ships, and seasonal monsoon winds. Trade infrastructure became political power.',
    collectionName: 'Landscapes of Power',
    collectionSlug: 'landscapes-of-power',
    openingStatement: 'Control the ports. Control the monsoon routes. Control the trade.',
    sections: [
      {
        heading: 'THE FOUNDATION',
        paragraphs: [
          'Between the 9th and 13th centuries, the Chola dynasty developed a maritime network spanning the Bay of Bengal. This was not colonial occupation but a trade and diplomatic system. Chola merchants, ships, and emissaries operated from South Indian ports like Nagapattinam, connecting with Southeast Asian ports including those in present-day Sri Lanka, Myanmar, Thailand, and Indonesia. Trade goods -- textiles, spices, metals, ceramics -- moved along these routes, supported by monsoon wind patterns that dictated sailing seasons.',
          'This network required infrastructure. Ports needed docking facilities, warehouses, and customs administration. Ships required skilled shipwrights, navigators, and crews. Routes required knowledge of seasonal winds, currents, and safe harbors. The Cholas developed maritime expertise, invested in port cities, and maintained diplomatic relationships with Southeast Asian rulers. This was infrastructure thinking applied to oceanic space -- not just building ships, but organizing an entire system for moving goods, people, and influence across water.',
        ],
      },
      {
        heading: 'THE HISTORICAL WORLD',
        paragraphs: [
          'The Indian Ocean has supported long-distance trade for millennia. By the medieval period, multiple powers -- including the Cholas, Arab merchants, Chinese traders, and Southeast Asian kingdoms -- operated within overlapping maritime networks. The Cholas distinguished themselves through naval capacity and political organization. They constructed large ocean-going vessels, maintained a standing navy, and integrated maritime trade with state revenue.',
          'Chola inscriptions record trade guilds, port taxes, and grants to merchant organizations. Temples received donations from overseas trade profits. Maritime commerce was not peripheral to Chola power; it was central. Control of ports translated into economic and political influence. The Chola network was not an empire in the territorial sense, but a system of connected ports, allied rulers, and protected trade routes. It was infrastructure as geopolitics.',
        ],
      },
      {
        heading: 'THE HIDDEN INTELLIGENCE',
        paragraphs: [
          'The intelligence of the Chola maritime system lies in recognizing that power over water requires different strategies than power over land. Land can be occupied and fortified. Water is traversed, not held. Maritime power requires controlling nodes -- ports, straits, islands -- and flows -- trade routes, seasonal passages, shipping lanes. The Cholas understood this. They invested in ports, built relationships with distant rulers, and protected merchant activity.',
          'Monsoon winds shaped everything. Southwest monsoons facilitated summer voyages from India to Southeast Asia. Northeast monsoons enabled winter returns. This pattern determined trade schedules, port activity, and naval campaigns. The Cholas worked within these natural rhythms. They did not try to override the monsoon -- they organized their maritime system around it. This is intelligence through coordination: aligning ships, ports, seasons, and trade goods into a functioning network.',
        ],
      },
      {
        heading: 'WHY IT MATTERS NOW',
        paragraphs: [
          'We live in a world defined by networks: supply chains, communication systems, financial flows. These networks rely on infrastructure -- ports, servers, cables, routes. The Chola maritime system reminds us that networks are not automatic. They require investment, maintenance, and coordination. They depend on controlling critical nodes and protecting flows. They succeed when they align with natural patterns -- seasonal, geographic, economic -- rather than ignoring them.',
          'Contemporary discussions about trade, geopolitics, and infrastructure often focus on new technology. But the fundamental questions remain the same as those faced by the Cholas: Where should infrastructure be located? How should nodes connect? What natural patterns must be respected? How do you maintain a network across distance and time? The Chola network thrived for centuries because it answered these questions through sustained investment and strategic thinking.',
        ],
      },
      {
        heading: 'THE SHILPAKALE INTERPRETATION',
        paragraphs: [
          'Ports, Routes, Power is not a replica map. It is a layered study in stone or surface that suggests maritime networks -- routes, ports, seasonal winds -- without claiming cartographic accuracy. It is an object for thinking about connectivity, about how infrastructure shapes power, about how natural patterns like monsoons determine human systems.',
          'This is an object for considering networks. It sits in domestic space as a reminder that systems require infrastructure, that infrastructure requires investment, that power often flows through networks rather than territories. It carries the memory of a medieval maritime system that connected distant ports, moved goods across oceans, and demonstrated that water can be organized as effectively as land -- if you understand the patterns that govern it.',
        ],
      },
    ],
  },
  {
    number: '06',
    productName: 'Stone, River & Empire',
    productHandle: 'stone-river-and-empire',
    productType: 'Terrain model',
    storyTitle: 'The Capital Shaped by Granite and Water',
    storySlug: 'stone-river-and-empire',
    storyLine: 'A capital shaped by granite terrain, river, and imperial planning.',
    preview: 'At Hampi, river, granite terrain, sacred zones, royal centers, and water systems formed one interconnected capital. Vijayanagara was not placed on the land; it developed with the land.',
    collectionName: 'Landscapes of Power',
    collectionSlug: 'landscapes-of-power',
    openingStatement: 'Vijayanagara was not placed upon an empty landscape. River, stone, city and empire developed together.',
    sections: [
      {
        heading: 'THE FOUNDATION',
        paragraphs: [
          'Vijayanagara, now known as Hampi, developed as the capital of a medieval South Indian empire between the 14th and 16th centuries. The site sits within a dramatic granite landscape where the Tungabhadra River flows through boulder fields and rocky hills. The urban plan integrated this terrain: sacred zones occupied hills with existing religious sites; royal centers developed on the riverbank; water management systems used natural topography to direct flow. The city did not erase the landscape. It organized itself within it.',
          'The architecture reflects this relationship. Temples were built using local granite. Boulders became foundations or were left standing as landscape features. Water channels, reservoirs, and aqueducts followed natural gradients. The city required stone, and stone was everywhere. The city required water, and the river provided it. Vijayanagara was not built despite its terrain -- it was built because of it.',
        ],
      },
      {
        heading: 'THE HISTORICAL WORLD',
        paragraphs: [
          'The Vijayanagara Empire emerged in a period of political fragmentation. It expanded across southern India, controlling trade routes, agricultural regions, and coastal ports. The capital became a hub for commerce, diplomacy, and cultural production. Foreign visitors -- including Persian, Portuguese, and Italian travelers -- described a large, wealthy city with markets, palaces, temples, and sophisticated water infrastructure.',
          'The city\'s design demonstrates knowledge of hydraulic engineering. Channels directed river water to tanks and reservoirs. Dams regulated flow during different seasons. Elevated aqueducts transported water across uneven terrain. These systems supported urban populations, agriculture, and ritual activities. Water infrastructure was not an afterthought. It was foundational to the city\'s viability and its ability to sustain a large, complex society.',
        ],
      },
      {
        heading: 'THE HIDDEN INTELLIGENCE',
        paragraphs: [
          'The intelligence of Vijayanagara lies in its integration of natural systems and urban planning. The granite landscape provided durable building material, defensible high ground, and visual drama. The river provided water, transportation, and sacred significance. Rather than flattening terrain or rerouting water, the city planners worked with existing conditions. They enhanced rather than replaced what the landscape already offered.',
          'This is not passive acceptance of constraints. It is active strategy. The granite terrain limited where structures could be built, so planners used hills for temples and ceremonial centers. The river flooded seasonally, so engineers built reservoirs to capture and store water. The urban form was not imposed on the land. It emerged from understanding what the land allowed and required. This is architecture as negotiation between human intention and physical geography.',
        ],
      },
      {
        heading: 'WHY IT MATTERS NOW',
        paragraphs: [
          'Modern cities often ignore local geography. Rivers are channeled underground. Hills are leveled. Terrain is treated as an obstacle to overcome through engineering. But ignoring geography leads to inefficiency: cities flood because natural drainage is disrupted; buildings overheat because solar orientation is ignored; infrastructure fails because local soil and climate were not considered.',
          'Vijayanagara offers a different model: cities that respond to geography. This does not mean rejecting technology or accepting limitations. It means understanding what the land provides and designing accordingly. The granite at Hampi was not a problem to solve; it was a resource to deploy. The river was not an inconvenience; it was infrastructure. This is a form of intelligence we need: the ability to design with place, not just in place.',
        ],
      },
      {
        heading: 'THE SHILPAKALE INTERPRETATION',
        paragraphs: [
          'Stone, River & Empire is not a replica of Hampi. It is a carved stone study of how terrain, water, and urban structure interact. The form suggests granite boulders, river flow, and terraced construction without attempting literal representation. It is an object that holds the memory of how cities can develop with their geography, not despite it.',
          'This is an object for thinking about integrated design. It sits in domestic space as a reminder that the best urban planning does not fight the landscape -- it uses it. It carries a question: what would contemporary cities look like if we designed with terrain, climate, and water systems instead of imposing plans that ignore them? What efficiencies might we gain if we started with the land and worked with what it provides?',
        ],
      },
    ],
  },
  {
    number: '07',
    productName: 'The Chettinad Floor Archive',
    productHandle: 'the-chettinad-floor-archive',
    productType: 'Floor tile',
    storyTitle: 'The Visual Grammar Preserved in Handmade Tiles',
    storySlug: 'the-visual-grammar-preserved-in-handmade-tiles',
    storyLine: 'Handmade tile-making in Tamil Nadu as a form of visual archive.',
    preview: 'Athangudi tiles from Tamil Nadu carry geometric and floral patterns developed over generations. Tile-making required material knowledge, pattern memory, and physical skill.',
    collectionName: 'Material Traditions',
    collectionSlug: 'material-traditions',
    openingStatement: 'A tile is not just a surface. It is material memory, pattern grammar, and embodied craft knowledge.',
    sections: [
      {
        heading: 'THE FOUNDATION',
        paragraphs: [
          'Athangudi tiles, produced in the Chettinad region of Tamil Nadu, are handmade cement tiles known for their geometric and floral patterns. The production process involves mixing cement, sand, and mineral pigments, pouring the mixture into metal molds, and curing the tiles without firing. The result is a durable, colored surface with pattern precision. No two tiles are mechanically identical, but they follow consistent pattern grammar.',
          'These tiles covered floors in Chettinad mansions built during the 19th and 20th centuries. Wealthy merchant families commissioned tiles with specific patterns, colors, and layouts. The tiles were functional -- they cooled interior spaces in a hot climate -- and aesthetic, transforming floors into visual fields. The tile designs demonstrate mathematical understanding: patterns repeat, align, and tile without gaps, maintaining symmetry across large surfaces.',
        ],
      },
      {
        heading: 'THE HISTORICAL WORLD',
        paragraphs: [
          'Chettinad was a prosperous trading region. Chettiar merchants built large houses with courtyards, columns, and decorative floors. Athangudi tiles were part of a broader material culture that included carved wooden pillars, lime plaster, and imported marble. The tiles were locally produced, but their aesthetic reflected diverse influences -- South Indian temple motifs, Islamic geometric patterns, and European color preferences.',
          'Tile-making was skilled manual work. Makers memorized pattern templates, mixed pigments to achieve specific hues, and poured cement layers precisely to maintain pattern boundaries. The work required material knowledge: which sands produced smooth finishes, which curing conditions prevented cracking, which pigment ratios ensured color stability. This knowledge was transmitted through apprenticeship, not written manuals.',
        ],
      },
      {
        heading: 'THE HIDDEN INTELLIGENCE',
        paragraphs: [
          'The intelligence in Athangudi tiles lies in pattern systems that allow variation within consistency. Each tile is individually made, so slight variations in color intensity and edge sharpness are inevitable. But the patterns are designed to tolerate these variations. When placed together, the tiles form coherent visual fields despite small differences. The pattern grammar accommodates handmade imprecision.',
          'This is design for manufacturability without industrial machines. The tiles must be producible with simple molds and hand tools. The patterns must be visually effective at floor scale, where close inspection is rare. The colors must be stable over decades of foot traffic. Athangudi tiles are not just decorative objects -- they are solutions to specific material, economic, and use constraints.',
        ],
      },
      {
        heading: 'WHY IT MATTERS NOW',
        paragraphs: [
          'Industrial manufacturing prioritizes uniformity: every product identical, every unit interchangeable. This eliminates variation, but it also eliminates the knowledge embedded in handmade processes. Athangudi tiles show us that variation does not mean failure. It means individual objects made by skilled hands. The slight differences between tiles do not detract from the floor; they reveal the floor as an assembly of handmade components.',
          'The tiles also preserve pattern knowledge. Each geometric design represents decisions about symmetry, repetition, and color. These decisions are not random -- they reflect generations of refinement. Losing the tile-making tradition means losing not just a craft technique but also a visual language, a set of design solutions developed through material practice. This is knowledge that exists in objects, not just in texts.',
        ],
      },
      {
        heading: 'THE SHILPAKALE INTERPRETATION',
        paragraphs: [
          'The Chettinad Floor Archive is not an Athangudi tile. It is a tile inspired by the visual grammar, pattern logic, and material presence of Chettinad tile-making traditions. It references the geometric precision and handmade variation without claiming to be an authentic reproduction. It is a floor surface for contemporary interiors that carries the memory of a tile-making tradition.',
          'This is an object for noticing pattern and material. It sits in domestic space as a reminder that floors were once visual fields, that tiles were once handmade, that pattern systems can accommodate variation. It asks: what do we lose when everything is machine-made and identical? What knowledge disappears when handmade traditions fade? The tile underfoot becomes a question about what we value in the objects that shape our spaces.',
        ],
      },
    ],
  },
  {
    number: '08',
    productName: 'The Four Faces of Water',
    productHandle: 'the-four-faces-of-water',
    productType: 'Architecture model',
    storyTitle: 'The Architecture of Descent Into Water',
    storySlug: 'the-architecture-of-descent-into-water',
    storyLine: 'Stepwells as architecture of water access, ritual descent, and communal infrastructure.',
    preview: 'Stepwells across India provide access to groundwater through monumental staircases and columned pavilions. They combine hydraulic engineering with spatial grandeur.',
    collectionName: 'Architectures of Intelligence',
    collectionSlug: 'architectures-of-intelligence',
    openingStatement: 'Water sits below ground. The architecture descends to meet it.',
    sections: [
      {
        heading: 'THE FOUNDATION',
        paragraphs: [
          'Stepwells, also known as stepped tanks or vavs, were built across India to access groundwater. They are not wells with ropes and buckets. They are subterranean structures with long staircases descending multiple stories to reach water level. As the water table fluctuates seasonally, users walk deeper into the well during dry months and remain near the surface during monsoon season. The architecture adapts to water availability.',
          'Stepwells served multiple functions. They provided drinking water and irrigation. They offered cool, shaded spaces in hot climates. They functioned as social gathering points and, in some cases, ritual bathing sites. The structures combined hydraulic engineering -- understanding aquifers, drainage, and structural stability -- with architectural design, creating monumental spaces around the practical need for water access.',
        ],
      },
      {
        heading: 'THE HISTORICAL WORLD',
        paragraphs: [
          'Stepwells appear across western and northwestern India, with notable examples in Gujarat, Rajasthan, and Karnataka. They were built over centuries, from early medieval periods through the Mughal era. Construction required significant resources: excavation, stone carving, structural engineering, and maintenance. Many stepwells were commissioned by rulers, merchants, or religious institutions as acts of public welfare and religious merit.',
          'The architectural complexity varies. Some stepwells are simple linear staircases. Others feature intricate columned galleries, carved stone panels, and multi-story pavilions. The Rani Ki Vav in Gujarat, a UNESCO World Heritage site, demonstrates the scale these structures could achieve: over 200 carved panels, multiple levels of columns, and a depth of approximately 30 meters. Stepwells were infrastructure, but they were also monuments.',
        ],
      },
      {
        heading: 'THE HIDDEN INTELLIGENCE',
        paragraphs: [
          'The intelligence of stepwells lies in how they respond to hydrological variability. Groundwater levels change seasonally. A conventional well might become inaccessible when water drops too low. But a stepwell allows users to follow the water down. The architecture does not try to bring water to the surface; it creates a path for people to reach water wherever it sits.',
          'Stepwells also create microclimates. Descending into the structure means entering cooler, shaded space. The thick stone walls, subterranean depth, and limited sun exposure moderate temperature. In a hot, arid region, the stepwell becomes a refuge -- not just a water source, but a habitable environment. This is architecture that responds to climate through form, not through mechanical systems.',
        ],
      },
      {
        heading: 'WHY IT MATTERS NOW',
        paragraphs: [
          'Contemporary water infrastructure is often invisible: pipes underground, pumps hidden, treatment plants located far from cities. We interact with water through taps and drains, disconnected from where water comes from or where it goes. Stepwells offer a different model: water infrastructure as public architecture, as visible reminder of water\'s scarcity and importance.',
          'Stepwells also show us architecture that adapts rather than controls. Modern infrastructure often tries to impose stability -- dams regulate rivers, pumps extract groundwater at constant rates. Stepwells accept variability. The water level changes, and the architecture accommodates that change. This is a form of intelligence we need: infrastructure that responds to natural cycles rather than trying to eliminate them.',
        ],
      },
      {
        heading: 'THE SHILPAKALE INTERPRETATION',
        paragraphs: [
          'The Four Faces of Water is not a replica of any single stepwell. It is a minimal architectural study in stone, representing the idea of descent, the relationship between stone and water, and the sectional structure of stepwells. The form suggests stairs, water level, and surrounding architecture without attempting detailed reproduction.',
          'This is an object for thinking about how we access essential resources. It sits in domestic space as a reminder that water infrastructure was once monumental, communal, and visible. It carries the memory of architecture that descended to meet water, that adapted to natural cycles, that combined utility with spatial grandeur. It asks: what happens when infrastructure becomes invisible? What knowledge do we lose when we no longer see where water comes from?',
        ],
      },
    ],
  },
  {
    number: '09',
    productName: 'The Ghatika Yantra',
    productHandle: 'the-ghatika-yantra',
    productType: 'Instrument model',
    storyTitle: 'The Water Clock That Measured Ritual Time',
    storySlug: 'the-water-clock-that-measured-ritual-time',
    storyLine: 'Water clocks in Indian astronomy and ritual time measurement.',
    preview: 'Water clocks, or ghatikas, measured time through controlled water flow. They required understanding fluid dynamics, material properties, and calibration.',
    collectionName: 'Instruments of Measurement',
    collectionSlug: 'instruments-of-measurement',
    openingStatement: 'Time flows like water. Water measures time.',
    sections: [
      {
        heading: 'THE FOUNDATION',
        paragraphs: [
          'The ghatika, or water clock, was used in ancient and medieval India to measure time. Water flowed from one container to another through a controlled opening. The rate of flow was calibrated so that a specific volume equaled a defined time interval -- typically one ghatika, approximately 24 minutes. When the container filled or emptied, the interval elapsed. The mechanism was simple: a source vessel, a receiving vessel, and a precisely sized hole.',
          'Water clocks were used for scheduling rituals, coordinating astronomical observations, and marking time during the night when sundials were ineffective. Temples and astronomical observatories maintained ghatikas. Timekeeping required constant attention: refilling the source vessel, ensuring the flow rate remained consistent, and marking the intervals. Measuring time was an active practice, not a passive display.',
        ],
      },
      {
        heading: 'THE HISTORICAL WORLD',
        paragraphs: [
          'Water clocks appear in ancient texts including the Surya Siddhanta and Varahamihira\'s Brihat Samhita, which describe time measurement systems for astronomical calculations. Indian astronomers divided the day into 60 ghatikas. Each ghatika subdivided into smaller units. The water clock provided a physical mechanism for tracking these divisions.',
          'Maintaining accurate time required material knowledge. The size and shape of the outflow hole determined flow rate. Water temperature affected viscosity, which affected flow. Sediment could clog the hole. The vessel material -- clay, metal, stone -- influenced thermal stability. Operating a ghatika required understanding these variables and compensating for them. Timekeeping was embodied knowledge, not just abstract numbers.',
        ],
      },
      {
        heading: 'THE HIDDEN INTELLIGENCE',
        paragraphs: [
          'The intelligence of the ghatika lies in its calibration. Water does not flow at a constant rate as the vessel empties -- pressure decreases, flow slows. To maintain consistent time intervals, the vessel shape and hole size must be designed to compensate. Some designs used uniform cylindrical vessels with tapered holes. Others used specially shaped containers that maintained constant pressure. This is applied fluid dynamics, developed through observation and refinement.',
          'The water clock also demonstrates a specific understanding of time: not as an abstract continuum, but as a series of filled intervals. Time does not tick by in discrete units. It flows, accumulates, and must be monitored. The ghatika makes time tangible -- you can see the water level, hear the drip, feel the weight of the filled vessel. Time becomes material.',
        ],
      },
      {
        heading: 'WHY IT MATTERS NOW',
        paragraphs: [
          'We experience time through digital clocks that display hours and minutes with mechanical precision. The underlying mechanism is invisible -- a circuit, a battery, a crystal oscillator. We do not maintain our clocks; we replace them. The ghatika offers a different relationship: time as something that requires care, attention, and physical presence.',
          'The water clock also reminds us that measurement systems are not neutral. Dividing the day into 60 ghatikas reflects specific cultural and practical needs -- ritual schedules, astronomical calculations, work coordination. A ghatika measures time differently than an hour. It embeds different assumptions about what time is for. Recognizing this opens the question: what assumptions are embedded in our contemporary time systems, and who benefits from them?',
        ],
      },
      {
        heading: 'THE SHILPAKALE INTERPRETATION',
        paragraphs: [
          'The Ghatika Yantra is not a working water clock. It is a minimal study in stone or metal that references the form and idea of time measurement through water. It holds the memory of a system where timekeeping required understanding fluid dynamics, calibration, and material properties. It is an object for thinking about how we measure time and what we lose when measurement becomes invisible.',
          'This is an object for slow attention. It sits in domestic space as a reminder that time was once measured through water, that instruments required care, that measurement was an active practice. It asks: what does it mean to measure time passively, without understanding the mechanism? What knowledge disappears when all our instruments are black boxes? The object does not answer these questions. It holds them.',
        ],
      },
    ],
  },
];

export function getAllStorySlug(): string[] {
  return stories.map((story) => story.storySlug);
}

export function getStoryBySlug(storySlug: string): ShilpakaleStory | undefined {
  return stories.find((story) => story.storySlug === storySlug);
}

export function getStoryByProductHandle(productHandle: string): ShilpakaleStory | undefined {
  return stories.find((story) => story.productHandle === productHandle);
}
