import { usePaperReader } from '../context/PaperReaderContext';
import type { PaperSection } from '../types/paper';

interface Props {
  sections: PaperSection[];
  className?: string;
  onItemClick?: () => void;
}

export function TableOfContents({ sections, className, onItemClick }: Props) {
  const { currentSection, scrollToSection } = usePaperReader();

  return (
    <nav className={`toc ${className ?? ''}`} aria-label="Table of contents">
      <ul className="toc-list">
        {sections.map((sec, index) => {
          const isActive = currentSection === sec.slug;
          return (
            <li key={sec.slug}>
              <button
                className={`toc-item ${isActive ? 'toc-item--active' : ''}`}
                onClick={() => {
                  scrollToSection(sec.slug);
                  onItemClick?.();
                }}
                aria-current={isActive ? 'location' : undefined}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                {sec.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
