import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  PageHeader,
  ErrorState,
  SkeletonLoader,
} from '@/components/common';
import { useAsyncData } from '@/hooks';
import { aiAssistantService } from './aiAssistantService';
import {
  ChatWindow,
  IncidentContextPanel,
  RelatedKnowledgePanel,
  SuggestedActionsPanel,
  ConversationHistoryPanel,
} from './components';
import styles from './AiAssistant.module.css';

function buildWelcomeMessage(welcome) {
  return aiAssistantService.createMessage('assistant', welcome.content);
}

function AiAssistant() {
  const { data, loading, error, refetch } = useAsyncData(
    () => aiAssistantService.getPageData(),
    []
  );

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState(null);

  useEffect(() => {
    if (!data) return;
    setMessages([buildWelcomeMessage(data.welcomeMessage)]);
    setActiveConversationId(null);
  }, [data]);

  const handleSend = useCallback(async (text) => {
    if (!data || isTyping) return;

    const userMessage = aiAssistantService.createMessage('user', text);
    setMessages((prev) => [...prev, userMessage]);
    setActiveConversationId(null);
    setIsTyping(true);

    try {
      const aiMessage = await aiAssistantService.getAiResponse(text, data.responses);
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      toast.error('Failed to get AI response');
    } finally {
      setIsTyping(false);
    }
  }, [data, isTyping]);

  const handleClear = useCallback(() => {
    if (!data) return;
    if (!window.confirm('Clear this conversation?')) return;
    setMessages([buildWelcomeMessage(data.welcomeMessage)]);
    setActiveConversationId(null);
    toast.success('Conversation cleared');
  }, [data]);

  const handleHistorySelect = useCallback((conversationId) => {
    if (!data) return;
    const historyMessages = aiAssistantService.getHistoryMessages(conversationId, data);
    setMessages([
      buildWelcomeMessage(data.welcomeMessage),
      ...historyMessages,
    ]);
    setActiveConversationId(conversationId);
    toast.success('Conversation loaded');
  }, [data]);

  const handleAction = useCallback((action) => {
    handleSend(action.prompt);
  }, [handleSend]);

  if (loading) {
    return (
      <div className={styles.page}>
        <SkeletonLoader variant="page" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Unable to load AI Assistant"
        message={error || 'Something went wrong while loading the assistant.'}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title={data.pageConfig.title}
        subtitle={data.pageConfig.subtitle}
        breadcrumbs={[
          { label: 'Home' },
          { label: 'AI Assistant' },
        ]}
      />

      <div className={styles.layout}>
        <main className={styles.chatColumn}>
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            suggestedQuestions={data.suggestedQuestions}
            onSend={handleSend}
            onClear={handleClear}
            inputDisabled={false}
          />
        </main>

        <aside className={styles.sidebar}>
          <IncidentContextPanel incident={data.incidentContext} />
          <SuggestedActionsPanel
            actions={data.suggestedActions}
            onAction={handleAction}
            disabled={isTyping}
          />
          <RelatedKnowledgePanel articles={data.relatedKnowledgeArticles} />
          <ConversationHistoryPanel
            conversations={data.conversationHistory}
            activeId={activeConversationId}
            onSelect={handleHistorySelect}
          />
        </aside>
      </div>
    </div>
  );
}

export default AiAssistant;
