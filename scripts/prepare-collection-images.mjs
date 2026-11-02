import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
const base='C:/Users/Rushikesh Hapse/.codex/generated_images/01a168cd-8f62-7161-8b90-f9db5b0f53ce/';
const sources=[['garden-villa','exec-2674e559-c6e4-462f-a8f2-adca1206d936.png'],['urban-residence','exec-a6d0d541-6f85-41c3-8693-279be15f0cc7.png'],['landscape-pavilion','exec-0a8c8be1-3254-44c4-b315-30cce1e18b5d.png']];
await mkdir('public/images/thumbs',{recursive:true});
for(const [name,file] of sources){await sharp(base+file).resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile('public/images/'+name+'.webp')}
const names=['royal-bungalow','interior','garden-villa','royal-courtyard','architecture','urban-residence','residence','landscape-pavilion','royal-building','workplace','pavilion-concept-v2'];
let bytes=0;
for(const name of names){const result=await sharp('public/images/'+name+'.webp').resize({width:720,height:850,fit:'inside',withoutEnlargement:true}).webp({quality:76}).toFile('public/images/thumbs/'+name+'.webp');bytes+=result.size}
console.log(JSON.stringify({newImages:sources.length,thumbnails:names.length,totalThumbnailKB:Math.round(bytes/1024)}));
