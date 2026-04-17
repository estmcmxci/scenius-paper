import { createContext, useCallback, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { ViewMode } from '../types/paper';

interface PaperReaderState {
  currentSection: string;
  selectedText: string;
  selectionRect: DOMRect | null;
  viewMode: ViewMode;
  setCurrentSection: (slug: string) => void;
  setSelectedText: (text: string, rect: DOMRect | null) => void;
  setViewMode: (mode: ViewMode) => void;
  sendToChat: (text: string) => void;
  scrollToSection: (slug: string) => void;
  registerChatMethods: (methods: ChatMethods) => void;
  registerPaperScroll: (fn: (slug: string) => void) => void;
}

interface ChatMethods {
  setComposerValue: (value: string) => void;
  focusComposer: () => void;
  sendUserMessage: (message: string) => void;
}

const PaperReaderContext = createContext<PaperReaderState | null>(null);

export function PaperReaderProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState('introduction');
  const [selectedText, setSelectedTextRaw] = useState('');
  const [selectionRect, setSelectionRect] = useState<DOMRect | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('markdown');

  const chatMethodsRef = useRef<ChatMethods | null>(null);
  const paperScrollRef = useRef<((slug: string) => void) | null>(null);

  const setSelectedText = useCallback((text: string, rect: DOMRect | null) => {
    setSelectedTextRaw(text);
    setSelectionRect(rect);
  }, []);

  const registerChatMethods = useCallback((methods: ChatMethods) => {
    chatMethodsRef.current = methods;
  }, []);

  const registerPaperScroll = useCallback((fn: (slug: string) => void) => {
    paperScrollRef.current = fn;
  }, []);

  const sendToChat = useCallback((text: string) => {
    const methods = chatMethodsRef.current;
    if (!methods) return;
    const truncated = text.length > 300 ? text.slice(0, 300) + '...' : text;
    methods.setComposerValue(`Regarding this passage: "${truncated}" \u2014 `);
    methods.focusComposer();
    setSelectedTextRaw('');
    setSelectionRect(null);
  }, []);

  const scrollToSection = useCallback((slug: string) => {
    paperScrollRef.current?.(slug);
  }, []);

  return (
    <PaperReaderContext.Provider
      value={{
        currentSection,
        selectedText,
        selectionRect,
        viewMode,
        setCurrentSection,
        setSelectedText,
        setViewMode,
        sendToChat,
        scrollToSection,
        registerChatMethods,
        registerPaperScroll,
      }}
    >
      {children}
    </PaperReaderContext.Provider>
  );
}

export function usePaperReader() {
  const ctx = useContext(PaperReaderContext);
  if (!ctx) throw new Error('usePaperReader must be used within PaperReaderProvider');
  return ctx;
}
