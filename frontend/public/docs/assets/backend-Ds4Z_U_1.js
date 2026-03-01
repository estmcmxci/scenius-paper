import{u as r,j as e}from"./index-BBSgPmMT.js";const t={title:"Backend Architecture",description:"undefined"};function i(n){const s={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.header,{children:e.jsxs(s.h1,{id:"backend-architecture",children:["Backend Architecture",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#backend-architecture",children:e.jsx(s.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(s.p,{children:"The backend is a FastAPI application that serves paper content, handles chat conversations, and runs simulations."}),`
`,e.jsxs(s.h2,{id:"tech-stack",children:["Tech Stack",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#tech-stack",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Library"}),e.jsx(s.th,{children:"Purpose"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"FastAPI 0.115+"}),e.jsx(s.td,{children:"HTTP framework"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"OpenAI Agents SDK"}),e.jsx(s.td,{children:"Agent orchestration (o4-mini)"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"OpenAI ChatKit"}),e.jsx(s.td,{children:"Chat/thread management"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"NumPy, SciPy"}),e.jsx(s.td,{children:"Numerical simulation"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Matplotlib"}),e.jsx(s.td,{children:"Figure generation"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Pandas"}),e.jsx(s.td,{children:"Data loading and manipulation"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"scikit-learn"}),e.jsx(s.td,{children:"TF-IDF search indexing"})]})]})]}),`
`,e.jsxs(s.h2,{id:"endpoints",children:["Endpoints",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#endpoints",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Endpoint"}),e.jsx(s.th,{children:"Method"}),e.jsx(s.th,{children:"Description"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"/"})}),e.jsx(s.td,{children:"GET"}),e.jsxs(s.td,{children:["Health check — returns ",e.jsx(s.code,{children:'{"status": "ok", "agent": "Paper Assistant"}'})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"/api/paper/full"})}),e.jsx(s.td,{children:"GET"}),e.jsx(s.td,{children:"Returns all 8 paper sections as JSON with slug, title, content, and order"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"/api/paper/pdf"})}),e.jsx(s.td,{children:"GET"}),e.jsx(s.td,{children:"Serves the paper PDF file"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"/chatkit"})}),e.jsx(s.td,{children:"POST"}),e.jsx(s.td,{children:"ChatKit request handler — routes to the paper agent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"/figures"})}),e.jsx(s.td,{children:"MOUNT"}),e.jsx(s.td,{children:"Static file serving for generated PNG figures"})]})]})]}),`
`,e.jsx(s.p,{children:"CORS is enabled for all origins to support the Vite dev server proxy."}),`
`,e.jsxs(s.h2,{id:"paper-content",children:["Paper Content",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#paper-content",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["The paper is stored as 8 Markdown files (",e.jsx(s.code,{children:"*_draft.md"}),") in ",e.jsx(s.code,{children:"app/data/paper/"}),". On startup, the server:"]}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsx(s.li,{children:"Loads each file and assigns it a section slug, title, and order"}),`
`,e.jsxs(s.li,{children:["Replaces figure placeholders with Markdown image syntax pointing to ",e.jsx(s.code,{children:"/figures/"})]}),`
`,e.jsx(s.li,{children:"Strips per-section reference lists (references are unified in the final section)"}),`
`]}),`
`,e.jsx(s.p,{children:"The 8 sections: Introduction, Related Work, Model & Methods, Results, Discussion, Limitations & Future Work, Conclusion, References."}),`
`,e.jsxs(s.h2,{id:"chatkit-server",children:["ChatKit Server",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#chatkit-server",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"PaperChatKitServer"})," extends ChatKit's ",e.jsx(s.code,{children:"ChatKitServer"})," base class:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"respond()"})," is an async generator that handles incoming user messages"]}),`
`,e.jsx(s.li,{children:"It instantiates the paper agent and runs it with up to 25 turns"}),`
`,e.jsxs(s.li,{children:["Responses stream back as ",e.jsx(s.code,{children:"ThreadItemAddedEvent"})," and ",e.jsx(s.code,{children:"ThreadItemDoneEvent"})]}),`
`,e.jsx(s.li,{children:"After the agent completes, any pending figure images (base64 data URIs) are injected into the stream"}),`
`]}),`
`,e.jsxs(s.h2,{id:"agent-configuration",children:["Agent Configuration",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#agent-configuration",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(s.p,{children:"The paper agent uses OpenAI's Agents SDK with:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Model:"})," o4-mini"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Name:"})," Paper Assistant"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Instructions:"})," ~3,000 lines covering paper content, equations, findings, and behavioral guidelines"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Tools:"})," 8 function tools (see ",e.jsx(s.a,{href:"/chat/tools",children:"Agent Tools"}),")"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Behavior:"})," Thoughtful research collaborator that reasons beyond explicit claims, cites sections, and limits tool calls to 2–3 per question"]}),`
`]}),`
`,e.jsxs(s.h2,{id:"in-memory-store",children:["In-Memory Store",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#in-memory-store",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"MemoryStore"})," implements ChatKit's ",e.jsx(s.code,{children:"Store"})," interface for thread and message persistence:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Threads"})," — conversation sessions with UUID-based IDs"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Thread items"})," — individual messages and responses"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Attachments"})," — file storage for the chat"]}),`
`]}),`
`,e.jsx(s.p,{children:"This is an MVP store. All data lives in memory and is lost on restart. It can be replaced with a database-backed implementation by swapping the store class."}),`
`,e.jsxs(s.h2,{id:"data-files",children:["Data Files",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#data-files",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(e.Fragment,{children:e.jsx(s.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsxs(s.code,{children:[e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"app/data/"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"├── paper/"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"│   ├── introduction_draft.md"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"│   ├── related_work_draft.md"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"│   ├── model_methods_draft.md"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"│   ├── results_draft.md"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"│   ├── discussion_draft.md"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"│   ├── limitations_draft.md"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"│   ├── conclusion_draft.md"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"│   └── references_draft.md"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"├── csv/"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"│   ├── scenius_main_results.csv"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"│   ├── scenius_main_perseed.csv"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"│   ├── scenius_sweep_results.csv"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"│   └── inequality_sweep_results.csv"})}),`
`,e.jsx(s.span,{className:"line",children:e.jsx(s.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"└── figures/          ← generated PNGs written here"})})]})})}),`
`,e.jsxs(s.h2,{id:"deployment",children:["Deployment",e.jsx(s.a,{"aria-hidden":"true",tabIndex:"-1",href:"#deployment",children:e.jsx(s.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(s.p,{children:["The backend includes a Dockerfile and ",e.jsx(s.code,{children:"railway.toml"})," for deployment on Railway:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Default port: 8321"}),`
`,e.jsxs(s.li,{children:["Entry point: ",e.jsx(s.code,{children:"uvicorn app.main:app"})]}),`
`,e.jsxs(s.li,{children:["Requires ",e.jsx(s.code,{children:"OPENAI_API_KEY"})," environment variable"]}),`
`]})]})}function a(n={}){const{wrapper:s}={...r(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(i,{...n})}):i(n)}export{a as default,t as frontmatter};
