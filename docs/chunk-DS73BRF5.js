import{C as V,E as z,a as ve,b as Ce,c as xe,p as G}from "./chunk-CM3QXDGD.js";import{a as Y,e as ae,g as de,h as se,i as ce,j as M,k as j,l as ie,m as ue,n as fe,o as pe,p as he,q as we}from "./chunk-VCVNBPRD.js";import{a as Ee}from "./chunk-6ZGCKHA5.js";import{a as W,d as E}from "./chunk-OJSX3Q5S.js";import{A as me,B as ge,C as ye,E as q,F as T,H as be,I as _e,x as S,y as F}from "./chunk-GMRP4QB5.js";import{Aa as L,Qa as re,Ra as le,ja as D,t as oe,va as A}from "./chunk-WBJK5ZQV.js";import"./chunk-ILE44FN6.js";import{a as te,b as ne,f as Te}from "./chunk-GAL4ENT6.js";var Q=Te(Ee(),1);function De(n, e){let t=customElements.get(n);if(t==null){customElements.define(n,e);return}t!==e&&console.warn(`Custom element ${n} has been defined before.`)}var Me=Object.defineProperty,Re=Object.getOwnPropertySymbols,je=Object.prototype.hasOwnProperty,We=Object.prototype.propertyIsEnumerable,He=(n, e, t)=>e in n?Me(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,Ne=(n, e)=>{for(var t in e||(e={}))je.call(e,t)&&He(n,t,e[t]);if(Re)for(var t of Re(e))We.call(e,t)&&He(n,t,e[t]);return n};function Be(n, e){return Object.assign(n,{meta:Ne({package:"@milkdown/components"},e)}),n}var Xe=Object.defineProperty,$e=Object.getOwnPropertySymbols,Ye=Object.prototype.hasOwnProperty,Fe=Object.prototype.propertyIsEnumerable,Ie=(n, e, t)=>e in n?Xe(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,Ge=(n, e)=>{for(var t in e)Ye.call(e,t)&&Ie(n,t,e[t]);if($e)for(var t of $e(e))Fe.call(e,t)&&Ie(n,t,e[t]);return n},Ve={renderButton: n=>{switch(n){case"add_row":return"+";case"add_col":return"+";case"delete_row":return"-";case"delete_col":return"-";case"align_col_left":return"left";case"align_col_center":return"center";case"align_col_right":return"right";case"col_drag_handle":return"=";case"row_drag_handle":return"="}}},N=le(Ge({},Ve),"tableBlockConfigCtx");Be(N,{displayName:"Config<table-block>",group:"TableBlock"});function J(n, e){for(let t=0; t<n.childCount; t++)if(n.child(t)===e)return t;return-1}function ze(n, e){var t,o,a;if(e)try{let r=e.posAtCoords({left:n.clientX,top:n.clientY});if(!r)return;let i=r?.inside;if(i==null||i<0)return;let s=e.state.doc.resolve(i),c=e.state.doc.nodeAt(i);if(!c)return;let p=["table_cell","table_header"],f=["table_row","table_header_row"],w=p.includes(c.type.name)?c:(t=D(l=>p.includes(l.type.name))(s))==null?void 0:t.node,b=(o=D(l=>f.includes(l.type.name))(s))==null?void 0:o.node,v=(a=D(l=>l.type.name==="table")(s))==null?void 0:a.node;if(!w||!b||!v)return;let m=J(b,w);return[J(v,b),m]}catch{return}}function X(n, [e,t]){let o=n.current;if(!o)return;let a=o.querySelectorAll("tr"),r=a[e];if(!r)return;let i=a[0];if(!i)return;let s=i.children[t];if(!s)return;let c=r.children[t];if(c)return{row:r,col:c,headerCol:s}}function Je(n, e, t){if(!e||!t)return;let{selection:o}=e.get(A).state;if(!(o instanceof Y))return;let{$from:a}=o,r=de(a);if(!(!r||r.node!==t)){if(o.isColSelection()){let{$head:i}=o,s=i.index(i.depth-1);Z({refs:n,index:[0,s],before: c=>{var p;(p=c.querySelector(".button-group"))==null||p.setAttribute("data-show","true")}});return}if(o.isRowSelection()){let{$head:i}=o,s=D(p=>p.type.name==="table_row"||p.type.name==="table_header_row")(i);if(!s)return;let c=J(r.node,s.node);ee({refs:n,index:[c,0],before: p=>{var f;c>0&&((f=p.querySelector(".button-group"))==null||f.setAttribute("data-show","true"))}})}}}function Z({refs:n,index:e,before:t,after:o}){let{contentWrapperRef:a,colHandleRef:r,hoverIndex:i}=n,s=r.current;if(!s)return;i.current=e;let c=X(a,e);if(!c)return;let{headerCol:p}=c;s.dataset.show="true",t&&t(s),E(p,s,{placement:"top"}).then(({x:f,y:w})=>{Object.assign(s.style,{left:`${f}px`,top:`${w}px`}),o&&o(s)})}function ee({refs:n,index:e,before:t,after:o}){let{contentWrapperRef:a,rowHandleRef:r,hoverIndex:i}=n,s=r.current;if(!s)return;i.current=e;let c=X(a,e);if(!c)return;let{row:p}=c;s.dataset.show="true",t&&t(s),E(p,s,{placement:"left"}).then(({x:f,y:w})=>{Object.assign(s.style,{left:`${f}px`,top:`${w}px`}),o&&o(s)})}function Oe(n){let{dragPreviewRef:e,tableWrapperRef:t,contentWrapperRef:o,yLineHandleRef:a,xLineHandleRef:r,colHandleRef:i,rowHandleRef:s}=n,c=e.current;if(!c)return;let p=t.current;if(!p)return;let f=o.current;if(!f)return;let w=f.querySelector("tbody");if(!w)return;let b=c.querySelector("tbody");if(!b)return;let v=a.current;if(!v)return;let m=r.current;if(!m)return;let d=i.current;if(!d)return;let l=s.current;return l?{preview:c,wrapper:p,content:f,contentRoot:w,previewRoot:b,yHandle:v,xHandle:m,colHandle:d,rowHandle:l}:void 0}function ke(n, e, t, o){let a=t?.get(A);if(!a?.editable)return;e.stopPropagation(),e.dataTransfer&&(e.dataTransfer.effectAllowed="move");let r=Oe(n);r&&requestAnimationFrame(()=>{o(r)})}function Ue(n, e){return t=>{ke(n,t,e,({preview:o,content:a,previewRoot:r,yHandle:i,xHandle:s,colHandle:c,rowHandle:p})=>{var f;let{hoverIndex:w,dragInfo:b}=n;s.dataset.displayType="indicator",i.dataset.show="false",c.dataset.show="false",(f=p.querySelector(".button-group"))==null||f.setAttribute("data-show","false");let[v]=w.current;b.current={startCoords:[t.clientX,t.clientY],startIndex:v,endIndex:v,type:"row"},o.dataset.direction="vertical";let m=a.querySelectorAll("tr");for(; r.firstChild;)r.removeChild(r.firstChild);let d=m[v];if(!d)return;r.appendChild(d.cloneNode(!0));let l=d.getBoundingClientRect().height,{width:_}=a.querySelector("tbody").getBoundingClientRect();Object.assign(o.style,{width:`${_}px`,height:`${l}px`}),o.dataset.show="true"})}}function Ke(n, e){return t=>{ke(n,t,e,({preview:o,content:a,previewRoot:r,yHandle:i,xHandle:s,colHandle:c,rowHandle:p})=>{var f;let{hoverIndex:w,dragInfo:b}=n;s.dataset.show="false",i.dataset.displayType="indicator",p.dataset.show="false",(f=c.querySelector(".button-group"))==null||f.setAttribute("data-show","false");let[v,m]=w.current;b.current={startCoords:[t.clientX,t.clientY],startIndex:m,endIndex:m,type:"col"},o.dataset.direction="horizontal";let d=a.querySelectorAll("tr");for(; r.firstChild;)r.removeChild(r.firstChild);let l;Array.from(d).forEach(u=>{let h=u.children[m];if(!h)return;l===void 0&&(l=h.getBoundingClientRect().width);let C=h.parentElement.cloneNode(!1),g=h.cloneNode(!0);C.appendChild(g),r.appendChild(C)});let{height:_}=a.querySelector("tbody").getBoundingClientRect();Object.assign(o.style,{width:`${l}px`,height:`${_}px`}),o.dataset.show="true"})}}function Qe(n){return(0,Q.default)(e=>{let t=Oe(n);if(!t)return;let{preview:o,content:a,contentRoot:r,xHandle:i,yHandle:s}=t,{dragInfo:c,hoverIndex:p}=n;if(o.dataset.show==="false")return;let f=X(n.contentWrapperRef,p.current);if(!f)return;let w=r.querySelector("tr");if(!w)return;let b=c.current;if(!b||!r.offsetParent)return;let v=r.offsetParent.offsetTop,m=r.offsetParent.offsetLeft;if(b.type==="col"){let d=f.col.getBoundingClientRect().width,{left:l,width:_}=r.getBoundingClientRect(),u=m-l,h=e.clientX+u-d/2,C=e.clientX+u+d/2,[g]=b.startCoords,x=g<e.clientX?"right":"left";o.style.top=`${v}px`;let H=h<l+u-20?l+u-20:h>l+_+u-d+20?l+_+u-d+20:h;o.style.left=`${H}px`;let k=Array.from(w.children),O=k.find((B, y)=>{let I=B.getBoundingClientRect(),$=I.left+m-l,R=I.right+m-l;if(x==="right"){if($=$+I.width/2,R=R+I.width/2,$<=C&&R>=C||y===w.children.length-1&&C>R)return!0}else if($=$-I.width/2,R=R-I.width/2,$<=h&&R>=h||y===0&&h<$)return!0;return!1});if(O){let B=s.getBoundingClientRect().width,y=a.getBoundingClientRect(),I=k.indexOf(O);b.endIndex=I,E(O,s,{placement:x==="left"?"left":"right",middleware:[W(x==="left"?-1*B:0)]}).then(({x:$})=>{s.dataset.show="true",Object.assign(s.style,{height:`${y.height}px`,left:`${$}px`,top:`${v}px`})})}}else if(b.type==="row"){let d=f.row.getBoundingClientRect().height,{top:l,height:_}=r.getBoundingClientRect(),u=v-l,h=e.clientY+u-d/2,C=e.clientY+u+d/2,[g,x]=b.startCoords,H=x<e.clientY?"down":"up",k=h<l+u-20?l+u-20:h>l+_+u-d+20?l+_+u-d+20:h;o.style.top=`${k}px`,o.style.left=`${m}px`;let O=Array.from(r.querySelectorAll("tr")),B=O.find((y, I)=>{let $=y.getBoundingClientRect(),R=$.top+v-l,P=$.bottom+v-l;if(H==="down"){if(R=R+$.height/2,P=P+$.height/2,R<=C&&P>=C||I===O.length-1&&C>P)return!0}else if(R=R-$.height/2,P=P-$.height/2,R<=h&&P>=h||I===0&&h<R)return!0;return!1});if(B){let y=i.getBoundingClientRect().height,I=a.getBoundingClientRect(),$=O.indexOf(B);b.endIndex=$,E(B,i,{placement:H==="up"?"top":"bottom",middleware:[W(H==="up"?-1*y:0)]}).then(({y:R})=>{i.dataset.show="true",Object.assign(i.style,{width:`${I.width}px`,top:`${R}px`})})}}},20)}function Ze(n, e, t){let{dragPreviewRef:o,yLineHandleRef:a,xLineHandleRef:r,dragInfo:i}=n,s=F(),c=q(()=>s.current.getRootNode(),[s]),p=q(()=>Ue(n,e),[n]),f=q(()=>Ke(n,e),[n]);return ye(()=>{let w=()=>{let m=o.current;if(!m||m.dataset.show==="false")return;let d=m?.querySelector("tbody");for(; d?.firstChild;)d?.removeChild(d.firstChild);m&&(m.dataset.show="false")},b=()=>{var m;let d=o.current;if(!d)return;let l=a.current;if(!l)return;let _=r.current;if(!_)return;let u=i.current;if(!u||!e||d.dataset.show==="false"||!n.colHandleRef.current||!n.rowHandleRef.current||(l.dataset.show="false",_.dataset.show="false",u.startIndex===u.endIndex))return;let g=e.get(L),x={from:u.startIndex,to:u.endIndex,pos:((m=t?.())!=null?m:0)+1};if(u.type==="col"){g.call(j.key,{pos:x.pos,index:u.startIndex}),g.call(ce.key,x);let H=[0,u.endIndex];Z({refs:n,index:H})}else{g.call(M.key,{pos:x.pos,index:u.startIndex}),g.call(se.key,x);let H=[u.endIndex,0];ee({refs:n,index:H})}requestAnimationFrame(()=>{e.get(A).focus()})},v=Qe(n);return c.addEventListener("dragover",v),c.addEventListener("dragend",w),c.addEventListener("drop",b),()=>{c.removeEventListener("dragover",v),c.removeEventListener("dragend",w),c.removeEventListener("drop",b)}},[]),{dragRow:p,dragCol:f}}function et(n, e){return(0,Q.default)(t=>{if(!e?.editable)return;let{contentWrapperRef:o,yLineHandleRef:a,xLineHandleRef:r,colHandleRef:i,rowHandleRef:s,hoverIndex:c,lineHoverIndex:p}=n,f=a.current;if(!f)return;let w=r.current;if(!w)return;let b=o.current;if(!b)return;let v=s.current;if(!v)return;let m=i.current;if(!m)return;let d=ze(t,e);if(!d)return;let l=X(o,d);if(!l)return;let[_,u]=d,h=l.col.getBoundingClientRect(),C=Math.abs(t.clientX-h.left)<8,g=Math.abs(h.right-t.clientX)<8,x=Math.abs(t.clientY-h.top)<8,H=Math.abs(h.bottom-t.clientY)<8,k=C||g||x||H,O=v.querySelector(".button-group"),B=m.querySelector(".button-group");if(O&&(O.dataset.show="false"),B&&(B.dataset.show="false"),k){let y=b.getBoundingClientRect();v.dataset.show="false",m.dataset.show="false",w.dataset.displayType="tool",f.dataset.displayType="tool";let I=f.getBoundingClientRect().width,$=w.getBoundingClientRect().height;C||g?(p.current[1]=C?u:u+1,E(l.col,f,{placement:C?"left":"right",middleware:[W(C?-1*I:0)]}).then(({x:R})=>{f.dataset.show="true",Object.assign(f.style,{height:`${y.height}px`,left:`${R}px`})})):f.dataset.show="false",d[0]!==0&&(x||H)?(p.current[0]=x?_:_+1,E(l.row,w,{placement:x?"top":"bottom",middleware:[W(x?-1*$:0)]}).then(({y:R})=>{w.dataset.show="true",Object.assign(w.style,{width:`${y.width}px`,top:`${R}px`})})):w.dataset.show="false";return}p.current=[-1,-1],f.dataset.show="false",w.dataset.show="false",v.dataset.show="true",m.dataset.show="true",ee({refs:n,index:d}),Z({refs:n,index:d}),c.current=d},20)}function tt(n){return()=>{let{rowHandleRef:e,colHandleRef:t,yLineHandleRef:o,xLineHandleRef:a}=n;setTimeout(()=>{let r=e.current;if(!r)return;let i=t.current;if(!i)return;let s=o.current;if(!s)return;let c=a.current;c&&(r.dataset.show="false",i.dataset.show="false",s.dataset.show="false",c.dataset.show="false")},200)}}function nt(n, e){let t=q(()=>et(n,e),[]),o=q(()=>tt(n),[]);return{pointerMove:t,pointerLeave:o}}function ot(n, e, t){let{xLineHandleRef:o,contentWrapperRef:a,colHandleRef:r,rowHandleRef:i,hoverIndex:s,lineHoverIndex:c}=n,p=T(()=>{var d,l,_;if(!e)return;let u=o.current;if(!u)return;let[h]=c.current;if(h<0||!e.get(A).editable)return;let C=Array.from((l=(d=a.current)==null?void 0:d.querySelectorAll("tr"))!=null?l:[]),g=e.get(L),x=((_=t?.())!=null?_:0)+1;C.length===h?(g.call(M.key,{pos:x,index:h-1}),g.call(he.key)):(g.call(M.key,{pos:x,index:h}),g.call(pe.key)),g.call(M.key,{pos:x,index:h}),u.dataset.show="false"},[]),f=T(()=>{var d,l,_,u;if(!e||!o.current)return;let[C,g]=c.current;if(g<0||!e.get(A).editable)return;let x=Array.from((_=(l=(d=a.current)==null?void 0:d.querySelector("tr"))==null?void 0:l.children)!=null?_:[]),H=e.get(L),k=((u=t?.())!=null?u:0)+1;x.length===g?(H.call(j.key,{pos:k,index:g-1}),H.call(fe.key)):(H.call(j.key,{pos:k,index:g}),H.call(ue.key)),H.call(j.key,{pos:k,index:g})},[]),w=T(()=>{var d,l;if(!e)return;let[_,u]=s.current,h=e.get(L),C=((d=t?.())!=null?d:0)+1;h.call(j.key,{pos:C,index:u});let g=(l=r.current)==null?void 0:l.querySelector(".button-group");g&&(g.dataset.show=g.dataset.show==="true"?"false":"true")},[]),b=T(()=>{var d,l;if(!e)return;let[_,u]=s.current,h=e.get(L),C=((d=t?.())!=null?d:0)+1;h.call(M.key,{pos:C,index:_});let g=(l=i.current)==null?void 0:l.querySelector(".button-group");g&&_>0&&(g.dataset.show=g.dataset.show==="true"?"false":"true")},[]),v=T(d=>{if(!e||!e.get(A).editable)return;d.preventDefault(),d.stopPropagation(),e.get(L).call(ie.key),requestAnimationFrame(()=>{e.get(A).focus()})},[]),m=T(d=> l=>{if(!e||!e.get(A).editable)return;l.preventDefault(),l.stopPropagation(),e.get(L).call(we.key,d),requestAnimationFrame(()=>{e.get(A).focus()})},[]);return{onAddRow:p,onAddCol:f,selectCol:w,selectRow:b,deleteSelected:v,onAlign:m}}var Se=({view:n,ctx:e,getPos:t,node:o,config:a})=>{let r=F(),i=S(),s=S(),c=S(),p=S(),f=S(),w=S(),b=S(),v=S([0,0]),m=S([-1,-1]),d=S(),l=q(()=>({dragPreviewRef:b,tableWrapperRef:w,contentWrapperRef:i,yLineHandleRef:f,xLineHandleRef:p,colHandleRef:s,rowHandleRef:c,hoverIndex:v,lineHoverIndex:m,dragInfo:d}),[]);ge(()=>{let y=i.current;if(!y)return;let I=r.current.querySelector("[data-content-dom]");I&&y.appendChild(I),n?.editable&&Je(l,e,o)},[]);let{pointerLeave:_,pointerMove:u}=nt(l,n),{dragRow:h,dragCol:C}=Ze(l,e,t),{onAddRow:g,onAddCol:x,selectCol:H,selectRow:k,deleteSelected:O,onAlign:B}=ot(l,e,t);return be`
    <host
      class=${_e(!n?.editable&&"readonly")}
      ondragstart=${y=>y.preventDefault()}
      ondragover=${y=>y.preventDefault()}
      ondragleave=${y=>y.preventDefault()}
      onpointermove=${u}
      onpointerleave=${_}
    >
      <button
        type="button"
        data-show="false"
        contenteditable="false"
        draggable="true"
        data-role="col-drag-handle"
        class="handle cell-handle"
        ondragstart=${C}
        onclick=${H}
        onpointerdown=${y=>y.stopPropagation()}
        onpointermove=${y=>y.stopPropagation()}
        ref=${s}
      >
        ${a?.renderButton("col_drag_handle")}
        <div
          data-show="false"
          class="button-group"
          onpointermove=${y=>y.stopPropagation}
        >
          <button type="button" onpointerdown=${B("left")}>
            ${a?.renderButton("align_col_left")}
          </button>
          <button type="button" onpointerdown=${B("center")}>
            ${a?.renderButton("align_col_center")}
          </button>
          <button type="button" onpointerdown=${B("right")}>
            ${a?.renderButton("align_col_right")}
          </button>
          <button type="button" onpointerdown=${O}>
            ${a?.renderButton("delete_col")}
          </button>
        </div>
      </button>
      <button
        type="button"
        data-show="false"
        contenteditable="false"
        draggable="true"
        data-role="row-drag-handle"
        class="handle cell-handle"
        ondragstart=${h}
        onclick=${k}
        onpointerdown=${y=>y.stopPropagation()}
        onpointermove=${y=>y.stopPropagation()}
        ref=${c}
      >
        ${a?.renderButton("row_drag_handle")}
        <div
          data-show="false"
          class="button-group"
          onpointermove=${y=>y.stopPropagation}
        >
          <button type="button" onpointerdown=${O}>
            ${a?.renderButton("delete_row")}
          </button>
        </div>
      </button>
      <div class="table-wrapper" ref=${w}>
        <div
          data-show="false"
          class="drag-preview"
          data-direction="vertical"
          ref=${b}
        >
          <table>
            <tbody></tbody>
          </table>
        </div>
        <div
          data-show="false"
          contenteditable="false"
          data-display-type="tool"
          data-role="x-line-drag-handle"
          class="handle line-handle"
          onpointermove=${y=>y.stopPropagation}
          ref=${p}
        >
          <button type="button" onclick=${g} class="add-button">
            ${a?.renderButton("add_row")}
          </button>
        </div>
        <div
          data-show="false"
          contenteditable="false"
          data-display-type="tool"
          data-role="y-line-drag-handle"
          class="handle line-handle"
          onpointermove=${y=>y.stopPropagation}
          ref=${f}
        >
          <button type="button" onclick=${x} class="add-button">
            ${a?.renderButton("add_col")}
          </button>
        </div>
        <table ref=${i} class="children"></table>
      </div>
    </host>
  `};Se.props={getPos:Function,view:Object,ctx:Object,node:Object,config:Object};var rt=me(Se),Ae=n=>{throw TypeError(n)},lt=(n,e,t)=>e.has(n)||Ae("Cannot "+t),at=(n,e,t)=>e.has(n)?Ae("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t),dt=(n,e,t)=>(lt(n,e,"access private method"),t),U,Le,K=class{constructor(e,t,o,a){this.ctx=e,this.node=t,this.view=o,this.getPos=a,at(this,U);let r=document.createElement("milkdown-table-block");this.dom=r,r.view=o,r.ctx=e,r.getPos=a,r.node=t,r.config=e.get(N.key);let i=document.createElement("tbody");this.contentDOM=i,i.setAttribute("data-content-dom","true"),i.classList.add("content-dom"),r.appendChild(i)}update(e){return e.type!==this.node.type||e.sameMarkup(this.node)&&e.content.eq(this.node.content)?!1:(this.node=e,this.dom.node=e,!0)}stopEvent(e){if(e.type==="drop"||e.type.startsWith("drag"))return!0;if(e.type==="mousedown"){if(e.target instanceof HTMLButtonElement)return!0;let t=e.target;if(t instanceof HTMLElement&&(t.closest("th")||t.closest("td"))){let o=e;return dt(this,U,Le).call(this,o)}}return!1}ignoreMutation(e){return!this.dom||!this.contentDOM?!0:e.type==="selection"?!1:this.contentDOM===e.target&&e.type==="attributes"?!0:!this.contentDOM.contains(e.target)}};U=new WeakSet;Le=function(n){let e=this.view;if(!e.editable)return!1;let{state:t,dispatch:o}=e,a=e.posAtCoords({left:n.clientX,top:n.clientY});if(!a)return!1;let r=t.doc.resolve(a.inside),i=D(p=>p.type.name==="table_cell"||p.type.name==="table_header")(r);if(!i)return!1;let{from:s}=i,c=oe.create(t.doc,s+1);return t.selection.eq(c)?!1:(t.selection instanceof Y?setTimeout(()=>{o(t.tr.setSelection(c).scrollIntoView())},20):requestAnimationFrame(()=>{o(t.tr.setSelection(c).scrollIntoView())}),!0)};De("milkdown-table-block",rt);var Pe=re(ae.node,n=>(e,t,o)=>new K(n,e,t,o));Be(Pe,{displayName:"NodeView<table-block>",group:"TableBlock"});var qe=[N,Pe];var vt=(n,e)=>{n.config(t=>{t.update(N.key,o=>ne(te({},o),{renderButton:a=>{var r,i,s,c,p,f,w,b,v,m,d,l,_,u,h,C,g,x;switch(a){case"add_row":return(i=(r=e?.addRowIcon)==null?void 0:r.call(e))!=null?i:V;case"add_col":return(c=(s=e?.addColIcon)==null?void 0:s.call(e))!=null?c:V;case"delete_row":return(f=(p=e?.deleteRowIcon)==null?void 0:p.call(e))!=null?f:z;case"delete_col":return(b=(w=e?.deleteColIcon)==null?void 0:w.call(e))!=null?b:z;case"align_col_left":return(m=(v=e?.alignLeftIcon)==null?void 0:v.call(e))!=null?m:Ce;case"align_col_center":return(l=(d=e?.alignCenterIcon)==null?void 0:d.call(e))!=null?l:ve;case"align_col_right":return(u=(_=e?.alignRightIcon)==null?void 0:_.call(e))!=null?u:xe;case"col_drag_handle":return(C=(h=e?.colDragHandleIcon)==null?void 0:h.call(e))!=null?C:G;case"row_drag_handle":return(x=(g=e?.rowDragHandleIcon)==null?void 0:g.call(e))!=null?x:G}}}))}).use(qe)};export{vt as defineFeature};
