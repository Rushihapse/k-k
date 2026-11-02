'use client';
import {useEffect,useRef,useState} from 'react';
import {usePathname,useRouter} from 'next/navigation';
import ArchitecturalContent from './architectural-content';
type Phase='idle'|'covering'|'holding'|'revealing';
export default function ArchitecturalTransition(){
 const router=useRouter(),pathname=usePathname();
 const[phase,setPhase]=useState<Phase>('idle'),[destination,setDestination]=useState('');
 const pending=useRef<{path:string;url:string;pushed:boolean}|null>(null);
 const previous=useRef(pathname),timers=useRef<ReturnType<typeof setTimeout>[]>([]);
 const clear=()=>{timers.current.forEach(clearTimeout);timers.current=[]};
 const later=(fn:()=>void,ms:number)=>{const timer=setTimeout(fn,ms);timers.current.push(timer)};
 const allowed=()=>{try{if(localStorage.getItem('kk-motion')==='off')return false}catch{}return !matchMedia('(prefers-reduced-motion: reduce)').matches&&!document.querySelector('.power-site.motion-paused')};
 useEffect(()=>{
  const click=(event:MouseEvent)=>{
   if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   const anchor=(event.target as Element)?.closest<HTMLAnchorElement>('a[href]');
   if(!anchor||anchor.hasAttribute('download')||anchor.rel.includes('external')||(anchor.target&&anchor.target!=='_self'))return;
   const url=new URL(anchor.href,location.href);
   if(url.origin!==location.origin||!['http:','https:'].includes(url.protocol)||url.pathname===location.pathname||!allowed())return;
   event.preventDefault();if(pending.current)return;
   const label=(anchor.getAttribute('aria-label')||anchor.textContent||'Next perspective').trim().replace(/\s+/g,' ').replace(/[↗→×]/g,'').trim();
   clear();pending.current={path:url.pathname,url:url.pathname+url.search+url.hash,pushed:false};
   setDestination(label.length>60?'A new perspective':label);setPhase('covering');
   later(()=>{const next=pending.current;if(!next)return;next.pushed=true;setPhase('holding');router.push(next.url)},340);
   // A full navigation remains available if client routing cannot complete.
   later(()=>{const next=pending.current;if(next)location.assign(next.url)},6000);
  };
  const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'&&pending.current&&!pending.current.pushed){clear();pending.current=null;setPhase('idle')}};
  document.addEventListener('click',click);document.addEventListener('keydown',escape);
  return()=>{document.removeEventListener('click',click);document.removeEventListener('keydown',escape);clear()};
 },[router]);
 useEffect(()=>{
  if(previous.current===pathname)return;previous.current=pathname;
  const next=pending.current;

  clear();pending.current=null;
  if(!allowed()){setPhase('idle');return}
  if(!next)setDestination('A new perspective');
  setPhase('holding');
  later(()=>setPhase('revealing'),next?130:0);
  later(()=>{setPhase('idle');const main=document.querySelector<HTMLElement>('main');if(main){if(!main.hasAttribute('tabindex'))main.setAttribute('tabindex','-1');main.focus({preventScroll:true})}},next?690:560);
 },[pathname]);
 return <><ArchitecturalContent pathname={pathname} phase={phase}/><div className="arch-route-status" role="status" aria-live="polite">{phase==='idle'?'':'Opening '+destination}</div><div className="arch-route" data-phase={phase} aria-hidden="true"><div className="arch-route-grid"/><div className="arch-route-top"><span>K & K ASSOCIATES</span><span>ARCHITECTURE / IN TRANSITION</span></div><div className="arch-route-drawing"><svg viewBox="0 0 640 460" fill="none"><g className="arch-route-guides"><path d="M90 20V440M190 20V440M320 20V440M450 20V440M550 20V440M20 80H620M20 180H620M20 280H620M20 380H620" strokeDasharray="4 7"/><circle cx="90" cy="30" r="13"/><circle cx="320" cy="30" r="13"/><circle cx="550" cy="30" r="13"/></g><g className="arch-route-plan"><path pathLength="1" d="M90 80H550V380H90V80Z"/><path pathLength="1" d="M104 94H536V366H104V94Z"/><path pathLength="1" d="M250 94V216H104M250 216H400V366M400 216V94M250 250V366M104 292H250M400 278H536"/><path pathLength="1" d="M286 130H365V208H286V130ZM299 142H352M299 154H352M299 166H352M299 178H352M299 190H352"/><path pathLength="1" d="M126 120H215V166H126V120ZM132 308H220V346H132V308ZM425 112H510V184H425V112Z"/><circle pathLength="1" cx="465" cy="321" r="25"/><path pathLength="1" d="M292 366V326H355V366M104 230H134M146 230H175M187 230H216"/></g><g className="arch-route-dimensions"><path d="M90 410H550M90 403V417M550 403V417M62 80V380M55 80H69M55 380H69M588 119V72L581 86M588 72L595 86"/><path d="M82 72L98 88M82 88L98 72M542 372L558 388M542 388L558 372"/><text x="310" y="430">PROPORTION / SPACE / PERSPECTIVE</text><text x="582" y="58">N</text><text x="86" y="34">A</text><text x="316" y="34">B</text><text x="546" y="34">C</text></g></svg><div className="arch-route-scan"/></div><div className="arch-route-bottom"><span>DRAWING THE NEXT PERSPECTIVE</span><span>{destination||'A new perspective'}</span><span>CONCEPT LINEWORK / NOT TO SCALE</span></div></div></>
}

