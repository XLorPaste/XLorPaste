import{o as d,c as m,a as t,d as x,t as F,b as D,r as v,n as k,u as l,e as ee,g as j,f as g,h as E,i as u,w as _,j as p,k as y,l as S,v as te,m as se,p as H,q as A,s as P,x as oe,y as ne,z as K,A as ae,B as re,C as X,D as C,E as ie,F as J,G as le,H as ce,I as z,J as U,K as ue,T as de,L as _e}from"./vendor.c3e4ecc1.js";const pe=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}};pe();const me="modulepreload",Y={},he="/",L=function(s,o){return!o||o.length===0?s():Promise.all(o.map(a=>{if(a=`${he}${a}`,a in Y)return;Y[a]=!0;const n=a.endsWith(".css"),r=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${r}`))return;const i=document.createElement("link");if(i.rel=n?"stylesheet":me,n||(i.as="script",i.crossOrigin=""),i.href=a,document.head.appendChild(i),n)return new Promise((c,h)=>{i.addEventListener("load",c),i.addEventListener("error",h)})})).then(()=>s())};function V(){return window.localStorage.getItem("ADMIN_KEY")}function fe(e){window.localStorage.setItem("ADMIN_KEY",e)}window.setAdminKey=fe;const ve={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},ye=t("path",{d:"M14 13v4h-4v-4H7l5-5l5 5m2.35-2.97A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.03A6.004 6.004 0 0 0 0 14a6 6 0 0 0 6 6h13a5 5 0 0 0 5-5c0-2.64-2.05-4.78-4.65-4.97z",fill:"currentColor"},null,-1),be=[ye];function xe(e,s){return d(),m("svg",ve,be)}var W={name:"mdi-cloud-upload",render:xe};const $=x({props:{padding:null,primary:{type:Boolean},info:{type:Boolean},success:{type:Boolean},warning:{type:Boolean},danger:{type:Boolean}},setup(e){const s=e,{primary:o,info:a,success:n,warning:r,danger:i}=F(s),c=D(()=>(o==null?void 0:o.value)?"is-primary":(a==null?void 0:a.value)?"is-info":(n==null?void 0:n.value)?"is-success":(r==null?void 0:r.value)?"is-warning":(i==null?void 0:i.value)?"is-danger":void 0);return(h,f)=>(d(),m("button",{class:k(["button","inline-flex","justify-center","items-center","rounded","border","border-1","border-[#dbdbdb]","outline-none","cursor-pointer","select-none",l(c),e.padding||"px-3 py-2"])},[v(h.$slots,"default")],2))}});const ge={class:"select relative"},we=x({props:["modelValue"],emits:["update:modelValue"],setup(e,{emit:s}){const o=a=>{s("update:modelValue",a.target.value)};return(a,n)=>(d(),m("div",ge,[t("select",{onChange:o,class:"pl-2 pr-8 py-2 cursor-pointer block w-full rounded border border-1 border-[#dbdbdb]"},[v(a.$slots,"default")],32)]))}});var $e=class{constructor(e){this.api=ee.create({baseURL:e!=null?e:"https://api.xlorpaste.cn"})}format(e){return e.replace(/\r\n|\n\r|\n|\r/g,`
`).trim()}encode(e,s){const o=j.encode(this.format(s));return e==="json"?JSON.stringify(JSON.parse(o)):o}decode(e,s){const o=this.format(j.decode(s));return e==="json"?JSON.stringify(JSON.parse(o),null,2):o}async upload(e,s,o={}){const a={lang:e,body:this.encode(e,s),timestamp:new Date().toISOString(),once:o.once,pass:o.pass},{data:n}=await this.api.post("/",a);return n}async fetch(e){const{data:s}=await this.api.get(`/${e}`);if("status"in s)throw s;return s.body=this.decode(s.lang,s.body),s}async remove(e){try{const{data:s}=await this.api.delete(`/${e}`);return s.status==="OK"}catch{return!1}}async list(e){var s;try{const{data:o}=await this.api.get("/admin",{headers:{Authorization:e}}),a=(s=o.submissions)!=null?s:[];for(const n of a)n.body=this.format(j.decode(n.body));return a.sort((n,r)=>{const i=new Date(n.timestamp).getTime();return new Date(r.timestamp).getTime()-i})}catch{return[]}}};function ke(e={}){return new $e(e.apiURL)}const M=ke(),w={lang:"",body:"",submission:void 0};async function Ee(e,s){return w.submission&&w.lang===e&&w.body===s||(w.submission=await M.upload(e,s),w.lang=e,w.body=s),w.submission}async function Ae(e){return await M.fetch(e)}async function fs(){const e=V();return e&&e.length>0?await M.list(e):[]}const Ce={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},Le=t("path",{d:"M13 14h-2V9h2m0 9h-2v-2h2M1 21h22L12 2L1 21z",fill:"currentColor"},null,-1),Be=[Le];function Te(e,s){return d(),m("svg",Ce,Be)}var Fe={name:"mdi-alert",render:Te};const De={class:"rounded bg-light-400 p-8"},je=t("h2",null,"\u4E0A\u4F20\u6210\u529F",-1),Se=t("span",null,"\u60A8\u5206\u4EAB\u7684\u4EE3\u7801 ",-1),Pe=t("span",{class:"font-bold font-mono"},"Token",-1),Ve=t("span",null," \u662F ",-1),Me=t("span",null,".",-1),Ie=t("p",null,"\u60A8\u73B0\u5728\u53EF\u4EE5",-1),Oe={class:"h-8"},Re=p(" \u5728\u5BFC\u822A\u680F\u8F93\u5165 "),Ne=t("span",{class:"font-bold font-mono"},"Token ",-1),He={class:"text-brand font-mono"},Ke=p("\u590D\u5236 Token"),Xe={class:"h-8"},Je=p(" \u8BBF\u95EE\u4EE3\u7801\u94FE\u63A5 "),ze=p("\u590D\u5236\u94FE\u63A5"),Ue={class:"min-h-8"},Ye={class:"h-8 flex items-center"},We={class:"ml-2"},qe=p("\u60A8\u53EF\u4EE5\u4F7F\u7528 "),Ge=p(" \u5220\u9664\u8FD9\u4EFD\u4EE3\u7801."),Qe=x({props:{sub:null},setup(e){const s=e,{sub:o}=F(s),a=window.origin+"/view/"+o.value.token,n=async()=>{await window.navigator.clipboard.writeText(o.value.token)},r=async()=>{await window.navigator.clipboard.writeText(a)},i=async()=>{await window.navigator.clipboard.writeText(o.value.delete)},c=g(!1);return(h,f)=>{const b=E("router-link");return d(),m("div",De,[je,t("p",null,[Se,Pe,Ve,u(b,{class:"font-mono",to:{name:"View",params:{token:l(o).token}}},{default:_(()=>[p(y(l(o).token),1)]),_:1},8,["to"]),Me]),Ie,t("ul",null,[t("li",Oe,[Re,Ne,t("span",He,y(l(o).token),1),u($,{padding:"px-2 py-1",class:"ml-2 text-xs",success:"",onClick:n},{default:_(()=>[Ke]),_:1})]),t("li",Xe,[Je,t("a",{class:"font-mono",href:a,target:"_blank"},y(a)),u($,{padding:"px-2 py-1",class:"ml-2 text-xs",success:"",onClick:r},{default:_(()=>[ze]),_:1})]),t("li",Ue,[t("div",{class:"cursor-pointer text-brand select-none",onClick:f[0]||(f[0]=N=>c.value=!c.value)}," \u751F\u6210\u4E8C\u7EF4\u7801 "),S(u(l(se),{class:"mt-2",value:a,options:{width:120}},null,512),[[te,c.value]])])]),t("p",Ye,[u(l(Fe),{class:"text-red-500"}),t("span",We,[qe,t("span",{class:"text-brand font-mono cursor-pointer",onClick:i},y(l(o).delete),1),Ge])]),v(h.$slots,"default")])}}}),Ze={key:0},et={class:"mb-4 flex"},tt={class:"inline-flex items-center mr-4"},st=t("label",{for:"lang",class:"font-bold mr-2"},"\u8BED\u8A00 ",-1),ot=t("option",{value:"text"},"\u7EAF\u6587\u672C",-1),nt=t("option",{value:"cpp",selected:""},"C++",-1),at=t("option",{value:"md"},"Markdown",-1),rt=t("option",{value:"c"},"C",-1),it=t("option",{value:"java"},"Java",-1),lt=t("option",{value:"python"},"Python",-1),ct=t("option",{value:"javascript"},"JavaScript",-1),ut=t("option",{value:"json"},"JSON",-1),dt=t("option",{value:"yaml"},"Yaml",-1),_t=t("option",{value:"html"},"HTML",-1),pt=t("option",{value:"css"},"CSS",-1),mt=p(" \u63D0\u4EA4"),ht={class:"flex mb-4"},ft=["rows","onKeydown"],vt=p(" \u63D0\u4EA4"),yt={key:1},bt=p("\u8FD4\u56DE"),xt=x({setup(e){const s=g(""),o=g("cpp"),a=g(null),n=async()=>{if(s.value.length===0)return;const i=await Ee(o.value,s.value);a.value=i,s.value=""},r=window.innerWidth>=768?Math.max(10,Math.floor((window.innerHeight-320)/16/window.devicePixelRatio)):10;return(i,c)=>a.value?(d(),m("div",yt,[u(Qe,{sub:a.value},{default:_(()=>[u($,{onClick:c[3]||(c[3]=h=>a.value=null),info:""},{default:_(()=>[bt]),_:1})]),_:1},8,["sub"])])):(d(),m("div",Ze,[t("div",et,[t("div",tt,[st,u(l(we),{name:"lang",id:"lang",modelValue:o.value,"onUpdate:modelValue":c[0]||(c[0]=h=>o.value=h)},{default:_(()=>[ot,nt,at,rt,it,lt,ct,ut,dt,_t,pt]),_:1},8,["modelValue"])]),u($,{success:"",onClick:n},{default:_(()=>[u(l(W),{class:"mr-2"}),mt]),_:1})]),t("div",ht,[S(t("textarea",{ref:"elBody",name:"area-body",id:"area-body",rows:l(r),class:"font-mono text-base flex-1 border-1 border-light-900 rounded px-3 py-2 outline-none focus:border-blue-300",onKeydown:[c[1]||(c[1]=A(P(()=>{},["prevent"]),["tab"])),A(P(n,["ctrl"]),["enter"]),A(P(n,["ctrl","prevent"]),["s"])],"onUpdate:modelValue":c[2]||(c[2]=h=>s.value=h),autofocus:""},null,40,ft),[[H,s.value]])]),t("div",null,[u($,{success:"",onClick:n},{default:_(()=>[u(l(W),{class:"mr-2"}),vt]),_:1})])]))}});let I=null;const O=[];let R=null;const B=["c","cpp","java","javascript","json","python","typescript","yaml","html","css"],gt=new Map([["c++","cpp"],["C++","cpp"],["C","c"],["js","javascript"],["ts","typescript"],["py","python"]]);function q(e){return!!B.find(s=>s===e)}async function T(...e){if(I)return I=await K({themes:O,langs:e});{const s="/";return ae(s),oe(await fetch(s+"onig.wasm").then(o=>o.arrayBuffer())),O.push(await ne("themes/eva-light.json")),I=await K({themes:O,langs:e})}}async function wt(){await T(B[0]),await Promise.all(B.slice(1).map(e=>T(e)))}function G(e){return e.replace(/[<>"& ]/g,s=>{switch(s){case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"&":return"&amp;";case" ":return"&nbsp;";default:return""}})}async function $t(e,s){const o=()=>`<pre class="shiki"><code>${G(s).split(`
`).map(a=>`<span class="line">${a}</span>`).join(`
`)}</code></pre>`;if(e==="text")return o();if(e==="md"){if(!R){await wt();const a=await T(...B),{createMarkdown:n}=await L(()=>import("./markdown.bc1a88ed.js"),["assets/markdown.bc1a88ed.js","assets/github-markdown.7ac8ffb9.css","assets/vendor.c3e4ecc1.js"]);R=n({highlight:(r,i)=>{var c;return r=r.trim(),i=(c=gt.get(i))!=null?c:i,q(i)?a.codeToHtml(r,{lang:i}):G(r)}})}return`<div class="markdown-body">${R(s)}</div>`}else return q(e)?(await T(e)).codeToHtml(s,{lang:e}):o()}const kt={key:0,class:"code-box rounded-lg"},Et={class:"px-4 py-4 <md:px-2 font-mono flex justify-between items-center",style:{"border-bottom":"1px solid rgb(235, 238, 245)"}},At={class:"<md:text-sm"},Ct=t("span",{class:"font-bold"},"Token ",-1),Lt=t("span",{class:"font-bold ml-4"},"\u8BED\u8A00 ",-1),Bt=["innerHTML"],Tt={key:0,class:"p-4 font-mono flex justify-between items-center",style:{"border-top":"1px solid rgb(235, 238, 245)"}},Ft=x({props:{sub:null,footer:{type:Boolean},maxLine:null},setup(e){const s=e;re(f=>({"093d8bef":l(a),"4907f3fd":l(h)}));const{sub:o,maxLine:a}=F(s),n=g("");X(o,f=>{$t(f.lang,f.body).then(b=>n.value=b)},{immediate:!0});const r=async()=>{await navigator.clipboard.writeText(o.value.body)},i=D(()=>o.value.body.split(`
`).length),c=g(null),h=D(()=>c.value?c.value.clientWidth+2+"px":"1em");return(f,b)=>{const N=E("router-link");return n.value.length>0?(d(),m("div",kt,[t("div",Et,[t("div",At,[t("span",{class:k([l(o).lang!=="md"?"ml-token":"ml-md","<md:text-xs"])},null,2),Ct,u(N,{to:{name:"View",params:{token:l(o).token}}},{default:_(()=>[p(y(l(o).token),1)]),_:1},8,["to"]),Lt,t("span",null,y(l(o).lang),1)]),t("div",null,[t("a",{class:"px-4 py-2 cursor-pointer",onClick:r},"\u590D\u5236")])]),t("div",{class:k(["px-4 py-4 overflow-x-auto <md:text-xs <md:p-2",l(a)&&"max-line"]),innerHTML:n.value},null,10,Bt),e.footer?(d(),m("div",Tt,[t("div",{class:k([l(o).lang!=="md"?"ml-token":"ml-md","<md:text-xs"])},[v(f.$slots,"footer")],2)])):C("",!0),t("div",{class:"hidden-measure font-mono <md:text-xs",ref_key:"measure",ref:c},y(l(i)+1),513)])):C("",!0)}}}),Dt={key:0},jt=x({setup(e){const s=ie(),o=J(),a=g(null);return X(()=>s.params.token,async n=>{try{const r=await Ae(n);a.value=r}catch{setTimeout(()=>o.push({name:"Home"}),3e3)}},{immediate:!0}),(n,r)=>a.value?(d(),m("div",Dt,[u(l(Ft),{sub:a.value},null,8,["sub"])])):C("",!0)}}),Q=le({history:ce(),routes:[{path:"/",name:"Home",component:xt,meta:{title:"\u4E0A\u4F20"}},{path:"/editor",name:"Editor",component:()=>L(()=>import("./Editor.27273248.js"),["assets/Editor.27273248.js","assets/vendor.c3e4ecc1.js"]),meta:{title:"\u7F16\u8F91\u5668"}},{path:"/view/:token",name:"View",component:jt,meta:{title:"\u4EE3\u7801"}},{path:"/admin",name:"Admin",component:()=>L(()=>import("./Admin.58699826.js"),["assets/Admin.58699826.js","assets/Admin.248fd786.css","assets/vendor.c3e4ecc1.js"]),meta:{title:"\u7BA1\u7406"},beforeEnter(e,s){const o=V();return!!o&&o.length>0}},{path:"/help",name:"Help",component:()=>L(()=>import("./About.66e9d421.js"),["assets/About.66e9d421.js","assets/github-markdown.7ac8ffb9.css","assets/vendor.c3e4ecc1.js"]),meta:{title:"\u5E2E\u52A9"}}],scrollBehavior(e,s,o){return o||{top:0}}});Q.beforeEach(e=>{e.meta.title?document.title=e.meta.title+" - XLor Paste":document.title="XLor Paste"});const St={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},Pt=t("path",{d:"M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z",fill:"currentColor"},null,-1),Vt=[Pt];function Mt(e,s){return d(),m("svg",St,Vt)}var It={name:"mdi-github",render:Mt};var Ot=(e,s)=>{const o=e.__vccOpts||e;for(const[a,n]of s)o[a]=n;return o};const Rt={},Nt={class:"py-2 md:px-8 <md:px-4 navbar-flex navbar"},Ht={class:"navbar-brand navbar-flex items-center bg-transparent cursor-pointer"},Kt={class:"navbar-menu navbar-flex flex-1 <md:w-full"},Xt={class:"navbar-start justify-start items-center md:mr-auto <md:w-full"},Jt={class:"<md:hidden navbar-end navbar-flex justify-end items-center ml-auto"};function zt(e,s){return d(),m("nav",Nt,[t("div",Ht,[v(e.$slots,"brand")]),t("div",Kt,[t("div",Xt,[v(e.$slots,"start"),v(e.$slots,"default")]),t("div",Jt,[v(e.$slots,"end")])])])}var Ut=Ot(Rt,[["render",zt]]);const Z=x({props:{tag:{type:String,default:"a"}},setup(e){return(s,o)=>(d(),z(U(e.tag),{class:"navbar-item flex select-none cursor-pointer rounded px-[0.75rem] py-[0.5rem] hover:(bg-gray-100 text-blue-500)"},{default:_(()=>[v(s.$slots,"default")]),_:3}))}});const Yt=p("XLorPaste"),Wt={class:"flex relative font-mono <md:w-full"},qt=["onKeypress"],Gt={class:"md:px-10 <md:px-[1.75rem] pt-6 main-view"},Qt={class:"mt-4 px-1 py-4 text-sm"},Zt={class:"text-center text-gray-400"},es={class:"flex justify-center font-mono h-4 my-1"},ts={class:"text-$text-light-1 inline-flex items-center mr-2",href:"https://github.com/XLorPaste",target:"_blank"},ss=["href"],os=["href"],ns={class:"font-mono my-1"},as={key:0},rs=p("\u7BA1\u7406"),is=p(" | "),ls=p("\u5E2E\u52A9"),cs=p(" | "),us=t("a",{href:"https://upptime.xlorpaste.cn/",target:"_blank",rel:"noopener noreferrer"},"\u72B6\u6001",-1),ds=p(" | "),_s=t("a",{href:"http://www.miitbeian.gov.cn",target:"_blank",rel:"noopener noreferrer"},"\u82CFICP\u590719000844\u53F7",-1),ps=t("p",{class:"font-mono my-1"},[t("span",null,"\xA9 2021 "),t("a",{href:"https://github.com/yjl9903",target:"_blank"},"XLor"),t("span",null," All rights reserved")],-1),ms=x({setup(e){const s="0.0.1",o="73b807cace807e62b4df239f9d5ff43b1615c4f1",a=J(),n=g(""),r=async()=>{n.value!==""&&(await a.push({name:"View",params:{token:n.value}}),n.value="")};return(i,c)=>{const h=E("router-view"),f=E("router-link");return d(),m(ue,null,[u(l(Ut),null,{brand:_(()=>[u(l(Z),{tag:"router-link",to:{name:"Home"},class:"font-mono font-bold text-xl"},{default:_(()=>[Yt]),_:1})]),start:_(()=>[u(l(Z),null,{default:_(()=>[t("div",Wt,[S(t("input",{type:"text",name:"search",id:"search",placeholder:"\u4EE3\u7801 Token",autocomplete:"off",class:"flex-1 px-2 py-2 rounded-md border-1 border-light-900 outline-none focus:border-blue-300","onUpdate:modelValue":c[0]||(c[0]=b=>n.value=b),onKeypress:A(r,["enter"])},null,40,qt),[[H,n.value]])])]),_:1})]),_:1}),t("div",Gt,[u(h,null,{default:_(({Component:b})=>[u(de,{name:"fade"},{default:_(()=>[(d(),z(U(b)))]),_:2},1024)]),_:1})]),t("footer",Qt,[t("div",Zt,[t("div",es,[t("a",ts,[u(l(It),{class:"align-middle"})]),l(o)?(d(),m("a",{key:1,class:"inline-block",href:`https://github.com/XLorPaste/XLorPaste/tree/${l(o)}`,target:"_blank"},[t("span",null,"XLorPaste: "+y(l(o).slice(0,10)),1)],8,os)):(d(),m("a",{key:0,class:"inline-block",href:"https://github.com/XLorPaste/XLorPaste",target:"_blank"},[t("span",null,"XLorPaste: "+y(l(s)),1)],8,ss))]),t("p",ns,[l(V)()?(d(),m("span",as,[u(f,{to:{name:"Admin"}},{default:_(()=>[rs]),_:1}),is])):C("",!0),u(f,{to:{name:"Help"}},{default:_(()=>[ls]),_:1}),cs,us,ds,_s]),ps])])],64)}}});_e(ms).use(Q).mount("#app");export{Ot as _,Ft as a,fs as l,wt as p};
