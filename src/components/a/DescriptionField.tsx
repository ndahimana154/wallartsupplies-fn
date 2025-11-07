import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Heading from '@tiptap/extension-heading';

interface DescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const DescriptionField: React.FC<DescriptionFieldProps> = ({
  value,
  onChange,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Link,
      Image,
      Heading.configure({ levels: [2, 3, 4] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#e67e22]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-2 border-b bg-gray-50 text-[#e67e22] text-sm">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="font-bold hover:text-[#cf711f]"
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="italic hover:text-[#cf711f]"
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="underline hover:text-[#cf711f]"
        >
          U
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="hover:text-[#cf711f]"
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="hover:text-[#cf711f]"
        >
          H3
        </button>
        <button
          onClick={() => {
            const url = prompt('Enter link URL');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className="hover:text-[#cf711f]"
        >
          🔗
        </button>
        <button
          onClick={() => {
            const url = prompt('Enter image URL');
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className="hover:text-[#cf711f]"
        >
          🖼️
        </button>
      </div>

      {/* Editor Area */}
      <EditorContent editor={editor} className="p-3 min-h-[150px]" />
    </div>
  );
};

export default DescriptionField;
