import{d,M as f,N as k,o as s,I as h,w as p,a as e,j as y,k as o,u as b,c as u,D as r,f as _,K as m,O as g}from"./vendor.c3e4ecc1.js";import{a as v,l as x}from"./index.13e679e9.js";const w=e("span",{class:"font-bold"},"\u521B\u5EFA\u65F6\u95F4 ",-1),F=e("span",{class:"font-bold"},"\u5220\u9664 ",-1),$={key:0},B={key:0},E=e("span",{class:"font-bold"},"IP ",-1),C=["href"],D={key:1},N=e("span",{class:"font-bold"}," \u4F4D\u7F6E ",-1),j=["href"],I=d({props:{sub:null},setup(t){const a=t,n=f(k(a.sub.timestamp),"yyyy-MM-dd HH:mm:ss"),c=async()=>{await window.navigator.clipboard.writeText(a.sub.delete)};return(l,i)=>(s(),h(v,{sub:t.sub,footer:""},{footer:p(()=>[e("div",null,[e("div",null,[w,y(o(b(n)),1)]),e("div",null,[F,e("span",{class:"text-brand cursor-pointer",onClick:c},o(t.sub.delete),1)]),t.sub.author?(s(),u("div",$,[t.sub.author.ip?(s(),u("span",B,[E,e("a",{href:`https://ip.tool.chinaz.com/${t.sub.author.ip}`,target:"_blank"},o(t.sub.author.ip),9,C)])):r("",!0),t.sub.author.latitude&&t.sub.author.longitude?(s(),u("span",D,[N,e("a",{href:`https://uri.amap.com/marker?position=${t.sub.author.longitude},${t.sub.author.latitude}`,target:"_blank"},o(t.sub.author.longitude)+", "+o(t.sub.author.latitude),9,j)])):r("",!0)])):r("",!0)])]),_:1},8,["sub"]))}}),M=e("h2",null,"\u6240\u6709\u4EE3\u7801",-1),O=d({setup(t){const a=_([]);return x().then(n=>a.value.push(...n)),(n,c)=>(s(),u(m,null,[M,(s(!0),u(m,null,g(a.value,(l,i)=>(s(),h(b(I),{key:i,sub:l,class:"mt-4"},null,8,["sub"]))),128))],64))}});export{O as default};
