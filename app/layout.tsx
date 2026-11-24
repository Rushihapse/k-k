import type { Metadata } from 'next';
import ThemeToggle from './theme-toggle';
import DotCursor from './dot-cursor';
import ArchitecturalTransition from './architectural-transition';
import './architectural-transition.css';
import './globals.css';
import './experience.css';
import './power-theme.css';
import './modern-design.css';
import './premium-refinement.css';
import './themes.css';
const origin=process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://'+process.env.VERCEL_PROJECT_PRODUCTION_URL : 'http://localhost:3000');
export const metadata:Metadata={metadataBase:new URL(origin),title:'K & K ASSOCIATES | Architectural Planners & Designers',description:'Architectural Planners & Designers. Explore K & K Associates, a Pune-based architectural design and planning consultancy. Contemporary spaces, thoughtful design.',alternates:{canonical:'/'},openGraph:{title:'K & K Associates — Shaping Spaces. Defining Skylines.',description:'Architecture, planning and the possibilities of place. Pune, Maharashtra.',type:'website',images:[{url:'/images/garden-villa.webp'}]},icons:{icon:'/favicon.svg'},robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-IN" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:"try{var t=localStorage.getItem('kk-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){document.documentElement.dataset.theme='light'}"}}/></head><body><ThemeToggle/><DotCursor/><ArchitecturalTransition/>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:'K & K Associates',url:origin,description:'Architecture, building design and planning consultancy based in Pune, Maharashtra, India.',areaServed:{'@type':'City',name:'Pune'}})}}/></body></html>}







