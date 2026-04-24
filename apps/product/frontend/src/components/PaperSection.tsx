import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import type { Components } from 'react-markdown';
import type { PaperSection as PaperSectionType } from '../types/paper';
import { API_BASE } from '../lib/api';

const components: Components = {
  h1: ({ children, ...props }) => (
    <h1 id={slugify(String(children))} {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 id={slugify(String(children))} {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 id={slugify(String(children))} {...props}>{children}</h3>
  ),
  table: ({ children, ...props }) => (
    <div className="paper-table-wrapper">
      <table {...props}>{children}</table>
    </div>
  ),
  img: ({ src, alt, ...props }) => {
    const resolvedSrc = src?.startsWith('/') ? `${API_BASE}${src}` : src;
    return (
      <figure className="paper-figure">
        <img src={resolvedSrc} alt={alt ?? ''} loading="lazy" {...props} />
        {alt && <figcaption>{alt}</figcaption>}
      </figure>
    );
  },
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

interface Props {
  section: PaperSectionType;
}

export function PaperSectionRenderer({ section }: Props) {
  return (
    <article data-section={section.slug} className="paper-section">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {section.content}
      </ReactMarkdown>
    </article>
  );
}
