import { FolderPlusIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Button } from '@src/components/button/Button';
import { ChatMessage } from './ChatMessage';

const messages = [
  {
    id: 1,
    text: 'Pan Marian znalazł dzisiaj na poddaszu spore pęknięcia w belce podtrzymującej dach. Najprawdopodobniej potrzeba będzie wymiana tej belki',
    date: new Date(),
    checked: true,
  },
  {
    id: 2,
    text: 'Pan Marian znalazł dzisiaj na poddaszu spore pęknięcia w belce podtrzymującej dach. Najprawdopodobniej potrzeba będzie wymiana tej belki',
    date: new Date(),
    checked: true,
  },
  {
    id: 3,
    text: 'Pan Marian znalazł dzisiaj na poddaszu spore pęknięcia w belce podtrzymującej dach. Najprawdopodobniej potrzeba będzie wymiana tej belki',
    date: new Date(),
    checked: false,
  },
];

export function ProjectChat() {
  return (
    <div className="flex h-full flex-col justify-between p-2 pt-4">
      <div>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <div className="sticky flex justify-between rounded-xl border-[1px] border-gray-300 p-1">
        <input type="text" className="rounded-lg outline-1 outline-gray-300" />
        <div className="h-6">
          <Button size="custom" variant="light" className="rounded-md p-[1px]">
            <PaperAirplaneIcon className="inline h-6" />
          </Button>
          <Button size="custom" variant="light" className="rounded-md p-[1px]">
            <FolderPlusIcon className="inline h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
