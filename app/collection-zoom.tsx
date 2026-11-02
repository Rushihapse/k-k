'use client';
import {useEffect,useRef,useState,type ReactNode} from 'react';
const MIN=1,MAX=2;
const clamp=(n:number)=>Math.min(MAX,Math.max(MIN,n));
export default function CollectionZoom({children}:{children:ReactNode}){
 const root=useRef<HTMLDivElement>(null),value=useRef(1);
 const[percent,setPercent]=useState(100);
 function change(next:number){const chapter=root.current?.closest<HTMLElement>('.ph-zoom-chapter');if(!chapter)return;const top=chapter.getBoundingClientRect().top+scrollY;window.scrollTo({top:top+(clamp(next)-MIN)/(MAX-MIN)*(chapter.offsetHeight-innerHeight),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
 useEffect(()=>{
  const element=root.current!,chapter=element.closest<HTMLElement>('.ph-zoom-chapter')!,stage=element.closest<HTMLElement>('.ph-universe')!;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,current=0,target=0,top=0,travel=1,lastTime=0,lastPercent=100,distance=0,startZoom=1;
  const paint=()=>{const next=MIN+current*(MAX-MIN);value.current=next;element.style.setProperty('--collection-zoom',next.toFixed(5));stage.style.setProperty('--title-opacity',String(Math.max(0,1-current*2)));stage.style.setProperty('--title-scale',String(1+current*.1));stage.style.setProperty('--detail-opacity',String(Math.min(1,current*2.5)));stage.dataset.zoomed=String(current>.12);const rounded=Math.round(next*100);if(rounded!==lastPercent){lastPercent=rounded;setPercent(rounded)}};
  const animate=(time:number)=>{const dt=Math.min(50,Math.max(1,time-lastTime));lastTime=time;current=reduced.matches?target:current+(target-current)*(1-Math.exp(-dt/85));if(Math.abs(target-current)<.0002)current=target;paint();if(current!==target)frame=requestAnimationFrame(animate);else frame=0};
  const schedule=()=>{target=Math.max(0,Math.min(1,(scrollY-top)/travel));if(!frame){lastTime=performance.now();frame=requestAnimationFrame(animate)}};
  const measure=()=>{top=chapter.getBoundingClientRect().top+scrollY;travel=Math.max(1,chapter.offsetHeight-innerHeight);schedule()};
  const span=(t:TouchList)=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);
  const start=(e:TouchEvent)=>{if(e.touches.length===2){distance=span(e.touches);startZoom=value.current}};
  const move=(e:TouchEvent)=>{if(e.touches.length!==2||!distance)return;e.preventDefault();const next=clamp(startZoom*span(e.touches)/distance);window.scrollTo({top:top+(next-MIN)/(MAX-MIN)*travel,behavior:'instant'})};
  const end=()=>{distance=0};
  measure();current=target;paint();addEventListener('scroll',schedule,{passive:true});addEventListener('resize',measure);reduced.addEventListener('change',schedule);
  element.addEventListener('touchstart',start,{passive:true});element.addEventListener('touchmove',move,{passive:false});element.addEventListener('touchend',end);element.addEventListener('touchcancel',end);
  return()=>{cancelAnimationFrame(frame);removeEventListener('scroll',schedule);removeEventListener('resize',measure);reduced.removeEventListener('change',schedule);element.removeEventListener('touchstart',start);element.removeEventListener('touchmove',move);element.removeEventListener('touchend',end);element.removeEventListener('touchcancel',end)};
 },[]);
 return <div ref={root} className="ph-zoom-world" onKeyDown={e=>{if(e.ctrlKey||e.metaKey||e.altKey||e.target instanceof HTMLInputElement)return;if(e.key==='+'||e.key==='='){e.preventDefault();change(value.current+.2)}else if(e.key==='-'){e.preventDefault();change(value.current-.2)}else if(e.key==='0'){e.preventDefault();change(MIN)}}}>{children}<div className="ph-zoom-controls" role="group" aria-label="Collection zoom"><span className="ph-zoom-hint">Scroll to explore · reverse to zoom out</span><div><button type="button" onClick={()=>change(value.current-.2)} disabled={percent<=100} aria-label="Zoom out of collection">−</button><button type="button" className="ph-zoom-reset" onClick={()=>change(MIN)} aria-label="Reset collection zoom to 100 percent" title="Reset view"><output>{percent}%</output></button><button type="button" onClick={()=>change(value.current+.2)} disabled={percent>=200} aria-label="Zoom into collection">+</button></div></div></div>
}
