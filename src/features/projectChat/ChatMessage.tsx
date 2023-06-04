interface Message {
  id: number;
  text: string;
  date: Date;
  checked: boolean;
}

export function ChatMessage({ message }: { message: Message }) {
  return (
    <div className="mt-2 border-b-2 pb-2 text-sm">
      <div className="mb-1 flex justify-between text-xs text-gray-500">
        <span>{message.date.toLocaleDateString('pl')}</span>
        <span>{message.checked ? 'Sprawdzone' : ''}</span>
      </div>
      <div>
        <p>{message.text}</p>
      </div>
    </div>
  );
}
