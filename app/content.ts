export const images = { hero: '/images/urban-residence.webp', residence: '/images/garden-villa.webp', interior: '/images/landscape-pavilion.webp', tower: '/images/urban-residence.webp' };
export type Project = {
    slug: string;
    title: string;
    category: string;
    image: string;
    description: string;
    brief: string;
    concept: string;
    status?: string;
    location?: string;
    year?: number;
    area?: string;
    gallery?: string[];
    drawings?: {
        title: string;
        type: string;
        src: string;
    }[];
    model?: string; modelStudy?:string;
    renders?: string[];
    videos: import("./media-gallery").MediaAsset[];
    relatedServices?: string[];
};
export const projects:Project[]=[
{slug:'garden-villa',title:'The Garden Villa',category:'Bungalows',image:images.residence,status:'Illustrative concept',videos:[],description:'A contemporary home where precise stone volumes, timber screens and planted terraces meet a generous garden.',brief:'Explore a family home that opens to nature while balancing shared living, shade and personal space.',concept:'Clean horizontal planes frame an open living level. Recessed glazing, deep terraces and timber screens soften sunlight and connect the architecture to its planted setting.'},
{slug:'glass-pavilion',title:'The Glass Pavilion',category:'Pavilions',image:'/images/pavilion-concept-v2.webp',status:'Illustrative concept',videos:[],description:'A light, transparent pavilion exploring the relationship between structure, reflection and landscape.',brief:'Imagine an adaptable gathering place with a clear structural rhythm, flexible interior and strong connection to outdoor space.',concept:'Slender framing, generous glazing and a floating roof line create an architecture of lightness. Materials and landscape give the open plan a calm sense of enclosure.'},
{slug:'urban-residences',title:'The Urban Residences',category:'Residential Buildings',image:images.tower,status:'Illustrative concept',videos:[],description:'A contemporary residential study shaped by deep balconies, vertical screens and planted outdoor rooms.',brief:'Investigate a multi-storey residential building that gives everyday living access to daylight, privacy and greenery.',concept:'A rational concrete frame is expressed through clean lines. Terracotta screens, recessed balconies and planted edges bring warmth and depth to the street-facing elevation.'},
{slug:'landscape-framework',title:'The Landscape Pavilion',category:'Landscape & Planning',image:images.interior,status:'Illustrative concept',videos:[],description:'A low-slung contemporary pavilion that brings earth, water and landscape into a single spatial sequence.',brief:'Explore a shared place for gathering, contemplation and movement through a garden setting. No surveyed site or approved plan is represented.',concept:'Rammed-earth walls and thin concrete roof planes frame long garden views. Water and planted edges create a gentle transition between the building and the landscape.'}
];export const services = [['Architecture & Building Design', 'From spatial organisation to building form, an architectural brief brings site, use and expression into one considered proposal.'], ['Residential Developments', 'Explore homes and shared residential environments through privacy, daylight, circulation and landscape.'], ['Commercial Buildings', 'Consider adaptable working and commercial spaces, with a clear relationship to the street.'], ['Institutional & Industrial Buildings', 'Purpose-led planning considers access, movement, scale and the particular needs of a building’s users.'], ['Layout & Master Planning', 'Organise land, circulation, open space and development parcels into a legible framework.'], ['Site Planning & Development', 'Understand orientation, access, context and the opportunities of a site.'], ['Drawings & Documentation', 'Plans, sections and elevations communicate architectural intent through coordinated information.'], ['3D Visualisation & Presentation', 'Models and visual studies help explain massing, material and spatial relationships. Presentation capability; service scope to be confirmed.']];
export const stages = [['Discovery', 'A conversation about your vision, site and requirements.'], ['Site analysis', 'Understand context, orientation, access and opportunities.'], ['Concept design', 'Explore spatial organisation, form and initial massing.'], ['Architectural development', 'Refine plans, elevations, sections and material direction.'], ['3D modelling & visualisation', 'Communicate the design through models and visual studies where included.'], ['Coordination & documentation', 'Bring relevant consultant inputs and design information together.'], ['Project support', 'Continue design and site-related support within the agreed engagement.']];
