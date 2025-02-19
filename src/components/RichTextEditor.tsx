import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Code, Type } from 'lucide-react';

interface RichTextEditorProps {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  editorState,
  setEditorState,
}) => {
  // Handle block type changes (H1 - H6, P, Lists, etc.)
  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // Handle inline styles (Bold, Italic, Underline, Colors)
  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // ✅ Custom inline style map for text colors
  const customStyleMap = {
    RED: { color: '#ef4444' }, // Tailwind Red-500
    BLUE: { color: '#3b82f6' }, // Tailwind Blue-500
    GREEN: { color: '#22c55e' }, // Tailwind Green-500
    PURPLE: { color: '#a855f7' }, // Tailwind Purple-500
    ORANGE: { color: '#f97316' }, // Tailwind Orange-500
  };

  return (
    <div className="p-4 border rounded-lg max-w-2xl mx-auto bg-white shadow-md">
      {/* Toolbar */}
      <div className="mb-2 flex flex-wrap gap-2 justify-start">
        {/* Inline Styles */}
        {['BOLD', 'ITALIC', 'UNDERLINE'].map((style) => (
          <button
            key={style}
            type="button"
            className="px-3 py-1 border rounded text-sm font-medium bg-gray-100 hover:bg-gray-200"
            onMouseDown={(e) => {
              e.preventDefault();
              toggleInlineStyle(style);
            }}
          >
            {style.charAt(0) + style.slice(1).toLowerCase()}
          </button>
        ))}

        {/* Block Types (Headers, Paragraph, Lists, Code) */}
        {[
          { type: 'header-one', label: 'H1' },
          { type: 'header-two', label: 'H2' },
          { type: 'header-three', label: 'H3' },
          { type: 'header-four', label: 'H4' },
          { type: 'header-five', label: 'H5' },
          { type: 'header-six', label: 'H6' },
          { type: 'unstyled', label: 'P' }, // ✅ Added Paragraph button
          { type: 'unordered-list-item', label: 'UL' },
          { type: 'ordered-list-item', label: 'OL' },
          { type: 'blockquote', label: 'Quote' },
          { type: 'code-block', label: <Code className="h-4 w-4" /> },
        ].map(({ type, label }) => (
          <button
            key={type}
            type="button"
            className="px-3 py-1 border rounded text-sm font-medium bg-gray-100 hover:bg-gray-200"
            onMouseDown={(e) => {
              e.preventDefault();
              toggleBlockType(type);
            }}
          >
            {label}
          </button>
        ))}

        {/* Text Colors */}
        {[
          {
            type: 'RED',
            label: <Type className="h-4 w-4" />,
            color: 'bg-red-500',
          },
          {
            type: 'BLUE',
            label: <Type className="h-4 w-4" />,
            color: 'bg-blue-500',
          },
          {
            type: 'GREEN',
            label: <Type className="h-4 w-4" />,
            color: 'bg-green-500',
          },
          {
            type: 'PURPLE',
            label: <Type className="h-4 w-4" />,
            color: 'bg-purple-500',
          },
          {
            type: 'ORANGE',
            label: <Type className="h-4 w-4" />,
            color: 'bg-orange-500',
          },
        ].map(({ type, label, color }) => (
          <button
            key={type}
            type="button"
            className={`px-3 py-1 border rounded text-sm font-medium text-white ${color} hover:opacity-80`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleInlineStyle(type);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div
        className="border p-3 rounded min-h-[150px] focus:outline-none"
        onClick={() => setEditorState(EditorState.moveFocusToEnd(editorState))}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          customStyleMap={customStyleMap} // ✅ Apply color styles
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
