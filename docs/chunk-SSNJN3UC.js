import{a as B,b as L,c as G}from"./chunk-PQ7LANEK.js";import{a as $}from"./chunk-5V2PXNTG.js";import"./chunk-IMG65R7N.js";import"./chunk-LP3LSIXO.js";import{j as R}from"./chunk-VV75UWCG.js";import{F as T,Ga as d,J,La as _,Qa as N,Ra as D,Za as z,b as V,bb as P,c as W,h as g,kb as i}from"./chunk-F4M4M2WD.js";import{a as k,g as S,h as M}from"./chunk-RVFOIZLJ.js";var st=S(V(),1),nt=S(W(),1),at=S(J(),1);var C=s=>_.sanitizeText(s,i()),E={dividerMargin:10,padding:5,textHeight:10,curve:void 0},K=function(s,e,y,a){let t=Object.keys(s);d.info("keys:",t),d.info(s),t.forEach(function(r){var o,c;let l=s[r],p={shape:"rect",id:l.id,domId:l.domId,labelText:C(l.id),labelStyle:"",style:"fill: none; stroke: black",padding:((o=i().flowchart)==null?void 0:o.padding)??((c=i().class)==null?void 0:c.padding)};e.setNode(l.id,p),F(l.classes,e,y,a,l.id),d.info("setNode",p)})},F=function(s,e,y,a,t){let r=Object.keys(s);d.info("keys:",r),d.info(s),r.filter(o=>s[o].parent==t).forEach(function(o){var c,l;let n=s[o],p=n.cssClasses.join(" "),f=D(n.styles),h=n.label??n.id,b=0,m="class_box",u={labelStyle:f.labelStyle,shape:m,labelText:C(h),classData:n,rx:b,ry:b,class:p,style:f.style,id:n.id,domId:n.domId,tooltip:a.db.getTooltip(n.id,t)||"",haveCallback:n.haveCallback,link:n.link,width:n.type==="group"?500:void 0,type:n.type,padding:((c=i().flowchart)==null?void 0:c.padding)??((l=i().class)==null?void 0:l.padding)};e.setNode(n.id,u),t&&e.setParent(n.id,t),d.info("setNode",u)})},Q=function(s,e,y,a){d.info(s),s.forEach(function(t,r){var o,c;let l=t,n="",p={labelStyle:"",style:""},f=l.text,h=0,b="note",m={labelStyle:p.labelStyle,shape:b,labelText:C(f),noteData:l,rx:h,ry:h,class:n,style:p.style,id:l.id,domId:l.id,tooltip:"",type:"note",padding:((o=i().flowchart)==null?void 0:o.padding)??((c=i().class)==null?void 0:c.padding)};if(e.setNode(l.id,m),d.info("setNode",m),!l.class||!(l.class in a))return;let u=y+r,x={id:`edgeNote${u}`,classes:"relation",pattern:"dotted",arrowhead:"none",startLabelRight:"",endLabelLeft:"",arrowTypeStart:"none",arrowTypeEnd:"none",style:"fill:none",labelStyle:"",curve:N(E.curve,T)};e.setEdge(l.id,l.class,x,u)})},U=function(s,e){let y=i().flowchart,a=0;s.forEach(function(t){var r;a++;let o={classes:"relation",pattern:t.relation.lineType==1?"dashed":"solid",id:`id_${t.id1}_${t.id2}_${a}`,arrowhead:t.type==="arrow_open"?"none":"normal",startLabelRight:t.relationTitle1==="none"?"":t.relationTitle1,endLabelLeft:t.relationTitle2==="none"?"":t.relationTitle2,arrowTypeStart:q(t.relation.type1),arrowTypeEnd:q(t.relation.type2),style:"fill:none",labelStyle:"",curve:N(y?.curve,T)};if(d.info(o,t),t.style!==void 0){let c=D(t.style);o.style=c.style,o.labelStyle=c.labelStyle}t.text=t.title,t.text===void 0?t.style!==void 0&&(o.arrowheadStyle="fill: #333"):(o.arrowheadStyle="fill: #333",o.labelpos="c",((r=i().flowchart)==null?void 0:r.htmlLabels)??i().htmlLabels?(o.labelType="html",o.label='<span class="edgeLabel">'+t.text+"</span>"):(o.labelType="text",o.label=t.text.replace(_.lineBreakRegex,`
`),t.style===void 0&&(o.style=o.style||"stroke: #333; stroke-width: 1.5px;fill:none"),o.labelStyle=o.labelStyle.replace("color:","fill:"))),e.setEdge(t.id1,t.id2,o,a)})},X=function(s){E=k(k({},E),s)},Y=function(s,e,y,a){return M(this,null,function*(){d.info("Drawing class - ",e);let t=i().flowchart??i().class,r=i().securityLevel;d.info("config:",t);let o=t?.nodeSpacing??50,c=t?.rankSpacing??50,l=new R({multigraph:!0,compound:!0}).setGraph({rankdir:a.db.getDirection(),nodesep:o,ranksep:c,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}}),n=a.db.getNamespaces(),p=a.db.getClasses(),f=a.db.getRelations(),h=a.db.getNotes();d.info(f),K(n,l,e,a),F(p,l,e,a),U(f,l),Q(h,l,f.length+1,p);let b;r==="sandbox"&&(b=g("#i"+e));let m=r==="sandbox"?g(b.nodes()[0].contentDocument.body):g("body"),u=m.select(`[id="${e}"]`),x=m.select("#"+e+" g");if(yield $(x,l,["aggregation","extension","composition","dependency","lollipop"],"classDiagram",e),z.insertTitle(u,"classTitleText",t?.titleTopMargin??5,a.db.getDiagramTitle()),P(l,u,t?.diagramPadding,t?.useMaxWidth),!t?.htmlLabels){let A=r==="sandbox"?b.nodes()[0].contentDocument:document,H=A.querySelectorAll('[id="'+e+'"] .edgeLabel .label');for(let w of H){let I=w.getBBox(),v=A.createElementNS("http://www.w3.org/2000/svg","rect");v.setAttribute("rx",0),v.setAttribute("ry",0),v.setAttribute("width",I.width),v.setAttribute("height",I.height),w.insertBefore(v,w.firstChild)}}})};function q(s){let e;switch(s){case 0:e="aggregation";break;case 1:e="extension";break;case 2:e="composition";break;case 3:e="dependency";break;case 4:e="lollipop";break;default:e="none"}return e}var Z={setConf:X,draw:Y},ct={parser:B,db:L,renderer:Z,styles:G,init:s=>{s.class||(s.class={}),s.class.arrowMarkerAbsolute=s.arrowMarkerAbsolute,L.clear()}};export{ct as diagram};