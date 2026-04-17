import{u as t,j as e}from"./index-BBSgPmMT.js";const r={title:"Thinking Indicator",description:"undefined"};function s(i){const n={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"thinking-indicator",children:["Thinking Indicator",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#thinking-indicator",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(n.p,{children:"When the agent is processing a request, a thinking indicator shows what phase of reasoning it's in and how long it's been working."}),`
`,e.jsxs(n.h2,{id:"phases",children:["Phases",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#phases",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"The indicator cycles through six labeled phases as the agent works:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Phase"}),e.jsx(n.th,{children:"Label"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"1"}),e.jsx(n.td,{children:"Reading..."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"2"}),e.jsx(n.td,{children:"Searching..."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"3"}),e.jsx(n.td,{children:"Analyzing..."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"4"}),e.jsx(n.td,{children:"Reasoning..."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"5"}),e.jsx(n.td,{children:"Synthesizing..."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"6"}),e.jsx(n.td,{children:"Deep thinking..."})]})]})]}),`
`,e.jsx(n.p,{children:"Phases advance on a timer to give visual feedback even when the agent is waiting on a single long operation. The elapsed time (in seconds) is shown alongside the phase label."}),`
`,e.jsxs(n.h2,{id:"hourglass-animation",children:["Hourglass Animation",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#hourglass-animation",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"The thinking indicator features a pixel-art hourglass rendered on a 16x20 HTML canvas. The animation combines two effects:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Rotation"})," — the hourglass rotates 360 degrees over 2 seconds (",e.jsx(n.code,{children:"hg-spin"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Fade pulse"})," — the opacity pulses gently over 2.5 seconds (",e.jsx(n.code,{children:"hg-fade"}),")"]}),`
`]}),`
`,e.jsx(n.p,{children:"This creates a subtle, non-distracting animation that signals activity without pulling focus from the surrounding content."}),`
`,e.jsxs(n.h2,{id:"when-it-appears",children:["When It Appears",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#when-it-appears",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"The thinking indicator is visible whenever the agent is:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Executing tool calls (paper search, simulation, figure generation)"}),`
`,e.jsx(n.li,{children:"Waiting for the model to generate a response"}),`
`,e.jsx(n.li,{children:"Processing a multi-turn chain of tool calls"}),`
`]}),`
`,e.jsx(n.p,{children:"It disappears as soon as the response begins streaming. For fast queries that complete in under a second, the indicator may flash briefly or not appear at all."}),`
`,e.jsxs(n.h2,{id:"streaming-responses",children:["Streaming Responses",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#streaming-responses",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"Once the agent has finished reasoning and tool execution, the response streams into the chat. ChatKit handles the streaming display — text appears incrementally as tokens arrive from the backend."}),`
`,e.jsxs(n.p,{children:["If the agent generates figures during processing, the images are injected at the end of the streamed response (after all text content), since the figure data URIs are collected in a ",e.jsx(n.code,{children:"pending_images"})," list and flushed after the agent completes."]})]})}function d(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{d as default,r as frontmatter};
