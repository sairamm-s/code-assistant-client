import { useState } from 'react';
import { Send } from 'lucide-react';
import { STRINGS } from '../../../constants/strings.constant';
import './chat-input.component.scss';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

const ChatInputComponent = ({ onSend, disabled }: ChatInputProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        className="chat-input__field"
        type="text"
        placeholder={STRINGS.chat.placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />
      <button type="submit" className="chat-input__send" disabled={disabled || !value.trim()}>
        <Send size={18} strokeWidth={1.5} />
      </button>
    </form>
  );
};

export default ChatInputComponent;
