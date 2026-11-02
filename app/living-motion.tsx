'use client';
import {useEffect,useRef,useState} from 'react';
export default function LivingMotion({page}:{page:string}){
 const[enabled,setEnabled]=useState(true);const[reduced,setReduced]=useState(false);
 const toggle=useRef<HTMLButtonElement>(null);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
 useEffect(()=>{try{if(localStorage.getItem('kk-motion')==='off')setEnabled(false)}catch{}},[]);
 const active=enabled&&!reduced;
 useEffect(()=>{
  const site=toggle.current?.closest<HTMLElement>('.power-site');if(!site)return;
  site.classList.toggle('motion-enabled',active);site.classList.toggle('motion-paused',!active);
  if(!active){site.style.setProperty('--pointer-x','0px');site.style.setProperty('--pointer-y','0px');return}
  let frame=0,px=0,py=0,tx=0,ty=0;
  const fine=matchMedia('(pointer:fine)');const hero=site.querySelector<HTMLElement>('.ph-universe');let heroRect=hero?.getBoundingClientRect();
  const cards=site.querySelectorAll<HTMLElement>('.ph-card>div,.ph-journal-photo>div');
  const updatePointer=()=>{px+=(tx-px)*.09;py+=(ty-py)*.09;site.style.setProperty('--pointer-x',px.toFixed(2)+'px');site.style.setProperty('--pointer-y',py.toFixed(2)+'px');if(Math.abs(tx-px)+Math.abs(ty-py)>.03)frame=requestAnimationFrame(updatePointer);else frame=0};
  const move=(event:PointerEvent)=>{if(!fine.matches||event.pointerType==='touch'||document.hidden)return;if(heroRect&&event.clientY>=heroRect.top&&event.clientY<=heroRect.bottom){tx=(event.clientX/innerWidth-.5)*20;ty=((event.clientY-heroRect.top)/heroRect.height-.5)*14}else{tx=0;ty=0}if(!frame)frame=requestAnimationFrame(updatePointer)};
  const reset=()=>{tx=0;ty=0;if(!frame)frame=requestAnimationFrame(updatePointer)};
  const measure=()=>{heroRect=hero?.getBoundingClientRect()};
  const visible=()=>{site.dataset.motionSleeping=String(document.hidden);if(document.hidden){cancelAnimationFrame(frame);frame=0}else reset()};
  const tilt=(event:PointerEvent)=>{if(!fine.matches||event.pointerType==='touch')return;const el=event.currentTarget as HTMLElement;const rect=el.getBoundingClientRect();el.style.setProperty('--tilt-x',((event.clientY-rect.top)/rect.height-.5)*-3+'deg');el.style.setProperty('--tilt-y',((event.clientX-rect.left)/rect.width-.5)*3+'deg')};
  const untilt=(event:PointerEvent)=>{const el=event.currentTarget as HTMLElement;el.style.setProperty('--tilt-x','0deg');el.style.setProperty('--tilt-y','0deg')};
  const visibilityObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.target===hero)site.dataset.heroVisible=String(entry.isIntersecting);else (entry.target as HTMLElement).dataset.motionVisible=String(entry.isIntersecting)}},{threshold:0});if(hero)visibilityObserver.observe(hero);site.querySelectorAll('.ph-feature').forEach(el=>visibilityObserver.observe(el));visible();cards.forEach(el=>{el.addEventListener('pointermove',tilt);el.addEventListener('pointerleave',untilt)});
  addEventListener('pointermove',move,{passive:true});addEventListener('pointerleave',reset);addEventListener('scroll',measure,{passive:true});addEventListener('resize',measure);document.addEventListener('visibilitychange',visible);
  return()=>{visibilityObserver.disconnect();cancelAnimationFrame(frame);removeEventListener('pointermove',move);removeEventListener('pointerleave',reset);removeEventListener('scroll',measure);removeEventListener('resize',measure);document.removeEventListener('visibilitychange',visible);cards.forEach(el=>{el.removeEventListener('pointermove',tilt);el.removeEventListener('pointerleave',untilt);el.style.removeProperty('--tilt-x');el.style.removeProperty('--tilt-y')});site.classList.remove('motion-enabled')};
 },[active,page]);
 return <button ref={toggle} className="ph-motion-toggle" onClick={()=>{const next=!enabled;setEnabled(next);try{localStorage.setItem('kk-motion',next?'on':'off');window.dispatchEvent(new Event('kk-motion-change'))}catch{}}} aria-pressed={active} aria-label={active?'Pause decorative animations':'Enable decorative animations'} disabled={reduced}><span aria-hidden="true"/>{reduced?'Reduced motion':active?'Motion on Ⅱ':'Motion off ▷'}</button>
}


