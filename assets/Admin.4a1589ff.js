import{a as f,l as p,p as k}from"./index.7f745184.js";import{d,M as y,N as _,o as e,I as h,w as g,a as s,j as v,k as o,u as b,c as u,D as r,f as x,K as m,O as w}from"./vendor.c3e4ecc1.js";const F=s("span",{class:"font-bold"},"\u521B\u5EFA\u65F6\u95F4 ",-1),$=s("span",{class:"font-bold"},"\u5220\u9664 ",-1),B={key:0},E={key:0},C=s("span",{class:"font-bold"},"IP ",-1),D=["href"],N={key:1},j=s("span",{class:"font-bold"}," \u4F4D\u7F6E ",-1),I=["href"],M=d({props:{sub:null},setup(t){const a=t,n=y(_(a.sub.timestamp),"yyyy-MM-dd HH:mm:ss"),l=async()=>{await window.navigator.clipboard.writeText(a.sub.delete)};return(c,i)=>(e(),h(f,{sub:t.sub,footer:""},{footer:g(()=>[s("div",null,[s("div",null,[F,v(o(b(n)),1)]),s("div",null,[$,s("span",{class:"text-brand cursor-pointer",onClick:l},o(t.sub.delete),1)]),t.sub.author?(e(),u("div",B,[t.sub.author.ip?(e(),u("span",E,[C,s("a",{href:`https://ip.tool.chinaz.com/${t.sub.author.ip}`,target:"_blank"},o(t.sub.author.ip),9,D)])):r("",!0),t.sub.author.latitude&&t.sub.author.longitude?(e(),u("span",N,[j,s("a",{href:`https://uri.amap.com/marker?position=${t.sub.author.longitude},${t.sub.author.latitude}`,target:"_blank"},o(t.sub.author.longitude)+", "+o(t.sub.author.latitude),9,I)])):r("",!0)])):r("",!0)])]),_:1},8,["sub"]))}}),S=s("h2",null,"\u6240\u6709\u4EE3\u7801",-1),O=d({setup(t){const a=x([]);return Promise.all([p(),k()]).then(([n])=>a.value.push(...n)),(n,l)=>(e(),u(m,null,[S,(e(!0),u(m,null,w(a.value,(c,i)=>(e(),h(b(M),{key:i,sub:c,class:"mt-4"},null,8,["sub"]))),128))],64))}});export{O as default};
