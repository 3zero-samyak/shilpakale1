import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductPageHeader from '@/components/layout/ProductPageHeader';

// Article definitions with content
const articles = {
  'light-shadow-and-architectural-time': {
    category: 'ARCHITECTURE',
    title: 'Light, Shadow, and the Architecture of Time',
    content: [
      'Fortification towers, elevated posts, and watchtowers were designed to control visibility across contested territory. Their placement, height, and proportions were determined not by ornament, but by the need to see approaching movement and to project defensive presence.',
      'The relationship between architectural geometry and light was therefore strategic. Surfaces cast shadows that revealed time of day and the position of the sun. Openings controlled how much could be seen from within and how much was revealed to those outside.',
      'When architectural forms are studied as systems rather than decoration, the connection between light, sight, and control becomes evident. These structures operated as instruments of observation, marking time and movement through shadow and silhouette.',
      'SHILPAKALE translates this idea into physical objects. Architectural models and topographical forms are designed to be read through light and shadow, preserving the original relationship between geometry, visibility, and strategic placement.',
      'What remains is not a decorative replica, but a considered interpretation of how form, function, and light were historically unified.',
    ],
  },
  'subtraction-as-a-way-of-making': {
    category: 'FORM',
    title: 'Subtraction as a Way of Making',
    content: [
      'In traditional stone carving, form was revealed by removing material. The sculptor started with mass and subtracted until the intended shape emerged. This method required clarity of intention because removal could not be reversed.',
      'The same logic applies to digital modelling and 3D printing. A form becomes stronger not by adding more detail, but by removing what does not serve the central idea. Subtraction creates clarity.',
      'SHILPAKALE objects are developed through a process of reduction. Unnecessary ornamentation is removed. Proportions are refined by eliminating distractions. The final form is shaped as much by what is absent as by what remains.',
      'This approach produces objects that are quiet, defined, and present. They do not compete for attention through excess. Instead, they occupy space with considered geometry and restrained detail.',
      'Subtraction is not minimalism for its own sake. It is a way of making that respects the relationship between form, function, and presence.',
    ],
  },
  'landscape-as-strategy': {
    category: 'GEOGRAPHY',
    title: 'When Landscape Becomes Strategy',
    content: [
      'Hill forts were not built on elevated ground simply for symbolic reasons. Height provided visibility, defensibility, and control over movement routes. The choice of location was a tactical decision.',
      'Coastal observation posts, inland watchtowers, and fortified settlements were positioned according to topography, access to water, and the natural movement of people. Physical geography was read as a strategic system.',
      'Settlement patterns reflected these tactical considerations. Where people lived, how they moved, and what they could see were shaped by the terrain. Landscape was infrastructure.',
      'SHILPAKALE dioramas and topographical models translate this relationship between geography and strategy into collectible forms. They preserve the logic of placement, the control of sight lines, and the integration of built structures with natural terrain.',
      'What is presented is not merely a scenic view, but a system of spatial organisation shaped by historical function and tactical intent.',
    ],
  },
  'the-sea-as-a-route-of-power': {
    category: 'MARITIME HISTORY',
    title: 'The Sea as a Route of Power',
    content: [
      'Maritime trade routes were not neutral pathways. They carried commodities, yes, but also military presence, administrative control, and architectural vocabulary. Those who held the routes imposed their systems on the coasts.',
      'Coastal fortifications, port infrastructure, and settlement architecture reflected the influence of maritime powers. Design motifs, building techniques, and defensive structures were imported along with goods.',
      'The sea was therefore a route of cultural and political dominance as much as it was a route of commerce. Coastal regions became hybrid spaces shaped by external and internal forces.',
      'SHILPAKALE maritime dioramas trace these historical routes and the architectural forms they produced. The objects are not decorative nautical themes. They are interpretations of how power moved across water and shaped the land.',
      'Each form preserves a studied narrative of trade, control, and the transmission of architectural ideas across contested coastlines.',
    ],
  },
  'surface-pattern-and-domestic-memory': {
    category: 'MATERIAL CULTURE',
    title: 'Surface, Pattern, and Domestic Memory',
    content: [
      'Domestic objects such as trays, serving ware, and containers were shaped by both function and inherited visual systems. Patterns were not arbitrary. They carried meaning about division, boundary, and order.',
      'Geometric organisation on functional surfaces reflected cultural ideas about symmetry, repetition, and control. These were not decorations applied afterward. They were integral to how the object was understood and used.',
      'The relationship between surface and structure was embedded in material traditions. Objects were made with attention to how the pattern would interact with the form, the material, and the context of use.',
      'SHILPAKALE trays and functional objects preserve this relationship between surface, pattern, and form. Designs are not borrowed arbitrarily. They are studied translations of systems that held both practical and cultural significance.',
      'What results is not pastiche, but considered interpretation. Each object holds a connection to the original logic of domestic memory and material culture.',
    ],
  },
  'time-measured-through-water': {
    category: 'INFRASTRUCTURE',
    title: 'Time Measured Through Water',
    content: [
      'Wells, step-wells, reservoirs, and irrigation channels were not merely functional infrastructure. They represented collective organisation, resource management, and the temporal rhythms of settlement life.',
      'Water was measured, stored, and distributed according to need, season, and social hierarchy. The architecture of water management reflected the importance of scarcity, access, and ritual.',
      'Step-wells in particular operated as both functional and ceremonial structures. Their geometry and scale indicated the significance of water as a controlled resource. Descending into the structure was a spatial experience shaped by light, stone, and repetition.',
      'SHILPAKALE objects inspired by water infrastructure do not attempt to recreate every detail of historical structures. They translate the relationship between form, function, and the experience of descending, drawing, or storing water.',
      'What remains is a material trace of how time, settlement, and survival were shaped by the presence or absence of water.',
    ],
  },
};

// Generate static paths
export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug,
  }));
}

// Generate metadata
export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articles[params.slug as keyof typeof articles];

  if (!article) {
    return {
      title: 'Article Not Found | SHILPAKALE',
    };
  }

  return {
    title: `${article.title} | The SHILPAKALE Journal`,
    description: article.content[0].substring(0, 160),
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug as keyof typeof articles];

  if (!article) {
    notFound();
  }

  return (
    <>
      <ProductPageHeader />

      <main
        style={{
          width: '100%',
          backgroundColor: 'var(--ivory-archive)',
          paddingTop: 'clamp(3.5rem, 5vw, 4rem)',
        }}
      >
        <article
          style={{
            width: '100%',
            maxWidth: '100rem',
            marginInline: 'auto',
            paddingBlock: 'clamp(4rem, 8vw, 8rem)',
            paddingInline: 'clamp(1.5rem, 7vw, 9rem)',
          }}
        >
          {/* Category */}
          <p
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 'clamp(0.7rem, 0.85vw, 0.82rem)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--archive-sage)',
              fontWeight: 600,
              marginBottom: '1.5rem',
            }}
          >
            {article.category}
          </p>

          {/* Article Title */}
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.005em',
              color: 'var(--heritage-green)',
              fontWeight: 400,
              marginBottom: 'clamp(3rem, 5vw, 4rem)',
            }}
          >
            {article.title}
          </h1>

          {/* Article Content */}
          <div
            style={{
              maxWidth: '58rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(1.5rem, 2.5vw, 2rem)',
            }}
          >
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  fontSize: 'clamp(1.05rem, 1.22vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--heritage-green)',
                  opacity: 0.85,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Back to Journal Link */}
          <div
            style={{
              maxWidth: '58rem',
              marginTop: 'clamp(4rem, 6vw, 5rem)',
              paddingTop: 'clamp(2.5rem, 4vw, 3rem)',
              borderTop: '1px solid rgba(11, 58, 47, 0.15)',
            }}
          >
            <Link
              href="/blog"
              style={{
                display: 'inline-flex',
                fontFamily: 'var(--font-montserrat)',
                fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--heritage-green)',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              ← JOURNAL
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
