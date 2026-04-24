import{u as s,j as e}from"./index-BBSgPmMT.js";const r={title:"Text Selection",description:"undefined"};function i(n){const t={a:"a",aside:"aside",code:"code",div:"div",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.header,{children:e.jsxs(t.h1,{id:"text-selection",children:["Text Selection",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#text-selection",children:e.jsx(t.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(t.p,{children:"Select any passage in the paper and ask the AI about it — without typing a prompt from scratch."}),`
`,e.jsxs(t.h2,{id:"how-it-works",children:["How It Works",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#how-it-works",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Select text"})," — highlight any passage longer than 3 characters in the Markdown view"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Tooltip appears"}),' — a floating "Ask about this" button positions itself above the selection']}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Click"})," — the selected text is sent to the chat composer as a prefilled prompt"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Chat activates"})," — the composer focuses with the passage quoted, ready to send or edit"]}),`
`]}),`
`,e.jsxs(t.h2,{id:"selection-tooltip",children:["Selection Tooltip",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#selection-tooltip",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"SelectionTooltip"})," component listens for ",e.jsx(t.code,{children:"mouseup"})," events inside the paper container. When it detects a selection:"]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["It reads the selection text via ",e.jsx(t.code,{children:"window.getSelection()"})]}),`
`,e.jsx(t.li,{children:"Filters out selections shorter than 3 characters"}),`
`,e.jsx(t.li,{children:"Computes the tooltip position from the selection's bounding rect"}),`
`,e.jsx(t.li,{children:"Renders the tooltip centered above the selection with a fade-in animation"}),`
`]}),`
`,e.jsx(t.p,{children:"The tooltip dismisses when:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"You click outside the selection"}),`
`,e.jsx(t.li,{children:"The selection is cleared"}),`
`,e.jsx(t.li,{children:'You click the "Ask about this" button (after sending to chat)'}),`
`]}),`
`,e.jsxs(t.h2,{id:"auto-compose",children:["Auto-Compose",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#auto-compose",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(t.p,{children:'When you click "Ask about this", the app constructs a prompt:'}),`
`,e.jsx(e.Fragment,{children:e.jsx(t.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsx(t.code,{children:e.jsx(t.span,{className:"line",children:e.jsx(t.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:'Regarding this passage: "{selected text}" —'})})})})}),`
`,e.jsxs(t.p,{children:["The text is truncated to 300 characters if the selection is long. This prompt is set as the composer value via ",e.jsx(t.code,{children:"sendToChat()"})," in the paper reader context, which calls the registered ",e.jsx(t.code,{children:"chatMethods.setComposerValue()"}),"."]}),`
`,e.jsx(t.p,{children:"You can then:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Send immediately"})," — the AI will interpret the passage in context"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Edit first"})," — append your specific question after the quoted passage"]}),`
`]}),`
`,e.jsxs(t.h2,{id:"integration-with-context",children:["Integration with Context",e.jsx(t.a,{"aria-hidden":"true",tabIndex:"-1",href:"#integration-with-context",children:e.jsx(t.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(t.p,{children:["The selection flow connects the paper reader to the chat through the ",e.jsx(t.code,{children:"PaperReaderContext"}),":"]}),`
`,e.jsx(e.Fragment,{children:e.jsx(t.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsx(t.code,{children:e.jsx(t.span,{className:"line",children:e.jsx(t.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"SelectionTooltip → sendToChat(text) → PaperReaderContext → chatMethods.setComposerValue()"})})})})}),`
`,e.jsx(t.p,{children:"This avoids tight coupling between components — the tooltip doesn't know about ChatKit directly, and the chat panel doesn't know about text selection. The context bridges them."}),`
`,e.jsx(t.aside,{"data-callout":"info",children:e.jsxs(t.p,{children:["Text selection only works in ",e.jsx(t.strong,{children:"Markdown view"}),". In PDF mode, the text layer supports native browser selection but does not trigger the tooltip."]})})]})}function a(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{a as default,r as frontmatter};
