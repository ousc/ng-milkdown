import{a as z}from "./chunk-EHIRYXFN.js";import{b as g}from "./chunk-MM3EZJ6F.js";import{c as ht}from "./chunk-ULSCS6NB.js";import{G as ct,d as at,l as it,y as rt,z as dt}from "./chunk-CM3QXDGD.js";import{g as pt,h as ft}from "./chunk-FSIF6OGH.js";import{a as ut,b as mt}from "./chunk-FJUI5PLB.js";import"./chunk-KEFREGMC.js";import{c as et,d as ot}from "./chunk-VCVNBPRD.js";import"./chunk-6ZGCKHA5.js";import"./chunk-OMWKF27L.js";import"./chunk-OJSX3Q5S.js";import{A as st,C as lt,H as W,I as m,b as X,c as Y,d as Z,e as j,g as x,h as tt,i as V,z as nt}from "./chunk-GMRP4QB5.js";import{Aa as _,s as R,t as D,va as k}from "./chunk-WBJK5ZQV.js";import"./chunk-ILE44FN6.js";import"./chunk-GAL4ENT6.js";var St=W`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M7 19v-.808L13.096 12L7 5.808V5h10v1.25H9.102L14.727 12l-5.625 5.77H17V19z"
    />
  </svg>
`,bt=({ctx:t,hide:n,show:s,config:o,selection:d})=>{var c,h,p,C,$,S,I,E,L,B,F,T;let U=nt();lt(()=>{U()},[s]);let f=e=>a=>{a.preventDefault(),t&&e(t),U()},v=e=>{if(!t||!d)return!1;let a=t.get(k),{state:{doc:i}}=a;return i.rangeHasMark(d.from,d.to,e)},q=e=>{if(!t||!d)return!1;let a=t.get(k),{state:{doc:i}}=a;if(d instanceof D)return d.node.type===e;let{from:y,to:N}=d,w=!1;return i.nodesBetween(y,N,H=>H.type===e?(w=!0,!1):!0),w},J=t?.get(ft),Ct=J?.includes(pt.Latex),$t=e=>{let a=q(g.type(e)),i=e.get(k),{selection:y,doc:N,tr:w}=i.state;if(!a){let M=N.textBetween(y.from,y.to),P=w.replaceSelectionWith(g.type(e).create({value:M}));i.dispatch(P.setSelection(D.create(P.doc,y.from)));return}let{from:H,to:K}=y,b=-1,O=null;if(N.nodesBetween(H,K,(M,P)=>O?!1:M.type===g.type(e)?(b=P,O=M,!1):!0),!O||b<0)return;let A=w.delete(b,b+1),Q=O.attrs.value;A=A.insertText(Q,b),i.dispatch(A.setSelection(R.create(A.doc,H,K+Q.length-1)))};return W`<host>
    <button
      type="button"
      class=${m("toolbar-item",t&&v(Z.type(t))&&"active")}
      onmousedown=${f(e=>{e.get(_).call(j.key)})}
    >
      ${(h=(c=o?.boldIcon)==null?void 0:c.call(o))!=null?h:at}
    </button>
    <button
      type="button"
      class=${m("toolbar-item",t&&v(X.type(t))&&"active")}
      onmousedown=${f(e=>{e.get(_).call(Y.key)})}
    >
      ${(C=(p=o?.italicIcon)==null?void 0:p.call(o))!=null?C:rt}
    </button>
    <button
      type="button"
      class=${m("toolbar-item",t&&v(et.type(t))&&"active")}
      onmousedown=${f(e=>{e.get(_).call(ot.key)})}
    >
      ${(S=($=o?.strikethroughIcon)==null?void 0:$.call(o))!=null?S:ct}
    </button>
    <div class="divider"></div>
    <button
      type="button"
      class=${m("toolbar-item",t&&v(x.type(t))&&"active")}
      onmousedown=${f(e=>{e.get(_).call(tt.key)})}
    >
      ${(E=(I=o?.codeIcon)==null?void 0:I.call(o))!=null?E:it}
    </button>
    ${Ct&&W`<button
      type="button"
      class=${m("toolbar-item",t&&q(g.type(t))&&"active")}
      onmousedown=${f($t)}
    >
      ${(B=(L=o?.latexIcon)==null?void 0:L.call(o))!=null?B:St}
    </button>`}
    <button
      type="button"
      class=${m("toolbar-item",t&&v(V.type(t))&&"active")}
      onmousedown=${f(e=>{let a=e.get(k),{selection:i}=a.state;if(v(V.type(e))){e.get(z.key).removeLink(i.from,i.to);return}e.get(z.key).addLink(i.from,i.to),n?.()})}
    >
      ${(T=(F=o?.linkIcon)==null?void 0:F.call(o))!=null?T:dt}
    </button>
  </host>`};bt.props={ctx:Object,hide:Function,show:Boolean,config:Object,selection:Object};var kt=st(bt),_t=t=>{throw TypeError(t)},gt=(t,n,s)=>n.has(t)||_t("Cannot "+s),l=(t,n,s)=>(gt(t,n,"read from private field"),s?s.call(t):n.get(t)),vt=(t,n,s)=>n.has(t)?_t("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(t):n.set(t,s),yt=(t,n,s,o)=>(gt(t,n,"write to private field"),n.set(t,s),s),u,r,wt=mt("CREPE_TOOLBAR"),G=class{constructor(n,s,o){vt(this,u),vt(this,r),this.update=(c,h)=>{l(this,u).update(c,h),l(this,r).selection=c.state.selection},this.destroy=()=>{l(this,u).destroy(),l(this,r).remove()},this.hide=()=>{l(this,u).hide()};let d=new kt;yt(this,r,d),l(this,r).ctx=n,l(this,r).hide=this.hide,l(this,r).config=o,l(this,r).selection=s.state.selection,yt(this,u,new ut({content:l(this,r),debounce:20,offset:10,shouldShow(c){let{doc:h,selection:p}=c.state,{empty:C,from:$,to:S}=p,I=!h.textBetween($,S).length&&p instanceof R,E=!(p instanceof R),L=c.dom.getRootNode().activeElement,B=d.contains(L),F=!c.hasFocus()&&!B,T=!c.editable;return!(F||E||C||I||T)}})),l(this,u).onShow=()=>{l(this,r).show=!0},l(this,u).onHide=()=>{l(this,r).show=!1},this.update(s)}};u=new WeakMap;r=new WeakMap;ht("milkdown-toolbar",kt);var Wt=(t,n)=>{t.config(s=>{s.set(wt.key,{view:o=>new G(s,o,n)})}).use(wt)};export{Wt as defineFeature};
