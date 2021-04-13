(this["webpackJsonpwall-plotter"]=this["webpackJsonpwall-plotter"]||[]).push([[0],{29:function(e,t,r){},34:function(e,t,r){},36:function(e,t,r){"use strict";r.r(t);var o=r(2),c=r.n(o),s=r(18),n=r.n(s),i=(r(29),r(6)),a=r(4),l=r(37),f=r(38),h=Object(i.b)({key:"fileContents",default:""});var u=r(0);var p=function(){var e={setFileContent:Object(i.f)(h)}.setFileContent,t=Object(o.useState)(null),r=Object(a.a)(t,2),c=r[0],s=r[1];return Object(u.jsxs)("div",{className:"mb-4",children:[Object(u.jsxs)("div",{className:"mb-3",children:[Object(u.jsx)(l.a,{for:"select-svg-input",children:"Select an SVG"}),Object(u.jsx)(f.a,{type:"file",id:"select-svg-input",accept:".svg",onChange:function(t){var r=URL.createObjectURL(t.target.files[0]);s(r);var o=new FileReader;o.onload=function(){e(o.result)},o.readAsText(t.target.files[0])}})]}),Object(u.jsx)("div",{className:"d-flex",children:Object(u.jsx)("div",{style:{border:"1px solid black",height:"402px",minWidth:"402px",overflowY:"scroll"},children:c&&Object(u.jsx)("img",{src:c,width:"400",alt:"selected img"})})})]})},d=r(39),b=r(8),j=r(5),y=Object(i.b)({key:"specs",default:{"step-resolution":"1.8","final-height":"60","spool-radius":"2","eye-to-eye":"150","specify-start-by-coors":!1,"initial-length-left":"42","initial-length-right":"124","initial-coors-x":"30","initial-coors-y":"30","tool-offset-x":"2","tool-offset-y":"1.5"}});var x=function(e){var t=e.label,r=e.actionType,o=e.specs,c=e.dispatch;return Object(u.jsxs)("div",{className:"row mb-3",children:[Object(u.jsx)("div",{className:"col-6 d-flex flex-row align-items-center",children:Object(u.jsx)(f.a,{id:r,type:"number",step:"any",value:o[r],onChange:function(e){return c({type:r,payload:e.target.value})}})}),Object(u.jsx)("div",{className:"col-6 d-flex flex-row align-items-center",children:Object(u.jsx)(l.a,{for:r,children:t})})]})},g=function(){var e=function(){var e=Object(i.d)(y),t=Object(a.a)(e,2),r=t[0],o=t[1];return{specs:r,dispatch:function(e){o(Object(j.a)(Object(j.a)({},r),{},Object(b.a)({},e.type,e.payload)))}}}(),t=e.specs,r=e.dispatch;return Object(u.jsxs)("div",{className:"specifications",children:[Object(u.jsx)("h2",{children:"Specifications"}),Object(u.jsx)("p",{children:"All values in cms unless otherwise specified."}),Object(u.jsx)(x,{label:"Step Resolution (degrees)",actionType:"step-resolution",specs:t,dispatch:r}),Object(u.jsx)(x,{label:"Output Height",actionType:"final-height",specs:t,dispatch:r}),Object(u.jsx)(x,{label:"Spool Radius",actionType:"spool-radius",specs:t,dispatch:r}),Object(u.jsx)(x,{label:"Eye-To-Eye",actionType:"eye-to-eye",specs:t,dispatch:r}),Object(u.jsx)("p",{children:"It's assumed that the plotter uses two strings, each with one end wound around a spool, travelling through an eye, and the other attached to a symmetrical tool holder. The program will start drawing from the upper-left corner of the image."}),Object(u.jsxs)(d.a,{tag:"fieldset",children:[Object(u.jsx)("legend",{children:"Initial Position"}),Object(u.jsx)(d.a,{check:!0,children:Object(u.jsxs)(l.a,{check:!0,children:[Object(u.jsx)(f.a,{type:"radio",onChange:function(){return r({type:"specify-start-by-coors",payload:!1})},checked:!t["specify-start-by-coors"]})," ","Specify by distance from spools"]})}),Object(u.jsx)(d.a,{check:!0,children:Object(u.jsxs)(l.a,{check:!0,children:[Object(u.jsx)(f.a,{type:"radio",onChange:function(){return r({type:"specify-start-by-coors",payload:!0})},checked:t["specify-start-by-coors"]})," ","Specify by horizontal and vertical offset"]})})]}),t["specify-start-by-coors"]?Object(u.jsxs)(o.Fragment,{children:[Object(u.jsx)("p",{children:"Measure from the center of the left eye to the top left corner of the desired image location."}),Object(u.jsx)(x,{label:"Horizontal Offset",actionType:"initial-coors-x",specs:t,dispatch:r}),Object(u.jsx)(x,{label:"Vertical Offset",actionType:"initial-coors-y",specs:t,dispatch:r})]}):Object(u.jsxs)(o.Fragment,{children:[Object(u.jsx)("p",{children:"Measure from either the left or right eye to the corresponding tool holder terminus (where the string connects)."}),Object(u.jsx)(x,{label:"Left, initial distance",actionType:"initial-length-left",specs:t,dispatch:r}),Object(u.jsx)(x,{label:"Right, initial distance",actionType:"initial-length-right",specs:t,dispatch:r})]}),Object(u.jsx)("p",{children:'The left terminus is assumed to be above and to the left of the tool, while the right terminus is assumed to be above and to the right of the tool. "Horizontal Terminus Offset" is the horizontal distance between a terminus and the tool tip (it should be the same for both termini); "Vertical Terminus Offset" is the vertical distance between a terminus and the tool tip (should also be the same for both).'}),Object(u.jsx)(x,{label:"Horizontal Terminus Offset",actionType:"tool-offset-x",specs:t,dispatch:r}),Object(u.jsx)(x,{label:"Vertical Terminus Offset",actionType:"tool-offset-y",specs:t,dispatch:r})]})},O=r(40),v=r(14),m=r(3),w=r(9),k=r.n(w),L=r(16),M=Object(i.b)({key:"progress",default:[]}),N=Object(i.b)({key:"downloadBload",default:null}),R={"final-height":{upper:1e3,lower:1},"eye-to-eye":{upper:1e3,lower:1},"spool-radius":{upper:25,lower:0},"initial-length-left":{upper:1e3,lower:0},"initial-length-right":{upper:1e3,lower:0},"initial-coors-x":{upper:1e3,lower:0},"initial-coors-y":{upper:1e3,lower:0},"tool-offset-x":{upper:50,lower:0},"tool-offset-y":{upper:50,lower:0}},T=Object(i.c)({key:"coorErrors",get:function(e){var t=e.get,r=t(h),o=t(y);if(!r||!o)return{msg:"No image"};for(var c=Object.keys(o).reduce((function(e,t){return Object(j.a)(Object(j.a)({},e),{},Object(b.a)({},t,Number(o[t])))}),{}),s=0,n=Object.keys(R);s<n.length;s++){var i=n[s];if(!(i in c))return{spec:i,msg:"Missing ".concat(i," specification")}}for(var a=0,l=Object.keys(R);a<l.length;a++){var f=l[a];if(c[f]>R[f].upper)return{spec:f,msg:"".concat(f," is too high; max is ").concat(R[f].upper)};if(c[f]<R[f].lower)return{spec:f,msg:"".concat(f," is too low; minimum is ").concat(R[f].lower)}}return c["specify-start-by-coors"]&&c["initial-coors-x"]+2*c["tool-offset-x"]>c["eye-to-eye"]?{msg:"Specs are not physically valid"}:null}}),S=Object(i.c)({key:"coorsReady",get:function(e){return!(0,e.get)(T)}});function E(e){var t=e.eyeToEye,r=e.toolOffsetX,o=e.toolOffsetY,c=e.leftLength,s=e.rightLength;if(t<=0||r<0||o<0||c<0||s<0)return null;var n=t-2*r,i=Math.pow(s,2)-Math.pow(c,2)-Math.pow(n,2),a=4*Math.pow(n,2),l=-4*Math.pow(n,2)*Math.pow(c,2)+Math.pow(i,2),f=Math.sqrt(-4*a*l)/(2*a);return{x:Math.sqrt(Math.pow(c,2)-Math.pow(f,2))+r,y:f+o}}var C=Object(i.c)({key:"realCoors",get:function(e){var t=e.get,r=t(S),o=t(y),c=t(h);if(!r)return null;var s=Object.keys(o).reduce((function(e,t){return Object(j.a)(Object(j.a)({},e),{},Object(b.a)({},t,Number(o[t])))}),{}),n=function(e){return e/10},i=(new DOMParser).parseFromString(c,"application/xml"),l=Array.from(i.querySelectorAll("svg"))[0];if(l.getAttribute("viewBox")){var f=l.getAttribute("viewBox").split(" "),u=Object(a.a)(f,4),p=(u[0],u[1],u[2]),d=u[3],x=function(e){return e*(10*s["final-height"])/d};if(s["specify-start-by-coors"])return{spoolRadius:s["spool-radius"],leftEye:{x:0,y:0},rightEye:{x:s["eye-to-eye"],y:0},leftLine:{start:{x:0,y:0},end:{x:s["initial-coors-x"]-s["tool-offset-x"],y:s["initial-coors-y"]-s["tool-offset-y"]}},rightLine:{start:{x:s["eye-to-eye"],y:0},end:{x:s["initial-coors-x"]+s["tool-offset-x"],y:s["initial-coors-y"]-s["tool-offset-y"]}},outputRect:{x:s["initial-coors-x"],y:s["initial-coors-y"],width:n(x(p)),height:n(x(d))},totalWidth:s["eye-to-eye"],totalHeight:s["initial-coors-y"]+n(x(d))};var g=E({eyeToEye:s["eye-to-eye"],toolOffsetX:s["tool-offset-x"],toolOffsetY:s["tool-offset-y"],leftLength:s["initial-length-left"],rightLength:s["initial-length-right"]});if(!g)return null;if(isNaN(g.x)||isNaN(g.y))return null;var O=g.y-s["tool-offset-y"],v=O,m=g.x-s["tool-offset-x"],w=g.x+s["tool-offset-x"];return{spoolRadius:s["spool-radius"],leftEye:{x:0,y:0},rightEye:{x:s["eye-to-eye"],y:0},leftLine:{start:{x:0,y:0},end:{x:m,y:O}},rightLine:{start:{x:s["eye-to-eye"],y:0},end:{x:w,y:v}},outputRect:{x:m+s["tool-offset-x"],y:O+s["tool-offset-y"],width:n(x(p)),height:n(x(d))},totalWidth:s["eye-to-eye"],totalHeight:O+s["tool-offset-y"]+n(x(d))}}alert("SVG needs a viewBox")}}),A={"step-resolution":{upper:45,lower:.01}},P=Object(i.c)({key:"specErrors",get:function(e){var t=e.get,r=t(C),o=t(y);if(!r)return{msg:"Specs are not physically valid"};if(r.outputRect.x+r.outputRect.width>r.rightEye.x)return{msg:"Can't draw outside vertical bounds of eyes"};for(var c=Object.keys(o).reduce((function(e,t){return Object(j.a)(Object(j.a)({},e),{},Object(b.a)({},t,Number(o[t])))}),{}),s=0,n=Object.keys(A);s<n.length;s++){var i=n[s];if(!(i in c))return{spec:i,msg:"Missing ".concat(i," specification")}}for(var a=0,l=Object.keys(A);a<l.length;a++){var f=l[a];if(c[f]>A[f].upper)return{spec:f,msg:"".concat(f," is too high; max is ").concat(A[f].upper)};if(c[f]<A[f].lower)return{spec:f,msg:"".concat(f," is too low; minimum is ").concat(A[f].lower)}}return null}}),F=Object(i.c)({key:"specsReady",get:function(e){return!(0,e.get)(P)}});var D=function(){var e=function(){var e=Object(i.f)(M),t=Object(i.e)(y),r=Object(i.e)(h),c=Object(i.e)(F),s=Object(i.e)(P),n=Object(i.e)(T),l=Object(i.e)(C),f=Object(i.d)(N),u=Object(a.a)(f,2),p=u[0],d=u[1],x=Object(o.useState)(""),g=Object(a.a)(x,2),O=g[0],w=g[1],R=function(e){return 10*e},S=function(){var o=Object(L.a)(k.a.mark((function o(){var s,n,i,f,h,u,p,y,x,g,O,w,M,N,T,S,C,A,P,F,D,B,H,q,W,Y,z,I,V,U,J,X,G,K,Q,Z;return k.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(!c){o.next=74;break}return s=Object.keys(t).reduce((function(e,r){return Object(j.a)(Object(j.a)({},e),{},Object(b.a)({},r,Number(t[r])))}),{}),e([]),n=[],i=function(){var t=Object(L.a)(k.a.mark((function t(r){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.push(r),e([].concat(n)),t.next=4,new Promise((function(e){return setTimeout(e,0)}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),f=new DOMParser,h=f.parseFromString(r,"application/xml"),u=h.querySelector("svg"),p=u.getAttribute("viewBox").split(" "),(y=Object(a.a)(p,4))[0],y[1],y[2],x=y[3],g=Array.from(h.querySelectorAll("path")),o.next=12,i("Found ".concat(g.length," paths, of lengths:"));case 12:O=0;case 13:if(!(O<g.length)){o.next=19;break}return o.next=16,i("".concat(O,": ").concat(Math.round(100*g[O].getTotalLength())/100));case 16:O++,o.next=13;break;case 19:w=function(e){return e*R(s["final-height"])/x},M=function(e){return e*x/R(s["final-height"])},N=function(e){return{x:R(l.outputRect.x)+w(e.x),y:R(l.outputRect.y)+w(e.y)}},T=function(e,t,r){return Math.abs((r.x-e.x)*(e.y-t.y)-(e.x-t.x)*(r.y-e.y))/Math.sqrt(Math.pow(r.x-e.x,2)+Math.pow(r.y-e.y,2))},S=function(e){var t=[],r=w(e.getTotalLength());if(t.push(N(e.getPointAtLength(0))),r>2&&(t.push(N(e.getPointAtLength(M(2)))),r>4))for(var o=0,c=4,s=2;c<r;){var n=N(e.getPointAtLength(M(c)));T(t[o],t[o+1],n)<s?(t[o+1]=n,s/=2):(o+=1,t.push(n),s=2),c+=2}return t.push(N(e.getPointAtLength(e.getTotalLength()))),t},C=function(e){var t=e.actualLeftSteps,r=e.leftDirection,o=e.actualRightSteps,c=e.rightDirection,s=Math.max(t,o),n=0===t?0:s/t,i=0===o?0:s/o,a=new Array(s).fill(null).map((function(){return{l:0,r:0}}));if(n>0&&i>0)for(var l=0,f=0,h=0;h<s;h++)h>=l&&(a[h].l=r,l+=n),h>=f&&(a[h].r=c,f+=i);else if(i<=0)for(var u=0,p=0;p<s;p++)p>=u&&(a[p].l=r,u+=n);else if(n<=0)for(var d=0,b=0;b<s;b++)b>=d&&(a[b].r=c,d+=i);return a},A=function(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))},P=R(2*Math.PI*s["spool-radius"]*s["step-resolution"]/360),F=1/P,D=function(e,t){var r={x:e.x-R(s["tool-offset-x"]),y:e.y-R(s["tool-offset-y"])},o={x:t.x-R(s["tool-offset-x"]),y:t.y-R(s["tool-offset-y"])},c={x:e.x+R(s["tool-offset-x"]),y:e.y-R(s["tool-offset-y"])},n={x:t.x+R(s["tool-offset-x"]),y:t.y-R(s["tool-offset-y"])},i=A({x:0,y:0},o)-A({x:0,y:0},r),a=A({x:R(s["eye-to-eye"]),y:0},n)-A({x:R(s["eye-to-eye"]),y:0},c),l=Math.round(Math.abs(i)*F),f=Math.round(Math.abs(a)*F),h=0===l?0:i/Math.abs(i),u=0===f?0:a/Math.abs(a),p=A({x:0,y:0},r)+l*P*h,d=A({x:R(s["eye-to-eye"]),y:0},c)+f*P*u;return{pulses:C({actualLeftSteps:l,leftDirection:h,actualRightSteps:f,rightDirection:u}),newCurrent:E({eyeToEye:R(s["eye-to-eye"]),toolOffsetX:R(s["tool-offset-x"]),toolOffsetY:R(s["tool-offset-y"]),leftLength:p,rightLength:d})}},(B={}).start={x:R(l.outputRect.x),y:R(l.outputRect.y)},q=0;case 32:if(!(q<g.length)){o.next=42;break}return H=Date.now(),W="path-".concat(q),B[W]=S(g[q]),Y=Date.now(),o.next=39,i("path ".concat(q," converted to coors (").concat(Y-H," ms)"));case 39:q++,o.next=32;break;case 42:z=[],I=B.start,V=0;case 45:if(!(V<g.length)){o.next=73;break}H=Date.now(),U=Object(m.a)(B["path-".concat(V)]),o.prev=48,U.s();case 50:if((J=U.n()).done){o.next=59;break}if(X=J.value,G=D(I,X),K=G.newCurrent,Q=G.pulses,K){o.next=55;break}return o.abrupt("return",null);case 55:I=K,z=[].concat(Object(v.a)(z),Object(v.a)(Q));case 57:o.next=50;break;case 59:o.next=64;break;case 61:o.prev=61,o.t0=o.catch(48),U.e(o.t0);case 64:return o.prev=64,U.f(),o.finish(64);case 67:return Z=Date.now(),o.next=70,i("path ".concat(V," converted to pulses (").concat(Z-H," ms)"));case 70:V++,o.next=45;break;case 73:d(new Blob([JSON.stringify(z)],{type:"text/plain"}));case 74:case"end":return o.stop()}}),o,null,[[48,61,64,67]])})));return function(){return o.apply(this,arguments)}}();return Object(o.useEffect)((function(){p&&w(URL.createObjectURL(p))}),[p]),{specErrors:s,coorErrors:n,ready:c,go:S,downloadHref:O}}(),t=e.specErrors,r=e.coorErrors,c=e.ready,s=e.go,n=e.downloadHref;return Object(u.jsxs)("div",{className:"row",children:[Object(u.jsx)("div",{className:"col-12",children:Object(u.jsx)("div",{className:"my-2",children:r?Object(u.jsx)("span",{className:"text-danger",children:r.msg}):t?Object(u.jsx)("span",{className:"text-danger",children:t.msg}):null})}),Object(u.jsx)("div",{className:"col-12",children:Object(u.jsx)(O.a,{disabled:!c,onClick:s,children:"Calc motor control"})}),Object(u.jsx)("div",{className:"col-12 my-3",children:""!==n&&Object(u.jsx)("a",{href:n,download:"motorControl.json",children:"download"})})]})};var B=function(){var e=function(){var e=Object(i.e)(C),t=Object(o.useState)(null),r=Object(a.a)(t,2),c=r[0],s=r[1];return Object(o.useEffect)((function(){if(e){var t=Object(u.jsxs)("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:"400",viewBox:"-".concat(20," -").concat(20," ").concat(e.totalWidth+40," ").concat(e.totalHeight+40),children:[Object(u.jsx)("line",{x1:e.leftLine.start.x,y1:e.leftLine.start.y,x2:e.leftLine.end.x,y2:e.leftLine.end.y,style:{stroke:"black",strokeWidth:1}}),Object(u.jsx)("line",{x1:e.rightLine.start.x,y1:e.rightLine.start.y,x2:e.rightLine.end.x,y2:e.rightLine.end.y,style:{stroke:"black",strokeWidth:1}}),Object(u.jsx)("rect",{x:e.outputRect.x,y:e.outputRect.y,width:e.outputRect.width,height:e.outputRect.height,style:{fill:"blue"}}),Object(u.jsx)("circle",{cx:e.leftEye.x,cy:e.leftEye.y,r:e.spoolRadius,fill:"black"}),Object(u.jsx)("circle",{cx:e.rightEye.x,cy:e.rightEye.y,r:e.spoolRadius,fill:"black"})]});s(t)}else s(null)}),[e]),{svg:c}}().svg;return Object(u.jsxs)("div",{className:"mb-4",children:[Object(u.jsx)("div",{className:"mb-2",children:Object(u.jsx)("span",{children:"Preview"})}),Object(u.jsx)("div",{className:"d-flex",children:Object(u.jsx)("div",{style:{border:"1px solid black",height:"402px",minWidth:"402px",overflowY:"scroll"},children:e})})]})};var H=function(){var e={progress:Object(i.e)(M)}.progress;return Object(u.jsxs)("div",{children:[Object(u.jsx)("div",{className:"mb-2",children:Object(u.jsx)("span",{children:"Progress"})}),Object(u.jsx)("div",{className:"d-flex",children:Object(u.jsx)("div",{style:{border:"1px solid black",height:"402px",width:"402px",overflowY:"scroll",padding:"10px"},children:e.map((function(e){return Object(u.jsx)("div",{children:Object(u.jsxs)("span",{children:["> ",e]})},e)}))})})]})};r(34);var q=function(){return Object(u.jsx)(i.a,{children:Object(u.jsx)("div",{className:"container my-5",children:Object(u.jsxs)("div",{className:"row",children:[Object(u.jsxs)("div",{className:"col-lg-6",children:[Object(u.jsx)(p,{}),Object(u.jsx)(B,{}),Object(u.jsx)(H,{})]}),Object(u.jsxs)("div",{className:"col-lg-6",children:[Object(u.jsx)(g,{}),Object(u.jsx)(D,{})]})]})})})},W=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,41)).then((function(t){var r=t.getCLS,o=t.getFID,c=t.getFCP,s=t.getLCP,n=t.getTTFB;r(e),o(e),c(e),s(e),n(e)}))};r(35);n.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(q,{})}),document.getElementById("root")),W()}},[[36,1,2]]]);
//# sourceMappingURL=main.edfe2d31.chunk.js.map