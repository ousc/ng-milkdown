import{A,C as B,D as k,E as Y,H as x,I as $,x as E,y as z}from "./chunk-GMRP4QB5.js";import{C as F,Qa as M,Ra as H,Sa as j,Xa as V,_ as S}from "./chunk-WBJK5ZQV.js";var oe=Object.defineProperty,G=Object.getOwnPropertySymbols,ae=Object.prototype.hasOwnProperty,ie=Object.prototype.propertyIsEnumerable,K=(e, t, n)=>t in e?oe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,le=(e, t)=>{for(var n in t||(t={}))ae.call(t,n)&&K(e,n,t[n]);if(G)for(var n of G(t))ie.call(t,n)&&K(e,n,t[n]);return e};function _(e, t){return Object.assign(e,{meta:le({package:"@milkdown/components"},t)}),e}var se=Object.defineProperty,W=Object.getOwnPropertySymbols,ce=Object.prototype.hasOwnProperty,ue=Object.prototype.propertyIsEnumerable,q=(e, t, n)=>t in e?se(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,de=(e, t)=>{for(var n in t||(t={}))ce.call(t,n)&&q(e,n,t[n]);if(W)for(var n of W(t))ue.call(t,n)&&q(e,n,t[n]);return e},C="image-block",L=j("image-block",()=>({inline:!1,group:"block",selectable:!0,draggable:!0,isolating:!0,marks:"",atom:!0,priority:100,attrs:{src:{default:""},caption:{default:""},ratio:{default:1}},parseDOM:[{tag:`img[data-type="${C}"]`,getAttrs: e=>{var t;if(!(e instanceof HTMLElement))throw F(e);return{src:e.getAttribute("src")||"",caption:e.getAttribute("caption")||"",ratio:Number((t=e.getAttribute("ratio"))!=null?t:1)}}}],toDOM: e=>["img",de({"data-type":C},e.attrs)],parseMarkdown:{match:({type:e})=>e==="image-block",runner:(e, t, n)=>{let u=t.url,a=t.title,i=Number(t.alt||1);(Number.isNaN(i)||i===0)&&(i=1),e.addNode(n,{src:u,caption:a,ratio:i})}},toMarkdown:{match: e=>e.type.name==="image-block",runner:(e, t)=>{e.openNode("paragraph"),e.addNode("image",void 0,void 0,{title:t.attrs.caption,url:t.attrs.src,alt:`${Number.parseFloat(t.attrs.ratio).toFixed(2)}`}),e.closeNode()}}}));_(L.node,{displayName:"NodeSchema<image-block>",group:"ImageBlock"});function pe(e){return S(e,"paragraph",(t, n, u)=>{var a,i;if(((a=t.children)==null?void 0:a.length)!==1)return;let o=(i=t.children)==null?void 0:i[0];if(!o||o.type!=="image")return;let{url:s,alt:r,title:c}=o,d={type:"image-block",url:s,alt:r,title:c};u.children.splice(n,1,d)})}var O=V("remark-image-block",()=>()=>pe);_(O.plugin,{displayName:"Remark<remarkImageBlock>",group:"ImageBlock"});_(O.options,{displayName:"RemarkConfig<remarkImageBlock>",group:"ImageBlock"});var me={imageIcon:()=>"\u{1F30C}",captionIcon:()=>"\u{1F4AC}",uploadButton:()=>x`Upload file`,confirmButton:()=>x`Confirm ⏎`,uploadPlaceholderText:"or paste the image link ...",captionPlaceholderText:"Image caption",onUpload: e=>Promise.resolve(URL.createObjectURL(e))},R=H(me,"imageBlockConfigCtx");_(R,{displayName:"Config<image-block>",group:"ImageBlock"});function fe(e, t){let n=customElements.get(e);if(n==null){customElements.define(e,t);return}n!==t&&console.warn(`Custom element ${e} has been defined before.`)}function ge({image:e,resizeHandle:t,ratio:n,setRatio:u,src:a}){let i=z(),o=Y(()=>i.current.getRootNode(),[i]);B(()=>{let s=e.current;s&&(delete s.dataset.origin,delete s.dataset.height,s.style.height="")},[a]),B(()=>{let s=t.current,r=e.current;if(!s||!r)return;let c= p=>{p.preventDefault();let m=r.getBoundingClientRect().top,f=p.clientY-m,v=Number(f<100?100:f).toFixed(2);r.dataset.height=v,r.style.height=`${v}px`},d=()=>{o.removeEventListener("pointermove",c),o.removeEventListener("pointerup",d);let p=Number(r.dataset.origin),m=Number(r.dataset.height),f=Number.parseFloat(Number(m/p).toFixed(2));Number.isNaN(f)||u(f)},y= p=>{p.preventDefault(),o.addEventListener("pointermove",c),o.addEventListener("pointerup",d)},N= p=>{let m=i.current.getBoundingClientRect().width;if(!m)return;let f=p.target,v=f.height,w=f.width,I=w<m?v:m*(v/w),P=(I*n).toFixed(2);r.dataset.origin=I.toFixed(2),r.dataset.height=P,r.style.height=`${P}px`};return r.addEventListener("load",N),s.addEventListener("pointerdown",y),()=>{r.removeEventListener("load",N),s.removeEventListener("pointerdown",y)}},[])}var he=(e, t, n)=>new Promise((u, a)=>{var i= r=>{try{s(n.next(r))}catch(c){a(c)}},o= r=>{try{s(n.throw(r))}catch(c){a(c)}},s= r=>r.done?u(r.value):Promise.resolve(r.value).then(i,o);s((n=n.apply(e,t)).next())}),b=0,J=({src:e="",caption:t="",ratio:n=1,selected:u=!1,readonly:a=!1,setAttr:i,config:o})=>{let s=E(),r=E(),c=E(),[d,y]=k(t.length>0),[N,p]=k(e.length!==0),[m]=k(crypto.randomUUID()),[f,v]=k(!1),[w,I]=k(e);ge({image:s,resizeHandle:r,ratio:n,setRatio: l=>i?.("ratio",l),src:e}),B(()=>{u||y(t.length>0)},[u]);let P= l=>{let h=l.target.value;b&&window.clearTimeout(b),b=window.setTimeout(()=>{i?.("caption",h)},1e3)},X= l=>{let h=l.target.value;b&&(window.clearTimeout(b),b=0),i?.("caption",h)},Z= l=>{let h=l.target.value;p(h.length!==0),I(h)},ee= l=>he(void 0,null,function*(){var g;let h=(g=l.target.files)==null?void 0:g[0];if(!h)return;let U=yield o?.onUpload(h);U&&(i?.("src",U),p(!0))}),te= l=>{l.preventDefault(),l.stopPropagation(),!a&&y(g=>!g)},D=()=>{var l,g;i?.("src",(g=(l=c.current)==null?void 0:l.value)!=null?g:"")},ne= l=>{l.key==="Enter"&&D()},T= l=>{l.preventDefault(),l.stopPropagation()},re= l=>{l.stopPropagation(),l.preventDefault()};return x`<host class=${$(u&&"selected")}>
    <div class=${$("image-edit",e.length>0&&"hidden")}>
      <div class="image-icon">${o?.imageIcon()}</div>
      <div class=${$("link-importer",f&&"focus")}>
        <input
          ref=${c}
          draggable="true"
          ondragstart=${T}
          disabled=${a}
          class="link-input-area"
          value=${w}
          oninput=${Z}
          onkeydown=${ne}
          onfocus=${()=>v(!0)}
          onblur=${()=>v(!1)}
        />
        <div class=${$("placeholder",N&&"hidden")}>
          <input
            disabled=${a}
            class="hidden"
            id=${m}
            type="file"
            accept="image/*"
            onchange=${ee}
          />
          <label onpointerdown=${re} class="uploader" for=${m}>
            ${o?.uploadButton()}
          </label>
          <span class="text" onclick=${()=>{var l;return(l=c.current)==null?void 0:l.focus()}}>
            ${o?.uploadPlaceholderText}
          </span>
        </div>
      </div>
      <div
        class=${$("confirm",w.length===0&&"hidden")}
        onclick=${()=>D()}
      >
        ${o?.confirmButton()}
      </div>
    </div>
    <div class=${$("image-wrapper",e.length===0&&"hidden")}>
      <div class="operation">
        <div class="operation-item" onpointerdown=${te}>
          ${o?.captionIcon()}
        </div>
      </div>
      <img
        ref=${s}
        data-type=${C}
        src=${e}
        alt=${t}
        ratio=${n}
      />
      <div ref=${r} class="image-resize-handle"></div>
    </div>
    <input
      draggable="true"
      ondragstart=${T}
      class=${$("caption-input",!d&&"hidden")}
      placeholder=${o?.captionPlaceholderText}
      oninput=${P}
      onblur=${X}
      value=${t}
    />
  </host>`};J.props={src:String,caption:String,ratio:Number,selected:Boolean,readonly:Boolean,setAttr:Function,config:Object};var ve=A(J);fe("milkdown-image-block",ve);var Q=M(L.node,e=>(t,n,u)=>{let a=document.createElement("milkdown-image-block"),i=e.get(R.key),o=i.proxyDomURL,s=r=>{if(!o)a.src=r.attrs.src;else{let c=o(r.attrs.src);typeof c=="string"?a.src=c:c.then(d=>{a.src=d})}a.ratio=r.attrs.ratio,a.caption=r.attrs.caption,a.readonly=!n.editable};return s(t),a.selected=!1,a.setAttr=(r,c)=>{let d=u();d!=null&&n.dispatch(n.state.tr.setNodeAttribute(d,r,c))},a.config=i,{dom:a,update:r=>r.type!==t.type?!1:(s(r),!0),stopEvent:r=>r.target instanceof HTMLInputElement,selectNode:()=>{a.selected=!0},deselectNode:()=>{a.selected=!1},destroy:()=>{a.remove()}}});_(Q,{displayName:"NodeView<image-block>",group:"ImageBlock"});var _e=[O,L,Q,R].flat();export{L as a,R as b,_e as c};
