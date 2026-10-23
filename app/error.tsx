'use client';
export default function Error({reset}:{reset:()=>void}){return <main className="section"><h1>A brief pause.</h1><p>We couldn’t load this view. Please try again.</p><button className="button dark" onClick={reset}>Try again ↗</button><a href="/" className="button">Return home</a></main>}
