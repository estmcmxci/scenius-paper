import{u as r,j as e}from"./index-BBSgPmMT.js";const a={title:"Conversational Q&A",description:"undefined"};function s(n){const t={a:"a",blockquote:"blockquote",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.header,{children:e.jsxs(t.h1,{id:"conversational-qa",children:["Conversational Q&A",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#conversational-qa",children:e.jsx(t.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(t.p,{children:"The right panel hosts an AI research assistant that can answer questions about the paper, run simulations, and generate figures — all through natural conversation."}),`
`,e.jsxs(t.h2,{id:"chatkit-integration",children:["ChatKit Integration",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#chatkit-integration",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(t.p,{children:["The chat interface is built on ",e.jsx(t.a,{href:"https://github.com/openai/chatkit",children:"OpenAI ChatKit"}),", which provides:"]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Thread-based conversation management"}),`
`,e.jsx(t.li,{children:"Streaming response rendering"}),`
`,e.jsx(t.li,{children:"Markdown and code block formatting"}),`
`,e.jsx(t.li,{children:"A composable React component library"}),`
`]}),`
`,e.jsxs(t.p,{children:["The frontend uses ",e.jsx(t.code,{children:"@openai/chatkit-react"})," and the backend implements a ",e.jsx(t.code,{children:"ChatKitServer"})," that routes messages to the paper agent."]}),`
`,e.jsxs(t.h2,{id:"start-screen",children:["Start Screen",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#start-screen",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(t.p,{children:"When you first open Paper Chat, the assistant greets you with:"}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:'"Ask me anything about the paper."'}),`
`]}),`
`,e.jsx(t.p,{children:"Below the greeting, five suggested prompts help you get started:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Summarize the paper's key contributions"}),`
`,e.jsx(t.li,{children:"Explain the three aggregation mechanisms"}),`
`,e.jsx(t.li,{children:"Show the main results table"}),`
`,e.jsx(t.li,{children:"Run a simulation with custom parameters"}),`
`,e.jsx(t.li,{children:"Generate a calibration figure"}),`
`]}),`
`,e.jsxs(t.h2,{id:"contextual-suggested-prompts",children:["Contextual Suggested Prompts",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#contextual-suggested-prompts",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(t.p,{children:"As you scroll through different sections of the paper, the suggested prompts below the chat update to match. Each section has 3–4 curated prompts:"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Section"}),e.jsx(t.th,{children:"Example Prompts"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Introduction"}),e.jsx(t.td,{children:'"What cultural breakout markets is the paper targeting?"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Model & Methods"}),e.jsx(t.td,{children:'"Explain the reputation update rule step by step"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Results"}),e.jsx(t.td,{children:'"Compare Regime B results across all three mechanisms"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Discussion"}),e.jsx(t.td,{children:'"What does the multiplicative limitation mean in practice?"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"References"}),e.jsx(t.td,{children:'"What are the key prediction markets papers cited?"'})]})]})]}),`
`,e.jsxs(t.p,{children:["Prompts are defined in ",e.jsx(t.code,{children:"contextual-prompts.ts"})," and retrieved via ",e.jsx(t.code,{children:"getPromptsForSection(slug)"}),". If the current section doesn't have specific prompts, it falls back to the Introduction set."]}),`
`,e.jsxs(t.h2,{id:"theme",children:["Theme",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#theme",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(t.p,{children:"The chat panel uses a custom ChatKit theme matching the app's design:"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Property"}),e.jsx(t.th,{children:"Value"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Color scheme"}),e.jsx(t.td,{children:"Light"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Accent color"}),e.jsxs(t.td,{children:[e.jsx(t.code,{children:"#2d7a7a"})," (teal)"]})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Font"}),e.jsx(t.td,{children:"DM Sans"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Font size"}),e.jsx(t.td,{children:"15px"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Border radius"}),e.jsx(t.td,{children:"Soft"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Density"}),e.jsx(t.td,{children:"Normal"})]})]})]}),`
`,e.jsxs(t.h2,{id:"message-flow",children:["Message Flow",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#message-flow",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"User types or selects a suggested prompt"}),`
`,e.jsxs(t.li,{children:["ChatKit sends a POST to ",e.jsx(t.code,{children:"/chatkit"})]}),`
`,e.jsxs(t.li,{children:["The backend ",e.jsx(t.code,{children:"PaperChatKitServer.respond()"})," runs the agent"]}),`
`,e.jsx(t.li,{children:"The agent calls tools as needed (search, simulate, generate figures)"}),`
`,e.jsx(t.li,{children:"Responses stream back as ChatKit events"}),`
`,e.jsx(t.li,{children:"Any generated figures are injected at the end of the response"}),`
`]}),`
`,e.jsx(t.p,{children:"The agent is allowed up to 25 turns per request, meaning it can chain multiple tool calls to answer complex questions."})]})}function d(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(s,{...n})}):s(n)}export{d as default,a as frontmatter};
