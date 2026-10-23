import Studio from '../studio';
import { notFound } from 'next/navigation';
import { projects } from '../content';
const pages=['practice','expertise','projects','visualisations','process','insights','contact'];
export async function generateMetadata({params}:{params:Promise<{path:string[]}>}){const {path}=await params;const title=projects.find(p=>p.slug===path[1])?.title||path[0].replace(/^./,x=>x.toUpperCase());return {title:`${title} | K & K Associates`,alternates:{canonical:'/'+path.join('/')}}}
export default async function Page({params}:{params:Promise<{path:string[]}>}){const {path}=await params;if(!pages.includes(path[0])||path.length>2||(path.length===2&&!(path[0]==='projects'&&projects.some(p=>p.slug===path[1]))))notFound();return <Studio page={path[0]} slug={path[1]}/>}
