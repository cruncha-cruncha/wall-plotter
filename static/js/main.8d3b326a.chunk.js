(this["webpackJsonpwall-plotter"]=this["webpackJsonpwall-plotter"]||[]).push([[0],{28:function(e,t,o){},33:function(e,t,o){},35:function(e,t,o){"use strict";o.r(t);var r=o(2),c=o.n(r),n=o(17),s=o.n(n),a=(o(28),o(5)),i=o(3),l=o(36),h=o(37),u=Object(a.b)({key:"fileContents",default:""});var f=o(0);var p=function(){var e={setFileContent:Object(a.f)(u)}.setFileContent,t=Object(r.useState)(null),o=Object(i.a)(t,2),c=o[0],n=o[1];return Object(f.jsxs)("div",{className:"mb-4",children:[Object(f.jsxs)("div",{className:"mb-3",children:[Object(f.jsx)(l.a,{for:"select-svg-input",children:"Select an SVG"}),Object(f.jsx)(h.a,{type:"file",id:"select-svg-input",accept:".svg",onChange:function(t){var o=URL.createObjectURL(t.target.files[0]);n(o);var r=new FileReader;r.onload=function(){e(r.result)},r.readAsText(t.target.files[0])}})]}),Object(f.jsx)("div",{className:"d-flex",children:Object(f.jsx)("div",{style:{border:"1px solid black",height:"402px",minWidth:"402px",overflowY:"scroll"},children:c&&Object(f.jsx)("img",{src:c,width:"400",alt:"selected img"})})})]})},d=o(38),b=o(7),y=o(4),j=Object(a.b)({key:"specs",default:{"step-resolution":"0.225","final-height":"20","spool-radius":"2","eye-to-eye":"101","specify-start-by-coors":!0,"initial-length-left":"42","initial-length-right":"124","initial-coors-x":"42","initial-coors-y":"58","tool-offset-x":"3","tool-offset-y":"2"}});var x=function(e){var t=e.label,o=e.actionType,r=e.specs,c=e.dispatch;return Object(f.jsxs)("div",{className:"row mb-3",children:[Object(f.jsx)("div",{className:"col-6 d-flex flex-row align-items-center",children:Object(f.jsx)(h.a,{id:o,type:"number",step:"any",value:r[o],onChange:function(e){return c({type:o,payload:e.target.value})}})}),Object(f.jsx)("div",{className:"col-6 d-flex flex-row align-items-center",children:Object(f.jsx)(l.a,{for:o,children:t})})]})},g=function(){var e=function(){var e=Object(a.d)(j),t=Object(i.a)(e,2),o=t[0],r=t[1];return{specs:o,dispatch:function(e){r(Object(y.a)(Object(y.a)({},o),{},Object(b.a)({},e.type,e.payload)))}}}(),t=e.specs,o=e.dispatch;return Object(f.jsxs)("div",{className:"specifications",children:[Object(f.jsx)("h2",{children:"Specifications"}),Object(f.jsx)("p",{children:"All values in cms unless otherwise specified."}),Object(f.jsx)(x,{label:"Step Resolution (degrees)",actionType:"step-resolution",specs:t,dispatch:o}),Object(f.jsx)(x,{label:"Output Height",actionType:"final-height",specs:t,dispatch:o}),Object(f.jsx)(x,{label:"Spool Radius",actionType:"spool-radius",specs:t,dispatch:o}),Object(f.jsx)(x,{label:"Eye-To-Eye",actionType:"eye-to-eye",specs:t,dispatch:o}),Object(f.jsx)("p",{children:"It's assumed that the plotter uses two strings, each with one end wound around a spool, travelling through an eye, and the other attached to a symmetrical tool holder. The program will start drawing from the upper-left corner of the image."}),Object(f.jsxs)(d.a,{tag:"fieldset",children:[Object(f.jsx)("legend",{children:"Initial Position"}),Object(f.jsx)(d.a,{check:!0,children:Object(f.jsxs)(l.a,{check:!0,children:[Object(f.jsx)(h.a,{type:"radio",onChange:function(){return o({type:"specify-start-by-coors",payload:!1})},checked:!t["specify-start-by-coors"]})," ","Specify by distance from eyes"]})}),Object(f.jsx)(d.a,{check:!0,children:Object(f.jsxs)(l.a,{check:!0,children:[Object(f.jsx)(h.a,{type:"radio",onChange:function(){return o({type:"specify-start-by-coors",payload:!0})},checked:t["specify-start-by-coors"]})," ","Specify by horizontal and vertical offset"]})})]}),t["specify-start-by-coors"]?Object(f.jsxs)(r.Fragment,{children:[Object(f.jsx)("p",{children:"Measure from the center of the left eye to the top left corner of the desired image location."}),Object(f.jsx)(x,{label:"Horizontal Offset",actionType:"initial-coors-x",specs:t,dispatch:o}),Object(f.jsx)(x,{label:"Vertical Offset",actionType:"initial-coors-y",specs:t,dispatch:o})]}):Object(f.jsxs)(r.Fragment,{children:[Object(f.jsx)("p",{children:"Measure from either the left or right eye to the corresponding tool holder terminus (where the string connects)."}),Object(f.jsx)(x,{label:"Left, initial distance",actionType:"initial-length-left",specs:t,dispatch:o}),Object(f.jsx)(x,{label:"Right, initial distance",actionType:"initial-length-right",specs:t,dispatch:o})]}),Object(f.jsx)("p",{children:'The left terminus is assumed to be above and to the left of the tool, while the right terminus is assumed to be above and to the right of the tool. "Horizontal Terminus Offset" is the horizontal distance between a terminus and the tool tip (it should be the same for both termini); "Vertical Terminus Offset" is the vertical distance between a terminus and the tool tip (should also be the same for both).'}),Object(f.jsx)(x,{label:"Horizontal Terminus Offset",actionType:"tool-offset-x",specs:t,dispatch:o}),Object(f.jsx)(x,{label:"Vertical Terminus Offset",actionType:"tool-offset-y",specs:t,dispatch:o})]})},O=o(39),v=o(13),m=o(8),w=o.n(m),k=o(15),M=Object(a.b)({key:"progress",default:[]}),L=Object(a.b)({key:"downloadBload",default:null}),N={"final-height":{upper:1e3,lower:1},"eye-to-eye":{upper:1e3,lower:1},"spool-radius":{upper:25,lower:0},"initial-length-left":{upper:1e3,lower:0},"initial-length-right":{upper:1e3,lower:0},"initial-coors-x":{upper:1e3,lower:0},"initial-coors-y":{upper:1e3,lower:0},"tool-offset-x":{upper:50,lower:0},"tool-offset-y":{upper:50,lower:0}},R=Object(a.c)({key:"coorErrors",get:function(e){var t=e.get,o=t(u),r=t(j);if(!o||!r)return{msg:"No image"};for(var c=Object.keys(r).reduce((function(e,t){return Object(y.a)(Object(y.a)({},e),{},Object(b.a)({},t,Number(r[t])))}),{}),n=0,s=Object.keys(N);n<s.length;n++){var a=s[n];if(!(a in c))return{spec:a,msg:"Missing ".concat(a," specification")}}for(var i=0,l=Object.keys(N);i<l.length;i++){var h=l[i];if(c[h]>N[h].upper)return{spec:h,msg:"".concat(h," is too high; max is ").concat(N[h].upper)};if(c[h]<N[h].lower)return{spec:h,msg:"".concat(h," is too low; minimum is ").concat(N[h].lower)}}return c["specify-start-by-coors"]&&c["initial-coors-x"]+2*c["tool-offset-x"]>c["eye-to-eye"]?{msg:"Specs are not physically valid"}:null}}),T=Object(a.c)({key:"coorsReady",get:function(e){return!(0,e.get)(R)}});function S(e){var t=e.eyeToEye,o=e.toolOffsetX,r=e.toolOffsetY,c=e.leftLength,n=e.rightLength;if(t<=0||o<0||r<0||c<0||n<0)return null;var s=t-2*o,a=Math.pow(n,2)-Math.pow(c,2)-Math.pow(s,2),i=4*Math.pow(s,2),l=-4*Math.pow(s,2)*Math.pow(c,2)+Math.pow(a,2),h=Math.sqrt(-4*i*l)/(2*i);return{x:Math.sqrt(Math.pow(c,2)-Math.pow(h,2))+o,y:h+r}}var E=Object(a.c)({key:"realCoors",get:function(e){var t=e.get,o=t(T),r=t(j),c=t(u);if(!o)return null;var n=Object.keys(r).reduce((function(e,t){return Object(y.a)(Object(y.a)({},e),{},Object(b.a)({},t,Number(r[t])))}),{}),s=function(e){return e/10},a=(new DOMParser).parseFromString(c,"application/xml"),l=Array.from(a.querySelectorAll("svg"))[0];if(l.getAttribute("viewBox")){var h=F(l.getAttribute("viewBox")),f=Object(i.a)(h,4),p=(f[0],f[1],f[2]),d=f[3],x=function(e){return e*(10*n["final-height"])/d};if(n["specify-start-by-coors"])return{spoolRadius:n["spool-radius"],leftEye:{x:0,y:0},rightEye:{x:n["eye-to-eye"],y:0},leftLine:{start:{x:0,y:0},end:{x:n["initial-coors-x"]-n["tool-offset-x"],y:n["initial-coors-y"]-n["tool-offset-y"]}},rightLine:{start:{x:n["eye-to-eye"],y:0},end:{x:n["initial-coors-x"]+n["tool-offset-x"],y:n["initial-coors-y"]-n["tool-offset-y"]}},outputRect:{x:n["initial-coors-x"],y:n["initial-coors-y"],width:s(x(p)),height:s(x(d))},totalWidth:n["eye-to-eye"],totalHeight:n["initial-coors-y"]+s(x(d))};var g=S({eyeToEye:n["eye-to-eye"],toolOffsetX:n["tool-offset-x"],toolOffsetY:n["tool-offset-y"],leftLength:n["initial-length-left"],rightLength:n["initial-length-right"]});if(!g)return null;if(isNaN(g.x)||isNaN(g.y))return null;var O=g.y-n["tool-offset-y"],v=O,m=g.x-n["tool-offset-x"],w=g.x+n["tool-offset-x"];return{spoolRadius:n["spool-radius"],leftEye:{x:0,y:0},rightEye:{x:n["eye-to-eye"],y:0},leftLine:{start:{x:0,y:0},end:{x:m,y:O}},rightLine:{start:{x:n["eye-to-eye"],y:0},end:{x:w,y:v}},outputRect:{x:m+n["tool-offset-x"],y:O+n["tool-offset-y"],width:s(x(p)),height:s(x(d))},totalWidth:n["eye-to-eye"],totalHeight:O+n["tool-offset-y"]+s(x(d))}}alert("SVG needs a viewBox")}}),C={"step-resolution":{upper:45,lower:.01}},P=Object(a.c)({key:"specErrors",get:function(e){var t=e.get,o=t(E),r=t(j);if(!o)return{msg:"Specs are not physically valid"};if(o.outputRect.x+o.outputRect.width>o.rightEye.x)return{msg:"Can't draw outside vertical bounds of eyes"};for(var c=Object.keys(r).reduce((function(e,t){return Object(y.a)(Object(y.a)({},e),{},Object(b.a)({},t,Number(r[t])))}),{}),n=0,s=Object.keys(C);n<s.length;n++){var a=s[n];if(!(a in c))return{spec:a,msg:"Missing ".concat(a," specification")}}for(var i=0,l=Object.keys(C);i<l.length;i++){var h=l[i];if(c[h]>C[h].upper)return{spec:h,msg:"".concat(h," is too high; max is ").concat(C[h].upper)};if(c[h]<C[h].lower)return{spec:h,msg:"".concat(h," is too low; minimum is ").concat(C[h].lower)}}return null}}),A=Object(a.c)({key:"specsReady",get:function(e){return!(0,e.get)(P)}}),F=function(e){return e.split(e.includes(",")?",":" ").map((function(e){return Number(e.trim())}))};var D=function(){var e=function(){var e=Object(a.f)(M),t=Object(a.e)(j),o=Object(a.e)(u),c=Object(a.e)(A),n=Object(a.e)(P),s=Object(a.e)(R),l=Object(a.e)(E),h=Object(a.d)(L),f=Object(i.a)(h,2),p=f[0],d=f[1],x=Object(r.useState)(""),g=Object(i.a)(x,2),O=g[0],m=g[1],N=function(e){return 10*e},T=function(){var r=Object(k.a)(w.a.mark((function r(){var n,s,a,h,u,f,p,j,x,g,O,M,L,R,T,E,C,P,A,D,B,H,q,W,I,Y,z,V,U,J,X,G,K,Q,Z,$,_,ee,te,oe,re;return w.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!c){r.next=71;break}return n=Object.keys(t).reduce((function(e,o){return Object(y.a)(Object(y.a)({},e),{},Object(b.a)({},o,Number(t[o])))}),{}),e([]),s=[],a=function(){var t=Object(k.a)(w.a.mark((function t(o){return w.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s.push(o),e([].concat(s)),t.next=4,new Promise((function(e){return setTimeout(e,0)}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),m(""),h=new DOMParser,u=h.parseFromString(o,"application/xml"),f=u.querySelector("svg"),p=F(f.getAttribute("viewBox")),(j=Object(i.a)(p,4))[0],j[1],j[2],x=j[3],g=Array.from(u.querySelectorAll("path")),r.next=13,a("Found ".concat(g.length," paths, of lengths:"));case 13:O=0;case 14:if(!(O<g.length)){r.next=20;break}return r.next=17,a("".concat(O,": ").concat(Math.round(100*g[O].getTotalLength())/100));case 17:O++,r.next=14;break;case 20:M=function(e){return e*N(n["final-height"])/x},L=function(e){return e*x/N(n["final-height"])},R=function(e){return{x:N(l.outputRect.x)+M(e.x),y:N(l.outputRect.y)+M(e.y)}},T=function(e,t,o){return Math.abs((o.x-e.x)*(e.y-t.y)-(e.x-t.x)*(o.y-e.y))/Math.sqrt(Math.pow(o.x-e.x,2)+Math.pow(o.y-e.y,2))},E=function(e,t){var o=A(e,t);return o>=20?7:o>=10?5:o>=5?3:o>=3?2:o>=1?1:0},C=function(e){var t=[],o=M(e.getTotalLength());if(t.push({speed:0,coor:R(e.getPointAtLength(0))}),o>2){var r=R(e.getPointAtLength(L(2)));if(t.push({speed:E(t[0].coor,r),coor:r}),o>4)for(var c=0,n=4,s=2;n<o;){var a=R(e.getPointAtLength(L(n)));T(t[c],t[c+1],a)<s?(t[c+1]={speed:E(t[c].coor,a),coor:a},s/=2):(c+=1,t.push({speed:E(t[c].coor,a),coor:a}),s=2),n+=2}}var i=R(e.getPointAtLength(e.getTotalLength()));return t.push({speed:E(t[t.length-1].coor,i),coor:i}),t},P=function(e){var t=e.actualLeftSteps,o=e.leftDirection,r=e.actualRightSteps,c=e.rightDirection,n=e.speeds,s=Math.max(t,r),a=0===t?0:s/t,i=0===r?0:s/r,l=new Array(s).fill(null).map((function(){return{s:0,l:0,r:0}}));if(n.current===n.top&&n.top===n.eventual)l.forEach((function(e){return e.s=n.top}));else if(n.current===n.top||n.top===n.eventual)for(var h=n.eventual-n.current,u=h/Math.abs(h),f=l.length/Math.abs(h),p=0;p<l.length;p++)l[p].s=n.current+u*Math.round(p/f);else{for(var d=Math.round(l.length/2),b=n.current,y=n.top-b,j=y/Math.abs(y),x=d/Math.abs(y),g=0;g<d;g++)l[g].s=b+j*Math.round(g/x);for(var O=d>0?l[d-1].s:n.current,v=n.eventual-O,m=v/Math.abs(v),w=(l.length-d)/Math.abs(v),k=d;k<l.length;k++)l[k].s=O+m*Math.round(k/w)}if(a>0&&i>0)for(var M=0,L=0,N=0;N<s;N++)N>=M&&(l[N].l=o,M+=a),N>=L&&(l[N].r=c,L+=i);else if(i<=0)for(var R=0,T=0;T<s;T++)T>=R&&(l[T].l=o,R+=a);else if(a<=0)for(var S=0,E=0;E<s;E++)E>=S&&(l[E].r=c,S+=i);return l},A=function(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))},D=N(2*Math.PI*n["spool-radius"]*n["step-resolution"]/360),B=1/D,H=function(e,t,o){var r={x:e.coor.x-N(n["tool-offset-x"]),y:e.coor.y-N(n["tool-offset-y"])},c={x:t.coor.x-N(n["tool-offset-x"]),y:t.coor.y-N(n["tool-offset-y"])},s={x:e.coor.x+N(n["tool-offset-x"]),y:e.coor.y-N(n["tool-offset-y"])},a={x:t.coor.x+N(n["tool-offset-x"]),y:t.coor.y-N(n["tool-offset-y"])},i=A({x:0,y:0},c)-A({x:0,y:0},r),l=A({x:N(n["eye-to-eye"]),y:0},a)-A({x:N(n["eye-to-eye"]),y:0},s),h=Math.round(Math.abs(i)*B),u=Math.round(Math.abs(l)*B),f=0===h?0:i/Math.abs(i),p=0===u?0:l/Math.abs(l),d=A({x:0,y:0},r)+h*D*f,b=A({x:N(n["eye-to-eye"]),y:0},s)+u*D*p,y=P({actualLeftSteps:h,leftDirection:f,actualRightSteps:u,rightDirection:p,speeds:{current:e.speed,top:t.speed,eventual:Math.min(t.speed,o)}});return{pulses:y,newCurrent:{speed:y&&y.length>0?y[y.length-1].s:e.speed,coor:S({eyeToEye:N(n["eye-to-eye"]),toolOffsetX:N(n["tool-offset-x"]),toolOffsetY:N(n["tool-offset-y"]),leftLength:d,rightLength:b})}}},(q={}).start={speed:0,coor:{x:N(l.outputRect.x),y:N(l.outputRect.y)}},I=0;case 34:if(!(I<g.length)){r.next=44;break}return W=Date.now(),Y="path-".concat(I),q[Y]=C(g[I]),z=Date.now(),r.next=41,a("path ".concat(I," converted to coors (").concat(z-W," ms)"));case 41:I++,r.next=34;break;case 44:for(V=0;V<g.length;V++)U=0===V?q.start.coor:q["path-".concat(V-1)][q["path-".concat(V-1)].length-1].coor,J=q["path-".concat(V)][0],q["path-".concat(V)][0].speed=E(U,J);X=[],G=q.start,K=0;case 48:if(!(K<g.length)){r.next=68;break}W=Date.now(),Q=0;case 51:if(!(Q<q["path-".concat(K)].length)){r.next=62;break}if(Z=Q+1>=q["path-".concat(K)].length?K+1>=g.length?0:q["path-".concat(K+1)][0].speed:q["path-".concat(K)][Q+1].speed,$=q["path-".concat(K)][Q],_=H(G,$,Z),ee=_.newCurrent,te=_.pulses,ee.coor){r.next=57;break}return r.abrupt("return",null);case 57:G=ee,X=[].concat(Object(v.a)(X),Object(v.a)(te));case 59:Q++,r.next=51;break;case 62:return oe=Date.now(),r.next=65,a("path ".concat(K," converted to pulses (").concat(oe-W," ms)"));case 65:K++,r.next=48;break;case 68:re={stepsPerSecond:2/(n["step-resolution"]/360*n["spool-radius"]*2*Math.PI),pulses:X},d(new Blob([JSON.stringify(re)],{type:"text/plain"}));case 71:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();return Object(r.useEffect)((function(){m(p?URL.createObjectURL(p):"")}),[p]),{specErrors:n,coorErrors:s,ready:c,go:T,downloadHref:O}}(),t=e.specErrors,o=e.coorErrors,c=e.ready,n=e.go,s=e.downloadHref;return Object(f.jsxs)("div",{className:"row",children:[Object(f.jsx)("div",{className:"col-12",children:Object(f.jsx)("div",{className:"my-2",children:o?Object(f.jsx)("span",{className:"text-danger",children:o.msg}):t?Object(f.jsx)("span",{className:"text-danger",children:t.msg}):null})}),Object(f.jsx)("div",{className:"col-12",children:Object(f.jsx)(O.a,{disabled:!c,onClick:n,children:"Calc motor control"})}),Object(f.jsx)("div",{className:"col-12 my-3",children:""!==s&&Object(f.jsx)("a",{href:s,download:"motorControl.json",children:"download"})})]})};var B=function(){var e=function(){var e=Object(a.e)(E),t=Object(r.useState)(null),o=Object(i.a)(t,2),c=o[0],n=o[1];return Object(r.useEffect)((function(){if(e){var t=Object(f.jsxs)("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:"400",viewBox:"-".concat(20," -").concat(20," ").concat(e.totalWidth+40," ").concat(e.totalHeight+40),children:[Object(f.jsx)("line",{x1:e.leftLine.start.x,y1:e.leftLine.start.y,x2:e.leftLine.end.x,y2:e.leftLine.end.y,style:{stroke:"black",strokeWidth:1}}),Object(f.jsx)("line",{x1:e.rightLine.start.x,y1:e.rightLine.start.y,x2:e.rightLine.end.x,y2:e.rightLine.end.y,style:{stroke:"black",strokeWidth:1}}),Object(f.jsx)("rect",{x:e.outputRect.x,y:e.outputRect.y,width:e.outputRect.width,height:e.outputRect.height,style:{fill:"blue"}}),Object(f.jsx)("circle",{cx:e.leftEye.x,cy:e.leftEye.y,r:e.spoolRadius,fill:"black"}),Object(f.jsx)("circle",{cx:e.rightEye.x,cy:e.rightEye.y,r:e.spoolRadius,fill:"black"})]});n(t)}else n(null)}),[e]),{svg:c}}().svg;return Object(f.jsxs)("div",{className:"mb-4",children:[Object(f.jsx)("div",{className:"mb-2",children:Object(f.jsx)("span",{children:"Preview"})}),Object(f.jsx)("div",{className:"d-flex",children:Object(f.jsx)("div",{style:{border:"1px solid black",height:"402px",minWidth:"402px",overflowY:"scroll"},children:e})})]})};var H=function(){var e={progress:Object(a.e)(M)}.progress;return Object(f.jsxs)("div",{children:[Object(f.jsx)("div",{className:"mb-2",children:Object(f.jsx)("span",{children:"Progress"})}),Object(f.jsx)("div",{className:"d-flex",children:Object(f.jsx)("div",{style:{border:"1px solid black",height:"402px",width:"402px",overflowY:"scroll",padding:"10px"},children:e.map((function(e){return Object(f.jsx)("div",{children:Object(f.jsxs)("span",{children:["> ",e]})},e)}))})})]})};o(33);var q=function(){return Object(f.jsx)(a.a,{children:Object(f.jsx)("div",{className:"container my-5",children:Object(f.jsxs)("div",{className:"row",children:[Object(f.jsxs)("div",{className:"col-lg-6",children:[Object(f.jsx)(p,{}),Object(f.jsx)(B,{}),Object(f.jsx)(H,{})]}),Object(f.jsxs)("div",{className:"col-lg-6",children:[Object(f.jsx)(g,{}),Object(f.jsx)(D,{})]})]})})})},W=function(e){e&&e instanceof Function&&o.e(3).then(o.bind(null,40)).then((function(t){var o=t.getCLS,r=t.getFID,c=t.getFCP,n=t.getLCP,s=t.getTTFB;o(e),r(e),c(e),n(e),s(e)}))};o(34);s.a.render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(q,{})}),document.getElementById("root")),W()}},[[35,1,2]]]);
//# sourceMappingURL=main.8d3b326a.chunk.js.map