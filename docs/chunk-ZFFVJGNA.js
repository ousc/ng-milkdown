import{Ha as o,c as l}from"./chunk-F4M4M2WD.js";import{g as c}from"./chunk-RVFOIZLJ.js";var i=c(l(),1);var x=(s,t)=>{let r=s.append("rect");if(r.attr("x",t.x),r.attr("y",t.y),r.attr("fill",t.fill),r.attr("stroke",t.stroke),r.attr("width",t.width),r.attr("height",t.height),t.rx!==void 0&&r.attr("rx",t.rx),t.ry!==void 0&&r.attr("ry",t.ry),t.attrs!==void 0)for(let e in t.attrs)r.attr(e,t.attrs[e]);return t.class!==void 0&&r.attr("class",t.class),r},h=(s,t)=>{let r={x:t.startx,y:t.starty,width:t.stopx-t.startx,height:t.stopy-t.starty,fill:t.fill,stroke:t.stroke,class:"rect"};x(s,r).lower()},y=(s,t)=>{let r=t.text.replace(o," "),e=s.append("text");e.attr("x",t.x),e.attr("y",t.y),e.attr("class","legend"),e.style("text-anchor",t.anchor),t.class!==void 0&&e.attr("class",t.class);let n=e.append("tspan");return n.attr("x",t.x+t.textMargin*2),n.text(r),e},p=(s,t,r,e)=>{let n=s.append("image");n.attr("x",t),n.attr("y",r);let a=(0,i.sanitizeUrl)(e);n.attr("xlink:href",a)},g=(s,t,r,e)=>{let n=s.append("use");n.attr("x",t),n.attr("y",r);let a=(0,i.sanitizeUrl)(e);n.attr("xlink:href",`#${a}`)},m=()=>({x:0,y:0,width:100,height:100,fill:"#EDF2AE",stroke:"#666",anchor:"start",rx:0,ry:0}),f=()=>({x:0,y:0,width:100,height:100,"text-anchor":"start",style:"#666",textMargin:0,rx:0,ry:0,tspan:!0});export{x as a,h as b,y as c,p as d,g as e,m as f,f as g};