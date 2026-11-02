import {projects} from './content';
export default function sitemap(){const origin=process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL?'https://'+process.env.VERCEL_PROJECT_PRODUCTION_URL:'http://localhost:3000');return ['','practice','expertise','projects','visualisations','process','insights','contact',...projects.map(p=>'projects/'+p.slug)].map(path=>({url:origin+'/'+path}))}
