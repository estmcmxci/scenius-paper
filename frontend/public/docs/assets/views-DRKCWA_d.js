import{u as s,j as e}from"./index-BBSgPmMT.js";const t={title:"Reading Views",description:"undefined"};function r(i){const n={a:"a",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.header,{children:e.jsxs(n.h1,{id:"reading-views",children:["Reading Views",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#reading-views",children:e.jsx(n.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsxs(n.p,{children:["Paper Chat offers two ways to read the paper: a rendered ",e.jsx(n.strong,{children:"Markdown view"})," with full LaTeX math support, and the ",e.jsx(n.strong,{children:"original PDF"}),"."]}),`
`,e.jsxs(n.h2,{id:"view-toggle",children:["View Toggle",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#view-toggle",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"A two-button toggle in the paper panel header switches between modes. The active mode is highlighted with the teal accent color."}),`
`,e.jsx(e.Fragment,{children:e.jsx(n.pre,{className:"shiki shiki-themes github-light github-dark-dimmed",style:{backgroundColor:"#fff","--shiki-dark-bg":"#22272e",color:"#24292e","--shiki-dark":"#adbac7"},tabIndex:"0",children:e.jsxs(n.code,{children:[e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"┌──────────────┬──────────────┐"})}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"│ Reading View │     PDF      │"})}),`
`,e.jsx(n.span,{className:"line",children:e.jsx(n.span,{style:{color:"#24292E","--shiki-dark":"#ADBAC7"},children:"└──────────────┴──────────────┘"})})]})})}),`
`,e.jsxs(n.p,{children:["The view mode is stored in the ",e.jsx(n.code,{children:"PaperReaderContext"})," and persists as you navigate between sections."]}),`
`,e.jsxs(n.h2,{id:"markdown-view",children:["Markdown View",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#markdown-view",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["The default reading experience renders each section through ",e.jsx(n.code,{children:"react-markdown"})," with:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"remarkMath"})," + ",e.jsx(n.strong,{children:"rehypeKatex"})," — inline and display LaTeX equations render natively"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"remarkGfm"})," — GitHub-Flavored Markdown for tables, strikethrough, and task lists"]}),`
`,e.jsxs(n.li,{children:["Auto-slugified heading IDs for deep linking (e.g., ",e.jsx(n.code,{children:"#reputation-update-rule"}),")"]}),`
`,e.jsxs(n.li,{children:["Lazy-loaded figures with captions extracted from ",e.jsx(n.code,{children:"alt"})," text"]}),`
`,e.jsx(n.li,{children:"Responsive table wrappers that scroll horizontally on small screens"}),`
`]}),`
`,e.jsxs(n.h3,{id:"typography",children:["Typography",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#typography",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(n.p,{children:"The Markdown view uses the paper's design system:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Role"}),e.jsx(n.th,{children:"Font"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Headings"}),e.jsx(n.td,{children:"IBM Plex Sans"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Body text"}),e.jsx(n.td,{children:"Newsreader (serif)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"UI elements"}),e.jsx(n.td,{children:"DM Sans"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Code"}),e.jsx(n.td,{children:"SF Mono"})]})]})]}),`
`,e.jsxs(n.h3,{id:"skeleton-loading",children:["Skeleton Loading",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#skeleton-loading",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["While the paper content loads from ",e.jsx(n.code,{children:"/api/paper/full"}),", animated skeleton blocks show the page structure — title, paragraphs, and figures — so the layout doesn't jump when content arrives."]}),`
`,e.jsxs(n.h2,{id:"pdf-view",children:["PDF View",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#pdf-view",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.p,{children:["Toggle to PDF mode to see the original formatted paper. The PDF viewer uses ",e.jsx(n.code,{children:"react-pdf"})," and renders:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"All pages at 700px width with text and annotation layers"}),`
`,e.jsx(n.li,{children:"Page numbers below each page"}),`
`,e.jsx(n.li,{children:"Full scroll through the entire document"}),`
`,e.jsx(n.li,{children:"Loading and error states"}),`
`]}),`
`,e.jsxs(n.p,{children:["The PDF is served from ",e.jsx(n.code,{children:"/api/paper/pdf"})," on the backend."]}),`
`,e.jsxs(n.h2,{id:"when-to-use-each-view",children:["When to Use Each View",e.jsx(n.a,{"aria-hidden":"true",tabIndex:"-1",href:"#when-to-use-each-view",children:e.jsx(n.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{}),e.jsx(n.th,{children:"Markdown"}),e.jsx(n.th,{children:"PDF"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Math rendering"})}),e.jsx(n.td,{children:"Inline KaTeX"}),e.jsx(n.td,{children:"Embedded in PDF"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Text selection"})}),e.jsx(n.td,{children:"Yes — triggers tooltip"}),e.jsx(n.td,{children:"Limited (PDF text layer)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Section tracking"})}),e.jsx(n.td,{children:"Yes — updates TOC, header, prompts"}),e.jsx(n.td,{children:"No"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Navigation"})}),e.jsx(n.td,{children:"TOC + smooth scroll"}),e.jsx(n.td,{children:"Page-by-page scroll"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Figures"})}),e.jsx(n.td,{children:"Loaded from server"}),e.jsx(n.td,{children:"Embedded in PDF"})]})]})]}),`
`,e.jsx(n.p,{children:"The Markdown view is recommended for interactive use since it integrates with the TOC, selection tooltip, and contextual prompts."})]})}function a(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{a as default,t as frontmatter};
