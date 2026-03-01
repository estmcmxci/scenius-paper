import { useCallback, useEffect, useRef } from 'react';
import { ChatKit, useChatKit } from '@openai/chatkit-react';
import { paperTheme } from '../lib/theme';
import { usePaperReader } from '../context/PaperReaderContext';
import { SuggestedPrompts } from './SuggestedPrompts';

export function ChatPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { registerChatMethods } = usePaperReader();

  const chatKit = useChatKit({
    api: {
      url: import.meta.env.VITE_CHATKIT_URL || '/chatkit',
      domainKey: 'domain_pk_69a3be2ed9e48197986b89ea1dc32ca004f8eb1165ce28c0',
    },
    theme: paperTheme,
    startScreen: {
      greeting: 'Ask me anything about the paper.',
      prompts: [
        { label: 'Summarize the paper', prompt: 'What is the main finding of this paper?' },
        { label: 'Explain mechanisms', prompt: 'Explain the three aggregation mechanisms (E, C, R) and how they differ.' },
        { label: 'Show results', prompt: 'Show me the main results for Regime B (anti-correlated).' },
        { label: 'Run a simulation', prompt: 'Run a simulation with alpha=1.3 and sigma_s=1.5 in Regime B.' },
        { label: 'Generate a figure', prompt: 'Generate a calibration plot for Regime B.' },
      ],
    },
    header: { enabled: false },
    composer: { placeholder: 'Ask about the paper, simulations, or data...' },
  });

  // Wrap ChatKit object-param methods into simple string callbacks for the context
  const setComposerText = useCallback(
    (value: string) => chatKit.setComposerValue({ text: value }),
    [chatKit],
  );
  const sendMessage = useCallback(
    (message: string) => { chatKit.sendUserMessage({ text: message }); },
    [chatKit],
  );

  // Register chat methods with context so paper panel can use them
  useEffect(() => {
    registerChatMethods({
      setComposerValue: setComposerText,
      focusComposer: chatKit.focusComposer,
      sendUserMessage: sendMessage,
    });
  }, [registerChatMethods, setComposerText, chatKit.focusComposer, sendMessage]);

  return (
    <div ref={containerRef} className="chat-panel">
      <ChatKit control={chatKit.control} style={{ flex: 1, minHeight: 0 }} />
      <SuggestedPrompts onSendMessage={sendMessage} />
    </div>
  );
}
