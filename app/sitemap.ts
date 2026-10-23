import {projects} from './content';
export default function sitemap(){return ['','practice','expertise','projects','visualisations','process','insights','contact',...projects.map(p=>'projects/'+p.slug)].map(path=>({url:'https://kk-associates-architecture.yellowvole16.chatgpt.site/'+path}))}
