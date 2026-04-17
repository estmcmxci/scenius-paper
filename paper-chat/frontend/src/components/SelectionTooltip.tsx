import { useCallback, useEffect, useState } from 'react';
import { usePaperReader } from '../context/PaperReaderContext';

interface Props {
  containerRef: React.RefObject<HTMLElement | null>;
}

interface TooltipPos {
  top: number;
  left: number;
}

export function SelectionTooltip({ containerRef }: Props) {
  const { sendToChat } = usePaperReader();
  const [text, setText] = useState('');
  const [pos, setPos] = useState<TooltipPos | null>(null);

  const handleMouseUp = useCallback(() => {
    // Small delay to let selection finalize
    requestAnimationFrame(() => {
      const sel = window.getSelection();
      const selectedText = sel?.toString().trim() ?? '';

      if (selectedText.length <= 3) {
        setText('');
        setPos(null);
        return;
      }

      const container = containerRef.current;
      if (!container || !sel?.rangeCount) return;

      // Only handle selections within the paper content
      const range = sel.getRangeAt(0);
      if (!container.contains(range.commonAncestorContainer)) {
        setText('');
        setPos(null);
        return;
      }

      const rect = range.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setText(selectedText);
      setPos({
        top: rect.top - containerRect.top + container.scrollTop - 40,
        left: rect.left - containerRect.left + rect.width / 2,
      });
    });
  }, [containerRef]);

  // Dismiss on click outside or when selection clears
  const handleMouseDown = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.selection-tooltip')) return;
    setText('');
    setPos(null);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchend', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [containerRef, handleMouseUp, handleMouseDown]);

  if (!text || !pos) return null;

  return (
    <div
      className="selection-tooltip"
      style={{ top: pos.top, left: pos.left }}
    >
      <button
        className="selection-tooltip-btn"
        onClick={() => {
          sendToChat(text);
          setText('');
          setPos(null);
        }}
      >
        Ask about this
      </button>
    </div>
  );
}
