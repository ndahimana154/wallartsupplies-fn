import { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Enter text here',
}: any) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    const element = editorRef.current;
    if (!element || quillRef.current) return;

    // Clear any existing content
    element.innerHTML = '';

    quillRef.current = new Quill(element, {
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

    // Set initial value
    if (value) {
      quillRef.current.root.innerHTML = value;
    }

    // Handle text changes
    quillRef.current.on('text-change', () => {
      const content = quillRef.current?.root.innerHTML || '';
      onChange(content);
    });

    return () => {
      if (quillRef.current) {
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
      <div ref={editorRef} style={{ height: '400px' }} />
    </div>
  );
};

export default RichTextEditor;
