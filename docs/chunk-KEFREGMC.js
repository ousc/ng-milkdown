import{d as N}from "./chunk-GAL4ENT6.js";var Q=N((V, k)=>{"use strict";var W="Expected a function",S=NaN,$="[object Symbol]",A=/^\s+|\s+$/g,B=/^[-+]0x[0-9a-f]+$/i,F=/^0b[01]+$/i,R=/^0o[0-7]+$/i,P=parseInt,_=typeof global=="object"&&global&&global.Object===Object&&global,D=typeof self=="object"&&self&&self.Object===Object&&self,G=_||D||Function("return this")(),H=Object.prototype,U=H.toString,X=Math.max,q=Math.min,j=function(){return G.Date.now()};function z(e, t, i){var a,u,b,c,r,o,s=0,v=!1,l=!1,g=!0;if(typeof e!="function")throw new TypeError(W);t=h(t)||0,T(i)&&(v=!!i.leading,l="maxWait"in i,b=l?X(h(i.maxWait)||0,t):b,g="trailing"in i?!!i.trailing:g);function y(n){var f=a,d=u;return a=u=void 0,s=n,c=e.apply(d,f),c}function E(n){return s=n,r=setTimeout(m,t),v?y(n):c}function L(n){var f=n-o,d=n-s,O=t-f;return l?q(O,b-d):O}function x(n){var f=n-o,d=n-s;return o===void 0||f>=t||f<0||l&&d>=b}function m(){var n=j();if(x(n))return I(n);r=setTimeout(m,L(n))}function I(n){return r=void 0,g&&a?y(n):(a=u=void 0,c)}function C(){r!==void 0&&clearTimeout(r),s=0,a=o=u=r=void 0}function M(){return r===void 0?c:I(j())}function p(){var n=j(),f=x(n);if(a=arguments,u=this,o=n,f){if(r===void 0)return E(o);if(l)return r=setTimeout(m,t),y(o)}return r===void 0&&(r=setTimeout(m,t)),c}return p.cancel=C,p.flush=M,p}function T(e){var t=typeof e;return!!e&&(t=="object"||t=="function")}function J(e){return!!e&&typeof e=="object"}function K(e){return typeof e=="symbol"||J(e)&&U.call(e)==$}function h(e){if(typeof e=="number")return e;if(K(e))return S;if(T(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=T(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=e.replace(A,"");var i=F.test(e);return i||R.test(e)?P(e.slice(2),i?2:8):B.test(e)?S:+e}k.exports=z});export{Q as a};
