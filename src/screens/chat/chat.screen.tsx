import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBarComponent from '../../components/common/nav-bar/nav-bar.component';
import FileTreeComponent from '../../components/common/file-tree/file-tree.component';
import ChatMessageComponent from '../../components/common/chat-message/chat-message.component';
import ChatInputComponent from '../../components/common/chat-input/chat-input.component';
import RetrievalContextPanelComponent from '../../components/common/retrieval-context-panel/retrieval-context-panel.component';
import RepoSummaryBadgeComponent from '../../components/common/repo-summary-badge/repo-summary-badge.component';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import { appendMessage, setMessages, setSending } from '../../store/chat.slice';
import { setRepository, setStatus } from '../../store/repository.slice';
import chatModel from '../../models/chat.model';
import repositoryModel from '../../models/repository.model';
import { STRINGS } from '../../constants/strings.constant';
import './chat.screen.scss';

const ChatScreen = () => {
  const { repositoryId } = useParams<{ repositoryId: string }>();
  const dispatch = useAppDispatch();
  const repository = useAppSelector((state) => state.repository);
  const chat = useAppSelector((state) => state.chat);
  const [selectedPath, setSelectedPath] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!repositoryId) return;
    chatModel.getHistory(repositoryId).then((messages) => dispatch(setMessages(messages)));

    // Redux repository state doesn't survive a page refresh — re-fetch here
    // so the header badge is correct even when this screen is the entry
    // point (e.g. a refresh, or a bookmarked/shared /chat/:id link).
    if (repository.id !== repositoryId) {
      repositoryModel.getRepository(repositoryId).then((data) => {
        dispatch(setRepository({ id: data.id, name: data.name }));
        dispatch(setStatus({ status: data.status, fileCount: data.fileCount, errorMessage: data.errorMessage }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositoryId, dispatch]);

  const filePaths = useMemo(() => {
    const paths = new Set<string>();
    chat.messages.forEach((message) => {
      message.citations?.forEach((citation) => paths.add(citation.filePath));
    });
    return Array.from(paths);
  }, [chat.messages]);

  const lastAssistantCitations = useMemo(() => {
    const lastAssistant = [...chat.messages].reverse().find((message) => message.role === 'assistant');
    return lastAssistant?.citations ?? [];
  }, [chat.messages]);

  const handleSend = async (message: string) => {
    if (!repositoryId) return;

    dispatch(
      appendMessage({
        id: `local-${Date.now()}`,
        role: 'user',
        content: message,
        citations: null,
        createdAt: new Date().toISOString(),
      }),
    );
    dispatch(setSending(true));

    try {
      const response = await chatModel.sendMessage(repositoryId, message);
      dispatch(
        appendMessage({
          id: `local-${Date.now()}-assistant`,
          role: 'assistant',
          content: response.answer,
          citations: response.citations,
          createdAt: new Date().toISOString(),
        }),
      );
    } catch (err) {
      dispatch(
        appendMessage({
          id: `local-${Date.now()}-error`,
          role: 'assistant',
          content: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
          citations: null,
          createdAt: new Date().toISOString(),
        }),
      );
    } finally {
      dispatch(setSending(false));
    }
  };

  return (
    <div className="chat-screen">
      <NavBarComponent />
      <div className="chat-screen__header">
        <RepoSummaryBadgeComponent name={repository.name ?? 'Repository'} fileCount={repository.fileCount} />
      </div>
      <div className="chat-screen__body">
        <FileTreeComponent filePaths={filePaths} selectedPath={selectedPath} onSelect={setSelectedPath} />
        <main className="chat-screen__thread">
          {chat.messages.length === 0 && <p className="chat-screen__empty">{STRINGS.chat.emptyState}</p>}
          {chat.messages.map((message) => (
            <ChatMessageComponent key={message.id} role={message.role} content={message.content} citations={message.citations} />
          ))}
          {chat.sending && <p className="chat-screen__typing">Thinking...</p>}
          <div className="chat-screen__input">
            <ChatInputComponent onSend={handleSend} disabled={chat.sending} />
          </div>
        </main>
        <RetrievalContextPanelComponent citations={lastAssistantCitations} />
      </div>
    </div>
  );
};

export default ChatScreen;
