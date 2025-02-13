import{b as Q,c as A}from "./chunk-OMWKF27L.js";import{d as te}from "./chunk-OJSX3Q5S.js";import{A as Y,B as Z,C as P,D as R,E as O,G as V,H as S,I as y,q as J,x as L,y as X}from "./chunk-GMRP4QB5.js";import{Qa as q,Ra as G,pa as W,s as T}from "./chunk-WBJK5ZQV.js";import{D as H,E as ee,m as F,r as D}from "./chunk-4BCIMHJT.js";var ve=Object.defineProperty,ne=Object.getOwnPropertySymbols,we=Object.prototype.hasOwnProperty,ge=Object.prototype.propertyIsEnumerable,se=(s, e, t)=>e in s?ve(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,ye=(s, e)=>{for(var t in e||(e={}))we.call(e,t)&&se(s,t,e[t]);if(ne)for(var t of ne(e))ge.call(e,t)&&se(s,t,e[t]);return s};function ie(s, e){return Object.assign(s,{meta:ye({package:"@milkdown/components"},e)}),s}var Ce={extensions:[],languages:[],expandIcon:()=>"\u2B07",searchIcon:()=>"\u{1F50D}",clearSearchIcon:()=>"\u232B",searchPlaceholder:"Search language",noResultText:"No result",renderLanguage: s=>S`${s}`,renderPreview:()=>null,previewToggleButton: s=>s?"Edit":"Hide",previewLabel:()=>"Preview"},K=G(Ce,"codeBlockConfigCtx");ie(K,{displayName:"Config<code-block>",group:"CodeBlock"});function be(s, e){let t=customElements.get(s);if(t==null){customElements.define(s,e);return}t!==e&&console.warn(`Custom element ${s} has been defined before.`)}var re=Object.getOwnPropertySymbols,$e=Object.prototype.hasOwnProperty,ke=Object.prototype.propertyIsEnumerable,_e=(s, e)=>{var t={};for(var n in s)$e.call(s,n)&&e.indexOf(n)<0&&(t[n]=s[n]);if(s!=null&&re)for(var n of re(s))e.indexOf(n)<0&&ke.call(s,n)&&(t[n]=s[n]);return t},I=class{constructor(e, t, n, o, i){this.node=e,this.view=t,this.getPos=n,this.loader=o,this.config=i,this.updating=!1,this.languageName="",this.forwardUpdate= l=>{var c;if(this.updating||!this.cm.hasFocus)return;let d=((c=this.getPos())!=null?c:0)+1,{main:h}=l.state.selection,u=d+h.from,p=d+h.to,m=this.view.state.selection;if(l.docChanged||m.from!==u||m.to!==p){let w=this.view.state.tr;l.changes.iterChanges((C, k, M, g, b)=>{b.length?w.replaceWith(d+C,d+k,this.view.state.schema.text(b.toString())):w.delete(d+C,d+k),d+=g-M-(k-C)}),w.setSelection(T.create(w.doc,u,p)),this.view.dispatch(w)}},this.codeMirrorKeymap=()=>{let l=this.view;return[{key:"ArrowUp",run:()=>this.maybeEscape("line",-1)},{key:"ArrowLeft",run:()=>this.maybeEscape("char",-1)},{key:"ArrowDown",run:()=>this.maybeEscape("line",1)},{key:"ArrowRight",run:()=>this.maybeEscape("char",1)},{key:"Mod-Enter",run:()=>W(l.state,l.dispatch)?(l.focus(),!0):!1},{key:"Mod-z",run:()=>Q(l.state,l.dispatch)},{key:"Shift-Mod-z",run:()=>A(l.state,l.dispatch)},{key:"Mod-y",run:()=>A(l.state,l.dispatch)},{key:"Backspace",run:()=>{var c;let d=this.cm.state.selection.ranges;if(d.length>1)return!1;let h=d[0];if(h&&(!h.empty||h.anchor>0)||this.cm.state.doc.lines>=2)return!1;let u=this.view.state,p=(c=this.getPos())!=null?c:0,m=u.tr.replaceWith(p,p+this.node.nodeSize,u.schema.nodes.paragraph.createChecked({},this.node.content));return m.setSelection(T.near(m.doc.resolve(p))),this.view.dispatch(m),this.view.focus(),!0}}]},this.maybeEscape=(l, c)=>{var d;let{state:h}=this.cm,u=h.selection.main;if(!u.empty||(l==="line"&&(u=h.doc.lineAt(u.head)),c<0?u.from>0:u.to<h.doc.length))return!1;let p=((d=this.getPos())!=null?d:0)+(c<0?0:this.node.nodeSize),m=T.near(this.view.state.doc.resolve(p),c),w=this.view.state.tr.setSelection(m).scrollIntoView();return this.view.dispatch(w),this.view.focus(),!0},this.setLanguage= l=>{var c;this.view.dispatch(this.view.state.tr.setNodeAttribute((c=this.getPos())!=null?c:0,"language",l))},this.getAllLanguages=()=>this.loader.getAll(),this.languageConf=new F,this.readOnlyConf=new F,this.cm=new H({doc:this.node.textContent,root:this.view.root,extensions:[this.readOnlyConf.of(D.readOnly.of(!this.view.editable)),ee.of(this.codeMirrorKeymap()),this.languageConf.of([]),...i.extensions,H.updateListener.of(this.forwardUpdate)]}),this.dom=this.createDom(),this.updateLanguage()}createDom(){let e=document.createElement("milkdown-code-block");e.codemirror=this.cm,e.getAllLanguages=this.getAllLanguages,e.setLanguage=this.setLanguage,e.isEditorReadonly=()=>!this.view.editable,e.text=this.node.textContent;let t=this.config,n=_e(t,["languages","extensions"]);return e.config=n,e}updateLanguage(){let e=this.node.attrs.language;if(e===this.languageName)return;this.dom.language=e,this.loader.load(e??"").then(n=>{n&&(this.cm.dispatch({effects:this.languageConf.reconfigure(n)}),this.languageName=e)})}setSelection(e, t){this.cm.dom.isConnected&&(this.cm.focus(),this.updating=!0,this.cm.dispatch({selection:{anchor:e,head:t}}),this.updating=!1)}update(e){if(e.type!==this.node.type)return!1;if(this.updating)return!0;this.node=e,this.dom.text=e.textContent,this.updateLanguage(),this.view.editable===this.cm.state.readOnly&&this.cm.dispatch({effects:this.readOnlyConf.reconfigure(D.readOnly.of(!this.view.editable))});let t=xe(this.cm.state.doc.toString(),e.textContent);return t&&(this.updating=!0,this.cm.dispatch({changes:{from:t.from,to:t.to,insert:t.text}}),this.updating=!1),!0}selectNode(){this.dom.selected=!0,this.cm.focus()}deselectNode(){this.dom.selected=!1}stopEvent(){return!0}destroy(){this.cm.destroy()}};function xe(s, e){if(s===e)return null;let t=0,n=s.length,o=e.length;for(; t<n&&s.charCodeAt(t)===e.charCodeAt(t);)++t;for(; n>t&&o>t&&s.charCodeAt(n-1)===e.charCodeAt(o-1);)n--,o--;return{from:t,to:n,text:e.slice(t,o)}}var z=class{constructor(e){this.languages=e,this.map={},e.forEach(t=>{t.alias.forEach(n=>{this.map[n]=t})})}getAll(){return this.languages.map(e=>({name:e.name,alias:e.alias}))}load(e){let n=this.map[e.toLowerCase()];return n?n.support?Promise.resolve(n.support):n.load():Promise.resolve(void 0)}},oe=({selected:s=!1,codemirror:e,getAllLanguages:t,setLanguage:n,language:o,config:i,isEditorReadonly:l,text:c})=>{var d,h,u,p,m;let w=X(),C=L(),k=L(),M=L(),g=L(),[b,B]=R(""),[_,j]=R(!1),[x,le]=R(!1),U=O(()=>w.current.getRootNode(),[w]);P(()=>{var r;let a=(r=t?.())==null?void 0:r.find(f=>f.alias.some(v=>v.toLowerCase()===o?.toLowerCase()));a&&a.name!==o&&n?.(a.name)},[o]),P(()=>{j(!1)},[o]),P(()=>{let r= a=>{let f=a.target;if(C.current&&C.current.contains(f))return;let v=k.current;v&&v.dataset.expanded==="true"&&(v.contains(f)||j(!1))};return U.addEventListener("click",r),()=>{U.removeEventListener("click",r)}},[]),Z(()=>{B("");let r=C.current,a=k.current;!r||!a||te(r,a,{placement:"bottom-start"}).then(({x:f,y:v})=>{Object.assign(a.style,{left:`${f}px`,top:`${v}px`})})},[_]);let N=O(()=>{var r;if(!_)return[];let a=(r=t?.())!=null?r:[],f=a.find(E=>E.name.toLowerCase()===o?.toLowerCase()),v=a.filter(E=>(E.name.toLowerCase().includes(b.toLowerCase())||E.alias.some(me=>me.toLowerCase().includes(b.toLowerCase())))&&E!==f);return v.length===0?[]:f?[f,...v]:v},[b,_,o]),ce= r=>{let a=r.target;B(a.value)},de= r=>{r.preventDefault(),r.stopPropagation(),!l?.()&&j(a=>(a||setTimeout(()=>{var f;return(f=M.current)==null?void 0:f.focus()},0),!a))},ue= r=>{r.preventDefault(),B("")},he= r=>{r.key==="Escape"&&B("")},fe= r=>{if(r.key==="Enter"){let a=document.activeElement;a instanceof HTMLElement&&a.dataset.language&&n?.(a.dataset.language)}},pe=O(()=>N?.length?N.map(r=>{var a;return S`<li
          role="listitem"
          tabindex="0"
          class="language-list-item"
          aria-selected=${r.name.toLowerCase()===o?.toLowerCase()}
          data-language=${r.name}
          onclick=${()=>n?.(r.name)}
        >
          ${(a=i?.renderLanguage)==null?void 0:a.call(i,r.name,r.name.toLowerCase()===o?.toLowerCase())}
        </li>`}):S`<li class="language-list-item no-result">
        ${i?.noResultText}
      </li>`,[N]),$=O(()=>{var r;return(r=i?.renderPreview)==null?void 0:r.call(i,o??"",c??"")},[o,c]);return P(()=>{if(g.current){for(;g.current.firstChild;)g.current.removeChild(g.current.firstChild);typeof $=="string"?g.current.innerHTML=$:$ instanceof HTMLElement&&g.current.appendChild($)}},[$]),S`<host class=${y(s&&"selected")}>
    <div class="tools">
      <button
        type="button"
        ref=${C}
        class="language-button"
        onpointerdown=${de}
        data-expanded=${_}
      >
        ${o||"Text"}
        <div class="expand-icon">${(d=i?.expandIcon)==null?void 0:d.call(i)}</div>
      </button>
      <div
        ref=${k}
        data-expanded=${_}
        class=${y("language-picker",_&&"show")}
      >
        <div class="list-wrapper">
          <div class="search-box">
            <div class="search-icon">${(h=i?.searchIcon)==null?void 0:h.call(i)}</div>
            <input
              ref=${M}
              class="search-input"
              placeholder=${i?.searchPlaceholder}
              value=${b}
              oninput=${ce}
              onkeydown=${he}
            />
            <div
              class=${y("clear-icon",b.length===0&&"hidden")}
              onmousedown=${ue}
            >
              ${(u=i?.clearSearchIcon)==null?void 0:u.call(i)}
            </div>
          </div>
          <ul class="language-list" role="listbox" onkeydown=${fe}>
            ${pe}
          </ul>
        </div>
      </div>
      <button
        class=${y("preview-toggle-button",!$&&"hidden")}
        onclick=${()=>le(!x)}
      >
        ${(p=i?.previewToggleButton)==null?void 0:p.call(i,x)}
      </button>
    </div>
    <div
      class=${y("codemirror-host",$&&x&&"hidden")}
    >
      ${V(e?.dom,{})}
    </div>
    <div class=${y("preview-panel",!$&&"hidden")}>
      <div class=${y("preview-divider",x&&"hidden")}></div>
      <div class=${y("preview-label",x&&"hidden")}>
        ${(m=i?.previewLabel)==null?void 0:m.call(i)}
      </div>
      <div ref=${g} class="preview"></div>
    </div>
  </host>`};oe.props={selected:Boolean,codemirror:Object,language:String,getAllLanguages:Function,setLanguage:Function,isEditorReadonly:Function,config:Object,text:String};var Ee=Y(oe);be("milkdown-code-block",Ee);var ae=q(J.node,s=>{let e=s.get(K.key),t=new z(e.languages);return(n,o,i)=>new I(n,o,i,t,e)});ie(ae,{displayName:"NodeView<code-block>",group:"CodeBlock"});var Ae=[ae,K];export{K as a,Ae as b};
