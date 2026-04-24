import { useCallback, useRef, useState } from 'react';
import { PaperPanel } from './PaperPanel';
import { ChatPanel } from './ChatPanel';
import { useMediaQuery } from '../hooks/useMediaQuery';

export function SplitLayout() {
  const [leftPercent, setLeftPercent] = useState(65);
  const [activeTab, setActiveTab] = useState<'paper' | 'chat'>('paper');
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setLeftPercent(Math.min(80, Math.max(40, pct)));
    };

    const onMouseUp = () => {
      dragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  return (
    <div className="split-layout" ref={containerRef}>
      <div
        className={`split-left ${isMobile && activeTab !== 'paper' ? 'mobile-hidden' : ''}`}
        style={isMobile ? undefined : { flexBasis: `${leftPercent}%` }}
      >
        <PaperPanel />
      </div>
      {!isMobile && <div className="split-handle" onMouseDown={onMouseDown} />}
      <div
        className={`split-right ${isMobile && activeTab !== 'chat' ? 'mobile-hidden' : ''}`}
        style={isMobile ? undefined : { flexBasis: `${100 - leftPercent}%` }}
      >
        <ChatPanel />
      </div>
      {isMobile && (
        <div className="mobile-tab-bar">
          <button
            className={`mobile-tab-btn ${activeTab === 'paper' ? 'mobile-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('paper')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            Paper
          </button>
          <button
            className={`mobile-tab-btn ${activeTab === 'chat' ? 'mobile-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Chat
          </button>
        </div>
      )}
    </div>
  );
}
