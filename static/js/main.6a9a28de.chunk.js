(this.webpackJsonpcolorpuzzle=this.webpackJsonpcolorpuzzle||[]).push([[0],{35:function(t,e,n){"use strict";n.r(e);var r,a,o=n(0),c=n.n(o),i=n(11),u=n.n(i),s=n(5),l=n(37),d=n(6),h=function(t){return Math.floor(Math.random()*t)},b=function(t){return t[h(t.length)]},f=function(t,e){return 0===e?t:(t%e+e)%e};!function(t){t[t.North=0]="North",t[t.East=1]="East",t[t.South=2]="South",t[t.West=3]="West"}(a||(a={}));var x,g,p=function(t,e){return{x:t%e,y:Math.floor(t/e)}},y=function(t,e){return t.x===e.x&&t.y===e.y},j=function(t,e,n,r){var a=function(t,e){return{x:t.x+e.x,y:t.y+e.y}}(t,e),o=a.x,c=a.y;return{x:f(o,n),y:f(c,r)}},m=function(t,e,n){return[e,n].map((function(e){return function(t,e){var n=function(t,e){return{x:t.x-e.x,y:t.y-e.y}}(t,e),r=n.x,o=n.y;return-1===r||r>1?a.West:1===r||r<-1?a.East:-1===o||o>1?a.North:a.South}(e,t)}))},O=function(t,e){return t.map((function(t){return(t+e)%4}))},v=(r={},Object(d.a)(r,a.North,{x:0,y:-1}),Object(d.a)(r,a.East,{x:1,y:0}),Object(d.a)(r,a.South,{x:0,y:1}),Object(d.a)(r,a.West,{x:-1,y:0}),r),w=.2761,k=(x={},Object(d.a)(x,a.North,{x:.5,y:0,cx:.5,cy:w}),Object(d.a)(x,a.East,{x:1,y:.5,cx:.7239,cy:.5}),Object(d.a)(x,a.South,{x:.5,y:1,cx:.5,cy:.7239}),Object(d.a)(x,a.West,{x:0,y:.5,cx:w,cy:.5}),x),S=["#d10","#12e","#080","#eb0"],I=function(t){var e=k[t[0]],n=k[t[1]];return"M ".concat(e.x," ").concat(e.y," C ").concat(e.cx," ").concat(e.cy,", ").concat(n.cx," ").concat(n.cy,", ").concat(n.x," ").concat(n.y)},z=function(t,e){return'<path stroke="'.concat(S[t],'" d="').concat(I(e),'"/>')},C=n(1),M={backgroundSize:"cover",strokeWidth:.5,"& path":{"mix-blend-mode":"screen"},"& g":{transition:"all .2s ease-in-out"}},E=function(t){var e=t.tile,n=e.x,r=e.y,a=e.strokes,o=e.rotation,c=t.onClick,i=t.onRightClick;return Object(C.a)("svg",{x:n,y:r,css:M,onClick:c,onContextMenu:i,pointerEvents:"all",children:Object(C.b)("g",{transform:"rotate(".concat(90*o," .5 .5)"),children:[a.map((function(t){var e=t.color,n=t.exits;return Object(C.a)("path",{stroke:S[e],d:I(n)})})),Object(C.a)("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:"none"})]})})},T=function(t,e,n,r){return{display:"block",gridTemplateColumns:"repeat(".concat(t,", 1fr)"),gridTemplateRows:"repeat(".concat(e,", 1fr)"),width:n*t,height:n*e,background:r?"rgba(0,0,0,.8)":"rgba(0,0,0,0)",padding:r?32:0,transform:r?"scale(.75)":"scale(1)",borderRadius:r?64:0,opacity:r?1:.8,transition:"all 1s ease-in-out"}},B=function(t){var e=t.map,n=t.width,r=t.height,a=t.rotateTile,o=t.tileSize,c=t.isSolved,i=void 0!==c&&c;return Object(C.a)("svg",{viewBox:"0 0 ".concat(n," ").concat(r),css:T(n,r,o,i),children:e.map((function(t){return Object(C.a)(E,{tile:t,onRightClick:function(e){e.preventDefault(),!i&&a(t,-1)},onClick:function(){!i&&a(t,1)}},"".concat(t.x,",").concat(t.y))}))})},W=n(19),N=n(2),P=n(9),R=function(t,e){return t.map((function(n,r){var a=0===r?t[t.length-1]:t[r-1],o=r===t.length-1?t[0]:t[r+1],c=m(n,a,o);return{x:n.x,y:n.y,stroke:{exits:c,color:e}}}))},D=function(t,e,n){for(var r=!1,a=[],o=Math.min(t+e,t*e-1),c=function(){var n=!0,c={x:h(t),y:h(e)};for(a=[c];!r&&n;){var i=[[-1,0],[1,0],[0,-1],[0,1]].map((function(n){var r=Object(W.a)(n,2),a=r[0],o=r[1];return j(c,{x:a,y:o},t,e)})).filter((function(t){return a.every((function(e,n){return 0===n&&a.length>o||!y(e,t)}))}));i.length>0?(c=b(i),y(a[0],c)?r=!0:a.push(c)):n=!1}};!r;)c();return R(a,n)},A=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=[].concat(Object(P.a)(D(t,e,0)),Object(P.a)(D(t,e,1)),Object(P.a)(D(t,e,2)),Object(P.a)(D(t,e,3)));return Array.from({length:t*e},(function(e,a){var o=p(a,t),c=r.filter((function(t){return y(t,o)})).map((function(t){return t.stroke}));return Object(N.a)(Object(N.a)({},o),{},{strokes:c,rotation:n?Math.floor(16*Math.random()):0})}))},F=function(){var t=[].concat(Object(P.a)(R([{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:3,y:1},{x:2,y:1},{x:1,y:1},{x:0,y:1}],h(4))),Object(P.a)(R([{x:1,y:0},{x:2,y:0},{x:2,y:1},{x:2,y:2},{x:2,y:3},{x:1,y:3},{x:1,y:2},{x:1,y:1}],h(4))));return Array.from({length:16},(function(e,n){var r=p(n,4),a=t.filter((function(t){return y(t,r)})).map((function(t){return t.stroke}));return Object(N.a)(Object(N.a)({},r),{},{strokes:a,rotation:0})}))},X=n(4),H={width:4,height:4,introMap:F(),map:A(4,4,!0),isSolved:!1,isStarted:!1,tileSize:50,showBackground:!1},J=Object(N.a)(Object(N.a)({},H),{},{start:function(){},rotateTile:function(){},reset:function(){}}),Y=c.a.createContext(J),$=function(t,e){switch(e.type){case"start":var n=e.payload,r=n.width,a=n.height,o=Math.min(document.body.offsetHeight,document.body.offsetWidth,532)-32,c=4*Math.floor(o/(4*Math.max(r,a)));return Object(N.a)(Object(N.a)({},t),{},{isSolved:!1,width:r,height:a,map:A(r,a,!0),isStarted:!0,tileSize:c});case"rotate":var i=t.map.map((function(t){return t===e.payload.tile?Object(N.a)(Object(N.a)({},t),{},{rotation:t.rotation+e.payload.turns}):t})),u=t.isStarted&&function(t,e,n){return t.every((function(r){var a=r.x,o=r.y,c=r.rotation;return r.strokes.every((function(r){var i=r.color,u=r.exits;return O(u,c).every((function(r){var c=j({x:a,y:o},v[r],e,n),u=t.find((function(t){return y(c,t)}));return u.strokes.some((function(t){return t.color===i&&O(t.exits,u.rotation+2).includes(r)}))}))}))}))}(i,t.width,t.width);return Object(N.a)(Object(N.a)({},t),{},{map:i,isSolved:u});case"reset":return Object(N.a)(Object(N.a)({},t),{},{introMap:F(),isStarted:!1,showBackground:!1});case"showBackground":return Object(N.a)(Object(N.a)({},t),{},{showBackground:!0});case"rotateDemo":var s=b(t.introMap.filter((function(t){return t.strokes.length>0}))),l=t.introMap.map((function(t){return t===s?Object(N.a)(Object(N.a)({},t),{},{rotation:t.rotation+1}):t}));return Object(N.a)(Object(N.a)({},t),{},{introMap:l});default:return t}},q=function(t){var e=t.children,n=Object(o.useReducer)($,H),r=Object(W.a)(n,2),a=r[0],c=r[1],i=a.width,u=a.height,s=a.introMap,l=a.map,d=a.isSolved,h=a.isStarted,b=a.tileSize,f=a.showBackground;return Object(o.useEffect)((function(){var t;return d&&(t=window.setTimeout((function(){c({type:"showBackground"})}),1e3)),function(){clearTimeout(t)}}),[d]),Object(o.useEffect)((function(){var t;return h||(t=window.setInterval((function(){c({type:"rotateDemo"})}),500)),function(){clearInterval(t)}}),[h]),Object(X.jsx)(Y.Provider,{value:{width:i,height:u,isSolved:d,introMap:s,map:l,start:function(t,e){return c({type:"start",payload:{width:t,height:e}})},rotateTile:function(t,e){return c({type:"rotate",payload:{tile:t,turns:e}})},reset:function(){return c({type:"reset"})},isStarted:h,tileSize:b,showBackground:f},children:e})},G=Object(s.b)({backgroundColor:"rgba(255,255,255,.5)",maxWidth:160,display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignItems:"center",padding:"8px 0",borderRadius:4}),K=Object(s.b)({border:"none",padding:"8px",fontWeight:500,fontSize:"14px",backgroundColor:"#dde",margin:"4px",color:"#667",borderRadius:4,boxShadow:"1px 1px 0 #eef inset, -1px -1px 0 #ccd inset",cursor:"pointer",width:64,"&:hover":{backgroundColor:"#eef"}}),L=Array.from({length:8},(function(t,e){return{width:e+3,height:e+3}})),Q=function(t){var e=Object(o.useContext)(Y).start;return Object(C.a)(c.a.Fragment,{children:Object(C.a)("div",{css:G,children:L.map((function(t){var n=t.width,r=t.height,a="".concat(n,"\xd7").concat(r);return Object(C.a)("button",{css:K,onClick:function(){return e(n,r)},children:a},a)}))})})},U=n(24),V=Object(s.b)(g||(g=Object(U.a)(["\n  &.scaleIn-enter {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  &.scaleIn-enter-active {\n    opacity: 1;\n    transform: scale(1);\n    transition: all 300ms;\n  }\n  &.scaleIn-exit {\n    opacity: 1;\n    transform: scale(1);\n  }\n  &.scaleIn-exit-active {\n    opacity: 0;\n    transform: scale(1.2);\n    transition: all 300ms;\n  }\n"]))),Z=function(t){return Object(s.c)({"0%":{backgroundPositionX:"50%"},"50%":{backgroundPositionX:"calc(50% - ".concat(t/2,"px)")},"100%":{backgroundPositionX:"50%"}})},_=function(t){return Object(s.c)({"0%":{backgroundPositionY:"50%"},"100%":{backgroundPositionY:"calc(50% - ".concat(t,"px)")}})},tt=function(t){var e,n=Object(o.useContext)(Y),r=n.width,a=n.height,c=function(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:64,a=t.map((function(t){var e=t.strokes,n=t.rotation,r=t.x,a=t.y,o=e.map((function(t){var e=t.color,r=t.exits;return z(e,O(r,n))}));return'<g transform="translate('.concat(r," ").concat(a,')">').concat(o.join(""),"</g>")}));return'<svg xmlns="http://www.w3.org/2000/svg" width="'.concat(r*e,'" height="').concat(r*n,'" viewBox="0 0 ').concat(e," ").concat(n,'" stroke-width=".5"><style>path { mix-blend-mode: screen;}</style>').concat(a.join(""),"</svg>")}(n.map,r,a,128),i="data:image/svg+xml;utf8,".concat(c.replace(/#/g,"%23"));return Object(C.a)("div",Object(N.a)({css:(e=64*r,{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",backgroundPosition:"center",clipPath:"circle(100%)",opacity:.3,animation:"".concat(Z(e)," 5s ease-in-out infinite, \n                ").concat(_(e)," 5s linear infinite"),"&.fadeIn-enter":{opacity:0},"&.fadeIn-enter-active":{opacity:.3,transition:"opacity 1.5s .5s"},"&.fadeIn-exit":{opacity:.3},"&.fadeIn-exit-active":{opacity:0,transition:"opacity .3s"}}),style:{backgroundSize:"".concat(64*r,"px"),backgroundImage:"url('".concat(i,"')")}},t))},et=Object(s.b)({position:"absolute",width:"100vw",height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}),nt=function(t){return Object(C.a)("div",Object(N.a)({css:et},t))},rt=Object(s.c)({"0%":{textShadow:"0 0 0px rgba(255,255,255,.6)"},"100%":{textShadow:"0 0 9px rgba(255,255,255,.6)"}}),at=Array.from("\ud83d\udc36\ud83d\udc31\ud83d\udc2d\ud83d\udc39\ud83d\udc30\ud83e\udd8a\ud83d\udc3b\ud83d\udc3c\ud83d\udc28\ud83d\udc2f\ud83e\udd81\ud83d\udc2e\ud83d\udc37\ud83d\udc38\ud83d\udc35"),ot=function(t){var e,n=Object(o.useRef)(b(at)),r=Object(o.useContext)(Y),a=r.height,c=r.tileSize;return Object(C.a)("div",Object(N.a)(Object(N.a)({css:(e=a*c,Object(s.b)({position:"relative",display:"flex",justifyContent:"center",alignItems:"center",fontSize:100,cursor:"pointer",marginTop:e/-8,animation:"".concat(rt," 1s ease-in-out alternate infinite"),"&.growIn-enter":{fontSize:0,marginTop:0},"&.growIn-enter-active":{fontSize:100,marginTop:e/-8,transition:"font-size .5s ease-in-out, margin-top .5s ease-in-out"}}))},t),{},{children:n.current}))},ct=function(){var t=Object(o.useContext)(Y),e=t.isSolved,n=t.isStarted,r=t.introMap,a=t.map,i=t.rotateTile,u=t.width,s=t.height,d=t.reset,h=t.tileSize,b=t.showBackground;return Object(C.b)(c.a.Fragment,{children:[Object(C.a)(l.a,{in:b,timeout:{enter:2e3,exit:300},unmountOnExit:!0,classNames:"fadeIn",children:Object(C.a)(tt,{})}),Object(C.a)(l.a,{in:n,timeout:300,unmountOnExit:!0,mountOnEnter:!0,classNames:"scaleIn",children:Object(C.b)(nt,{css:V,children:[Object(C.a)(B,{map:a,rotateTile:i,width:u,height:s,tileSize:h,isSolved:e}),Object(C.a)(l.a,{in:e,timeout:500,unmountOnExit:!0,classNames:"growIn",children:Object(C.a)(ot,{onClick:d,children:"reset"})})]})}),Object(C.a)(l.a,{in:!n,timeout:300,unmountOnExit:!0,classNames:"scaleIn",children:Object(C.b)(nt,{css:V,children:[Object(C.a)(B,{map:r,rotateTile:i,width:4,height:4,tileSize:50}),Object(C.a)(Q,{css:V})]})})]})},it=Object(s.b)({body:{margin:0,backgroundImage:"\n      linear-gradient(rgba(255,255,255,.05) 0, rgba(255,255,255,0) 3px,rgba(0,0,0,0) 30px,rgba(0,0,0,.05) 100%), \n      linear-gradient(90deg, rgba(255,255,255,.05) 0, rgba(255,255,255,0) 3px,rgba(0,0,0,0) 30px,rgba(0,0,0,.05) 100%),\n      linear-gradient(135deg, #58484d 0%,#000008 100%)\n      ",backgroundSize:"auto 4px, 4px auto, auto",backgroundPosition:"center",minHeight:"100vh",overflow:"hidden"}}),ut=function(){return Object(X.jsxs)(X.Fragment,{children:[Object(X.jsx)(s.a,{styles:it}),Object(X.jsx)(q,{children:Object(X.jsx)(ct,{})})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(Object(X.jsx)(ut,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[35,1,2]]]);
//# sourceMappingURL=main.6a9a28de.chunk.js.map