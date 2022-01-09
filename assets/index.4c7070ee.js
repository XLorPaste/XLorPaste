import{o as d,c as p,a as n,d as h,t as w,b as E,r as f,n as R,u as c,e as F,g as P,f as $,h as u,w as _,i as v,j as y,k as b,l as V,v as B,m as x,p as k,s as O,q as K,x as U,y as z,z as J,A,B as j,C as W,D as M,E as q,F as Y,G as T,H as D,I as G,J as Q,T as Z,K as ee}from"./vendor.875efc4a.js";const te=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}};te();const oe="modulepreload",S={},se="/",ne=function(t,o){return!o||o.length===0?t():Promise.all(o.map(a=>{if(a=`${se}${a}`,a in S)return;S[a]=!0;const s=a.endsWith(".css"),r=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${r}`))return;const l=document.createElement("link");if(l.rel=s?"stylesheet":oe,s||(l.as="script",l.crossOrigin=""),l.href=a,document.head.appendChild(l),s)return new Promise((i,m)=>{l.addEventListener("load",i),l.addEventListener("error",m)})})).then(()=>t())},ae={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},re=n("path",{d:"M14 13v4h-4v-4H7l5-5l5 5m2.35-2.97A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.03A6.004 6.004 0 0 0 0 14a6 6 0 0 0 6 6h13a5 5 0 0 0 5-5c0-2.64-2.05-4.78-4.65-4.97z",fill:"currentColor"},null,-1),le=[re];function ce(e,t){return d(),p("svg",ae,le)}var X={name:"mdi-cloud-upload",render:ce};const C=h({props:{padding:null,primary:{type:Boolean},info:{type:Boolean},success:{type:Boolean},warning:{type:Boolean},danger:{type:Boolean}},setup(e){const t=e,{primary:o,info:a,success:s,warning:r,danger:l}=w(t),i=E(()=>(o==null?void 0:o.value)?"is-primary":(a==null?void 0:a.value)?"is-info":(s==null?void 0:s.value)?"is-success":(r==null?void 0:r.value)?"is-warning":(l==null?void 0:l.value)?"is-danger":void 0);return(m,g)=>(d(),p("button",{class:R(["button","inline-flex","justify-center","items-center","rounded","border","border-1","border-[#dbdbdb]","outline-none","cursor-pointer","select-none",c(i),e.padding||"px-3 py-2"])},[f(m.$slots,"default")],2))}}),ie={class:"select relative"},ue=h({props:["modelValue"],emits:["update:modelValue"],setup(e,{emit:t}){const o=a=>{t("update:modelValue",a.target.value)};return(a,s)=>(d(),p("div",ie,[n("select",{onChange:o,class:"pl-2 pr-8 py-2 cursor-pointer block w-full outline-none rounded border border-1 border-[#dbdbdb] appearance-none"},[f(a.$slots,"default")],32)]))}});var de=class{constructor(e){this.api=F.create({baseURL:e!=null?e:"https://api.xlorpaste.cn"})}format(e){return e.trim()}async upload(e,t,o={}){const{data:a}=await this.api.post("/",{lang:e,body:P.encode(this.format(t)),timestamp:new Date().toISOString(),once:o.once,pass:o.pass});return a}async fetch(e){const{data:t}=await this.api.get(`/${e}`);if("status"in t)throw t;return t.body=this.format(P.decode(t.body)),t}};function pe(e={}){return new de(e.apiURL)}const N=pe();async function _e(e,t){return await N.upload(e,t)}async function me(e){return await N.fetch(e)}const he=n("span",{class:"font-bold"},"Token ",-1),fe=h({props:{sub:null},setup(e){const t=e,{sub:o}=w(t);return(a,s)=>{const r=$("router-link");return d(),p("p",null,[he,u(r,{to:{name:"View",params:{token:c(o).token}}},{default:_(()=>[v(y(c(o).token),1)]),_:1},8,["to"])])}}}),ve={key:0},be={class:"mb-4 flex"},ye={class:"inline-flex items-center mr-4"},ge=n("label",{for:"lang",class:"font-bold mr-2"},"\u8BED\u8A00 ",-1),xe=n("option",{value:"cpp",selected:""},"C++",-1),we=n("option",{value:"c"},"C",-1),$e=n("option",{value:"java"},"Java",-1),ke=n("option",{value:"python"},"Python",-1),Ce=n("option",{value:"javascript"},"JavaScript",-1),Le=n("option",{value:"json"},"JSON",-1),Ee=n("option",{value:"yaml"},"Yaml",-1),Pe=v(" \u63D0\u4EA4"),Ve={class:"flex mb-4"},Be=["rows","onKeydown"],Ae=v(" \u63D0\u4EA4"),je={key:1},Me=v("\u8FD4\u56DE"),Te=h({setup(e){const t=b(""),o=b("cpp"),a=b(null),s=async()=>{if(t.value.length===0)return;const l=await _e(o.value,t.value);a.value=l},r=window.innerWidth>=768?Math.max(10,Math.floor((window.innerHeight-250)/16/window.devicePixelRatio)):10;return(l,i)=>a.value?(d(),p("div",je,[u(fe,{sub:a.value},null,8,["sub"]),u(C,{onClick:i[3]||(i[3]=m=>a.value=null),info:""},{default:_(()=>[Me]),_:1})])):(d(),p("div",ve,[n("div",be,[n("div",ye,[ge,u(c(ue),{name:"lang",id:"lang",modelValue:o.value,"onUpdate:modelValue":i[0]||(i[0]=m=>o.value=m)},{default:_(()=>[xe,we,$e,ke,Ce,Le,Ee]),_:1},8,["modelValue"])]),u(C,{success:"",onClick:s},{default:_(()=>[u(c(X),{class:"mr-2"}),Pe]),_:1})]),n("div",Ve,[V(n("textarea",{ref:"elBody",name:"area-body",id:"area-body",rows:c(r),class:"font-mono text-base flex-1 border-1 border-light-900 rounded px-3 py-2 outline-none focus:border-blue-300",onKeydown:[i[1]||(i[1]=x(k(()=>{},["prevent"]),["tab"])),x(k(s,["ctrl"]),["enter"]),x(k(s,["ctrl","prevent"]),["s"])],"onUpdate:modelValue":i[2]||(i[2]=m=>t.value=m)},null,40,Be),[[B,t.value]])]),n("div",null,[u(C,{success:"",onClick:s},{default:_(()=>[u(c(X),{class:"mr-2"}),Ae]),_:1})])]))}});let L=null;async function De(){if(!L){const e="/";z(e),O(await fetch(e+"onig.wasm").then(o=>o.arrayBuffer()));const t=[await K("themes/eva-light.json")];L=await U({themes:t,langs:["c","cpp","java","javascript","json","python","typescript","yaml"]})}}async function Se(e,t){return await De(),L.codeToHtml(t,{lang:e})}const Xe={key:0,class:"code-box rounded-lg"},Ne={class:"px-4 py-4 <md:px-2 font-mono flex justify-between items-center",style:{"border-bottom":"1px solid rgb(235, 238, 245)"}},He={class:"<md:text-sm"},Ie=n("span",{class:"ml-token <md:text-xs"},null,-1),Re=n("span",{class:"font-bold"},"Token ",-1),Fe=n("span",{class:"font-bold ml-4"},"\u8BED\u8A00 ",-1),Oe=["innerHTML"],Ke=h({props:{sub:null},setup(e){const t=e;J(l=>({"31faa866":c(r)}));const{sub:o}=w(t),a=b("");A(o,l=>{Se(l.lang,l.body).then(i=>a.value=i)},{immediate:!0});const s=async()=>{await navigator.clipboard.writeText(o.value.body)},r=E(()=>{const l=o.value.body.split(`
`).length;return Math.round(Math.log10(l))*1.5+"em"});return(l,i)=>{const m=$("router-link");return a.value.length>0?(d(),p("div",Xe,[n("div",Ne,[n("div",He,[Ie,Re,u(m,{to:{name:"View",params:{token:c(o).token}}},{default:_(()=>[v(y(c(o).token),1)]),_:1},8,["to"]),Fe,n("span",null,y(c(o).lang),1)]),n("div",null,[n("a",{class:"px-2 py-2 cursor-pointer",onClick:s},"\u590D\u5236")])]),n("div",{class:"px-4 py-4 overflow-x-auto <md:text-xs <md:p-2",innerHTML:a.value},null,8,Oe)])):j("",!0)}}}),Ue={key:0},ze=h({setup(e){const t=W(),o=M(),a=b(null);return A(()=>t.params.token,async s=>{try{const r=await me(s);a.value=r}catch{setTimeout(()=>o.push({name:"Home"}),3e3)}},{immediate:!0}),(s,r)=>a.value?(d(),p("div",Ue,[u(c(Ke),{sub:a.value},null,8,["sub"])])):j("",!0)}}),H=q({history:Y(),routes:[{path:"/",name:"Home",component:Te,meta:{title:"\u4E0A\u4F20"}},{path:"/editor",name:"Editor",component:()=>ne(()=>import("./Editor.955beb68.js"),["assets/Editor.955beb68.js","assets/vendor.875efc4a.js"]),meta:{title:"\u7F16\u8F91\u5668"}},{path:"/view/:token",name:"View",component:ze,meta:{title:"\u4EE3\u7801"}}],scrollBehavior(e,t,o){return o||{top:0}}});H.beforeEach(e=>{e.meta.title?document.title=e.meta.title+" - XLor Paste":document.title="XLor Paste"});const Je={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},We=n("path",{d:"M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z",fill:"currentColor"},null,-1),qe=[We];function Ye(e,t){return d(),p("svg",Je,qe)}var Ge={name:"mdi-github",render:Ye};var Qe=(e,t)=>{const o=e.__vccOpts||e;for(const[a,s]of t)o[a]=s;return o};const Ze={},et={class:"py-2 md:px-8 <md:px-4 navbar-flex navbar"},tt={class:"navbar-brand navbar-flex items-center bg-transparent cursor-pointer"},ot={class:"navbar-menu navbar-flex flex-1 <md:w-full"},st={class:"navbar-start justify-start items-center md:mr-auto <md:w-full"},nt={class:"<md:hidden navbar-end navbar-flex justify-end items-center ml-auto"};function at(e,t){return d(),p("nav",et,[n("div",tt,[f(e.$slots,"brand")]),n("div",ot,[n("div",st,[f(e.$slots,"start"),f(e.$slots,"default")]),n("div",nt,[f(e.$slots,"end")])])])}var rt=Qe(Ze,[["render",at]]);const I=h({props:{tag:{type:String,default:"a"}},setup(e){return(t,o)=>(d(),T(D(e.tag),{class:"navbar-item flex select-none cursor-pointer rounded px-[0.75rem] py-[0.5rem] hover:(bg-gray-100 text-blue-500)"},{default:_(()=>[f(t.$slots,"default")]),_:3}))}});const lt=v("XLorPaste"),ct={class:"flex relative font-mono <md:w-full"},it=["onKeypress"],ut={class:"md:px-10 <md:px-[1.75rem] pt-6 main-view"},dt={class:"mt-4 px-1 py-4 text-sm"},pt={class:"text-center text-gray-400"},_t={class:"flex items-center justify-center font-mono h-4 my-1"},mt={class:"text-$text-light-1 inline-block mr-2",href:"https://github.com/XLorPaste",target:"_blank"},ht=["href"],ft=["href"],vt=Q('<p class="font-mono my-1"><a href="https://github.com/XLorPaste/XLorPaste/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">MIT</a> Licensed | <a href="https://upptime.xlorpaste.cn/" target="_blank" rel="noopener noreferrer">Status</a> | <a href="http://www.miitbeian.gov.cn" target="_blank" rel="noopener noreferrer">\u82CFICP\u590719000844\u53F7</a></p><p class="font-mono my-1"><span>\xA9 2021 </span><a href="https://github.com/yjl9903" target="_blank">XLor</a><span> All rights reserved</span></p>',2),bt=h({setup(e){const t="0.0.0",o="ee1a95cecdd701340e8751aa4fa7daebc3f3d48f",a=M(),s=b(""),r=async()=>{await a.push({name:"View",params:{token:s.value}}),s.value=""};return(l,i)=>{const m=$("router-view");return d(),p(G,null,[u(c(rt),null,{brand:_(()=>[u(c(I),{tag:"router-link",to:{name:"Home"},class:"font-mono font-bold text-xl"},{default:_(()=>[lt]),_:1})]),start:_(()=>[u(c(I),null,{default:_(()=>[n("div",ct,[V(n("input",{type:"text",name:"search",id:"search",placeholder:"\u4EE3\u7801 Token",autocomplete:"off",class:"flex-1 px-2 py-2 rounded-md border-1 border-light-900 outline-none focus:border-blue-300","onUpdate:modelValue":i[0]||(i[0]=g=>s.value=g),onKeypress:x(r,["enter"])},null,40,it),[[B,s.value]])])]),_:1})]),_:1}),n("div",ut,[u(m,null,{default:_(({Component:g})=>[u(Z,{name:"fade"},{default:_(()=>[(d(),T(D(g)))]),_:2},1024)]),_:1})]),n("footer",dt,[n("div",pt,[n("div",_t,[n("a",mt,[u(c(Ge),{class:"align-middle"})]),c(o)?(d(),p("a",{key:1,class:"inline-block",href:`https://github.com/XLorPaste/XLorPaste/tree/${c(o)}`,target:"_blank"},[n("span",null,"XLorPaste: "+y(c(o).slice(0,10)),1)],8,ft)):(d(),p("a",{key:0,class:"inline-block",href:"https://github.com/XLorPaste/XLorPaste",target:"_blank"},[n("span",null,"XLorPaste: "+y(c(t)),1)],8,ht))]),vt])])],64)}}});ee(bt).use(H).mount("#app");export{Qe as _};
