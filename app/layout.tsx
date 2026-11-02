import type { Metadata } from 'next';
import ArchitecturalTransition from './architectural-transition';
import './architectural-transition.css';
import './globals.css';
import './experience.css';
import './power-theme.css';
import './modern-design.css';
import './premium-refinement.css';
const origin=process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://'+process.env.VERCEL_PROJECT_PRODUCTION_URL : 'http://localhost:3000');
export const metadata:Metadata={metadataBase:new URL(origin),title:'K & K Associates | Architecture & Planning, Pune',description:'Architecture. Planning. Vision. Explore K & K Associates, a Pune-based architectural design and planning consultancy. Contemporary spaces, thoughtful design.',alternates:{canonical:'/'},openGraph:{title:'K & K Associates — Shaping Spaces. Defining Skylines.',description:'Architecture, planning and the possibilities of place. Pune, Maharashtra.',type:'website',images:[{url:'/images/garden-villa.webp'}]},icons:{icon:'/favicon.svg'},robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-IN"><body><ArchitecturalTransition/>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:'K & K Associates',url:origin,description:'Architecture, building design and planning consultancy based in Pune, Maharashtra, India.',areaServed:{'@type':'City',name:'Pune'}})}}/></body></html>}







