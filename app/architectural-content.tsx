'use client';
import {useEffect,useLayoutEffect,useRef} from 'react';
const targets=[
 '.ph-center>*','.ph-page-heading>*','.ph-editorial>*','.ph-case-title>*','.ph-case-hero>img','.ph-case-intro>*','.ph-case-story>*','.ph-case-image',
 '.ph-section-title','.pr-section-heading','.ph-intro>.ph-kicker','.ph-intro>div','.ph-card','.pr-feature-image','.pr-feature-aside','.pr-lens-copy','.pr-lens-image','.ph-journal-photo','.ph-feature>div','.ph-step','.ph-service',
 '.ph-toolbar','.ph-result','.inquiry-visual','.inquiry-form>*','.ph-conversation>*','.ph-footer>div'
].join(',');
export default function ArchitecturalContent({pathname,phase}:{pathname:string|null;phase:string}){
 const phaseRef=useRef(phase);phaseRef.current=phase;
 const release=useRef<()=>void>(()=>{});
 useEffect(()=>{if(phase==='idle')release.current()},[phase]);
 useLayoutEffect(()=>{
  const pageRoot=document.body;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const items=new Set<HTMLElement>(),waiting=new Set<HTMLElement>(),animations=new Set<Animation>();
  let cancelled=false,scanFrame=0;
  function enabled(){try{if(localStorage.getItem('kk-motion')==='off')return false}catch{}return !reduced.matches&&!document.querySelector('.power-site.motion-paused')}
  function show(el:HTMLElement,delay=0){
   if(cancelled||el.dataset.archContent==='shown')return;
   waiting.delete(el);el.dataset.archContent='shown';
   if(!enabled()){el.style.removeProperty('opacity');el.style.removeProperty('clip-path');return}
   const media=el.matches('.ph-card,.ph-journal-photo,.pr-feature-image,.pr-lens-image,.ph-case-image,.ph-editorial-image,.ph-approach-image,.inquiry-visual')||el.tagName==='IMG';
   el.style.removeProperty('opacity');el.style.removeProperty('clip-path');
   function play(node:HTMLElement,frames:Keyframe[],duration:number,offset:number){
    const animation=node.animate(frames,{duration,delay:offset,easing:'cubic-bezier(.19,1,.22,1)',fill:'both'});
    animations.add(animation);
    animation.finished.then(()=>{animation.cancel();animations.delete(animation)}).catch(()=>{});
   }
   const words=[...el.querySelectorAll<HTMLElement>('.arch-word')];
   if(media){
    el.classList.add('arch-content-drawing');
    el.style.setProperty('--arch-delay',`${delay}ms`);
    // The image opens inside a stationary frame; captions stay crisp and readable.
    const image=el.tagName==='IMG'?el:el.querySelector<HTMLElement>('img');
    if(image)play(image,[{opacity:0,clipPath:'inset(7% 5% 7% 5%)',scale:'1.075',filter:'blur(3px) saturate(.45)'},{opacity:1,clipPath:'inset(0% 0% 0% 0%)',scale:'1',filter:'blur(0px) saturate(1)'}],1450,delay+140);
    else play(el,[{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],1200,delay);
    if(el.tagName!=='IMG')play(el,[{opacity:0},{opacity:1}],450,delay);
    const caption=el.querySelector<HTMLElement>('.ph-card-info,figcaption');
    if(caption)play(caption,[{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],850,delay+400);
    setTimeout(()=>{if(!cancelled)el.classList.remove('arch-content-drawing')},delay+1800);
   }else if(words.length){
    words.forEach((word,index)=>play(word,[{opacity:0,transform:'translate3d(0,115%,0) rotate(3deg)'},{opacity:1,transform:'translate3d(0,0,0) rotate(0deg)'}],1150,delay+Math.min(index*34,340)));
    const supporting=[...el.querySelectorAll<HTMLElement>('p,a,button,.ph-kicker,.pr-overline')].filter(node=>!node.querySelector('.arch-word')&&!node.closest('h1,h2'));
    supporting.forEach((node,index)=>play(node,[{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],1000,delay+180+Math.min(index*65,260)));
   }else{
    play(el,[{opacity:0,transform:'translate3d(0,24px,0)'},{opacity:1,transform:'translate3d(0,0,0)'}],1100,delay);
   }
  }

  function flush(){if(phaseRef.current!=='idle')return;let index=0;for(const el of waiting){if(el.getBoundingClientRect().top<innerHeight&&el.getBoundingClientRect().bottom>0)show(el,Math.min(index++*70,280))}}
  release.current=flush;
  const observer=new IntersectionObserver(entries=>{let index=0;for(const entry of entries){const el=entry.target as HTMLElement;if(!entry.isIntersecting)continue;observer.unobserve(el);waiting.add(el);if(phaseRef.current==='idle')show(el,Math.min(index++*65,240))}},{threshold:.06,rootMargin:'0px 0px -3% 0px'});
  function scan(){
   if(cancelled)return;const main=document.querySelector<HTMLElement>('main');if(!main)return;const contentRoot=main.closest('.power-site')||main;const matches=[...contentRoot.querySelectorAll<HTMLElement>(targets)].filter(el=>!el.closest('[role="dialog"],[hidden]'));
   for(const el of matches){if(items.has(el)||matches.some(parent=>parent!==el&&parent.contains(el)))continue;items.add(el);el.dataset.archContent='waiting';el.classList.add('arch-content-item');if(enabled()){el.style.opacity='0';el.style.clipPath='inset(0 0 0 0)'}observer.observe(el)}
  }
  const mutation=new MutationObserver(entries=>{if(!entries.some(entry=>[...entry.addedNodes].some(node=>node.nodeType===1)))return;if(!scanFrame)scanFrame=requestAnimationFrame(()=>{scanFrame=0;scan()})});
  function revealAll(){if(enabled())return;animations.forEach(animation=>animation.cancel());animations.clear();items.forEach(el=>{el.dataset.archContent='shown';el.style.removeProperty('opacity');el.style.removeProperty('clip-path');el.classList.remove('arch-content-drawing')});observer.disconnect();waiting.clear()}
  const focus=(event:FocusEvent)=>{const el=(event.target as Element)?.closest<HTMLElement>('.arch-content-item');if(el&&items.has(el))show(el)};
  scan();mutation.observe(pageRoot,{childList:true,subtree:true});pageRoot.addEventListener('focusin',focus);reduced.addEventListener('change',revealAll);window.addEventListener('kk-motion-change',revealAll);
  return()=>{cancelled=true;cancelAnimationFrame(scanFrame);observer.disconnect();mutation.disconnect();animations.forEach(animation=>animation.cancel());pageRoot.removeEventListener('focusin',focus);reduced.removeEventListener('change',revealAll);window.removeEventListener('kk-motion-change',revealAll);items.forEach(el=>{el.style.removeProperty('opacity');el.style.removeProperty('clip-path');el.classList.remove('arch-content-item','arch-content-drawing');delete el.dataset.archContent});release.current=()=>{}};
 },[pathname]);
 return null;
}


