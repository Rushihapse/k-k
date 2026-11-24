'use client';
import {useEffect,useState} from 'react';
export default function ThemeToggle(){
 const[dark,setDark]=useState(false);
 useEffect(()=>{
  const media=matchMedia('(prefers-color-scheme: dark)');
  const sync=()=>{let saved:string|null=null;try{saved=localStorage.getItem('kk-theme')}catch{}const value=saved?saved==='dark':media.matches;document.documentElement.dataset.theme=value?'dark':'light';setDark(value)};
  sync();media.addEventListener('change',sync);window.addEventListener('storage',sync);
  return()=>{media.removeEventListener('change',sync);window.removeEventListener('storage',sync)};
 },[]);
 function toggle(){const next=!dark;document.documentElement.dataset.theme=next?'dark':'light';setDark(next);try{localStorage.setItem('kk-theme',next?'dark':'light')}catch{}}
 return <button type="button" className="kk-theme-toggle" onClick={toggle} aria-label={dark?'Switch to light theme':'Switch to dark theme'} aria-pressed={dark}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{dark?<><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>:<path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/>}</svg><span>{dark?'Light':'Dark'}</span></button>;
}
