import{u as t,j as e}from"./index-BBSgPmMT.js";const o={title:"Navigation & Progress",description:"undefined"};function s(i){const n={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"navigation--progress",children:["Navigation & Progress",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#navigation--progress",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:"Paper Chat tracks your position in the paper and provides multiple navigation aids."}),`
`,e.jsxs(n.h2,{id:"table-of-contents",children:["Table of Contents",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#table-of-contents",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"A fixed sidebar on the left lists all 8 paper sections:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Introduction"}),`
`,e.jsx(n.li,{children:"Related Work"}),`
`,e.jsx(n.li,{children:"Model & Methods"}),`
`,e.jsx(n.li,{children:"Results"}),`
`,e.jsx(n.li,{children:"Discussion"}),`
`,e.jsx(n.li,{children:"Limitations & Future Work"}),`
`,e.jsx(n.li,{children:"Conclusion"}),`
`,e.jsx(n.li,{children:"References"}),`
`]}),`
`,e.jsx(n.p,{children:"Click any section to smooth-scroll to it. The active section is highlighted with a left teal border and bold text."}),`
`,e.jsxs(n.h3,{id:"animations",children:["Animations",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#animations",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"TOC items fade in with a staggered animation (40ms delay between items) when the component mounts, giving a cascading entrance effect."}),`
`,e.jsxs(n.h2,{id:"section-tracking",children:["Section Tracking",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#section-tracking",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"useIntersectionTracker"})," hook uses the Intersection Observer API to detect which section is currently in view:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Root margin:"})," ",e.jsx(n.code,{children:"-20% 0px -70% 0px"}),' — a section is considered "active" when its top edge enters the upper 20% of the viewport']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Threshold:"})," ",e.jsx(n.code,{children:"0"})," — triggers as soon as any part of the section crosses the margin"]}),`
`]}),`
`,e.jsxs(n.p,{children:["All ",e.jsx(n.code,{children:"[data-section]"})," elements are observed. When a new section enters the detection zone, the context updates and three things happen simultaneously:"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.strong,{children:"TOC"})," highlights the new section"]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.strong,{children:"header"})," updates the section label with a fade animation"]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.strong,{children:"suggested prompts"})," below the chat change to match the section"]}),`
`]}),`
`,e.jsxs(n.h2,{id:"reading-progress-bar",children:["Reading Progress Bar",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#reading-progress-bar",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"A 2px teal bar at the top of the paper panel shows how far you've scrolled. It's computed as a fraction of total scroll height:"}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsx(n.code,{children:e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"progress = scrollTop / (scrollHeight - clientHeight)"})})})})}),`
`,e.jsx(n.p,{children:"The bar width scales from 0% to 100% as you scroll through the paper."}),`
`,e.jsxs(n.h2,{id:"scroll-to-section",children:["Scroll-to-Section",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#scroll-to-section",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["When you click a TOC entry, the app calls ",e.jsx(n.code,{children:"scrollToSection(slug)"})," from the paper reader context. This:"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Finds the ",e.jsx(n.code,{children:'[data-section="slug"]'})," element"]}),`
`,e.jsxs(n.li,{children:["Scrolls the paper panel container to bring it into view with ",e.jsx(n.code,{children:"scrollIntoView({ behavior: 'smooth' })"})]}),`
`,e.jsx(n.li,{children:"The intersection observer then picks up the change and updates the active state"}),`
`]})]})}function a(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{a as default,o as frontmatter};
