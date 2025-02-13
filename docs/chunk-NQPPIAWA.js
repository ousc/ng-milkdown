import{e as g,h as O,i as L}from "./chunk-CM3QXDGD.js";import{A as C,B as x,H as a,I as b,v as _,x as B,y as $}from "./chunk-GMRP4QB5.js";import{Qa as y,Ra as I,s as k}from "./chunk-WBJK5ZQV.js";import"./chunk-ILE44FN6.js";import"./chunk-GAL4ENT6.js";var F=Object.defineProperty,P=Object.getOwnPropertySymbols,T=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable,v=(n, e, t)=>e in n?F(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,A=(n, e)=>{for(var t in e||(e={}))T.call(e,t)&&v(n,t,e[t]);if(P)for(var t of P(e))j.call(e,t)&&v(n,t,e[t]);return n};function E(n, e){return Object.assign(n,{meta:A({package:"@milkdown/components"},e)}),n}function V(n, e){let t=customElements.get(n);if(t==null){customElements.define(n,e);return}t!==e&&console.warn(`Custom element ${n} has been defined before.`)}var S=({selected:n,label:e="",listType:t="",checked:s,onMount:r,setAttr:o,config:d,readonly:f})=>{let i=$(),l=B();x(()=>{let p=l.current;if(!p)return;let h=i.current.querySelector("[data-content-dom]");h&&(p.appendChild(h),r?.())},[]);let u=()=>{s!=null&&o?.("checked",!s)},c={label:e,listType:t,checked:s,readonly:f};return a`<host class=${n&&"ProseMirror-selectednode"}>
    <li class="list-item">
      <div
        class="label-wrapper"
        onclick=${u}
        contenteditable="false"
      >
        ${d?.renderLabel(c)}
      </div>
      <div class="children" ref=${l}></div>
    </li>
  </host>`};S.props={label:String,checked:Boolean,readonly:Boolean,listType:String,config:Object,selected:Boolean,setAttr:Function,onMount:Function};var q=C(S),D={renderLabel:({label:n,listType:e,checked:t,readonly:s})=>t==null?a`<span class="label"
        >${e==="bullet"?"\u29BF":n}</span
      >`:a`<input
      disabled=${s}
      class="label"
      type="checkbox"
      checked=${t}
    />`},m=I(D,"listItemBlockConfigCtx");E(m,{displayName:"Config<list-item-block>",group:"ListItemBlock"});V("milkdown-list-item-block",q);var w=y(_.node,n=>(e,t,s)=>{let r=document.createElement("milkdown-list-item-block"),o=document.createElement("div");o.setAttribute("data-content-dom","true"),o.classList.add("content-dom");let d=n.get(m.key),f=l=>{r.listType=l.attrs.listType,r.label=l.attrs.label,r.checked=l.attrs.checked,r.readonly=!t.editable};f(e),r.appendChild(o),r.selected=!1,r.setAttr=(l,u)=>{let c=s();c!=null&&t.dispatch(t.state.tr.setNodeAttribute(c,l,u))},r.onMount=()=>{let{anchor:l,head:u}=t.state.selection;t.hasFocus()&&setTimeout(()=>{let c=t.state.doc.resolve(l),p=t.state.doc.resolve(u);t.dispatch(t.state.tr.setSelection(new k(c,p)))})};let i=e;return r.config=d,{dom:r,contentDOM:o,update:l=>l.type!==e.type?!1:(l.sameMarkup(i)&&l.content.eq(i.content)||(i=l,f(l)),!0),ignoreMutation:l=>!r||!o?!0:l.type==="selection"?!1:o===l.target&&l.type==="attributes"?!0:!o.contains(l.target),selectNode:()=>{r.selected=!0},deselectNode:()=>{r.selected=!1},destroy:()=>{r.remove(),o.remove()}}});E(w,{displayName:"NodeView<list-item-block>",group:"ListItemBlock"});var M=[m,w];function R(n,e){n.set(m.key,{renderLabel:({label:t,listType:s,checked:r,readonly:o})=>{var d,f,i,l,u,c;return r==null?s==="bullet"?a`<span class="label"
            >${(f=(d=e?.bulletIcon)==null?void 0:d.call(e))!=null?f:g}</span
          >`:a`<span class="label">${t}</span>`:r?a`<span
          class=${b("label checkbox",o&&"readonly")}
          >${(l=(i=e?.checkBoxCheckedIcon)==null?void 0:i.call(e))!=null?l:O}</span
        >`:a`<span class=${b("label checkbox",o&&"readonly")}
        >${(c=(u=e?.checkBoxUncheckedIcon)==null?void 0:u.call(e))!=null?c:L}</span
      >`}})}var X=(n,e)=>{n.config(t=>R(t,e)).use(M)};export{X as defineFeature};
