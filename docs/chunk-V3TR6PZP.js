import{A as Ct,B as St,C as oe,Ga as lt,J as ze,La as ce,Za as le,ab as ue,b as Oe,c as Ve,cb as de,d as Ut,db as fe,e as Zt,eb as he,f as Qt,fb as me,g as Jt,gb as ke,h as ct,hb as ye,ib as ge,j as Kt,kb as tt,n as $t,o as vt,p as xt,q as wt,r as _t,s as Dt,t as te,u as ee,v as ie,w as se,x as ne,y as re,z as ae}from"./chunk-F4M4M2WD.js";import{e as Tt,g as st}from"./chunk-RVFOIZLJ.js";var pe=Tt((Et,Mt)=>{"use strict";(function(t,i){typeof Et=="object"&&typeof Mt<"u"?Mt.exports=i():typeof define=="function"&&define.amd?define(i):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_isoWeek=i()})(Et,function(){"use strict";var t="day";return function(i,a,s){var r=function(T){return T.add(4-T.isoWeekday(),t)},u=a.prototype;u.isoWeekYear=function(){return r(this).year()},u.isoWeek=function(T){if(!this.$utils().u(T))return this.add(7*(T-this.isoWeek()),t);var E,I,Y,W,H=r(this),p=(E=this.isoWeekYear(),I=this.$u,Y=(I?s.utc:s)().year(E).startOf("year"),W=4-Y.isoWeekday(),Y.isoWeekday()>4&&(W+=7),Y.add(W,t));return H.diff(p,"week")+1},u.isoWeekday=function(T){return this.$utils().u(T)?this.day()||7:this.day(this.day()%7?T:T-7)};var h=u.startOf;u.startOf=function(T,E){var I=this.$utils(),Y=!!I.u(E)||E;return I.p(T)==="isoweek"?Y?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):h.bind(this)(T,E)}}})});var be=Tt((At,Lt)=>{"use strict";(function(t,i){typeof At=="object"&&typeof Lt<"u"?Lt.exports=i():typeof define=="function"&&define.amd?define(i):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_customParseFormat=i()})(At,function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},i=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,a=/\d\d/,s=/\d\d?/,r=/\d*[^-_:/,()\s\d]+/,u={},h=function(p){return(p=+p)+(p>68?1900:2e3)},T=function(p){return function(w){this[p]=+w}},E=[/[+-]\d\d:?(\d\d)?|Z/,function(p){(this.zone||(this.zone={})).offset=function(w){if(!w||w==="Z")return 0;var y=w.match(/([+-]|\d\d)/g),M=60*y[1]+(+y[2]||0);return M===0?0:y[0]==="+"?-M:M}(p)}],I=function(p){var w=u[p];return w&&(w.indexOf?w:w.s.concat(w.f))},Y=function(p,w){var y,M=u.meridiem;if(M){for(var P=1;P<=24;P+=1)if(p.indexOf(M(P,0,w))>-1){y=P>12;break}}else y=p===(w?"pm":"PM");return y},W={A:[r,function(p){this.afternoon=Y(p,!1)}],a:[r,function(p){this.afternoon=Y(p,!0)}],S:[/\d/,function(p){this.milliseconds=100*+p}],SS:[a,function(p){this.milliseconds=10*+p}],SSS:[/\d{3}/,function(p){this.milliseconds=+p}],s:[s,T("seconds")],ss:[s,T("seconds")],m:[s,T("minutes")],mm:[s,T("minutes")],H:[s,T("hours")],h:[s,T("hours")],HH:[s,T("hours")],hh:[s,T("hours")],D:[s,T("day")],DD:[a,T("day")],Do:[r,function(p){var w=u.ordinal,y=p.match(/\d+/);if(this.day=y[0],w)for(var M=1;M<=31;M+=1)w(M).replace(/\[|\]/g,"")===p&&(this.day=M)}],M:[s,T("month")],MM:[a,T("month")],MMM:[r,function(p){var w=I("months"),y=(I("monthsShort")||w.map(function(M){return M.slice(0,3)})).indexOf(p)+1;if(y<1)throw new Error;this.month=y%12||y}],MMMM:[r,function(p){var w=I("months").indexOf(p)+1;if(w<1)throw new Error;this.month=w%12||w}],Y:[/[+-]?\d+/,T("year")],YY:[a,function(p){this.year=h(p)}],YYYY:[/\d{4}/,T("year")],Z:E,ZZ:E};function H(p){var w,y;w=p,y=u&&u.formats;for(var M=(p=w.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(G,m,x){var b=x&&x.toUpperCase();return m||y[x]||t[x]||y[b].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(g,n,d){return n||d.slice(1)})})).match(i),P=M.length,N=0;N<P;N+=1){var q=M[N],j=W[q],B=j&&j[0],R=j&&j[1];M[N]=R?{regex:B,parser:R}:q.replace(/^\[|\]$/g,"")}return function(G){for(var m={},x=0,b=0;x<P;x+=1){var g=M[x];if(typeof g=="string")b+=g.length;else{var n=g.regex,d=g.parser,f=G.slice(b),o=n.exec(f)[0];d.call(m,o),G=G.replace(o,"")}}return function(k){var e=k.afternoon;if(e!==void 0){var A=k.hours;e?A<12&&(k.hours+=12):A===12&&(k.hours=0),delete k.afternoon}}(m),m}}return function(p,w,y){y.p.customParseFormat=!0,p&&p.parseTwoDigitYear&&(h=p.parseTwoDigitYear);var M=w.prototype,P=M.parse;M.parse=function(N){var q=N.date,j=N.utc,B=N.args;this.$u=j;var R=B[1];if(typeof R=="string"){var G=B[2]===!0,m=B[3]===!0,x=G||m,b=B[2];m&&(b=B[2]),u=this.$locale(),!G&&b&&(u=y.Ls[b]),this.$d=function(f,o,k){try{if(["x","X"].indexOf(o)>-1)return new Date((o==="X"?1e3:1)*f);var e=H(o)(f),A=e.year,l=e.month,c=e.day,v=e.hours,L=e.minutes,D=e.seconds,S=e.milliseconds,_=e.zone,C=new Date,Z=c||(A||l?1:C.getDate()),Q=A||C.getFullYear(),et=0;A&&!l||(et=l>0?l-1:C.getMonth());var ot=v||0,O=L||0,X=D||0,V=S||0;return _?new Date(Date.UTC(Q,et,Z,ot,O,X,V+60*_.offset*1e3)):k?new Date(Date.UTC(Q,et,Z,ot,O,X,V)):new Date(Q,et,Z,ot,O,X,V)}catch{return new Date("")}}(q,R,j),this.init(),b&&b!==!0&&(this.$L=this.locale(b).$L),x&&q!=this.format(R)&&(this.$d=new Date("")),u={}}else if(R instanceof Array)for(var g=R.length,n=1;n<=g;n+=1){B[1]=R[n-1];var d=y.apply(this,B);if(d.isValid()){this.$d=d.$d,this.$L=d.$L,this.init();break}n===g&&(this.$d=new Date(""))}else P.call(this,N)}}})});var Te=Tt((It,Yt)=>{"use strict";(function(t,i){typeof It=="object"&&typeof Yt<"u"?Yt.exports=i():typeof define=="function"&&define.amd?define(i):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_advancedFormat=i()})(It,function(){"use strict";return function(t,i){var a=i.prototype,s=a.format;a.format=function(r){var u=this,h=this.$locale();if(!this.isValid())return s.bind(this)(r);var T=this.$utils(),E=(r||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(I){switch(I){case"Q":return Math.ceil((u.$M+1)/3);case"Do":return h.ordinal(u.$D);case"gggg":return u.weekYear();case"GGGG":return u.isoWeekYear();case"wo":return h.ordinal(u.week(),"W");case"w":case"ww":return T.s(u.week(),I==="w"?1:2,"0");case"W":case"WW":return T.s(u.isoWeek(),I==="W"?1:2,"0");case"k":case"kk":return T.s(String(u.$H===0?24:u.$H),I==="k"?1:2,"0");case"X":return Math.floor(u.$d.getTime()/1e3);case"x":return u.$d.getTime();case"z":return"["+u.offsetName()+"]";case"zzz":return"["+u.offsetName("long")+"]";default:return I}});return s.bind(this)(E)}}})});var we=st(Ve(),1),z=st(Oe(),1),_e=st(pe(),1),De=st(be(),1),Ce=st(Te(),1);var Ai=st(ze(),1);var Ft=function(){var t=function(g,n,d,f){for(d=d||{},f=g.length;f--;d[g[f]]=n);return d},i=[6,8,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,30,32,33,35,37],a=[1,25],s=[1,26],r=[1,27],u=[1,28],h=[1,29],T=[1,30],E=[1,31],I=[1,9],Y=[1,10],W=[1,11],H=[1,12],p=[1,13],w=[1,14],y=[1,15],M=[1,16],P=[1,18],N=[1,19],q=[1,20],j=[1,21],B=[1,22],R=[1,24],G=[1,32],m={trace:function(){},yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,dateFormat:19,inclusiveEndDates:20,topAxis:21,axisFormat:22,tickInterval:23,excludes:24,includes:25,todayMarker:26,title:27,acc_title:28,acc_title_value:29,acc_descr:30,acc_descr_value:31,acc_descr_multiline_value:32,section:33,clickStatement:34,taskTxt:35,taskData:36,click:37,callbackname:38,callbackargs:39,href:40,clickStatementDebug:41,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",19:"dateFormat",20:"inclusiveEndDates",21:"topAxis",22:"axisFormat",23:"tickInterval",24:"excludes",25:"includes",26:"todayMarker",27:"title",28:"acc_title",29:"acc_title_value",30:"acc_descr",31:"acc_descr_value",32:"acc_descr_multiline_value",33:"section",35:"taskTxt",36:"taskData",37:"click",38:"callbackname",39:"callbackargs",40:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[34,2],[34,3],[34,3],[34,4],[34,3],[34,4],[34,2],[41,2],[41,3],[41,3],[41,4],[41,3],[41,4],[41,2]],performAction:function(n,d,f,o,k,e,A){var l=e.length-1;switch(k){case 1:return e[l-1];case 2:this.$=[];break;case 3:e[l-1].push(e[l]),this.$=e[l-1];break;case 4:case 5:this.$=e[l];break;case 6:case 7:this.$=[];break;case 8:o.setWeekday("monday");break;case 9:o.setWeekday("tuesday");break;case 10:o.setWeekday("wednesday");break;case 11:o.setWeekday("thursday");break;case 12:o.setWeekday("friday");break;case 13:o.setWeekday("saturday");break;case 14:o.setWeekday("sunday");break;case 15:o.setDateFormat(e[l].substr(11)),this.$=e[l].substr(11);break;case 16:o.enableInclusiveEndDates(),this.$=e[l].substr(18);break;case 17:o.TopAxis(),this.$=e[l].substr(8);break;case 18:o.setAxisFormat(e[l].substr(11)),this.$=e[l].substr(11);break;case 19:o.setTickInterval(e[l].substr(13)),this.$=e[l].substr(13);break;case 20:o.setExcludes(e[l].substr(9)),this.$=e[l].substr(9);break;case 21:o.setIncludes(e[l].substr(9)),this.$=e[l].substr(9);break;case 22:o.setTodayMarker(e[l].substr(12)),this.$=e[l].substr(12);break;case 24:o.setDiagramTitle(e[l].substr(6)),this.$=e[l].substr(6);break;case 25:this.$=e[l].trim(),o.setAccTitle(this.$);break;case 26:case 27:this.$=e[l].trim(),o.setAccDescription(this.$);break;case 28:o.addSection(e[l].substr(8)),this.$=e[l].substr(8);break;case 30:o.addTask(e[l-1],e[l]),this.$="task";break;case 31:this.$=e[l-1],o.setClickEvent(e[l-1],e[l],null);break;case 32:this.$=e[l-2],o.setClickEvent(e[l-2],e[l-1],e[l]);break;case 33:this.$=e[l-2],o.setClickEvent(e[l-2],e[l-1],null),o.setLink(e[l-2],e[l]);break;case 34:this.$=e[l-3],o.setClickEvent(e[l-3],e[l-2],e[l-1]),o.setLink(e[l-3],e[l]);break;case 35:this.$=e[l-2],o.setClickEvent(e[l-2],e[l],null),o.setLink(e[l-2],e[l-1]);break;case 36:this.$=e[l-3],o.setClickEvent(e[l-3],e[l-1],e[l]),o.setLink(e[l-3],e[l-2]);break;case 37:this.$=e[l-1],o.setLink(e[l-1],e[l]);break;case 38:case 44:this.$=e[l-1]+" "+e[l];break;case 39:case 40:case 42:this.$=e[l-2]+" "+e[l-1]+" "+e[l];break;case 41:case 43:this.$=e[l-3]+" "+e[l-2]+" "+e[l-1]+" "+e[l];break}},table:[{3:1,4:[1,2]},{1:[3]},t(i,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:a,13:s,14:r,15:u,16:h,17:T,18:E,19:I,20:Y,21:W,22:H,23:p,24:w,25:y,26:M,27:P,28:N,30:q,32:j,33:B,34:23,35:R,37:G},t(i,[2,7],{1:[2,1]}),t(i,[2,3]),{9:33,11:17,12:a,13:s,14:r,15:u,16:h,17:T,18:E,19:I,20:Y,21:W,22:H,23:p,24:w,25:y,26:M,27:P,28:N,30:q,32:j,33:B,34:23,35:R,37:G},t(i,[2,5]),t(i,[2,6]),t(i,[2,15]),t(i,[2,16]),t(i,[2,17]),t(i,[2,18]),t(i,[2,19]),t(i,[2,20]),t(i,[2,21]),t(i,[2,22]),t(i,[2,23]),t(i,[2,24]),{29:[1,34]},{31:[1,35]},t(i,[2,27]),t(i,[2,28]),t(i,[2,29]),{36:[1,36]},t(i,[2,8]),t(i,[2,9]),t(i,[2,10]),t(i,[2,11]),t(i,[2,12]),t(i,[2,13]),t(i,[2,14]),{38:[1,37],40:[1,38]},t(i,[2,4]),t(i,[2,25]),t(i,[2,26]),t(i,[2,30]),t(i,[2,31],{39:[1,39],40:[1,40]}),t(i,[2,37],{38:[1,41]}),t(i,[2,32],{40:[1,42]}),t(i,[2,33]),t(i,[2,35],{39:[1,43]}),t(i,[2,34]),t(i,[2,36])],defaultActions:{},parseError:function(n,d){if(d.recoverable)this.trace(n);else{var f=new Error(n);throw f.hash=d,f}},parse:function(n){var d=this,f=[0],o=[],k=[null],e=[],A=this.table,l="",c=0,v=0,L=2,D=1,S=e.slice.call(arguments,1),_=Object.create(this.lexer),C={yy:{}};for(var Z in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Z)&&(C.yy[Z]=this.yy[Z]);_.setInput(n,C.yy),C.yy.lexer=_,C.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var Q=_.yylloc;e.push(Q);var et=_.options&&_.options.ranges;typeof C.yy.parseError=="function"?this.parseError=C.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function ot(){var K;return K=o.pop()||_.lex()||D,typeof K!="number"&&(K instanceof Array&&(o=K,K=o.pop()),K=d.symbols_[K]||K),K}for(var O,X,V,ht,it={},mt,J,qt,kt;;){if(X=f[f.length-1],this.defaultActions[X]?V=this.defaultActions[X]:((O===null||typeof O>"u")&&(O=ot()),V=A[X]&&A[X][O]),typeof V>"u"||!V.length||!V[0]){var bt="";kt=[];for(mt in A[X])this.terminals_[mt]&&mt>L&&kt.push("'"+this.terminals_[mt]+"'");_.showPosition?bt="Parse error on line "+(c+1)+`:
`+_.showPosition()+`
Expecting `+kt.join(", ")+", got '"+(this.terminals_[O]||O)+"'":bt="Parse error on line "+(c+1)+": Unexpected "+(O==D?"end of input":"'"+(this.terminals_[O]||O)+"'"),this.parseError(bt,{text:_.match,token:this.terminals_[O]||O,line:_.yylineno,loc:Q,expected:kt})}if(V[0]instanceof Array&&V.length>1)throw new Error("Parse Error: multiple actions possible at state: "+X+", token: "+O);switch(V[0]){case 1:f.push(O),k.push(_.yytext),e.push(_.yylloc),f.push(V[1]),O=null,v=_.yyleng,l=_.yytext,c=_.yylineno,Q=_.yylloc;break;case 2:if(J=this.productions_[V[1]][1],it.$=k[k.length-J],it._$={first_line:e[e.length-(J||1)].first_line,last_line:e[e.length-1].last_line,first_column:e[e.length-(J||1)].first_column,last_column:e[e.length-1].last_column},et&&(it._$.range=[e[e.length-(J||1)].range[0],e[e.length-1].range[1]]),ht=this.performAction.apply(it,[l,v,c,C.yy,V[1],k,e].concat(S)),typeof ht<"u")return ht;J&&(f=f.slice(0,-1*J*2),k=k.slice(0,-1*J),e=e.slice(0,-1*J)),f.push(this.productions_[V[1]][0]),k.push(it.$),e.push(it._$),qt=A[f[f.length-2]][f[f.length-1]],f.push(qt);break;case 3:return!0}}return!0}},x=function(){var g={EOF:1,parseError:function(d,f){if(this.yy.parser)this.yy.parser.parseError(d,f);else throw new Error(d)},setInput:function(n,d){return this.yy=d||this.yy||{},this._input=n,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var n=this._input[0];this.yytext+=n,this.yyleng++,this.offset++,this.match+=n,this.matched+=n;var d=n.match(/(?:\r\n?|\n).*/g);return d?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),n},unput:function(n){var d=n.length,f=n.split(/(?:\r\n?|\n)/g);this._input=n+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-d),this.offset-=d;var o=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),f.length-1&&(this.yylineno-=f.length-1);var k=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:f?(f.length===o.length?this.yylloc.first_column:0)+o[o.length-f.length].length-f[0].length:this.yylloc.first_column-d},this.options.ranges&&(this.yylloc.range=[k[0],k[0]+this.yyleng-d]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(n){this.unput(this.match.slice(n))},pastInput:function(){var n=this.matched.substr(0,this.matched.length-this.match.length);return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var n=this.match;return n.length<20&&(n+=this._input.substr(0,20-n.length)),(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var n=this.pastInput(),d=new Array(n.length+1).join("-");return n+this.upcomingInput()+`
`+d+"^"},test_match:function(n,d){var f,o,k;if(this.options.backtrack_lexer&&(k={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(k.yylloc.range=this.yylloc.range.slice(0))),o=n[0].match(/(?:\r\n?|\n).*/g),o&&(this.yylineno+=o.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:o?o[o.length-1].length-o[o.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+n[0].length},this.yytext+=n[0],this.match+=n[0],this.matches=n,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(n[0].length),this.matched+=n[0],f=this.performAction.call(this,this.yy,this,d,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),f)return f;if(this._backtrack){for(var e in k)this[e]=k[e];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var n,d,f,o;this._more||(this.yytext="",this.match="");for(var k=this._currentRules(),e=0;e<k.length;e++)if(f=this._input.match(this.rules[k[e]]),f&&(!d||f[0].length>d[0].length)){if(d=f,o=e,this.options.backtrack_lexer){if(n=this.test_match(f,k[e]),n!==!1)return n;if(this._backtrack){d=!1;continue}else return!1}else if(!this.options.flex)break}return d?(n=this.test_match(d,k[o]),n!==!1?n:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var d=this.next();return d||this.lex()},begin:function(d){this.conditionStack.push(d)},popState:function(){var d=this.conditionStack.length-1;return d>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(d){return d=this.conditionStack.length-1-Math.abs(d||0),d>=0?this.conditionStack[d]:"INITIAL"},pushState:function(d){this.begin(d)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(d,f,o,k){switch(o){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),28;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),30;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:break;case 15:this.begin("href");break;case 16:this.popState();break;case 17:return 40;case 18:this.begin("callbackname");break;case 19:this.popState();break;case 20:this.popState(),this.begin("callbackargs");break;case 21:return 38;case 22:this.popState();break;case 23:return 39;case 24:this.begin("click");break;case 25:this.popState();break;case 26:return 37;case 27:return 4;case 28:return 19;case 29:return 20;case 30:return 21;case 31:return 22;case 32:return 23;case 33:return 25;case 34:return 24;case 35:return 26;case 36:return 12;case 37:return 13;case 38:return 14;case 39:return 15;case 40:return 16;case 41:return 17;case 42:return 18;case 43:return"date";case 44:return 27;case 45:return"accDescription";case 46:return 33;case 47:return 35;case 48:return 36;case 49:return":";case 50:return 6;case 51:return"INVALID"}},rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[22,23],inclusive:!1},callbackname:{rules:[19,20,21],inclusive:!1},href:{rules:[16,17],inclusive:!1},click:{rules:[25,26],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,15,18,24,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51],inclusive:!0}}};return g}();m.lexer=x;function b(){this.yy={}}return b.prototype=m,m.Parser=b,new b}();Ft.parser=Ft;var Pe=Ft;z.default.extend(_e.default);z.default.extend(De.default);z.default.extend(Ce.default);var U="",zt="",Pt,Nt="",ut=[],dt=[],Bt={},Rt=[],pt=[],rt="",jt="",Se=["active","done","crit","milestone"],Gt=[],ft=!1,Ht=!1,Xt="sunday",Wt=0,Ne=function(){Rt=[],pt=[],rt="",Gt=[],yt=0,Vt=void 0,gt=void 0,F=[],U="",zt="",jt="",Pt=void 0,Nt="",ut=[],dt=[],ft=!1,Ht=!1,Wt=0,Bt={},de(),Xt="sunday"},Be=function(t){zt=t},Re=function(){return zt},je=function(t){Pt=t},Ge=function(){return Pt},He=function(t){Nt=t},Xe=function(){return Nt},qe=function(t){U=t},Ue=function(){ft=!0},Ze=function(){return ft},Qe=function(){Ht=!0},Je=function(){return Ht},Ke=function(t){jt=t},$e=function(){return jt},ti=function(){return U},ei=function(t){ut=t.toLowerCase().split(/[\s,]+/)},ii=function(){return ut},si=function(t){dt=t.toLowerCase().split(/[\s,]+/)},ni=function(){return dt},ri=function(){return Bt},ai=function(t){rt=t,Rt.push(t)},oi=function(){return Rt},ci=function(){let t=ve(),i=10,a=0;for(;!t&&a<i;)t=ve(),a++;return pt=F,pt},Ee=function(t,i,a,s){return s.includes(t.format(i.trim()))?!1:t.isoWeekday()>=6&&a.includes("weekends")||a.includes(t.format("dddd").toLowerCase())?!0:a.includes(t.format(i.trim()))},li=function(t){Xt=t},ui=function(){return Xt},Me=function(t,i,a,s){if(!a.length||t.manualEndTime)return;let r;t.startTime instanceof Date?r=(0,z.default)(t.startTime):r=(0,z.default)(t.startTime,i,!0),r=r.add(1,"d");let u;t.endTime instanceof Date?u=(0,z.default)(t.endTime):u=(0,z.default)(t.endTime,i,!0);let[h,T]=di(r,u,i,a,s);t.endTime=h.toDate(),t.renderEndTime=T},di=function(t,i,a,s,r){let u=!1,h=null;for(;t<=i;)u||(h=i.toDate()),u=Ee(t,a,s,r),u&&(i=i.add(1,"d")),t=t.add(1,"d");return[i,h]},Ot=function(t,i,a){a=a.trim();let r=/^after\s+([\d\w- ]+)/.exec(a.trim());if(r!==null){let h=null;if(r[1].split(" ").forEach(function(T){let E=at(T);E!==void 0&&(h?E.endTime>h.endTime&&(h=E):h=E)}),h)return h.endTime;{let T=new Date;return T.setHours(0,0,0,0),T}}let u=(0,z.default)(a,i.trim(),!0);if(u.isValid())return u.toDate();{lt.debug("Invalid date:"+a),lt.debug("With date format:"+i.trim());let h=new Date(a);if(h===void 0||isNaN(h.getTime())||h.getFullYear()<-1e4||h.getFullYear()>1e4)throw new Error("Invalid date:"+a);return h}},Ae=function(t){let i=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return i!==null?[Number.parseFloat(i[1]),i[2]]:[NaN,"ms"]},Le=function(t,i,a,s=!1){a=a.trim();let r=(0,z.default)(a,i.trim(),!0);if(r.isValid())return s&&(r=r.add(1,"d")),r.toDate();let u=(0,z.default)(t),[h,T]=Ae(a);if(!Number.isNaN(h)){let E=u.add(h,T);E.isValid()&&(u=E)}return u.toDate()},yt=0,nt=function(t){return t===void 0?(yt=yt+1,"task"+yt):t},fi=function(t,i){let a;i.substr(0,1)===":"?a=i.substr(1,i.length):a=i;let s=a.split(","),r={};We(s,r,Se);for(let h=0;h<s.length;h++)s[h]=s[h].trim();let u="";switch(s.length){case 1:r.id=nt(),r.startTime=t.endTime,u=s[0];break;case 2:r.id=nt(),r.startTime=Ot(void 0,U,s[0]),u=s[1];break;case 3:r.id=nt(s[0]),r.startTime=Ot(void 0,U,s[1]),u=s[2];break}return u&&(r.endTime=Le(r.startTime,U,u,ft),r.manualEndTime=(0,z.default)(u,"YYYY-MM-DD",!0).isValid(),Me(r,U,dt,ut)),r},hi=function(t,i){let a;i.substr(0,1)===":"?a=i.substr(1,i.length):a=i;let s=a.split(","),r={};We(s,r,Se);for(let u=0;u<s.length;u++)s[u]=s[u].trim();switch(s.length){case 1:r.id=nt(),r.startTime={type:"prevTaskEnd",id:t},r.endTime={data:s[0]};break;case 2:r.id=nt(),r.startTime={type:"getStartDate",startData:s[0]},r.endTime={data:s[1]};break;case 3:r.id=nt(s[0]),r.startTime={type:"getStartDate",startData:s[1]},r.endTime={data:s[2]};break}return r},Vt,gt,F=[],Ie={},mi=function(t,i){let a={section:rt,type:rt,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:i},task:t,classes:[]},s=hi(gt,i);a.raw.startTime=s.startTime,a.raw.endTime=s.endTime,a.id=s.id,a.prevTaskId=gt,a.active=s.active,a.done=s.done,a.crit=s.crit,a.milestone=s.milestone,a.order=Wt,Wt++;let r=F.push(a);gt=a.id,Ie[a.id]=r-1},at=function(t){let i=Ie[t];return F[i]},ki=function(t,i){let a={section:rt,type:rt,description:t,task:t,classes:[]},s=fi(Vt,i);a.startTime=s.startTime,a.endTime=s.endTime,a.id=s.id,a.active=s.active,a.done=s.done,a.crit=s.crit,a.milestone=s.milestone,Vt=a,pt.push(a)},ve=function(){let t=function(a){let s=F[a],r="";switch(F[a].raw.startTime.type){case"prevTaskEnd":{let u=at(s.prevTaskId);s.startTime=u.endTime;break}case"getStartDate":r=Ot(void 0,U,F[a].raw.startTime.startData),r&&(F[a].startTime=r);break}return F[a].startTime&&(F[a].endTime=Le(F[a].startTime,U,F[a].raw.endTime.data,ft),F[a].endTime&&(F[a].processed=!0,F[a].manualEndTime=(0,z.default)(F[a].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),Me(F[a],U,dt,ut))),F[a].processed},i=!0;for(let[a,s]of F.entries())t(a),i=i&&s.processed;return i},yi=function(t,i){let a=i;tt().securityLevel!=="loose"&&(a=(0,we.sanitizeUrl)(i)),t.split(",").forEach(function(s){at(s)!==void 0&&(Fe(s,()=>{window.open(a,"_self")}),Bt[s]=a)}),Ye(t,"clickable")},Ye=function(t,i){t.split(",").forEach(function(a){let s=at(a);s!==void 0&&s.classes.push(i)})},gi=function(t,i,a){if(tt().securityLevel!=="loose"||i===void 0)return;let s=[];if(typeof a=="string"){s=a.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let u=0;u<s.length;u++){let h=s[u].trim();h.charAt(0)==='"'&&h.charAt(h.length-1)==='"'&&(h=h.substr(1,h.length-2)),s[u]=h}}s.length===0&&s.push(t),at(t)!==void 0&&Fe(t,()=>{le.runFunc(i,...s)})},Fe=function(t,i){Gt.push(function(){let a=document.querySelector(`[id="${t}"]`);a!==null&&a.addEventListener("click",function(){i()})},function(){let a=document.querySelector(`[id="${t}-text"]`);a!==null&&a.addEventListener("click",function(){i()})})},pi=function(t,i,a){t.split(",").forEach(function(s){gi(s,i,a)}),Ye(t,"clickable")},bi=function(t){Gt.forEach(function(i){i(t)})},Ti={getConfig:()=>tt().gantt,clear:Ne,setDateFormat:qe,getDateFormat:ti,enableInclusiveEndDates:Ue,endDatesAreInclusive:Ze,enableTopAxis:Qe,topAxisEnabled:Je,setAxisFormat:Be,getAxisFormat:Re,setTickInterval:je,getTickInterval:Ge,setTodayMarker:He,getTodayMarker:Xe,setAccTitle:fe,getAccTitle:he,setDiagramTitle:ye,getDiagramTitle:ge,setDisplayMode:Ke,getDisplayMode:$e,setAccDescription:me,getAccDescription:ke,addSection:ai,getSections:oi,getTasks:ci,addTask:mi,findTaskById:at,addTaskOrg:ki,setIncludes:ei,getIncludes:ii,setExcludes:si,getExcludes:ni,setClickEvent:pi,setLink:yi,getLinks:ri,bindFunctions:bi,parseDuration:Ae,isInvalidDate:Ee,setWeekday:li,getWeekday:ui};function We(t,i,a){let s=!0;for(;s;)s=!1,a.forEach(function(r){let u="^\\s*"+r+"\\s*$",h=new RegExp(u);t[0].match(h)&&(i[r]=!0,t.shift(1),s=!0)})}var vi=function(){lt.debug("Something is calling, setConf, remove the call")},xe={monday:ee,tuesday:ie,wednesday:se,thursday:ne,friday:re,saturday:ae,sunday:te},xi=(t,i)=>{let a=[...t].map(()=>-1/0),s=[...t].sort((u,h)=>u.startTime-h.startTime||u.order-h.order),r=0;for(let u of s)for(let h=0;h<a.length;h++)if(u.startTime>=a[h]){a[h]=u.endTime,u.order=h+i,h>r&&(r=h);break}return r},$,wi=function(t,i,a,s){let r=tt().gantt,u=tt().securityLevel,h;u==="sandbox"&&(h=ct("#i"+i));let T=u==="sandbox"?ct(h.nodes()[0].contentDocument.body):ct("body"),E=u==="sandbox"?h.nodes()[0].contentDocument:document,I=E.getElementById(i);$=I.parentElement.offsetWidth,$===void 0&&($=1200),r.useWidth!==void 0&&($=r.useWidth);let Y=s.db.getTasks(),W=[];for(let m of Y)W.push(m.type);W=G(W);let H={},p=2*r.topPadding;if(s.db.getDisplayMode()==="compact"||r.displayMode==="compact"){let m={};for(let b of Y)m[b.section]===void 0?m[b.section]=[b]:m[b.section].push(b);let x=0;for(let b of Object.keys(m)){let g=xi(m[b],x)+1;x+=g,p+=g*(r.barHeight+r.barGap),H[b]=g}}else{p+=Y.length*(r.barHeight+r.barGap);for(let m of W)H[m]=Y.filter(x=>x.type===m).length}I.setAttribute("viewBox","0 0 "+$+" "+p);let w=T.select(`[id="${i}"]`),y=oe().domain([Zt(Y,function(m){return m.startTime}),Ut(Y,function(m){return m.endTime})]).rangeRound([0,$-r.leftPadding-r.rightPadding]);function M(m,x){let b=m.startTime,g=x.startTime,n=0;return b>g?n=1:b<g&&(n=-1),n}Y.sort(M),P(Y,$,p),ue(w,p,$,r.useMaxWidth),w.append("text").text(s.db.getDiagramTitle()).attr("x",$/2).attr("y",r.titleTopMargin).attr("class","titleText");function P(m,x,b){let g=r.barHeight,n=g+r.barGap,d=r.topPadding,f=r.leftPadding,o=$t().domain([0,W.length]).range(["#00B9FA","#F95002"]).interpolate(Kt);q(n,d,f,x,b,m,s.db.getExcludes(),s.db.getIncludes()),j(f,d,x,b),N(m,n,d,f,g,o,x),B(n,d),R(f,d,x,b)}function N(m,x,b,g,n,d,f){let k=[...new Set(m.map(c=>c.order))].map(c=>m.find(v=>v.order===c));w.append("g").selectAll("rect").data(k).enter().append("rect").attr("x",0).attr("y",function(c,v){return v=c.order,v*x+b-2}).attr("width",function(){return f-r.rightPadding/2}).attr("height",x).attr("class",function(c){for(let[v,L]of W.entries())if(c.type===L)return"section section"+v%r.numberSectionStyles;return"section section0"});let e=w.append("g").selectAll("rect").data(m).enter(),A=s.db.getLinks();if(e.append("rect").attr("id",function(c){return c.id}).attr("rx",3).attr("ry",3).attr("x",function(c){return c.milestone?y(c.startTime)+g+.5*(y(c.endTime)-y(c.startTime))-.5*n:y(c.startTime)+g}).attr("y",function(c,v){return v=c.order,v*x+b}).attr("width",function(c){return c.milestone?n:y(c.renderEndTime||c.endTime)-y(c.startTime)}).attr("height",n).attr("transform-origin",function(c,v){return v=c.order,(y(c.startTime)+g+.5*(y(c.endTime)-y(c.startTime))).toString()+"px "+(v*x+b+.5*n).toString()+"px"}).attr("class",function(c){let v="task",L="";c.classes.length>0&&(L=c.classes.join(" "));let D=0;for(let[_,C]of W.entries())c.type===C&&(D=_%r.numberSectionStyles);let S="";return c.active?c.crit?S+=" activeCrit":S=" active":c.done?c.crit?S=" doneCrit":S=" done":c.crit&&(S+=" crit"),S.length===0&&(S=" task"),c.milestone&&(S=" milestone "+S),S+=D,S+=" "+L,v+S}),e.append("text").attr("id",function(c){return c.id+"-text"}).text(function(c){return c.task}).attr("font-size",r.fontSize).attr("x",function(c){let v=y(c.startTime),L=y(c.renderEndTime||c.endTime);c.milestone&&(v+=.5*(y(c.endTime)-y(c.startTime))-.5*n),c.milestone&&(L=v+n);let D=this.getBBox().width;return D>L-v?L+D+1.5*r.leftPadding>f?v+g-5:L+g+5:(L-v)/2+v+g}).attr("y",function(c,v){return v=c.order,v*x+r.barHeight/2+(r.fontSize/2-2)+b}).attr("text-height",n).attr("class",function(c){let v=y(c.startTime),L=y(c.endTime);c.milestone&&(L=v+n);let D=this.getBBox().width,S="";c.classes.length>0&&(S=c.classes.join(" "));let _=0;for(let[Z,Q]of W.entries())c.type===Q&&(_=Z%r.numberSectionStyles);let C="";return c.active&&(c.crit?C="activeCritText"+_:C="activeText"+_),c.done?c.crit?C=C+" doneCritText"+_:C=C+" doneText"+_:c.crit&&(C=C+" critText"+_),c.milestone&&(C+=" milestoneText"),D>L-v?L+D+1.5*r.leftPadding>f?S+" taskTextOutsideLeft taskTextOutside"+_+" "+C:S+" taskTextOutsideRight taskTextOutside"+_+" "+C+" width-"+D:S+" taskText taskText"+_+" "+C+" width-"+D}),tt().securityLevel==="sandbox"){let c;c=ct("#i"+i);let v=c.nodes()[0].contentDocument;e.filter(function(L){return A[L.id]!==void 0}).each(function(L){var D=v.querySelector("#"+L.id),S=v.querySelector("#"+L.id+"-text");let _=D.parentNode;var C=v.createElement("a");C.setAttribute("xlink:href",A[L.id]),C.setAttribute("target","_top"),_.appendChild(C),C.appendChild(D),C.appendChild(S)})}}function q(m,x,b,g,n,d,f,o){if(f.length===0&&o.length===0)return;let k,e;for(let{startTime:D,endTime:S}of d)(k===void 0||D<k)&&(k=D),(e===void 0||S>e)&&(e=S);if(!k||!e)return;if((0,z.default)(e).diff((0,z.default)(k),"year")>5){lt.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}let A=s.db.getDateFormat(),l=[],c=null,v=(0,z.default)(k);for(;v.valueOf()<=e;)s.db.isInvalidDate(v,A,f,o)?c?c.end=v:c={start:v,end:v}:c&&(l.push(c),c=null),v=v.add(1,"d");w.append("g").selectAll("rect").data(l).enter().append("rect").attr("id",function(D){return"exclude-"+D.start.format("YYYY-MM-DD")}).attr("x",function(D){return y(D.start)+b}).attr("y",r.gridLineStartPadding).attr("width",function(D){let S=D.end.add(1,"day");return y(S)-y(D.start)}).attr("height",n-x-r.gridLineStartPadding).attr("transform-origin",function(D,S){return(y(D.start)+b+.5*(y(D.end)-y(D.start))).toString()+"px "+(S*m+.5*n).toString()+"px"}).attr("class","exclude-range")}function j(m,x,b,g){let n=Jt(y).tickSize(-g+x+r.gridLineStartPadding).tickFormat(St(s.db.getAxisFormat()||r.axisFormat||"%Y-%m-%d")),f=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(s.db.getTickInterval()||r.tickInterval);if(f!==null){let o=f[1],k=f[2],e=s.db.getWeekday()||r.weekday;switch(k){case"millisecond":n.ticks(vt.every(o));break;case"second":n.ticks(xt.every(o));break;case"minute":n.ticks(wt.every(o));break;case"hour":n.ticks(_t.every(o));break;case"day":n.ticks(Dt.every(o));break;case"week":n.ticks(xe[e].every(o));break;case"month":n.ticks(Ct.every(o));break}}if(w.append("g").attr("class","grid").attr("transform","translate("+m+", "+(g-50)+")").call(n).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),s.db.topAxisEnabled()||r.topAxis){let o=Qt(y).tickSize(-g+x+r.gridLineStartPadding).tickFormat(St(s.db.getAxisFormat()||r.axisFormat||"%Y-%m-%d"));if(f!==null){let k=f[1],e=f[2],A=s.db.getWeekday()||r.weekday;switch(e){case"millisecond":o.ticks(vt.every(k));break;case"second":o.ticks(xt.every(k));break;case"minute":o.ticks(wt.every(k));break;case"hour":o.ticks(_t.every(k));break;case"day":o.ticks(Dt.every(k));break;case"week":o.ticks(xe[A].every(k));break;case"month":o.ticks(Ct.every(k));break}}w.append("g").attr("class","grid").attr("transform","translate("+m+", "+x+")").call(o).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}function B(m,x){let b=0,g=Object.keys(H).map(n=>[n,H[n]]);w.append("g").selectAll("text").data(g).enter().append(function(n){let d=n[0].split(ce.lineBreakRegex),f=-(d.length-1)/2,o=E.createElementNS("http://www.w3.org/2000/svg","text");o.setAttribute("dy",f+"em");for(let[k,e]of d.entries()){let A=E.createElementNS("http://www.w3.org/2000/svg","tspan");A.setAttribute("alignment-baseline","central"),A.setAttribute("x","10"),k>0&&A.setAttribute("dy","1em"),A.textContent=e,o.appendChild(A)}return o}).attr("x",10).attr("y",function(n,d){if(d>0)for(let f=0;f<d;f++)return b+=g[d-1][1],n[1]*m/2+b*m+x;else return n[1]*m/2+x}).attr("font-size",r.sectionFontSize).attr("class",function(n){for(let[d,f]of W.entries())if(n[0]===f)return"sectionTitle sectionTitle"+d%r.numberSectionStyles;return"sectionTitle"})}function R(m,x,b,g){let n=s.db.getTodayMarker();if(n==="off")return;let d=w.append("g").attr("class","today"),f=new Date,o=d.append("line");o.attr("x1",y(f)+m).attr("x2",y(f)+m).attr("y1",r.titleTopMargin).attr("y2",g-r.titleTopMargin).attr("class","today"),n!==""&&o.attr("style",n.replace(/,/g,";"))}function G(m){let x={},b=[];for(let g=0,n=m.length;g<n;++g)Object.prototype.hasOwnProperty.call(x,m[g])||(x[m[g]]=!0,b.push(m[g]));return b}},_i={setConf:vi,draw:wi},Di=t=>`
  .mermaid-main-font {
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }
`,Ci=Di,Li={parser:Pe,db:Ti,renderer:_i,styles:Ci};export{Li as diagram};
