import { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Enter text here',
}: any) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return;

    // Clear container
    containerRef.current.innerHTML = '';

    // Create a container for Quill
    const editorContainer = document.createElement('div');
    editorContainer.style.minHeight = '180px';
    editorContainer.style.maxHeight = '40vh';
    editorContainer.style.overflowY = 'auto';
    containerRef.current.appendChild(editorContainer);

    quillRef.current = new Quill(editorContainer, {
      theme: 'snow',
      placeholder: placeholder,
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['blockquote', 'code-block'],
          ['link', 'image', 'video'],
          ['clean'],
        ],
      },
    });

    if (value) {
      quillRef.current.root.innerHTML = value;
    }

    const handleTextChange = () => {
      const content = quillRef.current?.root.innerHTML || '';
      onChange(content);
    };
    quillRef.current.on('text-change', handleTextChange);

    return () => {
      if (quillRef.current) {
        quillRef.current.off('text-change', handleTextChange as any);
        quillRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div ref={containerRef} />
    </div>
  );
};

export default RichTextEditor;
