import{A as C,D as g,H as p,I as v,r as P,x as b}from "./chunk-GMRP4QB5.js";import{Qa as k,Ra as w}from "./chunk-WBJK5ZQV.js";var F=Object.defineProperty,L=Object.getOwnPropertySymbols,T=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable,U=(e, n, t)=>n in e?F(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,H=(e, n)=>{for(var t in n||(n={}))T.call(n,t)&&U(e,t,n[t]);if(L)for(var t of L(n))V.call(n,t)&&U(e,t,n[t]);return e};function x(e, n){return Object.assign(e,{meta:H({package:"@milkdown/components"},n)}),e}var M={imageIcon:()=>"\u{1F30C}",uploadButton:()=>p`Upload`,confirmButton:()=>p`⏎`,uploadPlaceholderText:"/Paste",onUpload: e=>Promise.resolve(URL.createObjectURL(e))},$=w(M,"inlineImageConfigCtx");x($,{displayName:"Config<image-inline>",group:"ImageInline"});function A(e, n){let t=customElements.get(e);if(t==null){customElements.define(e,n);return}t!==n&&console.warn(`Custom element ${e} has been defined before.`)}var K=(e, n, t)=>new Promise((f, r)=>{var i= l=>{try{s(t.next(l))}catch(a){r(a)}},u= l=>{try{s(t.throw(l))}catch(a){r(a)}},s= l=>l.done?f(l.value):Promise.resolve(l.value).then(i,u);s((t=t.apply(e,n)).next())}),E=({src:e="",selected:n=!1,alt:t,title:f,setAttr:r,config:i})=>{let u=b(),[s]=g(crypto.randomUUID()),[l,a]=g(!1),[c,h]=g(e.length!==0),[y,S]=g(e),D= o=>{let m=o.target.value;h(m.length!==0),S(m)},R= o=>K(void 0,null,function*(){var d;let m=(d=o.target.files)==null?void 0:d[0];if(!m)return;let _=yield i?.onUpload(m);_&&(r?.("src",_),h(!0))}),I=()=>{var o,d;r?.("src",(d=(o=u.current)==null?void 0:o.value)!=null?d:"")},j= o=>{o.key==="Enter"&&I()},B= o=>{o.preventDefault(),o.stopPropagation()},N= o=>{o.stopPropagation(),o.preventDefault()};return p`<host class=${v(n&&"selected",!e&&"empty")}>
    ${e?p`<img class="image-inline" src=${e} alt=${t} title=${f} />`:p`<div class="empty-image-inline">
          <div class="image-icon">${i?.imageIcon()}</div>
          <div class=${v("link-importer",l&&"focus")}>
            <input
              draggable="true"
              ref=${u}
              ondragstart=${B}
              class="link-input-area"
              value=${y}
              oninput=${D}
              onkeydown=${j}
              onfocus=${()=>a(!0)}
              onblur=${()=>a(!1)}
            />
            <div class=${v("placeholder",c&&"hidden")}>
              <input
                class="hidden"
                id=${s}
                type="file"
                accept="image/*"
                onchange=${R}
              />
              <label
                onpointerdown=${N}
                class="uploader"
                for=${s}
              >
                ${i?.uploadButton()}
              </label>
              <span class="text" onclick=${()=>{var o;return(o=u.current)==null?void 0:o.focus()}}>
                ${i?.uploadPlaceholderText}
              </span>
            </div>
          </div>
          <div
            class=${v("confirm",y.length===0&&"hidden")}
            onclick=${()=>I()}
          >
            ${i?.confirmButton()}
          </div>
        </div>`}
  </host>`};E.props={src:String,alt:String,title:String,selected:Boolean,setAttr:Function,config:Object};var q=C(E);A("milkdown-image-inline",q);var O=k(P.node,e=>(n,t,f)=>{let r=document.createElement("milkdown-image-inline"),i=e.get($.key),u=i.proxyDomURL,s=l=>{if(!u)r.src=l.attrs.src;else{let a=u(l.attrs.src);typeof a=="string"?r.src=a:a.then(c=>{r.src=c})}r.alt=l.attrs.alt,r.title=l.attrs.title};return s(n),r.selected=!1,r.setAttr=(l,a)=>{let c=f();c!=null&&t.dispatch(t.state.tr.setNodeAttribute(c,l,a))},r.config=i,{dom:r,update:l=>l.type!==n.type?!1:(s(l),!0),stopEvent:l=>!!(r.selected&&l.target instanceof HTMLInputElement),selectNode:()=>{r.selected=!0},deselectNode:()=>{r.selected=!1},destroy:()=>{r.remove()}}});x(O,{displayName:"NodeView<image-inline>",group:"ImageInline"});var W=[$,O];export{$ as a,W as b};
