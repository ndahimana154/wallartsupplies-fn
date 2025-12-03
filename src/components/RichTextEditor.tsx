import { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Enter text here',
}: any) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    const editorEl = editorRef.current;
    const toolbarEl = toolbarRef.current;
    if (!editorEl || quillRef.current) return;

    editorEl.innerHTML = '';
    if (toolbarEl) toolbarEl.innerHTML = '';

    quillRef.current = new Quill(editorEl, {
      theme: 'snow',
      placeholder: placeholder,
      modules: {
        toolbar: toolbarEl || [
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
      try {
        if (quillRef.current) {
          quillRef.current.off('text-change', handleTextChange as any);
        }
      } catch (e) {}
      try {
        if (quillRef.current) {
          quillRef.current = null;
        }
      } catch (e) {}
      if (editorEl) editorEl.innerHTML = '';
      if (toolbarEl) toolbarEl.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div ref={toolbarRef} className="ql-toolbar" />
      <div
        ref={editorRef}
        style={{ minHeight: '180px', maxHeight: '40vh', overflowY: 'auto' }}
      />
    </div>
  );
};

export default RichTextEditor;
