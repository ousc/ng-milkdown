import{e as l}from "./chunk-YDFS4KSB.js";import"./chunk-7CCCAFTG.js";import{f as u}from "./chunk-QWDMSHLD.js";import"./chunk-SDWP65H4.js";import{a as r,d as s}from "./chunk-WFNBYWYP.js";import{h as a,j as o,k as t,p as i,s as p}from "./chunk-7ALHBK5C.js";import"./chunk-4BCIMHJT.js";import"./chunk-ILE44FN6.js";import"./chunk-GAL4ENT6.js";var c=s.deserialize({version:14,states:"%pOVOWOOObQPOOOpOSO'#C_OOOO'#Cp'#CpQVOWOOQxQPOOO!TQQOOQ!YQPOOOOOO,58y,58yO!_OSO,58yOOOO-E6n-E6nO!dQQO'#CqQ{QPOOO!iQPOOQ{QPOOO!qQPOOOOOO1G.e1G.eOOQO,59],59]OOQO-E6o-E6oO!yOpO'#CiO#RO`O'#CiQOQPOOO#ZO#tO'#CmO#fO!bO'#CmOOQO,59T,59TO#qOpO,59TO#vO`O,59TOOOO'#Cr'#CrO#{O#tO,59XOOQO,59X,59XOOOO'#Cs'#CsO$WO!bO,59XOOQO1G.o1G.oOOOO-E6p-E6pOOQO1G.s1G.sOOOO-E6q-E6q",stateData:"$g~OjOS~OQROUROkQO~OWTOXUOZUO`VO~OSXOTWO~OXUO[]OlZO~OY^O~O[_O~OT`O~OYaO~OmcOodO~OmfOogO~O^iOnhO~O_jOphO~ObkOqkOrmO~OcnOsnOtmO~OnpO~OppO~ObkOqkOrrO~OcnOsnOtrO~OWX`~",goto:"!^hPPPiPPPPPPPPPmPPPpPPsy!Q!WTROSRe]Re_QSORYSS[T^Rb[QlfRqlQogRso",nodeNames:"\u26A0 Content Text Interpolation InterpolationContent }} Entity Attribute VueAttributeName : Identifier @ Is ScriptAttributeValue AttributeScript AttributeScript AttributeName AttributeValue Entity Entity",maxTerm:36,nodeProps:[["isolate",-3,3,13,17,""]],skippedNodes:[0],repeatNodeCount:4,tokenData:"'y~RdXY!aYZ!a]^!apq!ars!rwx!w}!O!|!O!P#t!Q![#y![!]$s!_!`%g!b!c%l!c!}#y#R#S#y#T#j#y#j#k%q#k#o#y%W;'S#y;'S;:j$m<%lO#y~!fSj~XY!aYZ!a]^!apq!a~!wOm~~!|Oo~!b#RX`!b}!O!|!Q![!|![!]!|!c!}!|#R#S!|#T#o!|%W;'S!|;'S;:j#n<%lO!|!b#qP;=`<%l!|~#yOl~%W$QXY#t`!b}!O!|!Q![#y![!]!|!c!}#y#R#S#y#T#o#y%W;'S#y;'S;:j$m<%lO#y%W$pP;=`<%l#y~$zXX~`!b}!O!|!Q![!|![!]!|!c!}!|#R#S!|#T#o!|%W;'S!|;'S;:j#n<%lO!|~%lO[~~%qOZ~%W%xXY#t`!b}!O&e!Q![#y![!]!|!c!}#y#R#S#y#T#o#y%W;'S#y;'S;:j$m<%lO#y!b&jX`!b}!O!|!Q![!|![!]!|!c!}'V#R#S!|#T#o'V%W;'S!|;'S;:j#n<%lO!|!b'^XW!b`!b}!O!|!Q![!|![!]!|!c!}'V#R#S!|#T#o'V%W;'S!|;'S;:j#n<%lO!|",tokenizers:[6,7,new r("b~RP#q#rU~XP#q#r[~aOT~~",17,4),new r("!k~RQvwX#o#p!_~^TU~Opmq!]m!^;'Sm;'S;=`!X<%lOm~pUOpmq!]m!]!^!S!^;'Sm;'S;=`!X<%lOm~!XOU~~![P;=`<%lm~!bP#o#p!e~!jOk~~",72,2),new r("[~RPwxU~ZOp~~",11,15),new r("[~RPrsU~ZOn~~",11,14),new r("!e~RQvwXwx!_~^Tc~Opmq!]m!^;'Sm;'S;=`!X<%lOm~pUOpmq!]m!]!^!S!^;'Sm;'S;=`!X<%lOm~!XOc~~![P;=`<%lm~!dOt~~",66,35),new r("!e~RQrsXvw^~^Or~~cTb~Oprq!]r!^;'Sr;'S;=`!^<%lOr~uUOprq!]r!]!^!X!^;'Sr;'S;=`!^<%lOr~!^Ob~~!aP;=`<%lr~",66,33)],topRules:{Content:[0,1],Attribute:[1,7]},tokenPrec:157}),P=u.parser.configure({top:"SingleExpression"}),m=c.configure({props:[o({Text:t.content,Is:t.definitionOperator,AttributeName:t.attributeName,VueAttributeName:t.keyword,Identifier:t.variableName,"AttributeValue ScriptAttributeValue":t.attributeValue,Entity:t.character,"{{ }}":t.brace,"@ :":t.punctuation})]}),b={parser:P},Q=m.configure({wrap:a((O, e)=>O.name=="InterpolationContent"?b:null)}),g=m.configure({wrap:a((O, e)=>O.name=="AttributeScript"?b:null),top:"Attribute"}),y={parser:Q},R={parser:g},n=l();function S(O){return O.configure({dialect:"selfClosing",wrap:a(X)},"vue")}var T=S(n.language);function X(O, e){switch(O.name){case"Attribute":return/^(@|:|v-)/.test(e.read(O.from,O.from+2))?R:null;case"Text":return y}return null}function C(O={}){let e=n;if(O.base){if(O.base.language.name!="html"||!(O.base.language instanceof i))throw new RangeError("The base option must be the result of calling html(...)");e=O.base}return new p(e.language==n.language?T:S(e.language),[e.support,e.language.data.of({closeBrackets:{brackets:["{",'"']}})])}export{C as vue,T as vueLanguage};
