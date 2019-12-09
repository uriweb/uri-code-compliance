!function(){"use strict";var e={elClass:"compliance-flagged-element",messageClass:"compliance-message",issues:{total:0,errors:0,warnings:0,suggestions:0}};document.addEventListener("DOMContentLoaded",(function(){if(!document.body.classList.contains("logged-in"))return;e.main=document.getElementById("main"),l={tag:"img",class:"flagged-image"},i=[{selectors:['alt=""'],message:"Alt attribute required for ADA compliance",type:"error"},{selectors:['src^="file:"'],message:"No sourcing local resources",type:"error"}],s.iterateTests(l,i),function(){var e,a;e={tag:"a",class:"flagged-link"},a=[{selectors:['href="#"'],message:'"#" is not a valid URL',type:"error"},{selectors:['href^="javascript:"'],message:"No JavaScript in links",type:"error"},{selectors:['href^="file:"','href^="///"'],message:"No linking to local resources",type:"error"},{selectors:['href$=".pdf"'],message:"Consider linking to a webpage instead of a PDF",type:"suggestion"},{selectors:["target"],message:"Opening links in a new tab or window is discouraged",type:"warning"},{selectors:['href$=".doc"','href$=".docx"','href$=".docm"','href$=".xls"','href$=".xlm"','href$=".xlsx"','href$=".xlsm"','href$=".ppt"','href$=".pps"','href$=".pptx"','href$=".pptm"','href$=".ppsx"','href$=".sldx"','href$=".sldm"','href$=".pub"','href$=".xps"','href$=".accdb"','href$=".accde"'],message:"Not all users may be able to open this file.  Provide a download link to the required software.",type:"warning"},{selectors:['href$=".pages"','href$=".numbers"','href$=".keynote"','href$=".dmg"','href$=".exe"'],message:"Not all users may be able to open this file because the required software is not available on all operating systems.",type:"warning"}],s.iterateTests(e,a)}(),function(){var a,t,n,r,l={};for(a=e.main.querySelectorAll("*[id]"),t=0;t<a.length;t++)(n=a[t].id)in l?l[n]++:l[n]=1;for(r in l)if(l[r]>1)for(a=e.main.querySelectorAll('[id="'+r+'"]'),t=0;t<a.length;t++)s.display(a[t],"flagged-duplicate-id",'No duplicate ids ("'+r+'")',"error")}(),function(){var a,t;for(a=e.main.querySelectorAll("style"),t=0;t<a.length;t++)s.display(a[t],"flagged-tag-style","Avoid &lt;style&gt; tags in the body","warning")}(),function(){var a,t,n,r;for(a=["font","link"],n=0;n<a.length;n++)for(t=e.main.querySelectorAll(a[n]),r=0;r<t.length;r++)s.display(t[r],"flagged-tag-"+a[n],"&lt;"+a[n]+"&gt; tag is deprecated.","error")}(),function(){var e,a;e={tag:"*",class:"flagged-attribute"},a=[{selectors:["style"],message:"Avoid using inline styles",type:"warning"},{selectors:["onclick"],message:"Avoid adding actions to elements using onclick",type:"warning"},{selectors:["onmouseover"],message:"Avoid adding actions to elements using onmouseover",type:"warning"}],s.iterateTests(e,a)}(),0!=e.issues.errors&&((a=document.createElement("div")).className="compliance-status",t=1==e.issues.errors?"":"s",n="This page has "+e.issues.errors+" critical error"+t+" that must be addressed.",(r=document.createElement("div")).className="compliance-open-all-messages",r.innerHTML="Open all messages",r.addEventListener("click",(function(){document.body.classList.contains("compliance-open-all-messages")?(document.body.classList.remove("compliance-open-all-messages"),r.innerHTML="Open all messages"):(document.body.classList.add("compliance-open-all-messages"),r.innerHTML="Close all messages")})),a.innerHTML=n,a.appendChild(r),document.getElementById("page").insertBefore(a,document.getElementById("masthead")));var a,t,n,r;var l,i}),!1);class s{static iterateTests(e,a){var t,n,r={};for(t=0;t<a.length;t++)for(r.message=a[t].message,r.type=a[t].type,n=0;n<a[t].selectors.length;n++)r.selector=a[t].selectors[n],s.runTest(e.tag,e.class,r)}static runTest(a,t,n){var r,l;for(r=e.main.querySelectorAll(a+"["+n.selector+"]"),l=0;l<r.length;l++)s.display(r[l],t,n.message,n.type)}static display(a,t,n,r){var l,i;e.issues.total++,e.issues[r+"s"]++,a.classList.contains(e.elClass)?(i=a.previousSibling).appendChild(s.buildMessage(r,n)):(a.classList.add(e.elClass),(l=document.createElement("span")).className="compliance-wrapper "+t,(i=document.createElement("ul")).className=e.messageClass+"s",i.appendChild(s.buildMessage(r,n)),l.appendChild(i),a.parentNode.insertBefore(l,a.nextSibling),l.appendChild(a))}static buildMessage(s,a){var t;return(t=document.createElement("li")).className=e.messageClass+" compliance-type-"+s,t.innerHTML='<div class="compliance-icon">'+s+'</div><div class="compliance-message-content">'+a+"</div>",t.addEventListener("click",(function(){t.classList.contains("open")?t.classList.remove("open"):t.classList.add("open")})),t}}}();