import{u as r,j as e}from"./index-BBSgPmMT.js";const t={title:"Paper Chat",description:"undefined"};function s(i){const n={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"paper-chat",children:["Paper Chat",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#paper-chat",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:"An interactive paper reader with AI-powered Q&A and live simulations, built for any research paper."}),`
`,e.jsxs(n.h2,{id:"what-is-paper-chat",children:["What is Paper Chat?",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#what-is-paper-chat",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Paper Chat is a full-stack web application that turns a static research paper into an interactive exploration tool. It pairs a rich reading experience on the left with an AI research assistant on the right — all in a single split-screen interface."}),`
`,e.jsx(n.p,{children:"The assistant doesn't just retrieve text. It can search the paper, run Monte Carlo simulations on demand, generate publication-quality figures, and reason about results in the context of the full paper."}),`
`,e.jsxs(n.h2,{id:"key-features",children:["Key Features",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#key-features",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.h3,{id:"reading-experience",children:["Reading Experience",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#reading-experience",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Dual view modes"})," — switch between rendered Markdown (with LaTeX math) and the original PDF"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Table of contents"})," with live section tracking and reading progress bar"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Text selection tooltip"})," — highlight any passage and ask the AI about it directly"]}),`
`]}),`
`,e.jsxs(n.h3,{id:"ai-chat",children:["AI Chat",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#ai-chat",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Conversational Q&A"})," powered by OpenAI's o4-mini model with 8 specialized tools"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Context-aware prompts"})," that change based on the section you're reading"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Thinking indicator"})," showing agent reasoning phases in real time"]}),`
`]}),`
`,e.jsxs(n.h3,{id:"live-simulations",children:["Live Simulations",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#live-simulations",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Run custom simulations"})," with configurable parameters (tail index, stake dispersion, regime)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Generate 4 figure types"})," — calibration curves, reputation separation, learning dynamics, inequality sensitivity"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Query pre-computed results"})," across 630 simulation runs"]}),`
`]}),`
`,e.jsxs(n.h2,{id:"tech-stack",children:["Tech Stack",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#tech-stack",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Layer"}),e.jsx(n.th,{children:"Stack"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Frontend"})}),e.jsx(n.td,{children:"React 19, TypeScript, Vite, ChatKit React, react-markdown, react-pdf, KaTeX"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Backend"})}),e.jsx(n.td,{children:"FastAPI, OpenAI Agents SDK, ChatKit Server, NumPy, SciPy, Matplotlib"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Model"})}),e.jsx(n.td,{children:"o4-mini (via OpenAI Agents SDK)"})]})]})]}),`
`,e.jsxs(n.h2,{id:"quick-start",children:["Quick Start",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#quick-start",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:"# Backend"})}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"cd"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" paper-chat/backend"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"pip"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" install"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" -e"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" ."})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"uvicorn"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" app.main:app"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" --port"}),e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:" 8321"})]}),`
`,e.jsx(n.span,{className:"line","data-empty-line":!0,children:" "}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#6A737D","--shiki-dark":"#768390"},children:"# Frontend"})}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#005CC5","--shiki-dark":"#6CB6FF"},children:"cd"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" paper-chat/frontend"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"npm"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" install"})]}),`
`,e.jsxs(n.span,{className:"line",children:[e.jsx(n.span,{style:{color:"#6F42C1","--shiki-dark":"#F69D50"},children:"npm"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" run"}),e.jsx(n.span,{style:{color:"#032F62","--shiki-dark":"#96D0FF"},children:" dev"})]})]})})}),`
`,e.jsxs(n.p,{children:["The frontend dev server proxies API calls to the backend at ",e.jsx(n.code,{children:"localhost:8321"}),"."]})]})}function d(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{d as default,t as frontmatter};
