'use client';
import {useEffect,useRef} from 'react';

export default function DotCursor(){
 const dot=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const element=dot.current!;
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,x=0,y=0,targetX=0,targetY=0,visible=false;
  const allowed=()=>fine.matches&&!reduced.matches&&localStorage.getItem('kk-motion')!=='off';
  const hide=()=>{visible=false;element.dataset.visible='false';document.documentElement.classList.remove('dot-cursor-active');cancelAnimationFrame(frame);frame=0};
  const paint=()=>{frame=0;x+=(targetX-x)*.48;y+=(targetY-y)*.48;element.style.transform=`translate3d(${x}px,${y}px,0)`;if(visible&&(Math.abs(targetX-x)>.1||Math.abs(targetY-y)>.1))frame=requestAnimationFrame(paint)};
  const move=(event:PointerEvent)=>{
   if(event.pointerType==='touch'||!allowed()){hide();return}
   const target=event.target as Element;
   if(target.closest('input,textarea,select,[contenteditable="true"],iframe')){hide();return}
   targetX=event.clientX;targetY=event.clientY;
   if(!visible){x=targetX;y=targetY;visible=true;document.documentElement.classList.add('dot-cursor-active');element.dataset.visible='true'}
   element.dataset.hover=String(!!target.closest('a,button,summary,[role="button"],label'));
   if(!frame)frame=requestAnimationFrame(paint);
  };
  const down=()=>{element.dataset.pressed='true'};
  const up=()=>{element.dataset.pressed='false'};
  const leave=(event:PointerEvent)=>{if(!event.relatedTarget)hide()};
  const visibility=()=>{if(document.hidden)hide()};
  window.addEventListener('pointermove',move,{passive:true});window.addEventListener('pointerdown',down);window.addEventListener('pointerup',up);window.addEventListener('blur',hide);document.addEventListener('pointerout',leave);document.addEventListener('visibilitychange',visibility);window.addEventListener('kk-motion-change',hide);fine.addEventListener('change',hide);reduced.addEventListener('change',hide);
  return()=>{hide();window.removeEventListener('pointermove',move);window.removeEventListener('pointerdown',down);window.removeEventListener('pointerup',up);window.removeEventListener('blur',hide);document.removeEventListener('pointerout',leave);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('kk-motion-change',hide);fine.removeEventListener('change',hide);reduced.removeEventListener('change',hide)};
 },[]);
 return <div ref={dot} className="kk-dot-cursor" aria-hidden="true"><span/></div>;
}
