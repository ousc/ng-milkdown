import{c as q,d as te}from "./chunk-7CCCAFTG.js";import{f as v,g as ae,h as le,i as re,j as ne}from "./chunk-QWDMSHLD.js";import{b as V,c as J,d as ee}from "./chunk-WFNBYWYP.js";import{F as H,N as K,h as I,j,k as S,p as U,q as _,s as L,z as F}from "./chunk-7ALHBK5C.js";import{D as G,i as N}from "./chunk-4BCIMHJT.js";var Me=54,Re=1,Ee=55,Ze=2,Be=56,ze=3,se=4,We=5,X=6,me=7,fe=8,Se=9,ge=10,De=11,Ne=12,Ge=13,C=57,Ie=14,oe=58,he=20,je=22,be=23,Ue=24,A=26,xe=27,Le=28,Fe=31,He=34,Ke=36,Je=37,et=0,tt=1,at={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},lt={dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},ue={dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}};function rt(e){return e==45||e==46||e==58||e>=65&&e<=90||e==95||e>=97&&e<=122||e>=161}function Pe(e){return e==9||e==10||e==13||e==32}var Oe=null,ie=null,ce=0;function Y(e, l){let r=e.pos+l;if(ce==r&&ie==e)return Oe;let a=e.peek(l);for(; Pe(a);)a=e.peek(++l);let t="";for(; rt(a);)t+=String.fromCharCode(a),a=e.peek(++l);return ie=e,ce=r,Oe=t?t.toLowerCase():a==nt||a==st?void 0:null}var Te=60,k=62,M=47,nt=63,st=33,ot=45;function de(e, l){this.name=e,this.parent=l}var ut=[X,ge,me,fe,Se],Ot=new J({start:null,shift(e, l, r, a){return ut.indexOf(l)>-1?new de(Y(a,1)||"",e):e},reduce(e, l){return l==he&&e?e.parent:e},reuse(e, l, r, a){let t=l.type.id;return t==X||t==Ke?new de(Y(a,1)||"",e):e},strict:!1}),it=new V((e, l)=>{if(e.next!=Te){e.next<0&&l.context&&e.acceptToken(C);return}e.advance();let r=e.next==M;r&&e.advance();let a=Y(e,0);if(a===void 0)return;if(!a)return e.acceptToken(r?Ie:X);let t=l.context?l.context.name:null;if(r){if(a==t)return e.acceptToken(De);if(t&&lt[t])return e.acceptToken(C,-2);if(l.dialectEnabled(et))return e.acceptToken(Ne);for(let s=l.context; s; s=s.parent)if(s.name==a)return;e.acceptToken(Ge)}else{if(a=="script")return e.acceptToken(me);if(a=="style")return e.acceptToken(fe);if(a=="textarea")return e.acceptToken(Se);if(at.hasOwnProperty(a))return e.acceptToken(ge);t&&ue[t]&&ue[t][a]?e.acceptToken(C,-1):e.acceptToken(X)}},{contextual:!0}),ct=new V(e=>{for(let l=0,r=0;; r++){if(e.next<0){r&&e.acceptToken(oe);break}if(e.next==ot)l++;else if(e.next==k&&l>=2){r>=3&&e.acceptToken(oe,-2);break}else l=0;e.advance()}});function dt(e){for(; e; e=e.parent)if(e.name=="svg"||e.name=="math")return!0;return!1}var pt=new V((e, l)=>{if(e.next==M&&e.peek(1)==k){let r=l.dialectEnabled(tt)||dt(l.context);e.acceptToken(r?We:se,2)}else e.next==k&&e.acceptToken(se,1)});function R(e, l, r){let a=2+e.length;return new V(t=>{for(let s=0,o=0,u=0;; u++){if(t.next<0){u&&t.acceptToken(l);break}if(s==0&&t.next==Te||s==1&&t.next==M||s>=2&&s<a&&t.next==e.charCodeAt(s-2))s++,o++;else if((s==2||s==a)&&Pe(t.next))o++;else if(s==a&&t.next==k){u>o?t.acceptToken(l,-o):t.acceptToken(r,-(o-2));break}else if((t.next==10||t.next==13)&&u){t.acceptToken(l,1);break}else s=o=0;t.advance()}})}var mt=R("script",Me,Re),ft=R("style",Ee,Ze),St=R("textarea",Be,ze),gt=j({"Text RawText":S.content,"StartTag StartCloseTag SelfClosingEndTag EndTag":S.angleBracket,TagName:S.tagName,"MismatchedCloseTag/TagName":[S.tagName,S.invalid],AttributeName:S.attributeName,"AttributeValue UnquotedAttributeValue":S.attributeValue,Is:S.definitionOperator,"EntityReference CharacterReference":S.character,Comment:S.blockComment,ProcessingInst:S.processingInstruction,DoctypeDecl:S.documentMeta}),Ve=ee.deserialize({version:14,states:",xOVO!rOOO!WQ#tO'#CqO!]Q#tO'#CzO!bQ#tO'#C}O!gQ#tO'#DQO!lQ#tO'#DSO!qOaO'#CpO!|ObO'#CpO#XOdO'#CpO$eO!rO'#CpOOO`'#Cp'#CpO$lO$fO'#DTO$tQ#tO'#DVO$yQ#tO'#DWOOO`'#Dk'#DkOOO`'#DY'#DYQVO!rOOO%OQ&rO,59]O%ZQ&rO,59fO%fQ&rO,59iO%qQ&rO,59lO%|Q&rO,59nOOOa'#D^'#D^O&XOaO'#CxO&dOaO,59[OOOb'#D_'#D_O&lObO'#C{O&wObO,59[OOOd'#D`'#D`O'POdO'#DOO'[OdO,59[OOO`'#Da'#DaO'dO!rO,59[O'kQ#tO'#DROOO`,59[,59[OOOp'#Db'#DbO'pO$fO,59oOOO`,59o,59oO'xQ#|O,59qO'}Q#|O,59rOOO`-E7W-E7WO(SQ&rO'#CsOOQW'#DZ'#DZO(bQ&rO1G.wOOOa1G.w1G.wOOO`1G/Y1G/YO(mQ&rO1G/QOOOb1G/Q1G/QO(xQ&rO1G/TOOOd1G/T1G/TO)TQ&rO1G/WOOO`1G/W1G/WO)`Q&rO1G/YOOOa-E7[-E7[O)kQ#tO'#CyOOO`1G.v1G.vOOOb-E7]-E7]O)pQ#tO'#C|OOOd-E7^-E7^O)uQ#tO'#DPOOO`-E7_-E7_O)zQ#|O,59mOOOp-E7`-E7`OOO`1G/Z1G/ZOOO`1G/]1G/]OOO`1G/^1G/^O*PQ,UO,59_OOQW-E7X-E7XOOOa7+$c7+$cOOO`7+$t7+$tOOOb7+$l7+$lOOOd7+$o7+$oOOO`7+$r7+$rO*[Q#|O,59eO*aQ#|O,59hO*fQ#|O,59kOOO`1G/X1G/XO*kO7[O'#CvO*|OMhO'#CvOOQW1G.y1G.yOOO`1G/P1G/POOO`1G/S1G/SOOO`1G/V1G/VOOOO'#D['#D[O+_O7[O,59bOOQW,59b,59bOOOO'#D]'#D]O+pOMhO,59bOOOO-E7Y-E7YOOQW1G.|1G.|OOOO-E7Z-E7Z",stateData:",]~O!^OS~OUSOVPOWQOXROYTO[]O][O^^O`^Oa^Ob^Oc^Ox^O{_O!dZO~OfaO~OfbO~OfcO~OfdO~OfeO~O!WfOPlP!ZlP~O!XiOQoP!ZoP~O!YlORrP!ZrP~OUSOVPOWQOXROYTOZqO[]O][O^^O`^Oa^Ob^Oc^Ox^O!dZO~O!ZrO~P#dO![sO!euO~OfvO~OfwO~OS|OT}OhyO~OS!POT}OhyO~OS!ROT}OhyO~OS!TOT}OhyO~OS}OT}OhyO~O!WfOPlX!ZlX~OP!WO!Z!XO~O!XiOQoX!ZoX~OQ!ZO!Z!XO~O!YlORrX!ZrX~OR!]O!Z!XO~O!Z!XO~P#dOf!_O~O![sO!e!aO~OS!bO~OS!cO~Oi!dOSgXTgXhgX~OS!fOT!gOhyO~OS!hOT!gOhyO~OS!iOT!gOhyO~OS!jOT!gOhyO~OS!gOT!gOhyO~Of!kO~Of!lO~Of!mO~OS!nO~Ok!qO!`!oO!b!pO~OS!rO~OS!sO~OS!tO~Oa!uOb!uOc!uO!`!wO!a!uO~Oa!xOb!xOc!xO!b!wO!c!xO~Oa!uOb!uOc!uO!`!{O!a!uO~Oa!xOb!xOc!xO!b!{O!c!xO~OT~bac!dx{!d~",goto:"%p!`PPPPPPPPPPPPPPPPPPPP!a!gP!mPP!yP!|#P#S#Y#]#`#f#i#l#r#x!aP!a!aP$O$U$l$r$x%O%U%[%bPPPPPPPP%hX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",nodeNames:"\u26A0 StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",maxTerm:67,context:Ot,nodeProps:[["closedBy",-10,1,2,3,7,8,9,10,11,12,13,"EndTag",6,"EndTag SelfClosingEndTag",-4,21,30,33,36,"CloseTag"],["openedBy",4,"StartTag StartCloseTag",5,"StartTag",-4,29,32,35,37,"OpenTag"],["group",-9,14,17,18,19,20,39,40,41,42,"Entity",16,"Entity TextContent",-3,28,31,34,"TextContent Entity"],["isolate",-11,21,29,30,32,33,35,36,37,38,41,42,"ltr",-3,26,27,39,""]],propSources:[gt],skippedNodes:[0],repeatNodeCount:9,tokenData:"!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|c`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bX`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UV`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pT`POv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!cpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({W`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!a`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!a`!cpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYkWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]``P!a`!cp!^^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebhSkWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXhSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vchS`P!a`!cpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!`h`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WihSkWc!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zbkWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOa!R!R7tP;=`<%l7S!Z8OYkWa!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{ihSkWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbhSkWa!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QchSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXhSa!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TakWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOb!R!RAwP;=`<%lAY!ZBRYkWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbhSkWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbhSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXhSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!bx`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYlhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_khS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_X`P!a`!cp!eQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZhSfQ`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!a`!cpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!a`!cp!dPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!a`!cpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!a`!cpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!a`!cpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!a`!cpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!a`!cpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!a`!cpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!a`!cpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!cpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO{PP!-nP;=`<%l!-Sq!-xS!cp{POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!a`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!a`{POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!a`!cp{POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!a`!cpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!a`!cpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!a`!cpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!a`!cpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!a`!cpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!a`!cpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!cpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOxPP!7TP;=`<%l!6Vq!7]V!cpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!cpxPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!a`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!a`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!a`xPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!a`!cpxPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXiS`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",tokenizers:[mt,ft,St,pt,it,ct,0,1,2,3,4,5],topRules:{Document:[0,15]},dialects:{noMatch:0,selfClosing:509},tokenPrec:511});function we(e, l){let r=Object.create(null);for(let a of e.getChildren(be)){let t=a.getChild(Ue),s=a.getChild(A)||a.getChild(xe);t&&(r[l.read(t.from,t.to)]=s?s.type.id==A?l.read(s.from+1,s.to-1):l.read(s.from,s.to):"")}return r}function pe(e, l){let r=e.getChild(je);return r?l.read(r.from,r.to):" "}function Q(e, l, r){let a;for(let t of r)if(!t.attrs||t.attrs(a||(a=we(e.node.parent.firstChild,l))))return{parser:t.parser};return null}function E(e=[], l=[]){let r=[],a=[],t=[],s=[];for(let u of e)(u.tag=="script"?r:u.tag=="style"?a:u.tag=="textarea"?t:s).push(u);let o=l.length?Object.create(null):null;for(let u of l)(o[u.name]||(o[u.name]=[])).push(u);return I((u, O)=>{let f=u.type.id;if(f==Le)return Q(u,O,r);if(f==Fe)return Q(u,O,a);if(f==He)return Q(u,O,t);if(f==he&&s.length){let p=u.node,c=p.firstChild,m=c&&pe(c,O),i;if(m){for(let d of s)if(d.tag==m&&(!d.attrs||d.attrs(i||(i=we(c,O))))){let h=p.lastChild,b=h.type.id==Je?h.from:p.to;if(b>c.to)return{parser:d.parser,overlay:[{from:c.to,to:b}]}}}}if(o&&f==be){let p=u.node,c;if(c=p.firstChild){let m=o[O.read(c.from,c.to)];if(m)for(let i of m){if(i.tagName&&i.tagName!=pe(p.parent,O))continue;let d=p.lastChild;if(d.type.id==A){let h=d.from+1,b=d.lastChild,x=d.to-(b&&b.isError?0:1);if(x>h)return{parser:i.parser,overlay:[{from:h,to:x}]}}else if(d.type.id==xe)return{parser:i.parser,overlay:[{from:d.from,to:d.to}]}}}}return null})}var w=["_blank","_self","_top","_parent"],Z=["ascii","utf-8","utf-16","latin1","latin1"],B=["get","post","put","delete"],z=["application/x-www-form-urlencoded","multipart/form-data","text/plain"],g=["true","false"],n={},ht={a:{attrs:{href:null,ping:null,type:null,media:null,target:w,hreflang:null}},abbr:n,address:n,area:{attrs:{alt:null,coords:null,href:null,target:null,ping:null,media:null,hreflang:null,type:null,shape:["default","rect","circle","poly"]}},article:n,aside:n,audio:{attrs:{src:null,mediagroup:null,crossorigin:["anonymous","use-credentials"],preload:["none","metadata","auto"],autoplay:["autoplay"],loop:["loop"],controls:["controls"]}},b:n,base:{attrs:{href:null,target:w}},bdi:n,bdo:n,blockquote:{attrs:{cite:null}},body:n,br:n,button:{attrs:{form:null,formaction:null,name:null,value:null,autofocus:["autofocus"],disabled:["autofocus"],formenctype:z,formmethod:B,formnovalidate:["novalidate"],formtarget:w,type:["submit","reset","button"]}},canvas:{attrs:{width:null,height:null}},caption:n,center:n,cite:n,code:n,col:{attrs:{span:null}},colgroup:{attrs:{span:null}},command:{attrs:{type:["command","checkbox","radio"],label:null,icon:null,radiogroup:null,command:null,title:null,disabled:["disabled"],checked:["checked"]}},data:{attrs:{value:null}},datagrid:{attrs:{disabled:["disabled"],multiple:["multiple"]}},datalist:{attrs:{data:null}},dd:n,del:{attrs:{cite:null,datetime:null}},details:{attrs:{open:["open"]}},dfn:n,div:n,dl:n,dt:n,em:n,embed:{attrs:{src:null,type:null,width:null,height:null}},eventsource:{attrs:{src:null}},fieldset:{attrs:{disabled:["disabled"],form:null,name:null}},figcaption:n,figure:n,footer:n,form:{attrs:{action:null,name:null,"accept-charset":Z,autocomplete:["on","off"],enctype:z,method:B,novalidate:["novalidate"],target:w}},h1:n,h2:n,h3:n,h4:n,h5:n,h6:n,head:{children:["title","base","link","style","meta","script","noscript","command"]},header:n,hgroup:n,hr:n,html:{attrs:{manifest:null}},i:n,iframe:{attrs:{src:null,srcdoc:null,name:null,width:null,height:null,sandbox:["allow-top-navigation","allow-same-origin","allow-forms","allow-scripts"],seamless:["seamless"]}},img:{attrs:{alt:null,src:null,ismap:null,usemap:null,width:null,height:null,crossorigin:["anonymous","use-credentials"]}},input:{attrs:{alt:null,dirname:null,form:null,formaction:null,height:null,list:null,max:null,maxlength:null,min:null,name:null,pattern:null,placeholder:null,size:null,src:null,step:null,value:null,width:null,accept:["audio/*","video/*","image/*"],autocomplete:["on","off"],autofocus:["autofocus"],checked:["checked"],disabled:["disabled"],formenctype:z,formmethod:B,formnovalidate:["novalidate"],formtarget:w,multiple:["multiple"],readonly:["readonly"],required:["required"],type:["hidden","text","search","tel","url","email","password","datetime","date","month","week","time","datetime-local","number","range","color","checkbox","radio","file","submit","image","reset","button"]}},ins:{attrs:{cite:null,datetime:null}},kbd:n,keygen:{attrs:{challenge:null,form:null,name:null,autofocus:["autofocus"],disabled:["disabled"],keytype:["RSA"]}},label:{attrs:{for:null,form:null}},legend:n,li:{attrs:{value:null}},link:{attrs:{href:null,type:null,hreflang:null,media:null,sizes:["all","16x16","16x16 32x32","16x16 32x32 64x64"]}},map:{attrs:{name:null}},mark:n,menu:{attrs:{label:null,type:["list","context","toolbar"]}},meta:{attrs:{content:null,charset:Z,name:["viewport","application-name","author","description","generator","keywords"],"http-equiv":["content-language","content-type","default-style","refresh"]}},meter:{attrs:{value:null,min:null,low:null,high:null,max:null,optimum:null}},nav:n,noscript:n,object:{attrs:{data:null,type:null,name:null,usemap:null,form:null,width:null,height:null,typemustmatch:["typemustmatch"]}},ol:{attrs:{reversed:["reversed"],start:null,type:["1","a","A","i","I"]},children:["li","script","template","ul","ol"]},optgroup:{attrs:{disabled:["disabled"],label:null}},option:{attrs:{disabled:["disabled"],label:null,selected:["selected"],value:null}},output:{attrs:{for:null,form:null,name:null}},p:n,param:{attrs:{name:null,value:null}},pre:n,progress:{attrs:{value:null,max:null}},q:{attrs:{cite:null}},rp:n,rt:n,ruby:n,samp:n,script:{attrs:{type:["text/javascript"],src:null,async:["async"],defer:["defer"],charset:Z}},section:n,select:{attrs:{form:null,name:null,size:null,autofocus:["autofocus"],disabled:["disabled"],multiple:["multiple"]}},slot:{attrs:{name:null}},small:n,source:{attrs:{src:null,type:null,media:null}},span:n,strong:n,style:{attrs:{type:["text/css"],media:null,scoped:null}},sub:n,summary:n,sup:n,table:n,tbody:n,td:{attrs:{colspan:null,rowspan:null,headers:null}},template:n,textarea:{attrs:{dirname:null,form:null,maxlength:null,name:null,placeholder:null,rows:null,cols:null,autofocus:["autofocus"],disabled:["disabled"],readonly:["readonly"],required:["required"],wrap:["soft","hard"]}},tfoot:n,th:{attrs:{colspan:null,rowspan:null,headers:null,scope:["row","col","rowgroup","colgroup"]}},thead:n,time:{attrs:{datetime:null}},title:n,tr:n,track:{attrs:{src:null,label:null,default:null,kind:["subtitles","captions","descriptions","chapters","metadata"],srclang:null}},ul:{children:["li","script","template","ul","ol"]},var:n,video:{attrs:{src:null,poster:null,width:null,height:null,crossorigin:["anonymous","use-credentials"],preload:["auto","metadata","none"],autoplay:["autoplay"],mediagroup:["movie"],muted:["muted"],controls:["controls"]}},wbr:n},ke={accesskey:null,class:null,contenteditable:g,contextmenu:null,dir:["ltr","rtl","auto"],draggable:["true","false","auto"],dropzone:["copy","move","link","string:","file:"],hidden:["hidden"],id:null,inert:["inert"],itemid:null,itemprop:null,itemref:null,itemscope:["itemscope"],itemtype:null,lang:["ar","bn","de","en-GB","en-US","es","fr","hi","id","ja","pa","pt","ru","tr","zh"],spellcheck:g,autocorrect:g,autocapitalize:g,style:null,tabindex:null,title:null,translate:["yes","no"],rel:["stylesheet","alternate","author","bookmark","help","license","next","nofollow","noreferrer","prefetch","prev","search","tag"],role:"alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "),"aria-activedescendant":null,"aria-atomic":g,"aria-autocomplete":["inline","list","both","none"],"aria-busy":g,"aria-checked":["true","false","mixed","undefined"],"aria-controls":null,"aria-describedby":null,"aria-disabled":g,"aria-dropeffect":null,"aria-expanded":["true","false","undefined"],"aria-flowto":null,"aria-grabbed":["true","false","undefined"],"aria-haspopup":g,"aria-hidden":g,"aria-invalid":["true","false","grammar","spelling"],"aria-label":null,"aria-labelledby":null,"aria-level":null,"aria-live":["off","polite","assertive"],"aria-multiline":g,"aria-multiselectable":g,"aria-owns":null,"aria-posinset":null,"aria-pressed":["true","false","mixed","undefined"],"aria-readonly":g,"aria-relevant":null,"aria-required":g,"aria-selected":["true","false","undefined"],"aria-setsize":null,"aria-sort":["ascending","descending","none","other"],"aria-valuemax":null,"aria-valuemin":null,"aria-valuenow":null,"aria-valuetext":null},$e="beforeunload copy cut dragstart dragover dragleave dragenter dragend drag paste focus blur change click load mousedown mouseenter mouseleave mouseup keydown keyup resize scroll unload".split(" ").map(e=>"on"+e);for(let e of $e)ke[e]=null;var W=(()=>{class e{constructor(r, a){this.tags=Object.assign(Object.assign({},ht),r),this.globalAttrs=Object.assign(Object.assign({},ke),a),this.allTags=Object.keys(this.tags),this.globalAttrNames=Object.keys(this.globalAttrs)}}return e.default=new e,e})();function P(e, l, r=e.length){if(!l)return"";let a=l.firstChild,t=a&&a.getChild("TagName");return t?e.sliceString(t.from,Math.min(t.to,r)):""}function T(e, l=!1){for(; e; e=e.parent)if(e.name=="Element")if(l)l=!1;else return e;return null}function _e(e, l, r){let a=r.tags[P(e,T(l))];return a?.children||r.allTags}function D(e, l){let r=[];for(let a=T(l); a&&!a.type.isTop; a=T(a.parent)){let t=P(e,a);if(t&&a.lastChild.name=="CloseTag")break;t&&r.indexOf(t)<0&&(l.name=="EndTag"||l.from>=a.firstChild.to)&&r.push(t)}return r}var qe=/^[:\-\.\w\u00b7-\uffff]*$/;function ye(e, l, r, a, t){let s=/\s*>/.test(e.sliceDoc(t,t+5))?"":">",o=T(r,!0);return{from:a,to:t,options:_e(e.doc,o,l).map(u=>({label:u,type:"type"})).concat(D(e.doc,r).map((u, O)=>({label:"/"+u,apply:"/"+u+s,type:"type",boost:99-O}))),validFor:/^\/?[:\-\.\w\u00b7-\uffff]*$/}}function ve(e, l, r, a){let t=/\s*>/.test(e.sliceDoc(a,a+5))?"":">";return{from:r,to:a,options:D(e.doc,l).map((s, o)=>({label:s,apply:s+t,type:"type",boost:99-o})),validFor:qe}}function bt(e, l, r, a){let t=[],s=0;for(let o of _e(e.doc,r,l))t.push({label:"<"+o,type:"type"});for(let o of D(e.doc,r))t.push({label:"</"+o+">",type:"type",boost:99-s++});return{from:a,to:a,options:t,validFor:/^<\/?[:\-\.\w\u00b7-\uffff]*$/}}function xt(e, l, r, a, t){let s=T(r),o=s?l.tags[P(e.doc,s)]:null,u=o&&o.attrs?Object.keys(o.attrs):[],O=o&&o.globalAttrs===!1?u:u.length?u.concat(l.globalAttrNames):l.globalAttrNames;return{from:a,to:t,options:O.map(f=>({label:f,type:"property"})),validFor:qe}}function Pt(e, l, r, a, t){var s;let o=(s=r.parent)===null||s===void 0?void 0:s.getChild("AttributeName"),u=[],O;if(o){let f=e.sliceDoc(o.from,o.to),p=l.globalAttrs[f];if(!p){let c=T(r),m=c?l.tags[P(e.doc,c)]:null;p=m?.attrs&&m.attrs[f]}if(p){let c=e.sliceDoc(a,t).toLowerCase(),m='"',i='"';/^['"]/.test(c)?(O=c[0]=='"'?/^[^"]*$/:/^[^']*$/,m="",i=e.sliceDoc(t,t+1)==c[0]?"":c[0],c=c.slice(1),a++):O=/^[^\s<>='"]*$/;for(let d of p)u.push({label:d,apply:m+d+i,type:"constant"})}}return{from:a,to:t,options:u,validFor:O}}function Ce(e, l){let{state:r,pos:a}=l,t=_(r).resolveInner(a,-1),s=t.resolve(a);for(let o=a,u; s==t&&(u=t.childBefore(o));){let O=u.lastChild;if(!O||!O.type.isError||O.from<O.to)break;s=t=u,o=O.from}return t.name=="TagName"?t.parent&&/CloseTag$/.test(t.parent.name)?ve(r,t,t.from,a):ye(r,e,t,t.from,a):t.name=="StartTag"?ye(r,e,t,a,a):t.name=="StartCloseTag"||t.name=="IncompleteCloseTag"?ve(r,t,a,a):t.name=="OpenTag"||t.name=="SelfClosingTag"||t.name=="AttributeName"?xt(r,e,t,t.name=="AttributeName"?t.from:a,a):t.name=="Is"||t.name=="AttributeValue"||t.name=="UnquotedAttributeValue"?Pt(r,e,t,t.name=="Is"?a:t.from,a):l.explicit&&(s.name=="Element"||s.name=="Text"||s.name=="Document")?bt(r,e,t,a):null}function Yt(e){return Ce(W.default,e)}function Tt(e){let{extraTags:l,extraGlobalAttributes:r}=e,a=r||l?new W(l,r):W.default;return t=>Ce(a,t)}var Vt=v.parser.configure({top:"SingleExpression"}),Qe=[{tag:"script",attrs: e=>e.type=="text/typescript"||e.lang=="ts",parser:ae.parser},{tag:"script",attrs: e=>e.type=="text/babel"||e.type=="text/jsx",parser:le.parser},{tag:"script",attrs: e=>e.type=="text/typescript-jsx",parser:re.parser},{tag:"script",attrs(e){return/^(importmap|speculationrules|application\/(.+\+)?json)$/i.test(e.type)},parser:Vt},{tag:"script",attrs(e){return!e.type||/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(e.type)},parser:v.parser},{tag:"style",attrs(e){return(!e.lang||e.lang=="css")&&(!e.type||/^(text\/)?(x-)?(stylesheet|css)$/i.test(e.type))},parser:q.parser}],Ae=[{name:"style",parser:q.parser.configure({top:"Styles"})}].concat($e.map(e=>({name:e,parser:v.parser}))),Ye=U.define({name:"html",parser:Ve.configure({props:[F.add({Element(e){let l=/^(\s*)(<\/)?/.exec(e.textAfter);return e.node.to<=e.pos+l[0].length?e.continue():e.lineIndent(e.node.from)+(l[2]?0:e.unit)},"OpenTag CloseTag SelfClosingTag"(e){return e.column(e.node.from)+e.unit},Document(e){if(e.pos+/\s*/.exec(e.textAfter)[0].length<e.node.to)return e.continue();let l=null,r;for(let a=e.node;;){let t=a.lastChild;if(!t||t.name!="Element"||t.to!=a.to)break;l=a=t}return l&&!((r=l.lastChild)&&(r.name=="CloseTag"||r.name=="SelfClosingTag"))?e.lineIndent(l.from)+e.unit:null}}),H.add({Element(e){let l=e.firstChild,r=e.lastChild;return!l||l.name!="OpenTag"?null:{from:l.to,to:r.name=="CloseTag"?r.from:e.to}}}),K.add({"OpenTag CloseTag": e=>e.getChild("TagName")})]}),languageData:{commentTokens:{block:{open:"<!--",close:"-->"}},indentOnInput:/^\s*<\/\w+\W$/,wordChars:"-._"}}),$=Ye.configure({wrap:E(Qe,Ae)});function Mt(e={}){let l="",r;e.matchClosingTags===!1&&(l="noMatch"),e.selfClosingTags===!0&&(l=(l?l+" ":"")+"selfClosing"),(e.nestedLanguages&&e.nestedLanguages.length||e.nestedAttributes&&e.nestedAttributes.length)&&(r=E((e.nestedLanguages||[]).concat(Qe),(e.nestedAttributes||[]).concat(Ae)));let a=r?Ye.configure({wrap:r,dialect:l}):l?$.configure({dialect:l}):$;return new L(a,[$.data.of({autocomplete:Tt(e)}),e.autoCloseTags!==!1?wt:[],ne().support,te().support])}var Xe=new Set("area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" ")),wt=G.inputHandler.of((e, l, r, a, t)=>{if(e.composing||e.state.readOnly||l!=r||a!=">"&&a!="/"||!$.isActiveAt(e.state,l,-1))return!1;let s=t(),{state:o}=s,u=o.changeByRange(O=>{var f,p,c;let m=o.doc.sliceString(O.from-1,O.to)==a,{head:i}=O,d=_(o).resolveInner(i,-1),h;if(m&&a==">"&&d.name=="EndTag"){let b=d.parent;if(((p=(f=b.parent)===null||f===void 0?void 0:f.lastChild)===null||p===void 0?void 0:p.name)!="CloseTag"&&(h=P(o.doc,b.parent,i))&&!Xe.has(h)){let x=i+(o.doc.sliceString(i,i+1)===">"?1:0),y=`</${h}>`;return{range:O,changes:{from:i,to:x,insert:y}}}}else if(m&&a=="/"&&d.name=="IncompleteCloseTag"){let b=d.parent;if(d.from==i-2&&((c=b.lastChild)===null||c===void 0?void 0:c.name)!="CloseTag"&&(h=P(o.doc,b,i))&&!Xe.has(h)){let x=i+(o.doc.sliceString(i,i+1)===">"?1:0),y=`${h}>`;return{range:N.cursor(i+y.length,-1),changes:{from:i,to:x,insert:y}}}}return{range:O}});return u.changes.empty?!1:(e.dispatch([s,o.update(u,{userEvent:"input.complete",scrollIntoView:!0})]),!0)});export{Yt as a,Tt as b,Ye as c,$ as d,Mt as e,wt as f};
