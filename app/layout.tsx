import type { Metadata } from 'next';
import './globals.css';
const origin='https://kk-associates-architecture.yellowvole16.chatgpt.site';
export const metadata:Metadata={metadataBase:new URL(origin),title:'K & K Associates | Architecture & Planning, Pune',description:'Architecture. Planning. Vision. Explore K & K Associates, a Pune-based architectural design and planning consultancy. Private design preview.',alternates:{canonical:'/'},openGraph:{title:'K & K Associates — Shaping Spaces. Defining Skylines.',description:'Architecture, planning and the possibilities of place. Pune, Maharashtra.',type:'website',images:[{url:'/images/architecture.jpg'}]},icons:{icon:'/favicon.svg'},robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-IN"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:'K & K Associates',url:origin,description:'Architecture, building design and planning consultancy based in Pune, Maharashtra, India.',areaServed:{'@type':'City',name:'Pune'}})}}/></body></html>}

