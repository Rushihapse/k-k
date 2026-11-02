import * as THREE from 'three';
import type {ModelId} from './model-catalog';
export function createRoyalModel(id:ModelId){
 const root=new THREE.Group(),layers:THREE.Group[]=[];
 const stone=new THREE.MeshStandardMaterial({color:0xe9dfc8,roughness:.76,metalness:.02});
 const plaster=new THREE.MeshStandardMaterial({color:0xf7f0df,roughness:.83});
 const trim=new THREE.MeshStandardMaterial({color:0xfff9ed,roughness:.6});
 const gold=new THREE.MeshStandardMaterial({color:0xb48c42,metalness:.72,roughness:.28});
 const roofMat=new THREE.MeshStandardMaterial({color:0x98613e,roughness:.88});
 const timber=new THREE.MeshStandardMaterial({color:0x76523a,roughness:.76});
 const glass=new THREE.MeshStandardMaterial({color:0x53605c,metalness:.55,roughness:.16,emissive:0xffc571,emissiveIntensity:.025});
 const water=new THREE.MeshPhysicalMaterial({color:0x9eb6b2,metalness:.18,roughness:.13,transparent:true,opacity:.88});
 const green=new THREE.MeshStandardMaterial({color:0x687047,roughness:1});
 const earth=new THREE.MeshStandardMaterial({color:0xb9b69a,roughness:1});
 const materials=[stone,plaster,trim,gold,roofMat,timber,glass,water,green,earth];
 // Fine limestone grain, generated locally; no external textures are required.
 const canvas=document.createElement('canvas');canvas.width=128;canvas.height=128;const ctx=canvas.getContext('2d')!;
 ctx.fillStyle='#e9dfc8';ctx.fillRect(0,0,128,128);let seed=17;for(let i=0;i<5000;i++){seed=(seed*16807)%2147483647;const x=seed%128;seed=(seed*16807)%2147483647;const y=seed%128;ctx.fillStyle=i%2?'rgba(110,90,65,.035)':'rgba(255,255,255,.08)';ctx.fillRect(x,y,1,1)}
 ctx.strokeStyle='rgba(130,110,80,.13)';ctx.lineWidth=.6;for(let y=0;y<128;y+=32){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(128,y);ctx.stroke();for(let x=(y%64===0?0:32);x<128;x+=64){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+32);ctx.stroke()}}
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(2,2);stone.map=texture;stone.bumpMap=texture;stone.bumpScale=.015;
 function mesh(geometry:THREE.BufferGeometry,material:THREE.Material,parent=root,x=0,y=0,z=0){const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
 function box(x:number,y:number,z:number,w:number,h:number,d:number,mat=stone,parent=root){return mesh(new THREE.BoxGeometry(w,h,d),mat,parent,x,y,z)}
 function cylinder(x:number,y:number,z:number,r:number,h:number,mat=trim,parent=root){return mesh(new THREE.CylinderGeometry(r,r,h,24),mat,parent,x,y,z)}
 function group(y:number){const g=new THREE.Group();g.position.y=y;g.userData.baseY=y;root.add(g);layers.push(g);return g}
 function column(x:number,z:number,h:number,parent:THREE.Group){cylinder(x,h/2,z,.14,h,trim,parent);cylinder(x,.13,z,.23,.26,stone,parent);cylinder(x,h-.12,z,.23,.24,stone,parent);cylinder(x,.32,z,.18,.09,gold,parent);cylinder(x,h-.32,z,.18,.08,gold,parent);for(let n=0;n<10;n++){const a=n/10*Math.PI*2;cylinder(x+Math.cos(a)*.13,h/2,z+Math.sin(a)*.13,.015,h-.8,stone,parent)}}
 function arch(x:number,y:number,z:number,w:number,h:number,parent:THREE.Group,glazed=true){const r=w/2;const spring=h-r;if(glazed){const shape=new THREE.Shape();shape.moveTo(-r,0);shape.lineTo(r,0);shape.lineTo(r,spring);shape.absarc(0,spring,r,0,Math.PI,false);shape.closePath();mesh(new THREE.ShapeGeometry(shape,36),glass,parent,x,y,z-.035);box(x,y+spring/2,z+.015,.035,spring,.055,gold,parent);box(x,y+spring*.5,z+.015,w,.035,.055,gold,parent)}const ring=mesh(new THREE.TorusGeometry(r+.055,.075,10,40,Math.PI),trim,parent,x,y+spring,z);ring.castShadow=true;box(x-r-.055,y+spring/2,z,.15,spring,.22,trim,parent);box(x+r+.055,y+spring/2,z,.15,spring,.22,trim,parent);box(x,y-.06,z,w+.3,.12,.3,stone,parent)}
 function windowRect(x:number,y:number,z:number,w:number,h:number,parent:THREE.Group){box(x,y,z,w,h,.07,glass,parent);box(x-w/2,y,z+.05,.06,h+.15,.12,gold,parent);box(x+w/2,y,z+.05,.06,h+.15,.12,gold,parent);box(x,y-h/2,z+.05,w+.15,.07,.12,trim,parent);box(x,y+h/2,z+.05,w+.15,.07,.12,trim,parent);box(x,y,z+.05,.035,h,.08,gold,parent)}
 function sideWindow(x:number,y:number,z:number,w:number,h:number,parent:THREE.Group){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=x>0?Math.PI/2:-Math.PI/2;parent.add(g);windowRect(0,y,.04,w,h,g);box(0,y-h/2-.1,.08,w+.3,.12,.28,trim,g);box(0,y+h/2+.12,.08,w+.35,.15,.3,stone,g)} function railing(x:number,y:number,z:number,w:number,parent:THREE.Group){box(x,y+.7,z,w,.055,.08,gold,parent);box(x,y+.12,z,w,.06,.09,gold,parent);for(let n=0;n<=Math.floor(w/.32);n++){const px=x-w/2+n*.32;box(px,y+.4,z,.035,.6,.04,gold,parent);const ring=mesh(new THREE.TorusGeometry(.085,.012,5,12),gold,parent,px,y+.42,z);ring.castShadow=false}}
 function cornice(w:number,d:number,y:number,parent:THREE.Group){box(0,y,0,w+.3,.12,d+.3,trim,parent);box(0,y+.1,0,w+.55,.08,d+.55,stone,parent);box(0,y+.17,0,w+.6,.04,d+.6,gold,parent)}
 function hippedRoof(x:number,y:number,z:number,w:number,d:number,h:number,parent:THREE.Group){const a=new THREE.Vector3(-w/2,0,-d/2),b=new THREE.Vector3(w/2,0,-d/2),c=new THREE.Vector3(w/2,0,d/2),e=new THREE.Vector3(-w/2,0,d/2),p=new THREE.Vector3(-w*.22,h,0),q=new THREE.Vector3(w*.22,h,0);const points=[a,p,q,a,q,b,b,q,c,c,q,p,c,p,e,e,p,a];const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(points.flatMap(v=>[v.x,v.y,v.z]),3));g.computeVertexNormals();mesh(g,roofMat,parent,x,y,z);box(x,y-.06,z,w+.1,.12,d+.1,trim,parent);for(let n=0;n<16;n++){const t=n/16;const zoff=d/2*(1-t);const tileW=w*(1-.5*t);box(x,y+h*t+.018,z+zoff,tileW,.035,.045,roofMat,parent);box(x,y+h*t+.018,z-zoff,tileW,.035,.045,roofMat,parent)}}
 function dome(x:number,y:number,z:number,r:number,parent:THREE.Group){cylinder(x,y-.1,z,r*1.12,.2,trim,parent);mesh(new THREE.SphereGeometry(r,40,20,0,Math.PI*2,0,Math.PI/2),stone,parent,x,y,z);cylinder(x,y+r+.08,z,.055,.24,gold,parent);mesh(new THREE.SphereGeometry(.1,12,8),gold,parent,x,y+r+.22,z)}
 function tree(x:number,z:number,s:number){cylinder(x,1.3*s,z,.09*s,2.6*s,timber);for(let n=0;n<5;n++){const a=n/5*Math.PI*2;const crown=mesh(new THREE.SphereGeometry(.85*s,18,14),green,root,x+Math.cos(a)*.46*s,2.5*s+(n%2)*.35*s,z+Math.sin(a)*.46*s);crown.scale.y=.95}mesh(new THREE.SphereGeometry(.8*s,18,14),green,root,x,3.2*s,z)}
 function landscaping(){box(0,-.48,0,20,.5,16,trim);box(0,-.2,0,18.8,.1,14.8,earth);box(0,-.11,.6,15,.12,12.3,stone);for(const x of[-8.1,8.1]){box(x,-.05,0,1.1,.16,13.5,green);for(let n=0;n<4;n++)tree(x,-4.9+n*3.2,.62+(n%2)*.08)}for(let n=0;n<7;n++)box(0,.02,7.05-n*.38,2.6+n*.04,.1,.22,trim);box(-5.4,.01,5.8,3.9,.14,1.5,trim);box(-5.4,.1,5.8,3.6,.04,1.2,water);for(let n=0;n<10;n++){const x=-6.6+n*1.45;box(x,.02,-6.4,.6,.04,.7,trim)}for(const x of[-3.5,3.5]){box(x,.15,6.3,.5,.3,.5,stone);mesh(new THREE.SphereGeometry(.26,16,12),green,root,x,.48,6.3)}}
 landscaping();
 if(id==='royal-bungalow'){
  const ground=group(0),upper=group(3.3),roof=group(6.6);
  box(0,1.55,-.5,11,3.1,6.4,plaster,ground);box(0,.12,.2,12,.24,8,stone,ground);cornice(11,6.4,3.1,ground);
  for(const x of[-4.15,-2.05,0,2.05,4.15])arch(x,.32,2.74,1.25,2.35,ground);
  for(const x of[-5.7,-3.8,-1.9,1.9,3.8,5.7])column(x,3.65,3.05,ground);
  for(let n=0;n<5;n++){const x=-4.75+n*2.375;arch(x,.3,3.65,1.95,2.62,ground,false)}
  box(0,3.03,3.25,12,.24,2,trim,ground);for(const x of[-5.56,5.56])for(const z of[-2.4,-.3,1.8])sideWindow(x,1.55,z,1.15,1.9,ground);box(0,1.5,-3.75,11.2,3,.2,stone,ground);
  box(0,1.4,-.7,10.6,2.8,6,plaster,upper);cornice(10.6,6,2.82,upper);
  for(const x of[-4,-2,0,2,4]){arch(x,.2,2.35,1.3,2.25,upper);box(x,.08,3.1,1.8,.14,1.45,trim,upper);railing(x,.12,3.65,1.8,upper)}
  for(const x of[-5.25,5.25]){box(x,1.45,-.5,.3,2.9,6.5,stone,upper);for(let n=0;n<5;n++)box(x,1.35,-2.6+n*1.1,.35,.08,.07,gold,upper)}
  for(const x of[-5.43,5.43])for(const z of[-2.3,-.25,1.7])sideWindow(x,1.4,z,1.1,1.7,upper);box(0,.12,-.7,11,.24,6.5,trim,roof);railing(0,.25,2.55,10.5,roof);
  for(const x of[-1.05,1.05])for(const z of[-1.75,.35])column(x,z,1.55,roof);
  box(0,1.62,-.7,2.7,.22,2.7,trim,roof);dome(0,1.85,-.7,1.25,roof);
  for(const x of[-4.35,4.35]){box(x,.28,-1.1,1.8,.28,2.3,stone,roof);hippedRoof(x,.43,-1.1,2.2,2.7,.8,roof)}
  for(const x of[-6,6]){cylinder(x,.5,4,.35,.8,stone);mesh(new THREE.SphereGeometry(.3,16,12),green,root,x,1.15,4)}
 }else if(id==='courtyard-bungalow'){
  const ground=group(0),upper=group(3.1),roof=group(5.9);
  box(-3.5,1.45,-.8,4.6,2.9,7.2,plaster,ground);box(2.5,1.45,-2.5,7.4,2.9,3.8,plaster,ground);
  for(const x of[-4.6,-2.6])arch(x,.25,2.85,1.35,2.35,ground);for(const x of[0,2,4.2])windowRect(x,1.5,-.55,1.5,2.3,ground);
  box(-3.5,3,-.8,5,.2,7.5,trim,ground);box(2.3,3,-2.5,7.8,.2,4.1,trim,ground);
  for(const x of[-5.8,-3.5,-1.2])column(x,3.45,2.85,ground);box(-3.5,2.9,3.1,5.4,.24,1.25,trim,ground);
  box(1.7,.16,2.2,4.3,.18,4.2,trim,ground);box(1.7,.27,2.2,4,.045,3.9,water,ground);
  box(-3.5,1.27,-1,4.6,2.54,6.8,plaster,upper);for(const x of[-4.6,-2.5])arch(x,.15,2.45,1.4,2.1,upper);
  railing(-3.5,.1,3,4.7,upper);box(-3.5,2.58,-1,5,.18,7.2,trim,upper);
  hippedRoof(-3.5,.1,-1,5.6,7.8,1.25,roof);
  for(const x of[-.4,5.5])column(x,-.2,2.5,upper);for(let n=0;n<12;n++)box(-.4+n*.54,2.52,-2, .1,.14,4.4,timber,upper);
  tree(5,3.3,.8);for(const z of[-2.7,-.6,1.5])sideWindow(-5.84,1.45,z,1.15,1.9,ground);for(const z of[-2.6,-.6,1.4])sideWindow(-5.84,1.25,z,1.15,1.8,upper);
 }else{
  const levels=6;
  for(let f=0;f<levels;f++){const g=group(f*2.45);const w=f>3?9.6:11.2;const d=f>3?6.3:7.2;
   box(0,1.08,0,w,2.16,d,plaster,g);cornice(w,d,2.22,g);box(0,.02,d/2+.35,w+.7,.18,1.1,trim,g);
   for(const x of[-3.9,-1.3,1.3,3.9]){if(f===0)arch(x,.15,d/2+.04,1.65,1.95,g);else{windowRect(x,1.15,d/2+.05,1.55,1.65,g);railing(x,.18,d/2+.86,2.15,g)}}
   for(const x of[-w/2-.08,w/2+.08]){box(x,1.1,0,.22,2.2,d+.12,stone,g);for(const z of[-2,0,2]){const win=box(x+(x>0?.12:-.12),1.1,z,.05,1.5,1.2,glass,g);win.castShadow=false}}
   for(const x of[-w/2+.4,w/2-.4])box(x,1.1,d/2+.1,.24,2.2,.4,stone,g);
   if(f>0)for(const x of[-4,4]){box(x,.3,d/2+.6,1.8,.4,.4,trim,g);box(x,.55,d/2+.6,1.7,.16,.3,green,g)}
  }
  const roof=group(14.7);box(0,.08,0,10.4,.2,7.2,trim,roof);railing(0,.2,3.4,10,roof);for(let n=0;n<12;n++)box(-3+n*.55,.8,-.6,.12,.18,3,timber,roof);for(const x of[-3,3])for(const z of[-2.1,.9])column(x,z,.8,roof);
  box(0,.7,-.5,3,1.3,2,stone,roof);
 }
 // Preserve the material finish when switching to an all-clay architectural study.
 root.traverse(obj=>{if(obj instanceof THREE.Mesh){obj.userData.originalMaterial=obj.material;obj.userData.originalCastShadow=obj.castShadow}});
 return {root,layers,materials,glass,texture};
}
