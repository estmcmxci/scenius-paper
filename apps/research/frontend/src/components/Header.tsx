import { useEffect, useRef, useState } from 'react';
import { usePaperReader } from '../context/PaperReaderContext';

const SECTION_LABELS: Record<string, string> = {
  abstract: 'Abstract',
  introduction: '1. Introduction',
  'the-signal': '2. The Signal',
  reputation: '3. Reputation',
  aggregation: '4. Aggregation',
  'the-market': '5. The Market',
  incentive: '6. Incentive',
  distribution: '7. Distribution',
  identity: '8. Identity',
  'markets-as-apis': '9. Markets as APIs',
  'competitive-landscape': '10. Competitive Landscape',
  privacy: '11. Privacy',
  results: '12. Results',
  roadmap: '13. Roadmap',
  conclusion: '14. Conclusion',
  references: 'References',
};

export function Header() {
  const { currentSection, viewMode } = usePaperReader();
  const sectionLabel = SECTION_LABELS[currentSection] ?? '';
  const [visible, setVisible] = useState(true);
  const prevSection = useRef(currentSection);

  useEffect(() => {
    if (prevSection.current !== currentSection) {
      setVisible(false);
      const id = setTimeout(() => {
        prevSection.current = currentSection;
        setVisible(true);
      }, 150);
      return () => clearTimeout(id);
    }
  }, [currentSection]);

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">
          Scenius
        </h1>
        <span className="header-meta">
          estmcmxci.eth &middot; Trece Research &middot; 2026
        </span>
      </div>
      <div className="header-right">
        {viewMode === 'markdown' && sectionLabel && (
          <span className={`header-section${visible ? '' : ' header-section--entering'}`}>
            {sectionLabel}
          </span>
        )}
        <a href="/docs" target="_blank" rel="noopener noreferrer" className="header-docs-link">
          Docs
        </a>
      </div>
    </header>
  );
}
