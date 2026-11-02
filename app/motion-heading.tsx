import {Children,cloneElement,isValidElement,type ReactNode,type HTMLAttributes} from 'react';

/** Keep real heading text and natural wrapping while giving each word its own mask. */
export default function MotionHeading({as:Tag='h2',children,...props}:HTMLAttributes<HTMLHeadingElement>&{as?:'h1'|'h2';children:ReactNode}){
 function words(nodes:ReactNode):ReactNode{
  return Children.map(nodes,(child)=>{
   if(typeof child==='string')return child.split(/(\s+)/).map((word,index)=>/^\s+$/.test(word)?word:<span className="arch-word-mask" key={index}><span className="arch-word">{word}</span></span>);
   if(isValidElement<{children?:ReactNode}>(child)&&child.props.children)return cloneElement(child,{},words(child.props.children));
   return child;
  });
 }
 return <Tag {...props}>{words(children)}</Tag>;
}
