import React, { useState, useEffect, useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';

const CollaborativeEditor = () => {
  const editorRef = useRef(null);
  const [users, setUsers] = useState({
    user1: { lineNumber: 1, column: 1, name: 'Alice' },
    user2: { lineNumber: 2, column: 1, name: 'Bob' },
  });

  useEffect(() => {
    if (editorRef.current) {
      updateCursors();
    }
  }, [users]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    updateCursors();
  };

  const updateCursors = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const decorations = Object.values(users).map(user => ({
      range: new monaco.Range(user.lineNumber, user.column, user.lineNumber, user.column),
      options: {
        className: 'custom-cursor',
        hoverMessage: { value: user.name },
      },
    }));

    editor.deltaDecorations([], decorations);
  };

  return (
    <div>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// Start coding..."
        onMount={handleEditorDidMount}
      />
      <style>{`
        .custom-cursor {
          border-left: 2px solid red;
          margin-left: -1px;
          position: relative;
        }
        .custom-cursor::after {
          content: attr(data-username);
          position: absolute;
          top: -1.5em;
          left: 0;
          background: yellow;
          padding: 2px 4px;
          font-size: 12px;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default CollaborativeEditor;
