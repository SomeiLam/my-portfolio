import { formatDate } from '../utils/helper';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onClick: (note: Note) => void;
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  return (
    <div
      onClick={() => onClick(note)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow w-full"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{formatDate(note.date)}</p>
      <div className="text-gray-600 line-clamp-3">
        {note.details
          .filter((block) => block.type === 'text')
          .slice(0, 1)
          .map((block, index) => (
            <div key={index} className="text-gray-700 leading-relaxed">
              {block.content.split('\n').map((line, lineIndex) => (
                <p key={lineIndex} className="mb-2">
                  {line}
                </p>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
