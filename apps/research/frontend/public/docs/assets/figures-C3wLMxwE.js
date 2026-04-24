import{u as s,j as e}from"./index-BBSgPmMT.js";const t={title:"Figure Generation",description:"undefined"};function r(n){const i={a:"a",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i.header,{children:e.jsxs(i.h1,{id:"figure-generation",children:["Figure Generation",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#figure-generation",children:e.jsx(i.div,{"data-autolink-icon":!0})})]})}),`
`,e.jsx(i.p,{children:"The assistant can generate four types of publication-quality figures on demand. Each figure runs a simulation with your specified parameters and renders the results with matplotlib."}),`
`,e.jsxs(i.h2,{id:"figure-types",children:["Figure Types",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#figure-types",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.h3,{id:"calibration-curve",children:["Calibration Curve",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#calibration-curve",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Command:"})," ",e.jsx(i.code,{children:'generate_figure(figure_type="calibration")'})]}),`
`,e.jsx(i.p,{children:"Plots predicted probability vs observed frequency for all three mechanisms (E, C, R). A perfectly calibrated forecaster would lie on the diagonal."}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"X-axis: Predicted probability (binned)"}),`
`,e.jsx(i.li,{children:"Y-axis: Observed frequency"}),`
`,e.jsx(i.li,{children:"Three lines: Equal (green), Capital (red), Reputation (blue)"}),`
`,e.jsx(i.li,{children:"Diagonal reference line for perfect calibration"}),`
`]}),`
`,e.jsx(i.p,{children:"This is the primary visualization for comparing mechanism accuracy."}),`
`,e.jsxs(i.h3,{id:"reputation-separation",children:["Reputation Separation",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#reputation-separation",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Command:"})," ",e.jsx(i.code,{children:'generate_figure(figure_type="reputation_separation")'})]}),`
`,e.jsx(i.p,{children:"Boxplot showing the final reputation distributions for good vs bad agents."}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:'Two boxes: "Good agents" and "Bad agents"'}),`
`,e.jsx(i.li,{children:"Y-axis: Final reputation value"}),`
`,e.jsx(i.li,{children:"Shows median, quartiles, and outliers"}),`
`]}),`
`,e.jsx(i.p,{children:"A clear separation between the boxes indicates the reputation system is successfully distinguishing skilled from unskilled forecasters."}),`
`,e.jsxs(i.h3,{id:"learning-dynamics",children:["Learning Dynamics",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#learning-dynamics",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Command:"})," ",e.jsx(i.code,{children:'generate_figure(figure_type="learning_dynamics")'})]}),`
`,e.jsx(i.p,{children:"Rolling Brier score (window = 100 questions) plotted over all J questions."}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"X-axis: Question number"}),`
`,e.jsx(i.li,{children:"Y-axis: Rolling mean Brier score"}),`
`,e.jsx(i.li,{children:"Three lines: E, C, R"}),`
`,e.jsx(i.li,{children:"Shows how each mechanism's accuracy evolves as reputations converge"}),`
`]}),`
`,e.jsx(i.p,{children:"Early in the simulation, all three mechanisms perform similarly. As reputations separate, R should diverge from C (especially in Regime B)."}),`
`,e.jsxs(i.h3,{id:"inequality-sensitivity",children:["Inequality Sensitivity",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#inequality-sensitivity",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Command:"})," ",e.jsx(i.code,{children:'generate_figure(figure_type="inequality_sensitivity")'})]}),`
`,e.jsx(i.p,{children:"Two-panel scatter plot showing how stake dispersion (σ_s) affects outcomes:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Panel (a):"})," R vs C improvement (%) as a function of σ_s"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Panel (b):"})," C vs E distortion (%) as a function of σ_s"]}),`
`]}),`
`,e.jsx(i.p,{children:"Uses pre-computed sweep data across multiple σ_s values with error bars from multi-seed runs. This figure does not require regime or alpha parameters since it aggregates across the full sweep."}),`
`,e.jsxs(i.h2,{id:"color-scheme",children:["Color Scheme",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#color-scheme",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"All figures use a consistent color scheme:"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Mechanism"}),e.jsx(i.th,{children:"Color"}),e.jsx(i.th,{children:"Marker"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Equal (E)"}),e.jsxs(i.td,{children:["Green (",e.jsx(i.code,{children:"#2ca02c"}),")"]}),e.jsx(i.td,{children:"Diamond"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Capital (C)"}),e.jsxs(i.td,{children:["Red (",e.jsx(i.code,{children:"#d62728"}),")"]}),e.jsx(i.td,{children:"Circle"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Reputation (R)"}),e.jsxs(i.td,{children:["Blue (",e.jsx(i.code,{children:"#1f77b4"}),")"]}),e.jsx(i.td,{children:"Square"})]})]})]}),`
`,e.jsxs(i.h2,{id:"how-figures-are-delivered",children:["How Figures Are Delivered",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#how-figures-are-delivered",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["The agent calls ",e.jsx(i.code,{children:"generate_figure"})," with the desired type and parameters"]}),`
`,e.jsx(i.li,{children:"The backend runs a single-seed simulation (or loads sweep data for inequality sensitivity)"}),`
`,e.jsx(i.li,{children:"Matplotlib renders the figure and saves it as a PNG"}),`
`,e.jsxs(i.li,{children:["The image is encoded as a base64 data URI and added to ",e.jsx(i.code,{children:"pending_images"})]}),`
`,e.jsx(i.li,{children:"After the agent finishes responding, the image is injected into the chat stream"}),`
`,e.jsxs(i.li,{children:["The PNG is also saved to ",e.jsx(i.code,{children:"data/figures/"})," with a UUID filename for static serving"]}),`
`]}),`
`,e.jsxs(i.h2,{id:"customization",children:["Customization",e.jsx(i.a,{"aria-hidden":"true",tabIndex:"-1",href:"#customization",children:e.jsx(i.div,{"data-autolink-icon":!0})})]}),`
`,e.jsx(i.p,{children:"You can control figure parameters through natural language:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.em,{children:'"Generate a calibration figure for Regime B with α = 1.5"'})}),`
`,e.jsx(i.li,{children:e.jsx(i.em,{children:'"Show reputation separation with σ_bad = 2.0"'})}),`
`,e.jsx(i.li,{children:e.jsx(i.em,{children:'"Plot learning dynamics for the correlated regime"'})}),`
`]}),`
`,e.jsxs(i.p,{children:["The agent maps your request to the appropriate ",e.jsx(i.code,{children:"generate_figure"})," call with the right parameter values."]})]})}function d(n={}){const{wrapper:i}={...s(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(r,{...n})}):r(n)}export{d as default,t as frontmatter};
